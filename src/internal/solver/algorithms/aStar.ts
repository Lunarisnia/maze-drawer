import Solver from "../base/solver-base.ts";
import Vector2 from "../../vector2.ts";
import {MinHeap, Weight} from "../../min-heap.ts";


function createWeightedWorld(size: number): Array<Array<Weight>> {
    const rows: Weight[][] = [];
    for (let i = 0; i < size; i++) {
        const row: Weight[] = [];
        for (let j = 0; j < size; j++) {
            row.push(new Weight(null,0, 0, 0, false, new Vector2(j, i)))
        }
        rows.push(row)
    }

    return rows
}

function createBooleanMatrix(size: number): Array<Array<boolean>> {
    const rows: boolean[][] = [];
    for (let i = 0; i < size; i++) {
        const row: boolean[] = [];
        for (let j = 0; j < size; j++) {
            row.push(false)
        }
        rows.push(row)
    }

    return rows
}

function isValidPoint(x: number, y: number, size: number): boolean {
    return x >= 0 && x < size && y >= 0 && y < size;
}

export class AStar extends Solver {
    solve(): [Array<Array<number>>, boolean] {
        if (!this.start || !this.end) {
            return [this.maze, true]
        }
        // 1. Loop over every cell to give them weight
        // f = g + h
        // g = start - currentCell
        // h = end - currentCell
        const weightedWorld: Array<Array<Weight>> = createWeightedWorld(this.maze.length)
        for (let i = 0; i < weightedWorld.length; i++) {
            for (let j = 0; j < weightedWorld.length; j++) {
                weightedWorld[i][j].startCost = this.start!.subtract(new Vector2(j, i)).length()
                weightedWorld[i][j].endCost = this.end!.subtract(new Vector2(j, i)).length()
                weightedWorld[i][j].finalCost = weightedWorld[i][j].startCost + weightedWorld[i][j].endCost
                weightedWorld[i][j].passable = this.maze[i][j] != 0
            }
        }
        // 2. Add the starting point to the heap
        const visited: Array<Array<boolean>> = createBooleanMatrix(this.maze.length)
        const minHeap: MinHeap = new MinHeap();
        const direction: number[][] = [
            [-1, 0], // Up
            [1, 0], // Down
            [0, -1], // Left
            [0, 1], // Right
        ]
        minHeap.insert(weightedWorld[this.start!.y][this.start!.x])
        let endNode: Weight | null = null;
        const calculatePath = (weight: Weight) => {
            visited[weight.position.y][weight.position.x] = true
            this.maze[weight.position.y][weight.position.x] = 4
            if (weight.position.x == this.end!.x && weight.position.y == this.end!.y) {
                endNode = weight;
                return
            }

            for (const dir of direction) {
                const x: number = weight.position.x + dir[1]
                const y: number = weight.position.y + dir[0]

                if (isValidPoint(x, y, this.maze.length) && !visited[y][x]) {
                    const w = weightedWorld[y][x]
                    if (w.passable) {
                        w.parent = weight
                        minHeap.insert(w)
                    }
                }
            }

            if (minHeap.size() > 0) {
                calculatePath(minHeap.extractMin()!)
            } else {
                return
            }
        }
        calculatePath(minHeap.extractMin()!)

        if (!endNode) {
            return [this.maze, true]
        }
        this.pixelCanvas.matrix.reset();
        const safePath: Vector2[] = [];
        const getSafePath = (node: Weight | null) => {
            if (!node) {
                return
            }

            safePath.push(node.position)
            getSafePath(node.parent);
        }
        getSafePath(endNode)

        for (let i = safePath.length - 1; i >= 0; i--) {
            const path = safePath[i];
            this.maze[path.y][path.x] = 4
        }
        // minHeap.remove()
        // 3. Recurse over the heap by taking the smallest weight (index-0) and look at their neighbour (DFS)
        // 4. if their neighbour is not visited yet then add them to the heap
        // 5. repeat until the coordinate is equal to end
        // 6. if heap is out meaning there is no solution
        return [this.maze, false]
    }
}
