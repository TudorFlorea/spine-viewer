import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onSkinChange = (cb: HandleFunction<string>) => {
	handle({
		eventId: IDENTIFIERS.SKIN_CHANGE,
		callback: (e: CustomEvent) => {
			cb(e.detail.skin);
		},
	});
};