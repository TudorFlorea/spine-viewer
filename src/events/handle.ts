import { HandleOptions } from "../interfaces";


export const handle = (options: HandleOptions) => {
	const { eventId, target = window, callback = () => { } } = options;
	if (!eventId)
		throw new Error("You are trying to dispatch an event without an event id");

	target.addEventListener(eventId, callback as EventListener);
};