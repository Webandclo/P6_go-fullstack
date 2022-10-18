const mongoose = require('mongoose');
// Ajout du plugin au shema
// Améliore les messages d'erreur lors de l'enregistrement de données uniques.
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// On applique le validateur au shema avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

// On export le shema sous forme de modèle
module.exports = mongoose.model('User', userSchema);