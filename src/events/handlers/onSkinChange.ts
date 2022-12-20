import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onSkinChange = (cb: HandleFunction<string>) => {

	const skinChangeListener = (evt: CustomEvent<{ skin: string }>) => {
		cb(evt.detail.skin);
	};

	handle({
		eventId: IDENTIFIERS.SKIN_CHANGE,
		callback: skinChangeListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.SKIN_CHANGE,
			handler: skinChangeListener
		});
	}
};