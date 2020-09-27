const { minimum_edges_possible_BFS } = require('../utils/map');
const Map = require('../models/map');

exports.get_desired_location = (req, res) => {
    try{
        const { map, enemies } = req.body

        let min_edges = Number.POSITIVE_INFINITY
        let desired_location = null

        for(let location in map){
            if(map[location].enemy){
                continue
            }
            let total_edges = 0
            for(enemy of enemies){
                total_edges += minimum_edges_possible_BFS(map, location, enemy)
            }
            if(total_edges < min_edges){
                min_edges = total_edges
                desired_location = location
            }
        }
        
        res.status(200).json({
            desired_location
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

exports.get_map = async(req, res) => {
    try{
        const map_details = await Map.findOne().sort({created_at: 1})
        console.log(map_details)
        res.status(200).json({
            map_details
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}