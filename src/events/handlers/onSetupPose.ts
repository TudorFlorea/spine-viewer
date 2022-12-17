import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onSetupPose = (cb: HandleFunction<void>) => {
	handle({
		eventId: IDENTIFIERS.SETUP_POSE,
		callback: () => {
			cb();
		},
	});
};