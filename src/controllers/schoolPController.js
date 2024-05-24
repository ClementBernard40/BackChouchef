const SchoolP = require('../models/schoolPModel'); 

// Controller pour la création d'un parcour scolaire
exports.createSchoolP = async (req, res) => {
    try {
        const newSchoolP = new SchoolP(req.body);
        const savedSchoolP = await newSchoolP.save();
        res.status(201).json(savedSchoolP);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour la récupération de tous les parcours scolaires
exports.getAllSchoolP= async (req, res) => {
    try {
        const schoolP = await SchoolP.find();
        res.status(200).json(schoolP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la récupération d'un projet par son ID
exports.getSchoolPById = async (req, res) => {
    try {
        const schoolP = await SchoolP.findById(req.params.id);
        if (!schoolP) {
            return res.status(404).json({ message: 'SchoolP non trouvé' });
        }
        res.status(200).json(schoolP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la mise à jour d'un parcour scolaire par son ID
exports.updateSchoolPById = async (req, res) => {
    try {
        const updatedSchoolP = await SchoolP.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Retourne le document mis à jour
        );
        if (!updatedSchoolP) {
            return res.status(404).json({ message: 'SchoolP non trouvé' });
        }
        res.status(200).json(updatedSchoolP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la suppression d'un parcour scolaire par son ID
exports.deleteSchoolPById = async (req, res) => {
    try {
        const deletedSchoolP = await SchoolP.findByIdAndDelete(req.params.id);
        if (!deletedSchoolP) {
            return res.status(404).json({ message: 'SchoolP non trouvé' });
        }
        res.status(200).json(deletedSchoolP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
