const express = require('express');
const router = express.Router();
const profPController = require('../controllers/profPController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Routes CRUD pour les projets

router
    .route('/profCarreer')
        .post(jwtMiddleware.verifyToken,profPController.createProfP)
        .get(profPController.getAllProfP)


router
    .route('/profCarreer/:id')
        .get(profPController.getProfPById)
        .put(jwtMiddleware.verifyToken,profPController.updateProfPById)
        .delete(jwtMiddleware.verifyToken,profPController.deleteProfPById)

module.exports = router;
