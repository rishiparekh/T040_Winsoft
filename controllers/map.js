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

exports.get_all_maps_brief_details = async(req, res) => {
    try{
        const map_brief_details = await Map.find({}, '_id title')
        return res.status(200).json({
            map_brief_details
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

exports.get_one_map = async(req, res) => {
    try{
        const map_details = await Map.findById(req.params.id)
        res.status(200).json({
            map_details
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

exports.add_map = async(req, res) => {
    try{
        const { title, map } = req.body
        const new_map = await new Map({
            title, 
            map
        }).save()
        res.status(200).json({
            map_details: new_map
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}
