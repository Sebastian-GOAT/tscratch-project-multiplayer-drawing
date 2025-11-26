import { Multiplayer } from 'tscratch';
import { drawingCanvasDetail, cellSize } from '@/lib/canvasDetails.ts';
import pen from '@/lib/pen.ts';
import type { PixelArray } from '@/types/PixelArray.ts';
import type { UpdateEvent } from '@/types/UpdateEvent.ts';

// Multiplayer logic
const connection = Multiplayer.connect();
export default connection;

connection.on<PixelArray>('getPixels', data => {

    const tempColor = pen.color;
    
    const pixelData = data instanceof Uint8Array ? data : new Uint8Array(data);

    for (let i = 0; i < pixelData.length; i += 3) {

        const r = pixelData[i]!;
        const g = pixelData[i + 1]!;
        const b = pixelData[i + 2]!;

        const pixelIndex = i / 3;

        const x = cellSize * ((pixelIndex % drawingCanvasDetail) - drawingCanvasDetail / 2);
        const y = cellSize * (Math.floor(pixelIndex / drawingCanvasDetail) - drawingCanvasDetail / 2);

        pen.color = `rgb(${r}, ${g}, ${b})`;
        pen.goTo(x, y);
        pen.dot();
    }

    pen.color = tempColor;
});

connection.on<UpdateEvent>('update', event => {

    const { x, y, r, g, b } = event;

    const tempColor = pen.color;

    pen.color = `rgb(${r}, ${g}, ${b})`;
    pen.goTo(cellSize * (x - drawingCanvasDetail / 2), cellSize * (y - drawingCanvasDetail / 2));
    pen.dot();

    pen.color = tempColor;
});