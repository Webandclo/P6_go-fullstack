// Importation de Mongoose
const mongoose = require('mongoose');

// Methode Shema > créer un shema de données pour la base MongoDB.
const thingSchema = mongoose.Schema({
    title: { type : String, require: true},
    description: { type : String, require: true},
    imageUrl: { type : String, require: true},
    userId: { type : String, require: true},
    price: { type : Number, require: true},
});

module.exports = mongoose.model('Thing', thingSchema);

// Méthode model > transforme ce modèle en un modèle utilisable. 