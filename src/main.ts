import './style.css'
import PixelCanvas from "./internal/pixel-canvas.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="myCanvas" width="24" height="24" style="border:1px solid #000000;">
    </canvas>
  </div>
`

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const mazeSize: number = 32;

async function main() {
    const pixelCanvas: PixelCanvas = new PixelCanvas(mazeSize, 16);
    while (true) {
        pixelCanvas.render();
        pixelCanvas.brushHighlight();
        await sleep(1);
        pixelCanvas.clearCanvas();
    }
}

main().then(r => r)

