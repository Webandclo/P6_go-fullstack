const http = require('http');
const app = require('./app');

// const server = http.createServer((req, res) => {
//     res.end('Coucou ! Voilà la réponse du serveur !');
// });


app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);