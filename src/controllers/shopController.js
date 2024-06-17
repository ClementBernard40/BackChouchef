const Shop = require("../models/shopModel");
const Food = require("../models/foodModel");
const User = require("../models/userModel");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// Create a new shop list
exports.createShop = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(409).json({ message: "Utilisateur non trouvé" });
    }

    const newShop = new Shop(req.body);
    await newShop.save();
    user.user_shop.push(newShop._id);
    await user.save();

    res.status(201).json(newShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all shop lists
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("foods_in_shop");
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a shop list by ID
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate("foods_in_shop");
    if (!shop) {
      return res.status(401).json({ message: "Shop list not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shop list by ID
exports.updateShop = async (req, res) => {
  try {
    const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedShop) {
      return res.status(407).json({ message: "Shop list not found" });
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
      return res.status(404).json({ message: "Shop list not found" });
    }
    res.status(200).json({ message: "Shop list deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add food items to a shop list by their names
exports.addFoodToShop = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const foodNames = req.body.foodNames;

    if (!Array.isArray(foodNames)) {
      return res.status(400).json({ message: "foodNames must be an array" });
    }

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: "Shop list not found" });
    }

    const foodIds = [];
    for (const foodName of foodNames) {
      // Recherche de l'aliment par son nom dans la base de données
      let food = await Food.findOne({ name: foodName });
      if (!food) {
        return res
          .status(404)
          .json({ message: `Food '${foodName}' not found in database` });
      }
      foodIds.push(food._id);
    }

    // Ajouter les identifiants des aliments à la liste de courses du magasin
    if (!Array.isArray(shop.foods_in_shop)) {
      shop.foods_in_shop = [];
    }
    shop.foods_in_shop.push(...foodIds);
    await shop.save();

    res.status(200).json(shop);
  } catch (error) {
    console.error("Error adding food to shop:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Check an item in the shop list
exports.checkItem = async (req, res) => {
  const { id } = req.params;
  const { food_checked } = req.body;

  // Validate that food_checked is an array
  if (!Array.isArray(food_checked)) {
    return res.status(400).json({ message: "food_checked must be an array" });
  }

  console.log("Shop ID:", id);
  console.log("Food checked IDs:", food_checked);

  try {
    // Find the shop by its ID
    const shop = await Shop.findById(id);
    console.log("test liste");
    if (!shop) {
      return res.status(405).json({ message: "Shop not found" });
    }
    console.log("test ok");
    console.log("test validefood");
    // Validate that each item in food_checked exists in the foods collection
    const validFoodIds = [];
    for (const foodId of food_checked) {
      const food = await Food.findById(foodId);
      if (!food) {
        return res
          .status(403)
          .json({ message: `Food item with ID ${foodId} not found` });
      }
      validFoodIds.push(food._id);
    }
    console.log("test ok");

    console.log("Valid food IDs:", validFoodIds);

    // Use findOneAndUpdate to update the shop document and disable versioning
    const updatedShop = await Shop.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          food_checked: validFoodIds,
          nb_checked: validFoodIds.length,
        },
      },
      { new: true, runValidators: true }
    );

    console.log("Shop updated successfully:", updatedShop);
    console.log(
      "---------------------------------------------------------------------------------------------------------------"
    );
    // Respond with the updated shop
    res.json(updatedShop);
  } catch (error) {
    console.error("Error saving checked items:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
exports.removefood = async (req, res) => {
  const { listId, foodId } = req.params;
  console.log("list id :", listId, "food id :", foodId); // Log the IDs
  try {
    const updatedShop = await Shop.findByIdAndUpdate(
      listId,
      { $pull: { foods_in_shop: foodId } },
      { new: true }
    );
    console.log("Updated shop after removal:", updatedShop); // Log the updated shop

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error removing food from foods_in_shop:", error);
    res.status(500).json({ error: "Could not remove food from foods_in_shop" });
  }
};

exports.updatechecked = async (req, res) => {
  const { listId } = req.params;
  const { food_checked } = req.body;

  try {
    // Mettre à jour la liste `food_checked` associée à `listId`
    await Shop.findByIdAndUpdate(listId, {
      food_checked: food_checked,
    });

    res.status(200).json({ message: "food_checked updated successfully" });
  } catch (error) {
    console.error("Error updating food_checked:", error);
    res.status(500).json({ error: "Could not update food_checked" });
  }
};
