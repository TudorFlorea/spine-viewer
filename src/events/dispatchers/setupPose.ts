import { dispatch } from "../dispatch";
import { IDENTIFIERS } from "../identifiers";

export const setupPose = () => {
	dispatch({
		eventId: IDENTIFIERS.SETUP_POSE,
	});
};
