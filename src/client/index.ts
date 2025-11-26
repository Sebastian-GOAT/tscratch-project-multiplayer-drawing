import { Engine, Square } from 'tscratch';
import getColorInput from './buttons.ts';
import connection from './multiplayer.ts';
import { drawingCanvasDetail, drawingCanvasSize, cellSize } from '../lib/canvasDetails.ts';
import pen from '../lib/pen.ts';
import type { UpdateEvent } from '../types/UpdateEvent.ts';

const engine = Engine.init();
engine.setMaxFramesPerSecond(20);

// Frame
new Square({
    sideLength: (cellSize + drawingCanvasSize) * 2,
    color: 'transparent',
    outlineWidth: 2
});

let r = 0;
let g = 0;
let b = 0;

// Game loop
engine.setLoop('main', () => {

    // Handle color input
    const color = getColorInput();
    if (color) {
        r = color.r;
        g = color.g;
        b = color.b;
        pen.color = `rgb(${r}, ${g}, ${b})`;
    }

    if (!engine.mouseDown) return;

    // Draw a dot
    const { mouseX, mouseY } = engine;

    if (Math.abs(mouseX) > drawingCanvasSize || Math.abs(mouseY) > drawingCanvasSize) return;

    // Snap
    const x = cellSize * Math.round(mouseX / cellSize);
    const y = cellSize * Math.round(mouseY / cellSize);

    pen.goTo(x, y);
    pen.dot();

    connection.broadcast<UpdateEvent>('update', {
        x: Math.round(x / cellSize) + drawingCanvasDetail / 2, // Make it positive (to store in a Uint8Array)
        y: Math.round(y / cellSize) + drawingCanvasDetail / 2, // Make it positive (to store in a Uint8Array)
        r, g, b
    });
});