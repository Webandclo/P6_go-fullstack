// Importation de Mongoose
const mongoose = require('mongoose');

// Methode Shema > créer un shema de données pour la base MongoDB.
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});

module.exports = mongoose.model('Product', productSchema);

// Méthode model > transforme ce modèle en un modèle utilisable. 

