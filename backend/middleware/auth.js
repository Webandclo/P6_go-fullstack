const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    // récupérer le token
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       // et le transmètre aux routes par la suite
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

// Extraire les informations contenues dans le token
// vérifier que le token est valide
// Et les transmètre aux autres middleware ou gestionnaire de routes