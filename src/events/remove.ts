import { RemoveOptions } from "../interfaces";


export const remove = (options: RemoveOptions) => {
    const { eventId, target = window, handler } = options;
    if (!eventId) {
        throw new Error("You are trying to dispatch an event without an event id");
    }

    target.removeEventListener(eventId, handler as EventListenerOrEventListenerObject);
};