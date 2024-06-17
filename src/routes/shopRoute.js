const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post("/shops/:userId", shopController.createShop);
router.get("/shops", shopController.getShops);
router.get("/shops/:id", shopController.getShopById);
router.put("/shops/:id", shopController.updateShop);
router.delete("/shops/:id", shopController.deleteShop);
router.post("/shops/:shopId/add-foods", shopController.addFoodToShop);
router.put("/shops/:id/check-item", shopController.checkItem); // Utilise le contrôleur pour check-item
router.delete(
  "/shops/:listId/foods_in_shop/:foodId",
  shopController.removefood
);

router.put("/shops/:listId/food_checked", shopController.updatechecked);
module.exports = router;
