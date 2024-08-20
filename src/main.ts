import './style.css'
import PixelCanvas from "./internal/pixel-canvas.ts";
import BrushButton from "./components/brush_button.ts";
import Solver from "./internal/solver/base/solver-base.ts";
import {AStar} from "./internal/solver/algorithms/aStar.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h2>
    Maze Solver
  </h2>
  <span>Draw your own maze and the magic algorithm will try and solve it.</span>
  <div>
    <canvas id="myCanvas" width="24" height="24" style="border:1px solid #000000;">
    </canvas>
  </div>
  <p>Change Brush</p>
  ${BrushButton("RedBrush", "🟥 Maze Starting Point")}
  ${BrushButton("GreenBrush", "🟩 Maze Ending Point")}
  ${BrushButton("WhiteBrush", "⬜ Maze Path")}
  ${BrushButton("BlackBrush", "Black Wall")}
  <div>
    <br>
    <br>
    <button id="resetButton">Reset</button>
    <button id="solveButton">Solve</button>
  </div>
`

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const mazeSize: number = 20;

async function main() {
    const pixelCanvas: PixelCanvas = new PixelCanvas(mazeSize, 16);
    document.getElementById('RedBrush')!.addEventListener('click', () => {
        pixelCanvas.changeBrushColor("red")
    })
    document.getElementById('WhiteBrush')!.addEventListener('click', () => {
        pixelCanvas.changeBrushColor("white")
    })
    document.getElementById('GreenBrush')!.addEventListener('click', () => {
        pixelCanvas.changeBrushColor("green")
    })
    document.getElementById('BlackBrush')!.addEventListener('click', () => {
        pixelCanvas.changeBrushColor("black")
    })
    document.getElementById('resetButton')!.addEventListener('click', () => {
        pixelCanvas.reset()
    })
    document.getElementById('solveButton')!.addEventListener('click', () => {
        // console.log(pixelCanvas.matrix.matrix)
        const solver: Solver = new AStar(pixelCanvas.matrix.matrix, pixelCanvas.matrix.start, pixelCanvas.matrix.end)
        pixelCanvas.matrix.reset()
        const [solution, unsolvable] = solver.solve()
        pixelCanvas.matrix.matrix = solution
        if (unsolvable) {
            console.log("unsolveable")
        }
        pixelCanvas.matrix.dump()
    })
    while (true) {
        pixelCanvas.render();
        pixelCanvas.brushHighlight();
        await sleep(1);
        pixelCanvas.clearCanvas();
    }
}

main().then(r => r)

