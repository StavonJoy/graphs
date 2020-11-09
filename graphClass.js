//undirected graph unweighted
class Graph{
   constructor(){
      this.adjacencyList = {}
   }
   addVertex(vertex){
      if(this.adjacencyList[vertex]) return 'Already exists'
      this.adjacencyList[vertex] = []
   }
   addEdge(vertex1, vertex2){
      if(!this.adjacencyList[vertex1]) return `${vertex1} is ${undefined}`
      if(!this.adjacencyList[vertex2]) return `${vertex2} is ${undefined}`
      this.adjacencyList[vertex1].push(vertex2)
      this.adjacencyList[vertex2].push(vertex1)
   }
   removeEdge(vertex1, vertex2){
      if(!this.adjacencyList[vertex1]) return `${vertex1} is ${undefined}`
      if(!this.adjacencyList[vertex2]) return `${vertex2} is ${undefined}`
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter( v => v !== vertex2)
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter( v => v !== vertex1)
   }
   removeVertex(vertex){
      if(!this.adjacencyList[vertex]) return `${vertex} is ${undefined}`
      while(this.adjacencyList[vertex].length){
         const adjacencyVertex = this.adjacencyList[vertex].pop()
         this.removeEdge(vertex, adjacencyVertex)
      }
      delete this.adjacencyList[vertex]
   }

   depthFirstRecursive(startVertex){
      const result = []
      const visited = {}
      return this.dfsHelper(startVertex, visited, result)
   }
   dfsHelper(vertex, visited, result){
      visited[vertex] = true
      result.push(vertex)
      this.adjacencyList[vertex].forEach( neighbor => {
         if(!visited[neighbor]){
            this.dfsHelper(neighbor, visited, result)
         }
      })
      return result
   }
   



   depthFirstIterative(start){
      const stack = [start]; //first in last out
      const result = [];
      const visited = {};
      let currentVertex;
      visited[start] = true;

      while(stack.length){
         currentVertex = stack.pop();
         result.push(currentVertex);

         this.adjacencyList[currentVertex].forEach(neighbor => {
            if(!visited[neighbor]){
                  visited[neighbor] = true;
                  stack.push(neighbor)
            } 
         });
      }
      return result;
   }
   breadthFirst(start){
      const queue = [start]; //first in first out
      const result = [];
      const visited = {};
      let currentVertex;
      visited[start] = true;

      while(queue.length){
         currentVertex = queue.shift();
         result.push(currentVertex);
         
         this.adjacencyList[currentVertex].forEach(neighbor => {
            if(!visited[neighbor]){
               visited[neighbor] = true;
               queue.push(neighbor);
            }
         });
      }
      return result;
   }
}

class PriorityQueue {
  constructor(){
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({val, priority});
    this.sort();
  };
  dequeue() {
    return this.values.shift();
  };
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  };
}

class WeightedGraph {
   constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1,vertex2, weight){
        this.adjacencyList[vertex1].push({node:vertex2, weight});
        this.adjacencyList[vertex2].push({node:vertex1, weight});
    }
    Dijkstra(start, finish){
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [] //to return at end
        let smallest;
        //build up initial state
        for(let vertex in this.adjacencyList){
            if(vertex === start){
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        // as long as there is something to visit
        while(nodes.values.length){
            smallest = nodes.dequeue().val;
            if(smallest === finish){
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while(previous[smallest]){
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            } 
            if(smallest || distances[smallest] !== Infinity){
                for(let neighbor in this.adjacencyList[smallest]){
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if(candidate < distances[nextNeighbor]){
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        //updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();     
    }
}

var graph = new WeightedGraph()
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A","B", 4);
graph.addEdge("A","C", 2);
graph.addEdge("B","E", 3);
graph.addEdge("C","D", 2);
graph.addEdge("C","F", 4);
graph.addEdge("D","E", 3);
graph.addEdge("D","F", 1);
graph.addEdge("E","F", 1);


graph.Dijkstra("A", "E");

// ["A", "C", "D", "F", "E"]


module.exports = {
   Graph,
   WeightedGraph,
   PriorityQueue
}



