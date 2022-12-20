import { SpineMixin } from "../../interfaces";
import { dispatch } from "../dispatch";
import { IDENTIFIERS } from "../identifiers";

export const setMixin = (mixin: SpineMixin) => {
	dispatch({
		eventId: IDENTIFIERS.SET_MIXIN,
		detail: {
			mixin,
		},
	});
};