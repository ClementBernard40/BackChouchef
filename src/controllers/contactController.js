const Contact = require('../models/contactModel'); 

// Controller pour la création d'un projet
exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour la récupération de tous les projets
exports.getAllContact= async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la récupération d'un projet par son ID
exports.getContactById = async (req, res) => {
    try {
        const contacts = await Contact.findById(req.params.id);
        if (!contacts) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la mise à jour d'un projet par son ID
exports.updateContactById = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Retourne le document mis à jour
        );
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la suppression d'un projet par son ID
exports.deleteContactById = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndRemove(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }
        res.status(200).json(deletedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
