const mongoose = require('mongoose')
const Map = require('./models/map');
const map = require('./sample_map.json')

exports.dbInit = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/t040_winsoft", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
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