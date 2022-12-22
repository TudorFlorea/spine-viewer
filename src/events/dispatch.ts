import { DispatchOptions } from "../interfaces";

export const dispatch = <T>(options: DispatchOptions<T>) => {
	const { eventId, target = window, detail = {} } = options;
	if (!eventId)
		throw new Error("You are trying to dispatch an event without an event id");
	const event = new CustomEvent(eventId, {
		detail,
	});
	target.dispatchEvent(event);
};

