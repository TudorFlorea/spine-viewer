import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onTimelinePlay = (cb: HandleFunction<string[]>) => {
	handle({
		eventId: IDENTIFIERS.TIMELINE_PLAY,
		callback: (e: CustomEvent) => {
			cb(e.detail.timeline);
		},
	});
};