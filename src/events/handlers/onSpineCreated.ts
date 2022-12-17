import { SpineData } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onSpineCreated = (cb: HandleFunction<SpineData>) => {
    handle({
		eventId: IDENTIFIERS.SPINE_CREATED,
		callback: (e: CustomEvent) => {
			cb(e.detail.spineData);
		},
	});
};