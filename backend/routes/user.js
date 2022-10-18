// Configuration du router

const express = require('express');
const router = express.Router();

// Controleur pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

// Routes de type Post : car le frontend va envoyer des informations (mail & mdp)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;