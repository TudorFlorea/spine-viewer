import spineConfig from "../config/spineConfig";
import { FileEntry } from "../interfaces";
import {getExtension, loadImage, loadText} from "../utils/fileUtils";

class SpineProvider {

    static getDemoSpine(): Promise<(FileEntry | undefined)[]> {
        return new Promise((resolve, reject) => {
            const fileRequests = spineConfig.demoSpineResources.files.map(file => {
                const extension = getExtension(file);

                switch(extension) {
                    case "png":
                        return loadImage(file);
                    case "atlas":
                        return loadText(file);
                    case "json":
                        return loadText(file);
                    default:
                        reject(`Unknown file type to load: ${extension}`);
                }
            });

            Promise.all(fileRequests).then((loadedFileEntries) => {
                resolve(loadedFileEntries);
            });

        });
    }
}

export default SpineProvider;