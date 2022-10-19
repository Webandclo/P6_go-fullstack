// Middleware
// Contrôleur
// élément de logique métier 

const Thing = require('../models/thing');

///////////
// Créer un objet
exports.createThing = (req, res, next) => {
  // JSON.parse() > transforme un objet stringifié en Object JavaScript exploitable.
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  thing.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

///////////
// Modifier un objet uniquement si c'est l'utilisateur qui en est le propriétaire
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

///////////
// Supprimer le _userId a la requet par sécurité
  delete thingObject._userId;
  Thing.findOne({_id: req.params.id})
      .then((thing) => {
        // On récupère notre objet en BD
            // L'objet n'appartient pas à l'utilisateur
          if (thing.userId != req.auth.userId) {
              res.status(401).json({ message : 'Utilisateur non autorisé'});
          } else {
            // L'objet appartient pas à l'utilisateur
              Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
              //
              .then(() => res.status(200).json({message : 'image modifiée !'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

// Supprimer un objet uniquement si c'est l'utilisateur qui en est le propriétaire
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id})
      .then(thing => {
        // Vérification du userId 
        // L’utilisateur qui fait la requête supprimer doit être celui qui a créé le Thing.
          if (thing.userId != req.auth.userId) {
              res.status(401).json({message: 'Utilisateur non autorisé'});
          } else {
            // userId est le bon
              const filename = thing.imageUrl.split('/images/')[1];
              //fs  = « file system » = système de fichiers
              // Donne accès aux fonctions qui permettent de modifier le système de fichiers
              fs.unlink(`images/${filename}`, () => {
                  Thing.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'image supprimée !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

/// Notre API peut désormais gérer correctement toutes les opérations CRUD contenant des fichiers






// exports.createThing = (req, res, next) => {
//   const thing = new Thing({
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId
//   });
//   thing.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Post saved successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };