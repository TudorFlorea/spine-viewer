import { dispatch } from "../dispatch";
import { IDENTIFIERS } from "../identifiers";


export const skinChange = (skin: string) => {
	dispatch({
		eventId: IDENTIFIERS.SKIN_CHANGE,
		detail: {
			skin,
		},
	});
};