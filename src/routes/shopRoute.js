const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

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
