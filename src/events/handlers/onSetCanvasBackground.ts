import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";


export const onSetCanvasBackground = (cb: HandleFunction<string>) => {
    handle({
        eventId: IDENTIFIERS.SET_CANVAS_BACKGROUND,
        callback: (e: CustomEvent) => {
            cb(e.detail.canvasBackground);
        },
    });
};