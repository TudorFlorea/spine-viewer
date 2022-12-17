import { SpineMixin } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";


export const onSetMixin = (cb: HandleFunction<SpineMixin>) => {
	handle({
		eventId: IDENTIFIERS.SET_MIXIN,
		callback: (e: CustomEvent) => {
			cb(e.detail.mixin);
		},
	});
};