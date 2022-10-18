const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');


// Importation du routeur (fichier déporté)
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const router = express.Router();

const app = express();


// Importation du fichier pour utiliser le modèle dans l'application
// const Thing = require('./models/Thing');
const Product = require('./models/Product');
const bodyParser = require('body-parser');

// Donne accès au CORS de la requette
app.use(express.json());


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

 


// Connexion de l'API à MongoDB Atlas
mongoose.connect('mongodb+srv://claudie:OpenClassRooms@cluster0.bsal5sf.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use(bodyParser.json());

// Logique importé et appliqué à la même route 
// Routes attendu par le frontend
// On enregistre les routeurs dans l'API
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;