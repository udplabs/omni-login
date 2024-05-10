export default function base64UrlToUint8Array(base64string: string) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  // Use a lookup table to find the index.
  const lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  const bufferLength = base64string.length * 0.75;

  let p = 0,
    encoded1,
    encoded2,
    encoded3,
    encoded4;

  var bytes = new Uint8Array(bufferLength);

  for (let i = 0; i < base64string.length; i += 4) {
    encoded1 = lookup[base64string.charCodeAt(i)];
    encoded2 = lookup[base64string.charCodeAt(i + 1)];
    encoded3 = lookup[base64string.charCodeAt(i + 2)];
    encoded4 = lookup[base64string.charCodeAt(i + 3)];

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return bytes.buffer;
}
