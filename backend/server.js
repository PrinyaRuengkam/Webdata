const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ไฟล์เก็บข้อมูล
const dataFilePath = path.join(__dirname, 'data.json');

// อ่านข้อมูลจากไฟล์
function readData() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

// เขียนข้อมูลลงไฟล์
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// API Routes
// ดึงข้อมูลทั้งหมด
app.get('/api/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// เพิ่มข้อมูลใหม่
app.post('/api/data', (req, res) => {
  const newData = req.body;
  const data = readData();
  data.push(newData);
  writeData(data);
  res.status(201).json({ message: 'บันทึกข้อมูลสำเร็จ', data: newData });
});

// ลบข้อมูล
app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let data = readData();
  if (id >= 0 && id < data.length) {
    data.splice(id, 1); // ลบข้อมูลออกจากอาร์เรย์
    writeData(data); // บันทึกข้อมูลใหม่ลงไฟล์
    res.json({ message: 'ลบข้อมูลสำเร็จ' });
  } else {
    res.status(404).json({ message: 'ไม่พบข้อมูล' });
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});