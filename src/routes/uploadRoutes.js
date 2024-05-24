const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

// Définir le stockage pour multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

// Initialiser multer avec les options de stockage
const upload = multer({ storage: storage });

// Définir la route pour gérer l'upload de fichiers
router.post('/upload', upload.single('file'), uploadController.uploadFile);

module.exports = router;
