const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router.post('/shops', shopController.createShop);
router.get('/shops', shopController.getShops);
router.get('/shops/:id', shopController.getShopById);
router.put('/shops/:id', shopController.updateShop);
router.delete('/shops/:id', shopController.deleteShop);
router.post('/shops/:shopId/add-foods', shopController.addFoodToShop); // New route for adding food to a shop

module.exports = router;
