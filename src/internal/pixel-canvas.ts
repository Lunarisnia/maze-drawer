import Vector2 from "./vector2.ts";
import Brush from "./brush.ts";
import {Matrix} from "./matrix.ts";

export default class PixelCanvas {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement
    rectBound: DOMRect
    mousePosition: Vector2 | null = null;
    mazeSize: number;
matrix: Matrix;

    brushSize: number = 8;
    painting: boolean = false
    brush: Brush
    brushColor: string
    constructor(mazeSize: number, brushSize: number) {
        this.canvas = document.querySelector<HTMLCanvasElement>("#myCanvas")!;
        this.canvas.height = brushSize * mazeSize;
        this.canvas.width = brushSize * mazeSize;

        this.ctx = this.canvas.getContext('2d')!;
        this.rectBound = this.canvas.getBoundingClientRect();
        this.brush = new Brush();
        this.mazeSize = mazeSize;
        this.matrix = new Matrix(mazeSize);
        this.brushSize = brushSize;
        this.brushColor = "white"

        /// DELETE
        this.matrix.matrix = [
            [
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1
            ],
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            [
                0,
                0,
                1,
                0,
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0
            ],
            [
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                1,
                1,
                0,
                1,
                0,
                0,
                1,
                1,
                0
            ],
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                1,
                0,
                0
            ],
            [
                0,
                0,
                1,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
                1,
                0,
                1,
                0
            ],
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                1,
                1
            ],
            [
                1,
                0,
                1,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                1,
                0
            ],
            [
                1,
                0,
                1,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                2,
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                1,
                0
            ],
            [
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                1
            ],
            [
                0,
                0,
                1,
                0,
                1,
                0,
                0,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0
            ],
            [
                0,
                1,
                1,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0
            ],
            [
                0,
                0,
                1,
                0,
                1,
                1,
                1,
                1,
                1,
                0,
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                0,
                1,
                1
            ],
            [
                0,
                1,
                1,
                1,
                1,
                0,
                1,
                0,
                1,
                0,
                0,
                1,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0
            ],
            [
                1,
                1,
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                1,
                1,
                0,
                3,
                0,
                1,
                1,
                1,
                0,
                1,
                1
            ],
            [
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                0,
                0,
                0,
                1,
                0,
                1,
                0,
                1,
                1,
                1,
                0
            ],
            [
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                0,
                0,
                1,
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                0
            ],
            [
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                1,
                1,
                1,
                0,
                0,
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                0
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
                1,
                1,
                1
            ],
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                1,
                0,
                1
            ]
        ];
        this.matrix.scan()

        this.canvas.addEventListener('mousemove', (mouseEvent: MouseEvent): void => {
            this.mousePosition = new Vector2(mouseEvent.clientX, mouseEvent.clientY);
            if (this.painting && (this.brushColor == "white" || this.brushColor == "black")) {
                Brush.paint(this.canvas, mouseEvent, this.matrix, this.mazeSize, this.brushSize, this.brushColor)
            }
        })
        this.canvas.addEventListener('mouseout', (): void => {
            this.mousePosition = null
            this.painting = false;
        });
        this.canvas.addEventListener('mousedown', (mouseEvent: MouseEvent): void => {
            Brush.paint(this.canvas, mouseEvent, this.matrix, this.mazeSize, this.brushSize, this.brushColor)
            this.painting = true;
        })
        this.canvas.addEventListener('mouseup', (_: MouseEvent): void => {
            this.painting = false;
        })
    }

    brushHighlight(): void {
        if (this.mousePosition) {
            const normalizedMousePosition: Vector2 = new Vector2(this.mousePosition!.x - this.rectBound.left, this.mousePosition!.y - this.rectBound.top);
            const x: number = Math.floor(normalizedMousePosition.x / this.brushSize);
            const y: number = Math.floor(normalizedMousePosition.y / this.brushSize);
            this.ctx.beginPath();
            this.ctx.rect(x*this.brushSize, y*this.brushSize, this.brushSize, this.brushSize);
            this.ctx.fillStyle = this.brushColor;
            // this.ctx.fillText(`Coordinate: ${x}, ${y}`, this.canvas.width / 8, this.canvas.height / 9);
            // this.ctx.fillText(`Mouse Coordinate: ${normalizedMousePosition.x}, ${normalizedMousePosition.y}`, this.canvas.width / 8, this.canvas.height / 3.5);
            this.ctx.fill()
        }
    }

    render(): void {
        for(let i = 0; i < this.matrix.matrix.length; i++) {
            for (let j = 0; j < this.matrix.matrix[i].length; j++) {
                this.ctx.beginPath();
                this.ctx.rect(j*this.brushSize, i*this.brushSize, this.brushSize, this.brushSize);
                if (this.matrix.matrix[i][j] == 0) {
                    this.ctx.fillStyle = "black";
                } else {
                    this.ctx.fillStyle = "white";
                }
                switch (this.matrix.matrix[i][j]) {
                    case 1:
                        this.ctx.fillStyle = "white";
                        break;
                    case 2:
                        this.ctx.fillStyle = "red";
                        break;
                    case 3:
                        this.ctx.fillStyle = "green";
                        break;
                    case 4:
                        this.ctx.fillStyle = "blue";
                        break;
                    default:
                        this.ctx.fillStyle = "black";
                }
                if (this.matrix.start && this.matrix.start.x == j && this.matrix.start.y == i) {
                    this.ctx.fillStyle = "red";
                }
                if (this.matrix.end && this.matrix.end.x == j && this.matrix.end.y == i) {
                    this.ctx.fillStyle = "green";
                }
                // this.ctx.fillText(`Coordinate: ${x}, ${y}`, this.canvas.width / 8, this.canvas.height / 9);
                // this.ctx.fillText(`Mouse Coordinate: ${normalizedMousePosition.x}, ${normalizedMousePosition.y}`, this.canvas.width / 8, this.canvas.height / 3.5);
                this.ctx.fill()
            }
        }
    }

    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    changeBrushColor(brushColor: string): void {
        this.brushColor = brushColor;
    }

    reset(): void {
        this.matrix.clear()
    }
}
