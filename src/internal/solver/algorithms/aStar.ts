import Solver from "../base/solver-base.ts";

export class AStar extends Solver {
    solve(): Array<Array<number>> {
        // 1. Loop over every cell to give them weight
        // f = g + h
        // g = start - currentCell
        // h = end - currentCell
        // 2. Add the starting point to the heap
        // 3. Recurse over the heap by taking the smallest weight (index-0) and look at their neighbour (DFS)
        // 4. if their neighbour is not visited yet then add them to the heap
        // 5. repeat until the coordinate is equal to end
        // 6. if heap is out meaning there is no solution
        return [[]]
    }
}
