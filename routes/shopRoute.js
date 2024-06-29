const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

/**
 * @openapi
 *  components:
 *    schemas:
 *      Shop:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: The name of the shop.
 *          foods_in_shop:
 *            type: array
 *            items:
 *              type: string
 *              description: Food IDs in the shop.
 *          food_checked:
 *            type: array
 *            items:
 *              type: string
 *              description: Checked food IDs in the shop.
 *          nb_checked:
 *            type: number
 *            description: Number of checked food items.
 *          created_at:
 *            type: string
 *            format: date-time
 *            description: The date when the shop was created.
 */
/**
 * @openapi
 * tags:
 *   name: Shops
 *   description: API endpoints for managing shop lists
 */

/**
 * @openapi
 * /shops/{userId}:
 *   post:
 *     summary: Create a new shop list
 *     description: Endpoint to create a new shop list for a user.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: Shop list details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       '201':
 *         description: Shop list created successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: User not found
 */

/**
 * @openapi
 * /shops:
 *   get:
 *     summary: Get all shop lists
 *     description: Endpoint to retrieve all shop lists.
 *     tags: [Shops]
 *     responses:
 *       '200':
 *         description: A list of shop lists retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       '500':
 *         description: Server error
 */

/**
 * @openapi
 * /shops/{id}:
 *   get:
 *     summary: Get a shop list by ID
 *     description: Endpoint to retrieve a shop list by ID.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Shop list ID
 *     responses:
 *       '200':
 *         description: Shop list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Shop list not found
 *       '500':
 *         description: Server error
 *   put:
 *     summary: Update a shop list by ID
 *     description: Endpoint to update a shop list by ID.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Shop list ID
 *     requestBody:
 *       description: Shop list details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       '200':
 *         description: Shop list updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Shop list not found
 *   delete:
 *     summary: Delete a shop list by ID
 *     description: Endpoint to delete a shop list by ID.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Shop list ID
 *     responses:
 *       '200':
 *         description: Shop list deleted successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: Shop list not found
 *       '500':
 *         description: Server error
 */

/**
 * @openapi
 * /shops/{shopId}/add-foods:
 *   post:
 *     summary: Add food items to a shop list by their names
 *     description: Endpoint to add food items to a shop list.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: shopId
 *         schema:
 *           type: string
 *         required: true
 *         description: Shop list ID
 *     requestBody:
 *       description: Names of food items to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodNames:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Food items added successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Shop list or food item not found
 *       '500':
 *         description: Server error
 */

/**
 * @openapi
 * /shops/{id}/check-item:
 *   put:
 *     summary: Check an item in the shop list
 *     description: Endpoint to check an item in the shop list.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Shop list ID
 *     requestBody:
 *       description: Checked food items
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               food_checked:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Item checked successfully
 *       '400':
 *         description: Bad request
 *       '403':
 *         description: Food item not found
 *       '405':
 *         description: Shop list not found
 *       '500':
 *         description: Server error
 */

/**
 * @openapi
 * /shops/{listId}/foods_in_shop/{foodId}:
 *   delete:
 *     summary: Remove a food item from a shop list
 *     description: Endpoint to remove a food item from a shop list.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: listId
 *         schema:
 *           type: string
 *         required: true
 *         description: Shop list ID
 *       - in: path
 *         name: foodId
 *         schema:
 *           type: string
 *         required: true
 *         description: Food item ID
 *     responses:
 *       '204':
 *         description: Food item removed successfully
 *       '404':
 *         description: Shop list not found
 *       '500':
 *         description: Server error
 */

/**
 * @openapi
 * /shops/{listId}/food_checked:
 *   put:
 *     summary: Update checked food items in a shop list
 *     description: Endpoint to update checked food items in a shop list.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: listId
 *         schema:
 *           type: string
 *         required: true
 *         description: Shop list ID
 *     requestBody:
 *       description: List of checked food items
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               food_checked:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Checked food items updated successfully
 *       '500':
 *         description: Server error
 */

router.post("/shops/:userId", shopController.createShop);

router.get("/shops", shopController.getShops);

router.get("/shops/:id", jwtMiddleware.verifyToken, shopController.getShopById);
router.put("/shops/:id", jwtMiddleware.verifyToken, shopController.updateShop);
router.delete(
  "/shops/:id",
  jwtMiddleware.verifyToken,
  shopController.deleteShop
);

router.post(
  "/shops/:shopId/add-foods",
  jwtMiddleware.verifyToken,
  shopController.addFoodToShop
);
router.put(
  "/shops/:id/check-item",
  jwtMiddleware.verifyToken,
  shopController.checkItem
);

router.delete(
  "/shops/:listId/foods_in_shop/:foodId",
  jwtMiddleware.verifyToken,
  shopController.removefood
);

router.put("/shops/:listId/food_checked", shopController.updatechecked);

module.exports = router;
