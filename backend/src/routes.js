const express   = require('express');
const routes    = express.Router();

const DevController     = require('./controllers/DevController'); // Importar Controller
const LikeController    = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');


// routes.get('/', (req, res) => {
//     return res.json({message: `Olá ${req.query.name}`});
// });

routes.post('/devs'                , DevController.store);
routes.post('/devs/:devId/likes'   , LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);
routes.get('/devs'                 , DevController.index);

// exportar para o servidor conhecer nossas rotas: module.exports = (nome variavel que quer expor)
module.exports = routes; 