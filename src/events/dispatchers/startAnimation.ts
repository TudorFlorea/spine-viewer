import { AnimationPlayData } from "../../interfaces";
import { dispatch } from "../dispatch";
import { IDENTIFIERS } from "../identifiers";

export const startAnimation = (animationData: AnimationPlayData) => {
    dispatch({
		eventId: IDENTIFIERS.START_ANIMATION,
		detail: {
			animationData,
		},
	});
};