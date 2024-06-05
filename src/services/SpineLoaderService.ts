import { FileEntry } from "../interfaces";
import { getExtension, getFileNameFromPath } from "../utils/fileUtils";

interface LoadImageOptions {
    url: string;
    name: string;
}

interface LoadImageResult {
    data: string;
    name: string;
}

class SpineLoaderService {

    public static async loadFromUrl(jsonUrl: string): Promise<FileEntry[]> {
        const pathsArray = jsonUrl.split("/");
        const basePath = pathsArray.slice(0, pathsArray.length - 1).join("/");
        const atlasUrl = jsonUrl.replace(/\.json$/, '.atlas');

        const jsonText = await this.fetchText(jsonUrl);
        const atlasText = await this.fetchText(atlasUrl);

        const atlasFileLines = atlasText.split("\n");
        const imageFiles = atlasFileLines.filter(line => line.indexOf(".png") !== -1 || line.indexOf(".webp") !== -1 || line.indexOf(".jpg") !== -1)
        const loadImagePromises = imageFiles.map(imageFile => {
            return this.loadImage({name: imageFile, url: `${basePath}/${imageFile}`});
        });

        const loadedImages = await Promise.all(loadImagePromises);

        const jsonFileEntry: FileEntry = {
            data: jsonText,
            name: getFileNameFromPath(jsonUrl),
            path: getFileNameFromPath(jsonUrl),
            type: "json"
        };

        const atlasFileEntry: FileEntry = {
            data: atlasText,
            name: getFileNameFromPath(atlasUrl),
            path: getFileNameFromPath(atlasUrl),
            type: "atlas"
        };

        const filesLoaded: FileEntry[] = [jsonFileEntry, atlasFileEntry];
    
        loadedImages.forEach(image => {
            filesLoaded.push({
                data: image.data,
                name: image.name.trim(),
                path: image.name.trim(),
                type: getExtension(image.name).trim()
            });
        })

        return filesLoaded;
    }

    public static async fetchText(url: string): Promise<string> {
        const request = await fetch(url);
        const text = await request.text();

        return text;
    }

    public static async loadImage(options: LoadImageOptions): Promise<LoadImageResult> {
        const ext = getExtension(options.name);

        return new Promise((resolve, reject) => {
            var image = new Image();
            image.crossOrigin = 'Anonymous';
            image.onload = function(){
                var canvas = document.createElement('canvas') as HTMLCanvasElement;
                var context = canvas.getContext('2d');
                canvas.height = image.naturalHeight;
                canvas.width = image.naturalWidth;
                context?.drawImage(image, 0, 0);
                var dataURL = canvas.toDataURL(`image/${ext}`);
                resolve({
                    data: dataURL,
                    name: options.name
                });
            };
            image.onerror = reject;

            image.src = options.url;
        });
    }
}

export default SpineLoaderService;
