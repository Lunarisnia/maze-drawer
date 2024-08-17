import {Matrix} from "./matrix.ts";
import Vector2 from "./vector2.ts";
import {clamp} from "./math-helper.ts";

export default class Brush {
    static paint(canvas: HTMLCanvasElement, mouse: MouseEvent, matrix: Matrix, mazeSize: number, pixelSize: number) {
        const rectBound = canvas.getBoundingClientRect()
        const normalizedMousePosition: Vector2 = new Vector2(mouse.x - rectBound.left, mouse.y - rectBound.top);
        const x: number = clamp(Math.floor(normalizedMousePosition.x / pixelSize), 0, mazeSize - 1);
        const y: number = clamp(Math.floor(normalizedMousePosition.y / pixelSize), 0, mazeSize - 1);
        matrix.set(x, y, 1);
        matrix.dump();
    }
}
