import { SpineMixin } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";


export const onSetMixin = (cb: HandleFunction<SpineMixin>) => {

	const setMixinListener = (evt: CustomEvent<{ mixin: SpineMixin }>) => {
		cb(evt.detail.mixin);
	};

	handle({
		eventId: IDENTIFIERS.SET_MIXIN,
		callback: setMixinListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.SET_MIXIN,
			handler: setMixinListener
		});
	}
};