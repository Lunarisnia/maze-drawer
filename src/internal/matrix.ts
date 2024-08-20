import Vector2 from "./vector2.ts";

export class Matrix {
    size: number
    matrix: Array<Array<number>>
    start: Vector2 | null = null
    end: Vector2 | null = null
    constructor(size: number) {
        this.size = size;
        this.matrix = Array.from(Array(this.size), _ => Array(this.size).fill(0));
    }

    set(x: number, y: number, value: number): void {
        if (value != 1) {
            if (this.start && this.start.x != x && this.start.y != y && value == 2) {
                this.matrix[this.start.y][this.start.x] = 0
            }
            if (this.end && this.end.x != x && this.end.y != y && value == 3) {
                this.matrix[this.end.y][this.end.x] = 0
            }
            if (value == 2) {
                this.start = new Vector2(x, y)
            }
            if (value == 3) {
                this.end = new Vector2(x, y)
            }
        }
        this.matrix[y][x] = value;
    }

    dump(): void {
        let matText: string = "";
        for (const rows of this.matrix) {
            for (const col of rows) {
                matText += col + " ";
            }
            matText += "\n";
        }
        console.log(matText)
    }

    clear(): void {
        this.matrix = Array.from(Array(this.size), _ => Array(this.size).fill(0));
    }
}
