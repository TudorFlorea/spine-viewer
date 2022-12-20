import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onTimelinePlay = (cb: HandleFunction<string[]>) => {

	const timelinePlayListener = (evt: CustomEvent<{ timeline: string[] }>) => {
		cb(evt.detail.timeline);
	};

	handle({
		eventId: IDENTIFIERS.TIMELINE_PLAY,
		callback: timelinePlayListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.TIMELINE_PLAY,
			handler: timelinePlayListener
		});
	}
};