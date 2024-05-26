const Food = require('../models/foodModel');

// Create a new food item
exports.createFood = async (req, res) => {
    try {
        const newFood = new Food(req.body);
        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all food items
exports.getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a food item by ID
exports.getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a food item by ID
exports.updateFood = async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a food item by ID
exports.deleteFood = async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
