import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onSpineEvent = (cb: HandleFunction<string>) => {
    console.log(Date.now())
    handle({
        eventId: IDENTIFIERS.SPINE_EVENT,
        callback: (e: CustomEvent) => {
            cb(e.detail.spineEventName);
        },
    });
};