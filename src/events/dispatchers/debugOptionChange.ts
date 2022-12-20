import { DebugOption } from "../../interfaces";
import { dispatch } from "../dispatch";
import { IDENTIFIERS } from "../identifiers";

export const debugOptionChange = (debugOption: DebugOption) => {
	dispatch({
		eventId: IDENTIFIERS.DEBUG_OPTION_CHANGE,
		detail: {
			debugOption: debugOption
		},
	});
};