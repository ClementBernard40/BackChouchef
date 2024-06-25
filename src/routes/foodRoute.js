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
