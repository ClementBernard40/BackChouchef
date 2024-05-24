const express = require('express');
const router = express.Router();
const stackController = require('../controllers/stackController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Routes CRUD pour les projets

/**
 * @openapi
 * tags:
 *   name: Stacks
 *   description: API endpoints for managing stacks
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     Stack:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the stack.
 *         imglink:
 *           type: string
 *           description: The image link for the stack.
 *         pourcentage:
 *           type: number
 *           description: The percentage of completion for the stack.
 *       required:
 *         - name
 *         - imglink
 */

/**
 * @openapi
 * /stack:
 *   post:
 *     summary: Create a new stack
 *     description: Endpoint to create a new stack.
 *     tags: [Stacks]
 *     requestBody:
 *       description: Stack details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stack'
 *     responses:
 *       '201':
 *         description: Stack created successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *   get:
 *     summary: Get all stacks
 *     description: Endpoint to retrieve a list of all stacks.
 *     tags: [Stacks]
 *     responses:
 *       '200':
 *         description: A list of stacks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stack'
 *       '401':
 *         description: Unauthorized - Invalid token
 */

/**
 * @openapi
 * /stack/{id}:
 *   get:
 *     summary: Get stack by ID
 *     description: Endpoint to retrieve a stack by ID.
 *     tags: [Stacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Stack ID
 *     responses:
 *       '200':
 *         description: Stack retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stack'
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Stack not found
 *   put:
 *     summary: Update stack by ID
 *     description: Endpoint to update a stack by ID.
 *     tags: [Stacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Stack ID
 *     requestBody:
 *       description: Stack details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stack'
 *     responses:
 *       '200':
 *         description: Stack updated successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Stack not found
 *   delete:
 *     summary: Delete stack by ID
 *     description: Endpoint to delete a stack by ID.
 *     tags: [Stacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Stack ID
 *     responses:
 *       '204':
 *         description: Stack deleted successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Stack not found
 */



router
    .route('/stack')
        .post(jwtMiddleware.verifyToken,stackController.createStack)
        .get(stackController.getAllStack)


router
    .route('/stack/:id')
        .get(stackController.getStackById)
        .put(jwtMiddleware.verifyToken,stackController.updateStackById)
        .delete(jwtMiddleware.verifyToken,stackController.deleteStackById)

module.exports = router;
