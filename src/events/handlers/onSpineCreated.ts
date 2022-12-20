import { SpineData } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onSpineCreated = (cb: HandleFunction<SpineData>) => {
	const spineCreatedListener = (evt: CustomEvent<{ spineData: SpineData }>) => {
		cb(evt.detail.spineData);
	};

	handle({
		eventId: IDENTIFIERS.SPINE_CREATED,
		callback: spineCreatedListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.SPINE_CREATED,
			handler: spineCreatedListener
		});
	}
};