import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";


export const onSetCanvasBackground = (cb: HandleFunction<string>) => {

    const setCanvasBackgroundListener = (evt: CustomEvent<{ canvasBackground: string }>) => {
        cb(evt.detail.canvasBackground);
    };

    handle({
        eventId: IDENTIFIERS.SET_CANVAS_BACKGROUND,
        callback: setCanvasBackgroundListener
    });

    return () => {
        remove({
            eventId: IDENTIFIERS.SET_CANVAS_BACKGROUND,
            handler: setCanvasBackgroundListener
        });
    }
};