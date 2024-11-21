const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const employeeController = require('../controllers/employeeController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getOneEmployee);
router.post('/employees', upload.single('image'), employeeController.addEmployee);
router.put('/employees/:id', upload.single('image'), employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;
