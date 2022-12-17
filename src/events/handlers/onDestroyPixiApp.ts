import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onDestroyPixiApp = (cb: HandleFunction<void>) => {
	handle({
		eventId: IDENTIFIERS.DESTROY_PIXI_APP,
		callback: () => {
			cb();
		}
	});
};