const { minimum_edges_possible_BFS } = require('../utils/map');

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
        res.status(500).json("Something went wrong")
    }
}
