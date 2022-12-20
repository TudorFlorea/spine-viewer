import { FileEntry } from "../interfaces";

export const getExtension = (filename: string): string => {
    const fileArr = filename.split(".");
    return fileArr[fileArr.length - 1];
}

export const getFileNameFromPath = (path: string): string => {
    const paths = path.split("/");
    return paths[paths.length - 1];
}

export const loadImage = (url: string): Promise<FileEntry> => {
    return fetch(url).then(response => {
        return response
            .blob()
            .then(data => {
                return new Promise((resolve) => {
                    const fr = new FileReader();
                    fr.onload = () => {
                        const extension = getExtension(url);
                        const name = getFileNameFromPath(url);
                        const fileEntry = {
                            type: extension,
                            data: fr.result,
                            name: name,
                            path: name,
                        }
                        resolve(fileEntry);
                    };
                    fr.readAsDataURL(data);
                });
            });
    });
}

export const loadText = (url: string): Promise<FileEntry> => {
    return fetch(url).then(response => {
        return response
            .text()
            .then(data => {
                return new Promise(resolve => {
                    const extension = getExtension(url);
                    const name = getFileNameFromPath(url);
                    const fileEntry = {
                        type: extension,
                        data: data,
                        name: name,
                        path: name,
                    }
                    resolve(fileEntry);
                });
            });
    });
}