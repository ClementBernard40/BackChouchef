const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

/**
 * @openapi
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: The email address of the user.
 *          name:
 *            type: string
 *            description: The name of the user.
 *          password:
 *            type: string
 *            description: The password for the user.
 *          created_at:
 *            type: date
 *            description: The date when the user was created.
 */
/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     tags: [Users]
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User successfully registered
 *       '401':
 *         description: Invalid request
 */

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Login as a user
 *     description: Endpoint to authenticate and login as a user.
 *     tags: [Users]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized - Invalid credentials
 */

/**
 * @openapi
 * /users/allUsers:
 *   get:
 *     summary: Get all users
 *     description: Endpoint to retrieve a list of all users.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized - Invalid token
 */

/**
 * @openapi
 * /users/{id_users}:
 *   get:
 *     summary: Get user by ID
 *     description: Endpoint to retrieve a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_users
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: User not found
 *   delete:
 *     summary: Delete user by ID
 *     description: Endpoint to delete a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_users
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: User not found
 *   put:
 *     summary: Update user by ID
 *     description: Endpoint to update a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_users
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: User details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: User not found
 */

/**
 * @openapi
 * /users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Endpoint to retrieve a user by email.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User email
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: User not found
 */

/**
 * @openapi
 * /users/{id_users}/password:
 *   put:
 *     summary: Update user password by ID
 *     description: Endpoint to update a user's password by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_users
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: User current and new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */

router.route("/register").post(userController.userRegister);

router.route("/login").post(userController.userLogin);

router.route("/allUsers").get(userController.listAllUsers);

router
  .route("/:id_users")
  .delete(jwtMiddleware.verifyToken, userController.deleteAUser)
  .put(jwtMiddleware.verifyToken, userController.updateAUser)
  .get(userController.getUserById);

router.get("/email/:email", userController.getUserByEmail);

router.put(
  "/:id_users/password",
  jwtMiddleware.verifyToken,
  userController.updateUserPassword
);

module.exports = router;
