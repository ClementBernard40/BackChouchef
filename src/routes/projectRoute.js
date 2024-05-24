const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

/**
 * @openapi
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @openapi
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Endpoint to create a new project.
 *     tags: [Projects]
 *     requestBody:
 *       description: Project details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '201':
 *         description: Project created successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *   get:
 *     summary: Get all projects
 *     description: Endpoint to retrieve a list of all projects.
 *     tags: [Projects]
 *     responses:
 *       '200':
 *         description: A list of projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized - Invalid token
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: The URL of the project.
 *         urlLogo:
 *           type: string
 *           description: The URL of the project's logo.
 *         name:
 *           type: string
 *           description: The name of the project.
 *         description:
 *           type: string
 *           description: A description of the project.
 *         created_at:
 *           type: date
 *           description: The date when the project was created.
 *       required:
 *         - urlLogo
 *         - name
 *       example:
 *         url: "https://example.com/project"
 *         urlLogo: "https://example.com/project/logo.png"
 *         name: "Project Name"
 *         description: "A description of the project."
 *         created_at: "2022-04-06T14:45:00Z"
 */

/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     description: Endpoint to retrieve a project by ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *     responses:
 *       '200':
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Project not found
 *   put:
 *     summary: Update project by ID
 *     description: Endpoint to update a project by ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *     requestBody:
 *       description: Project details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: Project updated successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Project not found
 *   delete:
 *     summary: Delete project by ID
 *     description: Endpoint to delete a project by ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *     responses:
 *       '204':
 *         description: Project deleted successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Project not found
 */

// Routes CRUD pour les projets

router
    .route('/projects')
        .post(jwtMiddleware.verifyToken,projectController.createProject)
        .get(projectController.getAllProjects)


router
    .route('/projects/:id')
        .get(projectController.getProjectById)
        .put(jwtMiddleware.verifyToken,projectController.updateProjectById)
        .delete(jwtMiddleware.verifyToken,projectController.deleteProjectById)

module.exports = router;
