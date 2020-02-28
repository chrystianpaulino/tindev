const axios = require('axios');
const Dev   = require('../models/Dev');
module.exports = {

    async index(req, res){

        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } }, // todos os usuarios que o id não seja o que tá passando (user logado) $ne = not equal
                { _id: { $nin: loggedDev.likes } }, // todos os likes do usuário, exclui todos os usuarios que o usuário logado já deu like $nin (not in)
                { _id: { $nin: loggedDev.dislikes } }, // todos os dislikes do usuário, exclui todos os usuarios que o usuário logado já deu dislike
            ],
        })
        return res.json(users);
    },

    async store(req, res){
        console.log(req.body.username);
        const { username } = req.body; /* Desestruturação: Que chave buscar de dentro do objeto */

        const userExists = await Dev.findOne({ user: username });

        if(userExists){
            return res.json(userExists);
        }
        try{
            const response = await axios.get(`https://api.github.com/users/${username}`);
            /* Await para aguardar a resposta que vai mandar, então deve definir a função como async */

            const {name, bio, avatar_url: avatar} = response.data;

            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            })

            console.log(response.data);
            // return res.json({ok: true});
            return res.json(dev);
        }catch(error){
            console.log(error);
            return 'error';
        }
    }
};