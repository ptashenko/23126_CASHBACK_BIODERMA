import { configure, defineRule, ErrorMessage, Field, Form } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import { confirmed, email, ext, image, integer, is, is_not, max, max_value, mimes, min, min_value, one_of, regex, required, size } from '@vee-validate/rules'
import it from '@vee-validate/i18n/dist/locale/it.json'

configure({
  generateMessage: localize({
    it,
  }),
})

const emailTemporaryArray = ['10minutemail.com', '163.com', '1chuan.com', '1zhuan.com', '20minutemail.com', '21cn.com', '2prong.com', '30minutesmail.com', '4warding.com', '4warding.com', '4warding.net', '4warding.org', '675hosting.com', '675hosting.net', '675hosting.org', '6url.com', '75hosting.com', '75hosting.net', '75hosting.org', 'afrobacon.com', 'ajaxapp.net', 'amiri.net', 'amiriindustries.com', 'anonymail.dk', 'anonymbox.com', 'aol.com', 'bambooclub.cn', 'binkmail.com', 'blogmyway.org', 'bobmail.info', 'bofthew.com', 'bsnow.net', 'bugmenot.com', 'bumpymail.com', 'buyusedlibrarybooks.org', 'centermail.com', 'centermail.net', 'choicemail1.com', 'chongsoft.cn', 'chongsoft.com', 'chongsoft.org', 'cool.fr.nf', 'courriel.fr.nf', 'csoftmail.cn', 'deadspam.com', 'despam.it', 'despammed.com', 'discardmail.com', 'discardmail.de', 'dispose.it', 'disposeamail.com', 'dispostable.com', 'dodgeit.com', 'dodgit.com', 'dontreg.com', 'dontsendmespam.de', 'dotmsg.com', 'dumpandjunk.com', 'dumpmail.de', 'dunflimblag.mailexpire.com', 'e4ward.com', 'emaildienst.de', 'emailias.com', 'emailmiser.com', 'emailtemporanea.net', 'emailto.de', 'emailxfer.com', 'emz.net', 'enterto.com', 'etranquil.com', 'etranquil.net', 'etranquil.org', 'fakeinformation.com', 'fakemailz.com', 'fastacura.com', 'fastchevy.com', 'fastchrysler.com', 'fastkawasaki.com', 'fastmazda.com', 'fastmitsubishi.com', 'fastnissan.com', 'fastsubaru.com', 'fastsuzuki.com', 'fasttoyota.com', 'fastyamaha.com', 'filzmail.com', 'filzmail.com', 'footard.com', 'forgetmail.com', 'front14.org', 'fuckingduh.com', 'fux0ringduh.com', 'getonemail.com', 'ghosttexter.de', 'gishpuppy.com', 'gowikibooks.com', 'gowikicampus.com', 'gowikicars.com', 'gowikifilms.com', 'gowikigames.com', 'gowikimusic.com', 'gowikinetwork.com', 'gowikitravel.com', 'gowikitv.com', 'greensloth.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamailblock.com', 'h8s.org', 'haltospam.com', 'hatespam.org', 'hidemail.de', 'hush.ai', 'i-b2c.com', 'iheartspam.org', 'imstations.com', 'incognitomail.net', 'ipoo.org', 'iwi.net', 'jetable.com', 'jetable.fr.nf', 'jetable.fr.nf', 'jetable.net', 'jetable.org', 'jnxjn.com', 'justonemail.net', 'kasmail.com', 'killmail.com', 'killmail.net', 'klassmaster.com', 'klassmaster.net', 'klzlk.com', 'legworld.cn', 'letmymail.com', 'lhsdv.com', 'link2mail.net', 'lortemail.dk', 'lovemeleaveme.com', 'lroid.com', 'mail.ru', 'mail2rss.org', 'mail333.com', 'mailblocks.com', 'mailcatch.com', 'maileater.com', 'mailexpire.com', 'mailfreeonline.com', 'mailin8r.com', 'mailinator.com', 'mailinator2.com', 'mailmetrash.com', 'mailmoat.com', 'mailnesia.com', 'mailnull.com', 'mailquack.com', 'mailshell.com', 'mailsiphon.com', 'mailslapping.com', 'mailtemp.net', 'mailzilla.com', 'mega.zik.dj', 'mega.zik.dj', 'meinspamschutz.de', 'meltmail.com', 'messagebeamer.de', 'mintemail.com', 'moncourrier.fr.nf', 'monemail.fr.nf', 'monmail.fr.nf', 'mt2009.com', 'myspaceinc.com', 'myspaceinc.net', 'myspaceinc.org', 'myspacepimpedup.com', 'myspamless.com', 'mytrashmail.com', 'neomailbox.com', 'nepwk.com', 'nervmich.net', 'nervtmich.net', 'netmails.com', 'netmails.net', 'netzidiot.de', 'nobulk.com', 'noclickemail.com', 'nomail.xl.cx', 'nospam.ze.tc', 'nospamfor.us', 'nurfuerspam.de', 'nwldx.com', 'onemoremail.net', 'oneoffemail.com', 'oneoffmail.com', 'oopi.org', 'ourklips.com', 'outlawspam.com', 'owlpic.com', 'pancakemail.com', 'pc1520.com', 'pimpedupmyspace.com', 'pjjkp.com', 'poofy.org', 'pookmail.com', 'privacy.net', 'prtnx.com', 'punkass.com', 'recyclemail.dk', 'rejectmail.com', 'rklips.com', 'safersignup.de', 'seorj.cn', 'sharklasers.com', 'shiftmail.com', 'shortmail.net', 'sibmail.com', 'sina.com', 'siteposter.net', 'slaskpost.se', 'slopsbox.com', 'sneakemail.com', 'sofimail.com', 'sofort-mail.de', 'sogetthis.com', 'sohu.com', 'spam.la', 'spam.su', 'spamavert.com', 'spambob.com', 'spambob.net', 'spambob.org', 'spambog.com', 'spambog.de', 'spambox.us', 'spamcon.org', 'spamcorptastic.com', 'spamday.com', 'spamex.com', 'spamexperts.com', 'spamfree24.com', 'spamfree24.net', 'spamfree24.org', 'spamgourmet.com', 'spamhole.com', 'spamhouse.com', 'spamify.com', 'spaminator.de', 'spaml.com', 'spammotel.com', 'spamoff.de', 'spamslicer.com', 'spamsphere.com', 'spamtrail.com', 'speed.1s.fr', 'teleworm.com', 'tempemail.net', 'tempinbox.com', 'tempmail.it', 'tempomail.fr', 'temporarily.de', 'temporaryforwarding.com', 'temporaryinbox.com', 'thankyou2010.com', 'tom.com', 'tracciabi.li', 'trash2009.com', 'trashdevil.com', 'trashdevil.de', 'trashmail.com', 'trashmail.de', 'trash-mail.de', 'trashmail.net', 'trashmail.org', 'trashymail.com', 'turual.com', 'twinmail.de', 'tyldd.com', 'uggsrock.com', 'upliftnow.com', 'uplipht.com', 'uymail.com', 'venompen.com', 'viditag.com', 'viewcastmedia.com', 'viewcastmedia.net', 'viewcastmedia.org', 'visit.onlatedotcom.info', 'walala.org', 'wegwerfadresse.de', 'wetrainbayarea.com', 'wetrainbayarea.org', 'wh4f.org', 'whopy.com', 'wilemail.com', 'willselfdestruct.com', 'wormseo.cn', 'wuzup.net', 'wwwnew.eu', 'xagloo.com', 'xemaps.com', 'xents.com', 'xmaily.com', 'yep.it', 'yopmail.com', 'yopmail.fr', 'yopmail.fr', 'yopmail.net', 'youumail.com', 'zoemail.org', 'MakeMeTheKing.com', 'tempemail.co.za', 'mail-temp.com', 'emailthrow.net ', 'rppkn.com', 'incognitomail.org', 'email60.com', 'rtrtr.com']

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('min_value', min_value)
defineRule('max', max)
defineRule('max_value', max_value)
defineRule('regex', regex)
defineRule('confirmed', confirmed)
defineRule('image', image)
defineRule('size', size)
defineRule('ext', ext)
defineRule('mimes', mimes)
defineRule('is', is)
defineRule('is_not', is_not)
defineRule('one_of', one_of)
defineRule('integer', integer)
defineRule('isDuplicated', async (value: Record<string, any>, { table = 'player', fieldName = 'username_player' }) => {
  const { data } = await useFetchCall('checkIfIsUnique', {
    body: {
      param: value,
      table,
      fieldName,
    },
  })

  return data.statusCode !== 1404 || 'Email digitato già presente'
})

defineRule('temporaryEmail', (userEmail: string) =>
  !emailTemporaryArray.some(email => userEmail.includes(email)) || 'Le email temporanee non sono consentite')
// EMAIL CHECK PLUS + CHARACTER ( FOR GMAIL....+1@gmail.com )
defineRule('plusIssueEmail', (value: string) =>
  !value.includes('+') || 'L`indirizzo email contiene caratteri non consentiti')
// PASSWORD SECURITY CHECK
defineRule(
  'passwordCheck',
  (value: string) => !((!/[a-z]/.test(value)) || (!/[0-9]/.test(value))) || 'La password deve essere composta da lettere e numeri.'
)
// EMPTY TIME, controls that hours and minutes are populated
/* defineRule('emptyTime', {
  validate: ({ HH, mm }) => (!!HH && !!mm),
  message: 'Il campo {_field_} è richiesto.',
})
*/
// CODICE FISCALE, controls the fiscal code format
defineRule(
  'phiscalCode',
  (value: string) => {
    let cf = value
    let i, s
    if (cf === '') {
      return '' || 'Codice Fiscale non valido'
    }
    cf = cf.toUpperCase()
    if (cf.length !== 16) {
      return false || 'Codice Fiscale non valido'
    }
    const validi = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (i = 0; i < 16; i++) {
      if (!validi.includes(cf.charAt(i))) {
        return false || 'Codice Fiscale non valido'
      }
    }
    const set1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const set2 = 'ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const setpari = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const setdisp = 'BAKPLCQDREVOSFTGUHMINJWZYX'
    s = 0
    for (i = 1; i <= 13; i += 2) {
      s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))))
    }
    for (i = 0; i <= 14; i += 2) {
      s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))))
    }
    return s % 26 === cf.charCodeAt(15) - 'A'.charCodeAt(0) || 'Codice Fiscale non valido'
  }
)
// IBAN CONTROL
defineRule(
  'iban',
  (value: string) => {
    // Remove spaces and to upper case
    const iban = value.replace(/ /g, '').toUpperCase()
    let ibancheckdigits = ''
    let leadingZeroes = true
    let cRest = 0
    let cOperator = ''
    let charAt
    let cChar
    let ibanregexp
    let i
    let p

    if (iban.length < 5) {
      return false || 'Il campo Iban non é corretto'
    }

    const countryCode = iban.substring(0, 2)
    const ibanCountryPatterns = {
      AL: '\\d{8}[\\dA-Z]{16}',
      AD: '\\d{8}[\\dA-Z]{12}',
      AT: '\\d{16}',
      AZ: '[\\dA-Z]{4}\\d{20}',
      BE: '\\d{12}',
      BH: '[A-Z]{4}[\\dA-Z]{14}',
      BA: '\\d{16}',
      BR: '\\d{23}[A-Z][\\dA-Z]',
      BG: '[A-Z]{4}\\d{6}[\\dA-Z]{8}',
      CR: '\\d{17}',
      HR: '\\d{17}',
      CY: '\\d{8}[\\dA-Z]{16}',
      CZ: '\\d{20}',
      DK: '\\d{14}',
      DO: '[A-Z]{4}\\d{20}',
      EE: '\\d{16}',
      FO: '\\d{14}',
      FI: '\\d{14}',
      FR: '\\d{10}[\\dA-Z]{11}\\d{2}',
      GE: '[\\dA-Z]{2}\\d{16}',
      DE: '\\d{18}',
      GI: '[A-Z]{4}[\\dA-Z]{15}',
      GR: '\\d{7}[\\dA-Z]{16}',
      GL: '\\d{14}',
      GT: '[\\dA-Z]{4}[\\dA-Z]{20}',
      HU: '\\d{24}',
      IS: '\\d{22}',
      IE: '[\\dA-Z]{4}\\d{14}',
      IL: '\\d{19}',
      IT: '[A-Z]\\d{10}[\\dA-Z]{12}',
      KZ: '\\d{3}[\\dA-Z]{13}',
      KW: '[A-Z]{4}[\\dA-Z]{22}',
      LV: '[A-Z]{4}[\\dA-Z]{13}',
      LB: '\\d{4}[\\dA-Z]{20}',
      LI: '\\d{5}[\\dA-Z]{12}',
      LT: '\\d{16}',
      LU: '\\d{3}[\\dA-Z]{13}',
      MK: '\\d{3}[\\dA-Z]{10}\\d{2}',
      MT: '[A-Z]{4}\\d{5}[\\dA-Z]{18}',
      MR: '\\d{23}',
      MU: '[A-Z]{4}\\d{19}[A-Z]{3}',
      MC: '\\d{10}[\\dA-Z]{11}\\d{2}',
      MD: '[\\dA-Z]{2}\\d{18}',
      ME: '\\d{18}',
      NL: '[A-Z]{4}\\d{10}',
      NO: '\\d{11}',
      PK: '[\\dA-Z]{4}\\d{16}',
      PS: '[\\dA-Z]{4}\\d{21}',
      PL: '\\d{24}',
      PT: '\\d{21}',
      RO: '[A-Z]{4}[\\dA-Z]{16}',
      SM: '[A-Z]\\d{10}[\\dA-Z]{12}',
      SA: '\\d{2}[\\dA-Z]{18}',
      RS: '\\d{18}',
      SK: '\\d{20}',
      SI: '\\d{15}',
      ES: '\\d{20}',
      SE: '\\d{20}',
      CH: '\\d{5}[\\dA-Z]{12}',
      TN: '\\d{20}',
      TR: '\\d{5}[\\dA-Z]{17}',
      AE: '\\d{3}\\d{16}',
      GB: '[A-Z]{4}\\d{14}',
      VG: '[\\dA-Z]{4}\\d{16}',
    }

    const ibanPattern = ibanCountryPatterns[countryCode]

    if (typeof ibanPattern !== 'undefined') {
      ibanregexp = new RegExp('^[A-Z]{2}\\d{2}' + ibanPattern + '$', '')
      if (!(ibanregexp.test(iban))) {
        return false || 'Il campo Iban non é corretto' // Invalid country specific format
      }
    }

    // Now check the checksum, first convert to digits
    const ibanCheck = iban.substring(4, iban.length) + iban.substring(0, 4)
    for (i = 0; i < ibanCheck.length; i++) {
      charAt = ibanCheck.charAt(i)
      if (charAt !== '0') {
        leadingZeroes = false
      }
      if (!leadingZeroes) {
        ibancheckdigits += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charAt)
      }
    }

    // Calculate the result of: ibancheckdigits % 97
    for (p = 0; p < ibancheckdigits.length; p++) {
      cChar = ibancheckdigits.charAt(p)
      cOperator = Number('' + cRest + '' + cChar)
      cRest = Number(cOperator % 97)
    }
    return cRest === 1 || 'Il campo Iban non é corretto'
  }
)
// it.messages = Object.assign({}, it.messages, { ibanControl: field => 'Il campo Iban non é corretto.' });

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Form', Form)
  nuxtApp.vueApp.component('Field', Field)
  nuxtApp.vueApp.component('ErrorMessage', ErrorMessage)
})
