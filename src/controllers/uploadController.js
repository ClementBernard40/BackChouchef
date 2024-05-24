const fs = require('fs');
const path = require('path');

// Méthode pour gérer l'upload de fichiers
exports.uploadFile = (req, res) => {
  // Vérifier s'il y a un fichier dans la requête
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier n\'a été sélectionné' });
  }

  // Récupérer le fichier envoyé
  const uploadedFile = req.file;

  // Définir le chemin de destination du fichier
  const destinationPath = path.join(__dirname, '..', 'image', uploadedFile.originalname);

  // Déplacer le fichier vers le dossier désiré
  fs.rename(uploadedFile.path, destinationPath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Une erreur est survenue lors du déplacement du fichier' });
    }
    
    // Supprimer le fichier d'origine après le déplacement
    fs.unlink(uploadedFile.path, (err) => {
      if (err) {
        console.error('Erreur lors de la suppression du fichier d\'origine:', err);
      }
    });

    // Envoyer une réponse réussie
    res.status(200).json({ message: 'Fichier téléchargé avec succès' });
  });
};
