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

const minimum_edges_possible_BFS = (map, u, v) => {
    let visited = {}
    let distance = {}
    let queue = []
    distance[u] = 0
    queue.push(u)
    visited[u] = true
    while(queue.length !== 0){
        let popped_element = queue.shift()
        for(node of map[popped_element].neighbours){
            if(visited[node]){
                continue
            }
            distance[node] = distance[popped_element] + 1
            queue.push(node)
            visited[node] = true
        }
    }
    return distance[v]
}