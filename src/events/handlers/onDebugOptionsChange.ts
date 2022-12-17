import { DebugOption } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onDebugOptionChange = (cb: HandleFunction<DebugOption>) => {
	handle({
		eventId: IDENTIFIERS.DEBUG_OPTION_CHANGE,
		callback: (e: CustomEvent) => {
			cb(e.detail.debugOption);
		},
	});
};