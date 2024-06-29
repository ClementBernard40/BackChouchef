/**
 * @swagger
 * tags:
 *   name: Text Detection
 *   description: API for detecting text from images
 */

/**
 * @swagger
 * /detectText:
 *   post:
 *     summary: Detect text from an uploaded image
 *     tags: [Text Detection]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to be processed
 *     responses:
 *       200:
 *         description: Successfully detected text from image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 detections:
 *                   type: string
 *                   description: Detected text from the image
 *                   example: "Detected text from the image goes here"
 *       400:
 *         description: No image file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No image file uploaded"
 *       500:
 *         description: Error processing image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while processing the image"
 */

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
