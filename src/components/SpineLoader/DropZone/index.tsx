import { useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { FileEntry } from "../../../interfaces";
import { getExtension } from "../../../utils/fileUtils";
import "./Dropzone.css";

// export interface LoadedFile {
//     type: string;
//     data: string | ArrayBuffer | null;
//     name: string;
//     path: string | undefined;
// }

const missingFiles = (files: FileEntry[]): string[] => {
	const expectedTypes = ["json", "atlas", "png"];
	const missingFiles: string[] = [];
	expectedTypes.forEach((type) => {
		if (files.find((elem) => elem.type === type) === undefined) {
			missingFiles.push(type);
		}
	});
	return missingFiles;
};

interface DropZoneProps {
	onStartLoadingFiles?: () => void;
	onFilesLoaded: (files: FileEntry[]) => void;
	onError: (message: string) => void;
	className?: string;
}

const DropZone: React.FC<DropZoneProps> = (props) => {
	const { onFilesLoaded, onError, onStartLoadingFiles } = props;

	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			onStartLoadingFiles && onStartLoadingFiles();
			const files: FileEntry[] = [];
			acceptedFiles.forEach((file, _, arr) => {
				const extension = getExtension(file.name);
				const reader = new FileReader();

				reader.onabort = () => {
					const message = `${file.name} reading was aborted`;
					onError(message);
				};
				reader.onerror = () => {
					const message = `${file.name} reading was aborted`;
					onError(message);
				};
				reader.onload = () => {
					const result = reader.result;

					files.push({
						type: extension,
						data: reader.result,
						name: file.name,
						path: file.path,
					});
					if (files.length === arr.length) {
						const missing = missingFiles(files);
						if (missing.length === 0) {
							onFilesLoaded(files);
						} else {
							const message = `The following files are missing ${missing.join(
								", "
							)}`;
							onError(message);
						}
					}
				};

				switch (extension) {
					case "json":
						reader.readAsText(file);
						break;
					case "atlas":
						reader.readAsText(file);
						break;
					case "png":
						reader.readAsDataURL(file);
						break;
					default:
						onError(`Unsopported file format: ${extension}`);
				}
			});
		},
		[onFilesLoaded, onError]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div
			className={`dropzone ${props.className ? props.className : ""} ${isDragActive ? "dropzone--active" : ""
				}`}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag and drop files here, or click to select files</p>
			)}
		</div>
	);
};

export default DropZone;