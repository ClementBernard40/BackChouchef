/**
 * @swagger
 * components:
 *   schemas:
 *     Mail:
 *       type: object
 *       required:
 *         - prenom
 *         - email
 *         - message
 *       properties:
 *         prenom:
 *           type: string
 *           description: Le prénom de l'expéditeur
 *         email:
 *           type: string
 *           description: L'email de l'expéditeur
 *         message:
 *           type: string
 *           description: Le message envoyé
 *       example:
 *         prenom: John
 *         email: john.doe@example.com
 *         message: Bonjour, ceci est un message de test.
 *
 * tags:
 *   name: Mail
 *   description: API pour envoyer des emails
 */

/**
 * @swagger
 * /mail:
 *   post:
 *     summary: Envoie un email
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mail'
 *     responses:
 *       200:
 *         description: Email envoyé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Email envoyé: 250 OK"
 *       500:
 *         description: Erreur lors de l'envoi de l'email
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Erreur lors de l'envoi de l'email"
 */

const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

router.post("/mail", mailController.sendEmail);

module.exports = router;
