const express = require('express');
const multer = require('multer');   // ✅ Added: Required for file uploads
const xlsx = require('xlsx');       // ✅ Already here
const path = require('path');       // ✅ Already here
const fs = require('fs');           // ✅ Already here

const app = express();
const port = process.env.PORT || 3001;

// Setup file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Make sure uploads folder exists
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Route to upload and process file
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // 🔍 Analyze the data
    let totalDeliveries = 0;
    let revenueByProvider = {};
    let successCount = 0;
    let failCount = 0;

    for (let row of data) {
      totalDeliveries++;

      // Example fields - adjust these based on your real data
      const provider = row['Delivery Platform'] || 'Unknown';
      const status = row['Status'] || 'failed';
      const revenue = parseFloat(row['Revenue']) || 0;

      // Accumulate revenue by provider
      if (!revenueByProvider[provider]) {
        revenueByProvider[provider] = 0;
      }
      revenueByProvider[provider] += revenue;

      // Count success vs failed
      if (status.toLowerCase() === 'success' || status.toLowerCase() === 'delivered') {
        successCount++;
      } else {
        failCount++;
      }
    }

    // Send back report
    res.json({
      message: 'File processed successfully!',
      report: {
        totalDeliveries,
        revenueByProvider,
        successCount,
        failCount
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reading or processing file' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
