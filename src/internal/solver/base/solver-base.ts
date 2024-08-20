import Vector2 from "../../vector2.ts";
import PixelCanvas from "../../pixel-canvas.ts";

export default abstract class Solver {
    maze: Array<Array<number>>
    start: Vector2 | null
    end: Vector2 | null
    pixelCanvas: PixelCanvas
    constructor(maze: Array<Array<number>>, start: Vector2 | null, end: Vector2 | null, pixelCanvas: PixelCanvas) {
        this.maze = maze;
        this.start = start;
        this.end = end;
        this.pixelCanvas = pixelCanvas;
    }

    abstract solve(): [Array<Array<number>>, boolean]
}
