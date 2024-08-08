import CryptoJS from "crypto-js";

function decodeResponse<T>(result: string): T {
  const keyBase64 = CryptoJS.enc.Base64.parse("ITU2NjNhI0tOc2FmZExOTQ==");
  const iv1 = CryptoJS.enc.Base64.parse("AAAAAAAAAAAAAAAAAAAAAA==");

  const bytes = CryptoJS.AES.decrypt(result, keyBase64, { iv: iv1 });
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  const s = plaintext
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f")
    // remove non-printable and other non-valid JSON chars
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0019]+/g, "");

  return JSON.parse(s) as T;
}

export { decodeResponse };
