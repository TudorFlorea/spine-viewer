import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onSetupPose = (cb: HandleFunction<void>) => {

	const setupPoseListener = (_: CustomEvent<void>) => {
		cb();
	};

	handle({
		eventId: IDENTIFIERS.SETUP_POSE,
		callback: setupPoseListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.SETUP_POSE,
			handler: setupPoseListener
		});
	}
};