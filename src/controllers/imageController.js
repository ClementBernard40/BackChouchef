// Import des modules requis
const fs = require('fs');
const path = require('path');

// Controller pour la récupération d'une image par son nom
exports.getImageByName = async (req, res) => {
    try {
        // Récupération du nom de l'image depuis les paramètres de la requête
        const imageName = req.params.imageName;

        // Chemin complet vers le dossier d'images sur le serveur
        const imagePath = path.join(__dirname, '../image', imageName);

        // Vérification de l'existence du fichier
        if (fs.existsSync(imagePath)) {
            // Lecture du fichier image
            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    // En cas d'erreur lors de la lecture du fichier
                    console.error('Erreur lors de la lecture de l\'image : ', err);
                    return res.status(500).send('Erreur lors de la lecture de l\'image.');
                }
                // Envoi de l'image au client avec le bon type de contenu
                res.writeHead(200, { 'Content-Type': 'image/png' }); // Adapter le type de contenu selon le type de l'image
                res.end(data); // Envoi des données de l'image
            });
        } else {
            // Si le fichier n'existe pas
            return res.status(404).send('Image non trouvée.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'image : ', error);
        res.status(500).send('Erreur lors de la récupération de l\'image.');
    }
};


