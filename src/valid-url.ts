import { URL } from 'url';

/**
 * Check if a given url is valid
 * @param {string} url  URL to check
 * @param {Object} options Additional options
 * @param {boolean} options.strict Check if given and parsed url are an exact match
 * @param {Array<string>} options.protocols Check against given array of protocols
 */
export default (url: string, options?: { strict?: boolean, protocols?: Array<string> }) => {

    const { strict, protocols } = options;

    try {
        const validUrl = new URL(url);

        if (strict && url !== validUrl.href) return false;
        if (protocols) return protocols.map(proto => `${proto.toLowerCase()}:`).includes(validUrl.protocol);
        return true;
    }
    catch (e) { return false; }
};
