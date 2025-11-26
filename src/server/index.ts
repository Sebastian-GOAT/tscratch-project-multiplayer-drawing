import { Server } from 'tscratch/server';
import { drawingCanvasDetail } from '@/lib/canvasDetails.ts';
import type { PixelArray } from '@/types/PixelArray.ts';
import type { UpdateEvent } from '@/types/UpdateEvent.ts';

// Server
const server = new Server({ port: 3000 });
console.log(`Server is running on port ${server.port}`);

// Server-side pixels array
const pixels = new Uint8Array(drawingCanvasDetail ** 2 * 3);
pixels.fill(255);

// On join
server.onJoin(client => {
    console.log(`Client joined: ${client.id}`);
    server.broadcast<PixelArray>('getPixels', pixels, [client]);
});

// On update
server.on<UpdateEvent>('update', (event, client) => {

    const { x, y, r, g, b } = event;

    // Quick server-side validation
    if (
        x < 0 || x >= drawingCanvasDetail ||
        y < 0 || y >= drawingCanvasDetail ||
        r > 255 || g > 255 || b > 255 ||
        r < 0 || g < 0 || b < 0
    ) return;

    const i = (y * drawingCanvasDetail + x) * 3;

    pixels[i] = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;

    server.broadcastExcept<UpdateEvent>('update', event, [client]);
});