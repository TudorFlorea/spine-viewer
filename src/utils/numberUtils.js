
export const hexStringToNumber = (hex) => {
    let hexStr = "";
    let noPoundString = hex.replace("#", "");
    
    if(noPoundString.length === 3) {
        for(let i = 0; i < noPoundString.length; i++) {
            hexStr += noPoundString[i] + noPoundString[i];
        }
    } else {
        hexStr = noPoundString
    }
    return parseInt(hexStr, 16);
};