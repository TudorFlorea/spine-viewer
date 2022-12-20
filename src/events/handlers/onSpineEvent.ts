import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onSpineEvent = (cb: HandleFunction<string>) => {

    const spineEventListener = (evt: CustomEvent<{ spineEventName: string }>) => {
        cb(evt.detail.spineEventName);
    };

    handle({
        eventId: IDENTIFIERS.SPINE_EVENT,
        callback: spineEventListener
    });

    return () => {
        remove({
            eventId: IDENTIFIERS.SPINE_EVENT,
            handler: spineEventListener
        });
    }
};