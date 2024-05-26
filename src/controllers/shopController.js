const Shop = require('../models/shopModel');
const Food = require('../models/foodModel')
// Create a new shop list
exports.createShop = async (req, res) => {
    try {
        const newShop = new Shop(req.body);
        await newShop.save();
        res.status(201).json(newShop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all shop lists
exports.getShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate('foods_in_shop');
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a shop list by ID
exports.getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id).populate('foods_in_shop');
        if (!shop) {
            return res.status(404).json({ message: 'Shop list not found' });
        }
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a shop list by ID
exports.updateShop = async (req, res) => {
    try {
        const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedShop) {
            return res.status(404).json({ message: 'Shop list not found' });
        }
        res.status(200).json(updatedShop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a shop list by ID
exports.deleteShop = async (req, res) => {
    try {
        const deletedShop = await Shop.findByIdAndDelete(req.params.id);
        if (!deletedShop) {
            return res.status(404).json({ message: 'Shop list not found' });
        }
        res.status(200).json({ message: 'Shop list deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add food items to a shop list by their names
exports.addFoodToShop = async (req, res) => {
    try {
        const shopId = req.params.shopId;
        const foodNames = req.body.foodNames; // Array of food names


        if (!Array.isArray(foodNames)) {
            return res.status(400).json({ message: 'foodNames must be an array' });
        }
        // Find the shop
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop list not found' });
        }

        // Iterate over the food names
        const foodIds = [];
        for (const foodName of foodNames) {
            // Check if the food item already exists
            let food = await Food.findOne({ name: foodName });
            if (!food) {
                
                return res.status(404).json({ message: 'food not found in database' });
            }
            foodIds.push(food._id);
        }

        // Add the food IDs to the shop's food list
        if (!Array.isArray(shop.foods_in_shop)) {
            shop.foods_in_shop = [];
        }
        shop.foods_in_shop.push(...foodIds);
        await shop.save();

        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};