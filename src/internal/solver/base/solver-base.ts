import Vector2 from "../../vector2.ts";

export default abstract class Solver {
    maze: Array<Array<number>>
    start: Vector2 | null
    end: Vector2 | null
    constructor(maze: Array<Array<number>>, start: Vector2 | null, end: Vector2 | null) {
        this.maze = maze;
        this.start = start;
        this.end = end;
    }

    abstract solve(): Array<Array<number>>
}
