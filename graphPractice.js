const Graph = require('./graphClass').Graph
const WeightedGraph = require('./graphClass').WeightedGraph
const PriorityQue = require('./graphClass').PriorityQueue


// const g = new Graph()

// g.addVertex('Tokyo')
// g.addVertex('San Franscico')
// g.addVertex('Cleveland')
// g.addVertex('New York')

// g.addEdge('Cleveland', 'New York')
// g.addEdge('Tokyo', 'San Franscico')
// g.addEdge('San Franscico', 'New York')
// g.removeEdge('Tokyo', 'San Franscico')
// g.removeVertex('Tokyo')


// console.log(g)

      // san fran <-> tokyo
      //    |
      // new york <-> cleveland






// g.addVertex("A")
// g.addVertex("B")
// g.addVertex("C")
// g.addVertex("D")
// g.addVertex("E")
// g.addVertex("F")


// g.addEdge("A", "B")
// g.addEdge("A", "C")
// g.addEdge("B","D")
// g.addEdge("C","E")
// g.addEdge("D","E")
// g.addEdge("D","F")
// g.addEdge("E","F")

// console.log(g)

// console.log('dfs recursive', g.depthFirstRecursive("A"))
// console.log('dfs itterative', g.depthFirstIterative("A"))
// console.log('bfs', g.breadthFirst('A'))


//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F

const wG = new WeightedGraph()

wG.addVertex('A')
wG.addVertex('B')
wG.addVertex('C')
wG.addVertex('D')
wG.addVertex('E')
wG.addVertex('F')

wG.addEdge('A', 'B', 4)
wG.addEdge('B', 'E', 3)
wG.addEdge('E', 'F', 1)
wG.addEdge('F', 'D', 1)
wG.addEdge('C', 'D', 2)
wG.addEdge('A', 'C', 2)
wG.addEdge('C', 'F', 4)

console.log(wG.Dijkstra('A', 'E'))
console.log(wG.Dijkstra('A','F'))

// console.log(JSON.stringify(wG, null, '\t'))