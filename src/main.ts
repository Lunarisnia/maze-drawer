import './style.css'
import {Matrix} from "./internal/matrix.ts";
import Vector2 from "./internal/vector2.ts";
import Brush from "./internal/brush.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="myCanvas" width="24" height="24" style="border:1px solid #000000;">
    </canvas>
  </div>
`

let mousePosition: Vector2 | null = null;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const mazeSize: number = 3;
const mat: Matrix = new Matrix(mazeSize)
let painting: boolean = false

async function main() {
    const canvas: HTMLCanvasElement | null = document.querySelector<HTMLCanvasElement>("#myCanvas")!;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    const rectBound = canvas.getBoundingClientRect()
    canvas.addEventListener('mousemove', (mouseEvent: MouseEvent): void => {
        mousePosition = new Vector2(mouseEvent.x, mouseEvent.y);
        if (painting) {
            Brush.paint(canvas, mouseEvent, mat, mazeSize, 8)
        }
    })
    canvas.addEventListener('mouseout', (_): void => {
        painting = false;
    });
    canvas.addEventListener('mousedown', (mouseEvent: MouseEvent): void => {
        Brush.paint(canvas, mouseEvent, mat, mazeSize, 8)
        painting = true;
    })
    canvas.addEventListener('mouseup', (_: MouseEvent): void => {
        painting = false;
    })
    // TODO: Figure out how to make the pencil brush that correspond to the right matrix coordinate
    while (true) {
        if (mousePosition) {
            const normalizedMousePosition: Vector2 = new Vector2(mousePosition!.x - rectBound.left, mousePosition!.y - rectBound.top);
            const x: number = Math.floor(normalizedMousePosition.x / 8);
            const y: number = Math.floor(normalizedMousePosition.y / 8);
            ctx.beginPath();
            ctx.rect(x*8, y*8, 8, 8);
            ctx.fillStyle = "black";
            ctx.fillText(`Coordinate: ${x}, ${y}`, canvas.width / 8, canvas.height / 9);
            ctx.fillText(`Mouse Coordinate: ${normalizedMousePosition.x}, ${normalizedMousePosition.y}`, canvas.width / 8, canvas.height / 3.5);
            ctx.fill()
        }
        await sleep(1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

main().then(r => r)

