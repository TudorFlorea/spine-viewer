import copy from 'copy-to-clipboard';

export const copyToClipboard = (text: string) => {
    copy(text);
}