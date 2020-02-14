const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//5 métodos gerais dos controllers 
//index, show, store, update, destroy

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;
        

        let dev = await Dev.findOne({ github_username });

        if(!dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            let { name = login, avatar_url, bio } = apiResponse.data;
        
            if(!name){
                name = apiResponse.data.login;
            }
        
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs:techsArray,
                location,
            })

        }
        
        return response.json(dev);
    },

    async show(request, response){
        const { github_username } = resquest.query;

        const dev = await Dev.findOne({ github_username });

        return response.json(dev);
    },

    async update(request, response){
        const { github_username, name, techs, latitude, longitude, bio, avatar_url } = request.body;
        

        const dev = await Dev.findOne({ github_username });

        console.log(dev);

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates:[longitude, latitude],
        }


        await oneDev.updateOne({
            name,
            techs:techsArray,
            bio,
            location
        });

        return response.json(oneDev);

    },

    async destroy(request, response){
        const { github_username } = request.body;
        const dev = await Dev.findOne({ github_username });
        
        await dev.deleteOne();

        return response.json({ destruido:[] });

    },
    
};