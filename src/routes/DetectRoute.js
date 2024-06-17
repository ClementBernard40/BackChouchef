const express = require("express");
const multer = require("multer");
const tesseract = require("tesseract.js");
const router = express.Router();
const upload = multer();

router.post("/detectText", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const {
      data: { text },
    } = await tesseract.recognize(req.file.buffer, "eng", {
      logger: (m) => console.log(m),
    });

    res.json({ detections: text });
  } catch (error) {
    console.error("Error processing image:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the image" });
  }
});

module.exports = router;
