exports.minimum_edges_possible_BFS = (map, u, v) => {
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