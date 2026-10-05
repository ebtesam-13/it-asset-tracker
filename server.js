const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'devices.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 1. جلب البيانات من ملف devices.json
app.get('/api/devices', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send("خطأ في قراءة الملف");
    res.json(JSON.parse(data || '[]'));
  });
});

// 2. الحفظ والتعديل المباشر داخل ملف devices.json
app.post('/api/devices', (req, res) => {
  const newDevices = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(newDevices, null, 2), 'utf8', (err) => {
    if (err) return res.status(500).send("خطأ في حفظ الملف");
    res.json({ message: "تم الحفظ بنجاح داخل devices.json!" });
  });
});

app.listen(PORT, () => {
  console.log(`السيرفر يعمل الآن على: http://localhost:${PORT}`);
});