//// Exportation de la logique de routine ////
//// Déporter les routes ////

const express = require('express');

const router = express.Router();

// Importation du fichier pour utiliser le modèle dans l'application
const Thing = require('../models/Thing');



// Création d'une instance du modèle Thing
router.post('/', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({ // nouvelle instance avec les éléments reçus
      ...req.body
    });
    thing.save() // Enregistre dans le BD > Envoie une Promise
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // Réponse de réussite
      .catch(error => res.status(400).json({ error })); // Réponse de l'erreur générée par Mongoose
  });
 
 
  // Implémentation de la route GET
  router.get('/', (req, res, next) => {
    Thing.find()  // Retourne tous les modèles Things 
      .then(things => res.status(200).json(things)) // Renvoie un tableau contenant tous les Things
      .catch(error => res.status(400).json({ error })); // Renvoie un tableau d'erreur
  });
 
 // Implémentation de la route GET
 router.get('/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) // findOne = Trouver un seule object
                                          // Route dynamique, accessible en tant que paramètre 
      .then(thing => res.status(200).json(thing)) // Renvoie un tableau contenant l'élément res Things
      .catch(error => res.status(404).json({ error })); // Renvoie un tableau d'erreur au front-end
  });
 
  // Modification d'un objet existant avec le route PUT
  router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error })); // Renvoie un tableau d'erreur au front-end
  });
 
  // Suppression d'un Thing avec le route delete
  router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });


module.exports = router;