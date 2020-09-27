const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Map = require('./models/map');
const User = require('./models/user');
const map = require('./sample_map.json');

exports.dbInit = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/t040_winsoft", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        const usersCount = await User.countDocuments()
        if(usersCount === 0){
            console.log("added sample user")
            const hash = await bcrypt.hash('1234', 10)
            await new User({
                username: 'indian army',
                password: hash
            }).save()
        }
        const count = await Map.countDocuments()
        if(count === 0){
            console.log("Seeded the database with sample map")
            await new Map({
                title: "Map 1",
                map
            }).save() // One database entry for a default map with title Map 1
        }
    }
    catch(error){
        console.log(error)
    }
}