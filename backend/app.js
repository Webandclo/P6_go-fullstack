const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');


// Importation du router (fichier déporté)
const stuffRoutes = require('./routes/stuff');

const router = express.Router();

const app = express();


// Importation du fichier pour utiliser le modèle dans l'application
// const Thing = require('./models/Thing');
const Product = require('./models/Product');
const bodyParser = require('body-parser');

// Donne accès au CORS de la requette
app.use(express.json());

// app.use((req, res, next) => {
//     console.log('Je suis là ;-)');
//     next();
//  });
app.use(helmet({
crossOrigineResourcePolicy: false,
}));

// Configuration de l'entete de la requete
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

 
// app.use((req, res, next) => {
//    res.status(201);
//    next();
// });

// Intercepté les requetes Post
// Créer une routes pour votre application
// Le front-end peut effectuer des appels vers l'application en toute sécurité.
// app.post('/api/stuff', (req, res, next) => {
//    console.log(req.body); // contenu du Corp de la requete
//    res.status(201).json({ // Donner une réponse sinon la requete plante
//      message: 'Objet créé !'
//    });
//  });


// app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue !!!' }); 
// });

// app.get('/api/stuff', (req, res, next) => {
//    const stuff = [
//       {
//       _id: '1234',
//       title: 'Mon titre',
//       description: 'Mes informations',
//       imageUrl: 'http',
//       price: 3900,
//       userid: 'userid'
//       },
//       {
//          _id: '12345',
//          title: 'Mon titre',
//          description: 'Mes informations',
//          imageUrl: 'http',
//          price: 4900,
//          userid: 'userid'
//          }
//    ];
//    res.status(200).json(stuff);
// })



// Connexion de l'API à MongoDB Atlas
mongoose.connect('mongodb+srv://claudie:OpenClassRooms@cluster0.bsal5sf.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use(bodyParser.json());

// Logique importé et appliqué à la même route
app.use('/api/stuff', stuffRoutes)



//// EXERCICE QUIZ 2 ////


// Implémentation de la route GET
app.get('/api/products/', (req, res, next) => {
  Product.find()  // Retourne tous les modèles Things 
    .then(products => res.status(200).json(products)) // Renvoie un tableau contenant tous les Things
    .catch(error => res.status(400).json({ error })); // Renvoie un tableau d'erreur
});

// Implémentation de la route POST
app.get('/api/products/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // findOne = Trouver un seule object
                                        // Route dynamique, accessible en tant que paramètre 
    .then(product => res.status(200).json(product))
    .catch(error => res.status(404).json({ error })); // Renvoie un tableau d'erreur au front-end
});

 // Création d'un objet existant avec le route POST
 app.post('/api/products/', (req, res, next) => {

  // Création du formulaire de la sauce dans l'objet 'sauce'
  const product = new Product({
    ...req.body,
  });

  product.save()
    .then((product) => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error })); // Renvoie un tableau d'erreur au front-end
});

 // Modification d'un objet existant avec le route PUT
 app.put('/api/products/:id', (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error })); // Renvoie un tableau d'erreur au front-end
});

// Suppression d'un Thing avec le route delete
app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;