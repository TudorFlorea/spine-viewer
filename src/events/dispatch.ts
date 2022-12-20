import { DispatchOptions } from "../interfaces";

export const dispatch = <T>(options: DispatchOptions<T>) => {
	const { eventId, target = window, detail = {} } = options;
	console.log(options);
	if (!eventId)
		throw new Error("You are trying to dispach an event withou an event id");
	const event = new CustomEvent(eventId, {
		detail,
	});
	target.dispatchEvent(event);
};

