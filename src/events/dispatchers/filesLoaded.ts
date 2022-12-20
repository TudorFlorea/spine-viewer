import { FilesLoadedData } from "../../interfaces";
import { dispatch } from "../dispatch"
import { IDENTIFIERS } from "../identifiers"

export const filesLoaded = (data: FilesLoadedData) => {
    dispatch({
        eventId: IDENTIFIERS.FILES_LOADED,
        detail: {
            data
        }
    });
}