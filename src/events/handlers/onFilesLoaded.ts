
import { FilesLoadedData } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";

export const onFilesLoaded = (cb: HandleFunction<FilesLoadedData>) => {
	handle({
		eventId: IDENTIFIERS.FILES_LOADED,
		callback: (e: CustomEvent) => {
			cb(e.detail.data);
		},
	});
};
