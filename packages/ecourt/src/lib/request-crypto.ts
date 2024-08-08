import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef");
const iv = CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");

function decryptString(encryptedData: string) {
  // This is used to decrypt request data we intercept.
  const encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedData);
  const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypted = CryptoJS.AES.decrypt(encryptedBase64Str, key, { iv: iv });
  const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

function encryptData(data: string) {
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
  const encrypted_data = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  return encrypted_data;
}

function encryptObjectEachKey(obj: Record<string, string>) {
  const encryptedObj: Record<string, string> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      encryptedObj[key] = encryptData(obj[key]);
    }
  }
  return encryptedObj;
}

function decryptObjectEachKey(obj: Record<string, string>) {
  // This is used to decrypt request data we intercept.
  const decryptedObj: Record<string, string> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      decryptedObj[key] = decryptString(obj[key]);
    }
  }
  return decryptedObj;
}

export {
  decryptString,
  encryptData,
  encryptObjectEachKey,
  decryptObjectEachKey,
};
