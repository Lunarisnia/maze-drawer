export class Matrix {
    size: number
    matrix: Array<Array<number>>
    constructor(size: number) {
        this.size = size;
        this.matrix = Array.from(Array(this.size), _ => Array(this.size).fill(0));
    }

    set(x: number, y: number, value: number): void {
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
}
