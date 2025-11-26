import { canvas, Circle, Engine, type CircleOptions } from 'tscratch';

const engine = Engine.init();

// Changable
const radius = 20;
const padding = 5;
const gap = 10;

const leftX = -canvas.width / 2 + radius + padding;
const topY = canvas.height / 2 - radius - padding;

const options: CircleOptions = { outlineWidth: 2, radius: 20, x: leftX };

const white = new Circle({ ...options, color: 'white', y: topY - 0 * (2 * radius + gap) });
const gray = new Circle({ ...options, color: 'gray', y: topY - 1 * (2 * radius + gap) });
const black = new Circle({ ...options, color: 'black', y: topY - 2 * (2 * radius + gap) });
const red = new Circle({ ...options, color: 'red', y: topY - 3 * (2 * radius + gap) });
const orange = new Circle({ ...options, color: 'orange', y: topY - 4 * (2 * radius + gap) });
const yellow = new Circle({ ...options, color: 'yellow', y: topY - 5 * (2 * radius + gap) });
const green = new Circle({ ...options, color: 'green', y: topY - 6 * (2 * radius + gap) });
const cyan = new Circle({ ...options, color: 'cyan', y: topY - 7 * (2 * radius + gap) });
const blue = new Circle({ ...options, color: 'blue', y: topY - 8 * (2 * radius + gap) });
const magenta = new Circle({ ...options, color: 'magenta', y: topY - 9 * (2 * radius + gap) });

export default () => {
    if (engine.mouseDown) {
        if (engine.hovering(white)) return { r: 255, g: 255, b: 255 };
        if (engine.hovering(gray)) return { r: 128, g: 128, b: 128 };
        if (engine.hovering(black)) return { r: 0, g: 0, b: 0 };
        if (engine.hovering(red)) return { r: 255, g: 0, b: 0 };
        if (engine.hovering(orange)) return { r: 255, g: 165, b: 0 };
        if (engine.hovering(yellow)) return { r: 255, g: 255, b: 0 };
        if (engine.hovering(green)) return { r: 0, g: 255, b: 0 };
        if (engine.hovering(cyan)) return { r: 0, g: 255, b: 255 };
        if (engine.hovering(blue)) return { r: 0, g: 0, b: 255 };
        if (engine.hovering(magenta)) return { r: 255, g: 0, b: 255 };
    }
};