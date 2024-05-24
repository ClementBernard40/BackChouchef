const express = require('express');
const router = express.Router();
const schoolPController = require('../controllers/schoolPController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

/**
 * @openapi
 * tags:
 *   name: School Career
 *   description: API endpoints for managing school careers
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     SchoolCareer:
 *       type: object
 *       properties:
 *         diploma:
 *           type: string
 *           description: The diploma obtained during the school career.
 *         schoolName:
 *           type: string
 *           description: The name of the school attended during the school career.
 *         city:
 *           type: string
 *           description: The city where the school is located.
 *         yearStart:
 *           type: string
 *           description: The start year of the school career.
 *         yearEnd:
 *           type: string
 *           description: The end year of the school career.
 *       required:
 *         - diploma
 *         - schoolName
 *         - city
 *         - yearStart
 *         - yearEnd
 */

/**
 * @openapi
 * /schoolCarreer:
 *   post:
 *     summary: Create a new school career
 *     description: Endpoint to create a new school career.
 *     tags: [School Career]
 *     requestBody:
 *       description: School career details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolCareer'
 *     responses:
 *       '201':
 *         description: School career created successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *   get:
 *     summary: Get all school careers
 *     description: Endpoint to retrieve a list of all school careers.
 *     tags: [School Career]
 *     responses:
 *       '200':
 *         description: A list of school careers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SchoolCareer'
 *       '401':
 *         description: Unauthorized - Invalid token
 */

/**
 * @openapi
 * /schoolCarreer/{id}:
 *   get:
 *     summary: Get school career by ID
 *     description: Endpoint to retrieve a school career by ID.
 *     tags: [School Career]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: School career ID
 *     responses:
 *       '200':
 *         description: School career retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolCareer'
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: School career not found
 *   put:
 *     summary: Update school career by ID
 *     description: Endpoint to update a school career by ID.
 *     tags: [School Career]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: School career ID
 *     requestBody:
 *       description: School career details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolCareer'
 *     responses:
 *       '200':
 *         description: School career updated successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: School career not found
 *   delete:
 *     summary: Delete school career by ID
 *     description: Endpoint to delete a school career by ID.
 *     tags: [School Career]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: School career ID
 *     responses:
 *       '204':
 *         description: School career deleted successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: School career not found
 */



// Routes CRUD pour les projets

router
    .route('/schoolCarreer')
        .post(jwtMiddleware.verifyToken,schoolPController.createSchoolP)
        .get(schoolPController.getAllSchoolP)


router
    .route('/schoolCarreer/:id')
        .get(schoolPController.getSchoolPById)
        .put(jwtMiddleware.verifyToken,schoolPController.updateSchoolPById)
        .delete(jwtMiddleware.verifyToken,schoolPController.deleteSchoolPById)

module.exports = router;
