const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        console.log("Dislike");
        console.log("user: " + req.headers.user);
        console.log("Dislikado: " + req.params.devId);

        const { user }  = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({erro: 'Dev not exists'})
        }

        loggedDev.dislikes.push(targetDev._id); // adicionando o id do likado ao user que deu like
        await loggedDev.save();

        return res.json(loggedDev);
    }
};