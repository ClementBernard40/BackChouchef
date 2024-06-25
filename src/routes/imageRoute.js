const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

/**
 * @openapi
 * tags:
 *   name: Images
 *   description: API endpoints for managing images
 */

/**
 * @openapi
 * /image/{imageName}:
 *   get:
 *     summary: Get image by name
 *     description: Endpoint to retrieve an image by its name.
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: imageName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the image to retrieve
 *     responses:
 *       '200':
 *         description: Image retrieved successfully
 *         content:
 *           image/*
 *       '404':
 *         description: Image not found
 */

module.exports = router;

// Routes CRUD pour les projets

router
  .route("/image/:imageName")
  .get(jwtMiddleware.verifyToken, imageController.getImageByName);

module.exports = router;
