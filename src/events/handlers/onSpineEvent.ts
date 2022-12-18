import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onSpineEvent = (cb: HandleFunction<string>) => {
    handle({
        eventId: IDENTIFIERS.SPINE_EVENT,
        callback: (e: CustomEvent) => {
            cb(e.detail.spineEventName);
        },
    });
};