/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Identifiant unique de l'aliment
 *         name:
 *           type: string
 *           description: Nom de l'aliment
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'aliment
 *       example:
 *         id: 60c72b2f5f1b2c001c8e4d67
 *         name: Pomme
 *         created_at: 2023-06-28T10:34:56.234Z
 *
 * tags:
 *   name: Foods
 *   description: API pour gérer les aliments
 */

/**
 * @swagger
 * /foods:
 *   post:
 *     summary: Créer un nouvel aliment
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: Aliment créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       400:
 *         description: Erreur de validation des données
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Invalid data"
 */

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Récupérer tous les aliments
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: Liste des aliments récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Server error"
 */

/**
 * @swagger
 * /foods/{id}:
 *   get:
 *     summary: Récupérer un aliment par son ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'aliment
 *     responses:
 *       200:
 *         description: Aliment récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Aliment non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Food item not found"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Server error"
 */

/**
 * @swagger
 * /foods/{id}:
 *   put:
 *     summary: Mettre à jour un aliment par son ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'aliment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Aliment mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       400:
 *         description: Erreur de validation des données
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Invalid data"
 *       404:
 *         description: Aliment non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Food item not found"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Server error"
 */

/**
 * @swagger
 * /foods/{id}:
 *   delete:
 *     summary: Supprimer un aliment par son ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'aliment
 *     responses:
 *       200:
 *         description: Aliment supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Food item deleted successfully"
 *       404:
 *         description: Aliment non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Food item not found"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Server error"
 */

const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post("/foods", foodController.createFood);
router.get("/foods", foodController.getFoods);
router.get("/foods/:id", jwtMiddleware.verifyToken, foodController.getFoodById);
router.put("/foods/:id", jwtMiddleware.verifyToken, foodController.updateFood);
router.delete(
  "/foods/:id",
  jwtMiddleware.verifyToken,
  foodController.deleteFood
);

module.exports = router;
