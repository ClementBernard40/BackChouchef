const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

/**
 * @openapi
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         adress:
 *           type: string
 *           description: The address of the contact.
 *         pCode:
 *           type: string
 *           description: The postal code of the contact.
 *         city:
 *           type: string
 *           description: The city of the contact.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the contact.
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the contact.
 *         gitLink:
 *           type: string
 *           description: The GitHub link of the contact.
 *         created_at:
 *           type: date
 *           description: The date when the contact was created.
 *       required:
 *         - adress
 *         - pCode
 *         - city
 *         - email
 *         - phoneNumber
 *       example:
 *         adress: "123 Main St"
 *         pCode: "12345"
 *         city: "Cityville"
 *         email: "example@example.com"
 *         phoneNumber: "+1234567890"
 *         gitLink: "https://github.com/example"
 *         created_at: "2022-04-06T14:45:00Z"
 */



/**
 * @openapi
 * tags:
 *   name: Contacts
 *   description: API endpoints for managing contacts
 */

/**
 * @openapi
 * /contact:
 *   post:
 *     summary: Create a new contact
 *     description: Endpoint to create a new contact.
 *     tags: [Contacts]
 *     requestBody:
 *       description: Contact details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '201':
 *         description: Contact created successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *   get:
 *     summary: Get all contacts
 *     description: Endpoint to retrieve a list of all contacts.
 *     tags: [Contacts]
 *     responses:
 *       '200':
 *         description: A list of contacts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       '401':
 *         description: Unauthorized - Invalid token
 */

/**
 * @openapi
 * /contact/{id}:
 *   get:
 *     summary: Get contact by ID
 *     description: Endpoint to retrieve a contact by ID.
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     responses:
 *       '200':
 *         description: Contact retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Contact not found
 *   put:
 *     summary: Update contact by ID
 *     description: Endpoint to update a contact by ID.
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     requestBody:
 *       description: Contact details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '200':
 *         description: Contact updated successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Contact not found
 *   delete:
 *     summary: Delete contact by ID
 *     description: Endpoint to delete a contact by ID.
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     responses:
 *       '204':
 *         description: Contact deleted successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Contact not found
 */


// Routes CRUD pour les projets

router
    .route('/contact')
        .post(jwtMiddleware.verifyToken,contactController.createContact)
        .get(contactController.getAllContact)


router
    .route('/contact/:id')
        .get(contactController.getContactById)
        .put(jwtMiddleware.verifyToken,contactController.updateContactById)
        .delete(jwtMiddleware.verifyToken,contactController.deleteContactById)

module.exports = router;
