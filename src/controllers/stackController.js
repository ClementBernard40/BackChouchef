const Stack = require('../models/stackModel'); 

// Controller pour la création d'un stack
exports.createStack = async (req, res) => {
    try {
        const newStack = new Stack(req.body);
        const savedStack = await newStack.save();
        res.status(201).json(savedStack);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour la récupération de tous les stack
exports.getAllStack= async (req, res) => {
    try {
        const stacks = await Stack.find();
        res.status(200).json(stacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la récupération d'un stack par son ID
exports.getStackById = async (req, res) => {
    try {
        const stacks = await Stack.findById(req.params.id);
        if (!stacks) {
            return res.status(404).json({ message: 'Stack non trouvé' });
        }
        res.status(200).json(stacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la mise à jour d'un stack par son ID
exports.updateStackById = async (req, res) => {
    try {
        const updatedStack = await Stack.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Retourne le document mis à jour
        );
        if (!updatedStack) {
            return res.status(404).json({ message: 'Stack non trouvé' });
        }
        res.status(200).json(updatedStack);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la suppression d'un stack par son ID
exports.deleteStackById = async (req, res) => {
    try {
        const deletedStack = await Stack.findByIdAndDelete(req.params.id);
        if (!deletedStack) {
            return res.status(404).json({ message: 'Stack non trouvé' });
        }
        res.status(200).json(deletedStack);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
