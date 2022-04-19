export const getExtension = (filename) => {
	const fileArr = filename.split(".");
	return fileArr[fileArr.length - 1];
};
