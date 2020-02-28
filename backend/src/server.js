const express  = require('express'); // função que quando chamada cria um novo servidor. Porta de entrada para receber requisições e retornar respostas
const routes   = require('./routes');
const mongoose = require('mongoose');
const cors     = require('cors');

const app     = express();
const server  = require('http').Server(app); // servidor com http extrair o servidor http do express para unir ele com um servidor ws wehsocket
const io      = require('socket.io')(server); // retorna uma funão q recebe um servidor http

const connectedUsers = {};

io.on('connection', socket => {
    // toda vez que alguem se conectar pelo protocolo websocket, vai receber o socket, permitindo a transiçao de msg entre back e front
    // para todo usuario que se conecta, tem que armazenar o ID do usuario e a relação dele com o ID de socket  assim sabe que socket ta o usuario

    console.log('connection back and', socket.id);
    const {user} = socket.handshake.query;
    connectedUsers[user] = socket.id;
    console.log(user, socket.id);

    // TESTES
    // console.log('Nova Conexão', socket.id); // todo socket q se conecta, tem um id, serve pra saber qual usuario quer enviar msg entre back e front
    // // aqui ta ouvindo, entao quando receber uma mensagem do tipo hello
    // socket.on('hello', message => {
    //     console.log(message);
    // });
    // setTimeout(() => {
    //     socket.emit('word', {
    //         message: 'OmniStack'
    //     });
    // }, 5000);
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-tmuvw.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// middlwere para o controler ter acesso as informaçoes aqui, no caso o user: socket.id
app.use((req, res, next) => {
    req.io              = io;
    req.connectedUsers  = connectedUsers; // quais usuarios estao conectatos para dentro do controller
    
    return next();
})

app.use(cors());
app.use(express.json()); // para informar que as requisições irão vir json
app.use(routes);

server.listen(3333);