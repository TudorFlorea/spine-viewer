
import { FilesLoadedData } from "../../interfaces";
import { HandleFunction } from "../../types";
import { handle } from "../handle";
import { IDENTIFIERS } from "../identifiers";
import { remove } from "../remove";

export const onFilesLoaded = (cb: HandleFunction<FilesLoadedData>) => {

	const filesLoadedListener = (evt: CustomEvent<{ data: FilesLoadedData }>) => {
		cb(evt.detail.data);
	};

	handle({
		eventId: IDENTIFIERS.FILES_LOADED,
		callback: filesLoadedListener
	});

	return () => {
		remove({
			eventId: IDENTIFIERS.FILES_LOADED,
			handler: filesLoadedListener
		});
	}
};