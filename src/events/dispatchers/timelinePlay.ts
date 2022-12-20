import { dispatch } from "../dispatch"
import { IDENTIFIERS } from "../identifiers"


export const timelinePlay = (timeline: string[]) => {
	dispatch({
		eventId: IDENTIFIERS.TIMELINE_PLAY,
		detail: {
			timeline,
		},
	});
};