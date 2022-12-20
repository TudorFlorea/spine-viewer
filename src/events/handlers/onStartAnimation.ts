import { AnimationPlayData } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onStartAnimation = (cb: HandleFunction<AnimationPlayData>) => {

	const startAnimationListener = (evt: CustomEvent<{ animationData: AnimationPlayData }>) => {
		cb(evt.detail.animationData);
	};

	handle({
		eventId: IDENTIFIERS.START_ANIMATION,
		callback: startAnimationListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.START_ANIMATION,
			handler: startAnimationListener
		});
	}
};