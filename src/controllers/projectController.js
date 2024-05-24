const Project = require('../models/projectModel'); // Assurez-vous de fournir le bon chemin d'accès à votre modèle

// Controller pour la création d'un projet
exports.createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour la récupération de tous les projets
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la récupération d'un projet par son ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la mise à jour d'un projet par son ID
exports.updateProjectById = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Retourne le document mis à jour
        );
        if (!updatedProject) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour la suppression d'un projet par son ID
exports.deleteProjectById = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.status(200).json(deletedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
