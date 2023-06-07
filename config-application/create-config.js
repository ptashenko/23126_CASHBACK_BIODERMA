/* eslint-disable no-console */
import * as fs from 'fs'
// import CryptoJS from 'crypto-js'
import utf8 from 'crypto-js/enc-utf8.js'
import aes from 'crypto-js/aes.js'
import modeEcb from 'crypto-js/mode-ecb.js'
import padPkcs7 from 'crypto-js/pad-pkcs7.js'
// import { Authorization } from '../config/papagayoConfig'
import { bearer, endOfFile, endpoint, standard } from './blocked/variable.mjs'

const project = process.argv[2]
console.log('start dragon configuration 🐉')

function chiper (val, key) {
  const a = utf8.parse(key)
  const encryptedMaster = aes.encrypt(val, a, {
    mode: modeEcb,
    padding: padPkcs7,
  })
  return encryptedMaster.ciphertext.toString()
}

fetch(`${endpoint}${project}`,
  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Content-type': 'application/json',
    },
  })
  .then(res => res.json())
  .then((resp) => {
    const { CONFIGURATION_ERROR } = resp
    console.log('encryption 🧨')

    if (typeof CONFIGURATION_ERROR === 'undefined' || CONFIGURATION_ERROR) {
      console.log('THEN CONFIGURATION ERROR - MISSING REQUIRED OBJECT')
      process.exit(500)
    }

    resp.APP_STATUS = process.argv[3] // What is this for ?
    const chiperConfiguration = chiper(JSON.stringify(resp), standard)
    const text = `/* CONFIGURATION FOR ${project} */\n\n${endOfFile}'${chiperConfiguration}'\nexport default dragonConfig\n`
    console.log('writing configuration file 💣')

    fs.writeFile('config-application/output/dragonConfig' + project + '.txt', text, (err) => {
      if (err) { throw err }
    })

    fs.writeFile('config/dragonConfig.ts', text, (err) => {
      if (err) { throw err }
      console.log('files generated ☣️')
    })
  })
  .catch(() => {
    console.log('CONFIGURATION ERROR - MISSING REQUIRED OBJECT')
    process.exit(500)
  })
