import aes from 'crypto-js/aes'
import utf8 from 'crypto-js/enc-utf8'
import base64 from 'crypto-js/enc-base64'
import modeEcb from 'crypto-js/mode-ecb'
import padPkcs7 from 'crypto-js/pad-pkcs7'
import hex from 'crypto-js/enc-hex'

export const encrypt = (string: string) => {
  const key = utf8.parse('B%t$AD!YMfnCZnfD')

  const encrypted = aes.encrypt(string, key, {
    mode: modeEcb,
    padding: padPkcs7,
    [Symbol.toStringTag]: '',
    buffer: undefined,
    byteLength: 0,
    byteOffset: 0,
  })

  return encrypted.ciphertext.toString() // return ciphertext in hex format
}

export const decrypt = (string: string, skipParse = false) => {
  const key = utf8.parse('B%t$AD!YMfnCZnfD')
  const ciphertext = hex.parse(string)
  const src = base64.stringify(ciphertext)
  const decrypt = aes.decrypt(src, key, {
    [Symbol.toStringTag]: '',
    buffer: undefined,
    byteLength: 0,
    byteOffset: 0,
    mode: modeEcb,
    padding: padPkcs7,
  })

  const str = decrypt.toString(utf8)

  if (skipParse) {
    return str
  }

  try {
    const o = JSON.parse(str)

    if (o && typeof o === 'object') {
      return o
    }
  } catch (e) { }

  return false
}
