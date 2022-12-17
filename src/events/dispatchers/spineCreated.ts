import { SpineData } from "../../interfaces";
import { dispatch } from "../dispatch";
import { IDENTIFIERS } from "../identifiers";

export const spineCreated = (spineData: SpineData) => {
    dispatch({
		eventId: IDENTIFIERS.SPINE_CREATED,
		detail: {
			spineData,
		},
	});
};