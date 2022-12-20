import { DebugOption } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onDebugOptionChange = (cb: HandleFunction<DebugOption>) => {

	const debugOptionsChangeListener = (evt: CustomEvent<{ debugOption: DebugOption }>) => {
		cb(evt.detail.debugOption);
	};

	handle({
		eventId: IDENTIFIERS.DEBUG_OPTION_CHANGE,
		callback: debugOptionsChangeListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.DEBUG_OPTION_CHANGE,
			handler: debugOptionsChangeListener
		});
	}
};