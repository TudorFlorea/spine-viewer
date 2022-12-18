import { dispatch } from "../dispatch";
import { IDENTIFIERS } from "../identifiers";

export const spineEvent = (spineEventName: string) => {
    dispatch({
        eventId: IDENTIFIERS.SPINE_EVENT,
        detail: {
            spineEventName,
        },
    });
};