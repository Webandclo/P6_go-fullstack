const express = require('express'); 
const app = express();

const mongoose = require('mongoose');

// Donne accès au CORS de la requette
app.use(express.json());

// app.use((req, res, next) => {
//     console.log('Je suis là ;-)');
//     next();
//  });

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Origin','Origin');
   res.setHeader('Access-Control-Allow-Origin','GET, POST, PUT DELETE, PATCH, OPTIONS');
   next();
});
 
// app.use((req, res, next) => {
//    res.status(201);
//    next();
// });

// Intercepté les requetes Post
// Créer une routes pour votre application
// Le front-end peut effectuer des appels vers l'application en toute sécurité.
app.post('/api/stuff', (req, res, next) => {
   console.log(req.body); // contenu du Corp de la requete
   res.status(201).json({ // Donner une réponse sinon la requete plante
     message: 'Objet créé !'
   });
 });


// app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue !!!' }); 
// });

app.get('/api/stuff', (req, res, next) => {
   const stuff = [
      {
      _id: '1234',
      title: 'Mon titre',
      description: 'Mes informations',
      imageUrl: 'http',
      price: 4900,
      userid: 'userid'
      },
      {
         _id: '12345',
         title: 'Mon titre',
         description: 'Mes informations',
         imageUrl: 'http',
         price: 4900,
         userid: 'userid'
         }
   ];
   res.status(200).json(stuff);
})

module.exports = app;

// Connexion de l'API à MongoDB Atlas
mongoose.connect('mongodb+srv://claudie:OpenClassRooms@cluster0.bsal5sf.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Importation du fichier pour utiliser le modèle dans l'application
  const Thing = require('./models/thing');

// Création d'une instance du modèle Thing
  app.post('/api/stuff', (req, res, next) => {
   delete req.body._id;
   const thing = new Thing({
     ...req.body
   });
   thing.save() // Enregistre dans le BD > Envoie une Promise
     .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // Réponse de réussite
     .catch(error => res.status(400).json({ error })); // Réponse de l'erreur générée par Mongoose
 });


 // Implémentation de la route GET
 app.use('/api/stuff', (req, res, next) => {
   Thing.find()  // Retourne tous les modèles Things 
     .then(things => res.status(200).json(things)) // Renvoie un tableau contenant tous les Things
     .catch(error => res.status(400).json({ error })); // Renvoie un tableau d'erreur
 });

// Implémentation de la route POST
 app.get('/api/stuff/:id', (req, res, next) => {
   Thing.findOne({ _id: req.params.id }) // findOne = Trouver un seule object
                                         // Route dynamique, accessible en tant que paramètre 
     .then(thing => res.status(200).json(thing))
     .catch(error => res.status(404).json({ error })); // Renvoie un tableau d'erreur au front-end
 });

 // Modification d'un objet existant avec le route PUT
 app.put('/api/stuff/:id', (req, res, next) => {
   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
     .catch(error => res.status(400).json({ error })); // Renvoie un tableau d'erreur au front-end
 });

 // Suppression d'un Thing avec le route delete
 app.delete('/api/stuff/:id', (req, res, next) => {
   Thing.deleteOne({ _id: req.params.id })
     .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
     .catch(error => res.status(400).json({ error }));
 });