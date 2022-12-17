import { AnimationPlayData } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onStartAnimation = (cb: HandleFunction<AnimationPlayData>) => {
    handle({
		eventId: IDENTIFIERS.START_ANIMATION,
		callback: (e: CustomEvent) => {
			cb(e.detail.animationData);
		},
	});
};