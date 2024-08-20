import {Matrix} from "./matrix.ts";
import Vector2 from "./vector2.ts";
import {clamp} from "./math-helper.ts";

export default class Brush {

    static paint(canvas: HTMLCanvasElement, mouse: MouseEvent, matrix: Matrix, mazeSize: number, pixelSize: number, brushColor: string) {
        const colorMap: {white: number, red: number, green: number, blue: number, black: number} = {
            "white": 1,
            "red": 2,
            "green": 3,
            "blue": 4,
            "black": 0,
        }
        const rectBound = canvas.getBoundingClientRect()
        const normalizedMousePosition: Vector2 = new Vector2(mouse.clientX - rectBound.left, mouse.clientY - rectBound.top);
        const x: number = clamp(Math.floor(normalizedMousePosition.x / pixelSize), 0, mazeSize - 1);
        const y: number = clamp(Math.floor(normalizedMousePosition.y / pixelSize), 0, mazeSize - 1);
        // @ts-ignore
        matrix.set(x, y, colorMap[brushColor]);
        matrix.dump();
    }
}
