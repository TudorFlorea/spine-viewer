import { dispatch } from "../dispatch";
import { IDENTIFIERS } from "../identifiers";

export const setCanvasBackground = (canvasBackground: string) => {
    dispatch({
        eventId: IDENTIFIERS.SET_CANVAS_BACKGROUND,
        detail: {
            canvasBackground,
        },
    });
};