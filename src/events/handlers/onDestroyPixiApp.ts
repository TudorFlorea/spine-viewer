import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onDestroyPixiApp = (cb: HandleFunction<void>) => {

	const destroyPixiAppListener = (evt: CustomEvent<void>) => {
		cb();
	};

	handle({
		eventId: IDENTIFIERS.DESTROY_PIXI_APP,
		callback: destroyPixiAppListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.DESTROY_PIXI_APP,
			handler: destroyPixiAppListener
		});
	}
};