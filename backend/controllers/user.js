const bcrypt = require('bcrypt');

const User = require('../models/User');

// Middleware pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    // hacher le mdp des utilisateurs pour les enregistrer de manière sécurisée dans la BDD
    // méthode  hash() 
    bcrupt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
          });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'})) // création de ressources
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); // erreur 500 = erreur server
};

// Middleware pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => { // si la requette c'est bien passée 
                                // > si l'utilisateur à été trouvé
                    if (!valid) { // MDP invalide
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    } else { // MDP valide
                        res.status(200).json({
                            userId: user._id,
                            token: 'TOKEN'
                        });
                    }
                    
                })
                .catch(error => res.status(500).json({ error })); // erreur 500 = erreur server
        })
        .catch(error => res.status(500).json({ error }));
 };