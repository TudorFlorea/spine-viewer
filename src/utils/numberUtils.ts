import {v4 as uuidV4} from "uuid";

export const hexStringToNumber = (hex: string): number => {
	let hexStr = "";
	let noPoundString = hex.replace("#", "");

	if (noPoundString.length === 3) {
		for (let i = 0; i < noPoundString.length; i++) {
			hexStr += noPoundString[i] + noPoundString[i];
		}
	} else {
		hexStr = noPoundString;
	}
	return parseInt(hexStr, 16);
};


export const uuid = () => {
	return uuidV4();
}