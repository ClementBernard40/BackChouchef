const ProfP = require('../models/profPModel');

// Controller pour la création d'un parcour professionnel
exports.createProfP = async (req, res) => {
    try {
        const newProfP = new ProfP(req.body);
        const savedProfP = await newProfP.save();
        res.status(201).json(savedProfP);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour la récupération de tous les parcours professionnels
exports.getAllProfP= async (req, res) => {
    try {
        const profP = await ProfP.find();
        res.status(200).json(profP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la récupération d'un projet par son ID
exports.getProfPById = async (req, res) => {
    try {
        const profP = await ProfP.findById(req.params.id);
        if (!profP) {
            return res.status(404).json({ message: 'ProfP non trouvé' });
        }
        res.status(200).json(profP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la mise à jour d'un parcour professionnel par son ID
exports.updateProfPById = async (req, res) => {
    try {
        const updatedProfP = await ProfP.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Retourne le document mis à jour
        );
        if (!updatedProfP) {
            return res.status(404).json({ message: 'ProfP non trouvé' });
        }
        res.status(200).json(updatedProfP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la suppression d'un parcour professionnel par son ID
exports.deleteProfPById = async (req, res) => {
    try {
        const deletedProfP = await ProfP.findByIdAndRemove(req.params.id);
        if (!deletedProfP) {
            return res.status(404).json({ message: 'ProfP non trouvé' });
        }
        res.status(200).json(deletedProfP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
