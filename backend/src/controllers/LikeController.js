const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        console.log("user: " + req.headers.user);
        console.log("likado: " + req.params.devId);
        console.log('mid do io: ' + req.io, req.connectedUsers);

        const { user }  = req.headers;  //id
        const { devId } = req.params;   //id

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({erro: 'Dev not exists'})
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log("Deu Match!");
            // buscar conexão de socket ativa do cara q deu like e que recebeu like
            const loggedSocket  = req.connectedUsers[user];  // logadp
            const targetSocket  = req.connectedUsers[devId]; // likado

            if(loggedSocket){
                // avisando ao usuario logado que deu match em targetDev emite com chave 'match' passando o targetDev
                req.io.to(loggedSocket).emit('match', targetDev); //req.io vem do mid to é para quem vai enviar
                console.log('targetDev' + targetDev);
            }

            if(targetSocket){
                // avisando ao usuario logado que deu match em loggedDev emite com chave 'match' passando o loggedDev
                req.io.to(targetSocket).emit('match', loggedDev);
                console.log('loggedDev' + loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id); // adicionando o id do likado ao user que deu like
        await loggedDev.save();

        return res.json(loggedDev);
    }
};