import dayjs from 'dayjs'
import type { IDragonConfig, IOcrData, IReceipt } from '~/types/types'
import { useUserProfile } from '~/store/user-profile'

interface IOcrDataRead {
  receipt?: {
    time?: '',
    amount?: '',
    number?: '',
  },
}

const errorCodes: number[] = [
  601, // OCR_DATE_TIME_AMOUNT_NUMBER_MISSING
  602, // OCR_DATE_TIME_AMOUNT_MISSING
  603, // OCR_DATE_TIME_NUMBER_MISSING
  604, // OCR_DATE_AMOUNT_NUMBER_MISSING
  606, // OCR_DATE_TIME_MISSING
  607, // OCR_DATE_AMOUNT_MISSING
  608, // OCR_DATE_NUMBER_MISSING
  611, // OCR_DATE_MISSING
  615, // OCR_LOW_RESOLUTION
  616, // OCR_IS_NOT_A_RECEIPT
  617, // OCR_RECEIPT_DATE_BEFORE_VALIDY_TIME
  618, // OCR_RECEIPT_DATE_AFTER_END_VALIDY_TIME
  619, // OCR_DUPLICATE_IMAGE
  620, // OCR_DATE_ERROR
  621, // PLAY_AFTER_MAX_DAYS
  622, // MIN_AMOUNT_NOT_ACHIEVED
  623, // PDV NOT AUTORIZED
]

export const useOcrDataEncrypted = () => (
  useState<IOcrData>('ocrDataEncrypted', () => {
    const { PROJECT_KEY }: IDragonConfig = decrypt(dragonConfig)
    const userProfile = useUserProfile()

    return {
      front: '',
      icode: PROJECT_KEY,
      iseq: userProfile.userData.player_token_player,
      rear: '',
    }
  }))

export const useOcrDataNonEncrypted = () => (
  useState<IOcrData>('ocrDataNonEncrypted', () => {
    const { PROJECT_KEY }: IDragonConfig = decrypt(dragonConfig)
    const userProfile = useUserProfile()

    return {
      front: '',
      icode: PROJECT_KEY,
      iseq: userProfile.userData.player_token_player,
      rear: '',
    }
  }))

export const useReceipt = () => useState<IReceipt>('receipt', () => ({
  address: {
    address: '',
    location: '',
    province: '',
    zip: '',
  },
  amount: '',
  amount_obj: {
    integer: '',
    decimal: '',
  },
  date: '',
  date_obj: {
    raw_date: '',
    date: '',
    formatted_date: '',
  },
  number: '',
  number_shallow: '',
  time: '',
  vatnum: '',
  shop: '',
}))

export const useOcrDataRead = () => useState<any>('ocrDataRead', () => ({
  receipt: {},
}))

export const callOCR = async (ocrDataEncrypted: IOcrData, ocrDataNonEncrypted: IOcrData): Promise<boolean> => {
  const ocrLoading = useOcrLoading()
  const receipt = useReceipt()
  const formData = useFormData()
  const ocrDataRead = useOcrDataRead()
  ocrLoading.value = true
  const { data, valid } = await useFetchCall('callOcr', {
    body: ocrDataEncrypted,
  })

  let ocrIsValid = false

  if (valid) {
    if (errorCodes.includes(Number(data.statusCode))) {
      await saveOcrError(ocrDataNonEncrypted.front, ocrDataNonEncrypted.rear, data.message, data.statusCode as number).then(
        () => popupErrorCode(data.statusCode)
      )
    } else {
      ocrIsValid = true
      const amount = data.message?.receipt.amount.split(',')
      const time = data.message?.receipt.time.split(':')
      ocrDataRead.value = data.message
      receipt.value = {
        ...data.message?.receipt,
        date_obj: {
          raw_date: data.message?.receipt.date && data.message?.receipt.time ? dayjs(`${data.message?.receipt.date} ${data.message.receipt.time}`, 'DD/MM/YYYY HH:mm') : undefined,
          date: data.message?.receipt.date ? dayjs(data.message?.receipt.date, 'DD/MM/YYYY') : undefined,
          formatted_date: data.message?.receipt.date ? dayjs(data.message?.receipt.date, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined,
        },
        amount_obj: {
          integer: amount[0],
          decimal: amount[1],
        },
        // Note: Why is treated as a number?
        number_shallow: `${data.message?.receipt.number.replace('-', '')}`,
      }
      formData.value = {
        ...formData.value,
        number: `${data.message?.receipt.number.replace('-', '')}`,
        date: data.message?.receipt.date ? dayjs(data.message.receipt.date, 'DD/MM/YYYY').toDate() : undefined,
        formatted_date: data.message?.receipt.date ? dayjs(data.message.receipt.date, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined,
        time: {
          HH: time[0],
          mm: time[1],
        },
        formatted_time: `${data.message?.receipt.time}:00`,
        amount_obj: {
          integer: amount[0],
          decimal: amount[1],
        },
      }
    }
  } else {
    await saveOcrError(ocrDataNonEncrypted.front, ocrDataNonEncrypted.rear, data.message, data.statusCode).then(
      // () => popupErrorCode(data.statusCode)
    )
  }

  ocrLoading.value = false
  return ocrIsValid
}

export const saveOcrError = async (
  front_picture_play = '',
  rear_picture_play = '',
  ocrDataRead: IOcrDataRead = {},
  statusCode = 0) => {
  const userProfile = useUserProfile()
  // const formData = useFormData()
  const receipt = useReceipt()
  const axiosData = {
    play: {
      first_name_play: userProfile.userData.first_name_player,
      last_name_play: userProfile.userData.last_name_player,
      username_play: userProfile.userData.username_player,
      player_token_play: userProfile.userData.player_token_player,
      front_picture_play,
      rear_picture_play,
      receipt_date_play: receipt.value.date || dayjs().format('YYYY-MM-DD'),
      receipt_time_play: ocrDataRead?.receipt?.time || '',
      receipt_amount_play: ocrDataRead?.receipt?.amount || 0,
      receipt_number_play: ocrDataRead?.receipt?.number || 0,
      support_id_play: userProfile.userData.support_id_player,
      result_play: 405,
      play_specification_play: '', // What is this? // productNumber || '',
    },
    receipt: {
      player_token_receipt: userProfile.userData.player_token_player,
      front_url_receipt: front_picture_play,
      rear_url_receipt: rear_picture_play,
      status_receipt: statusCode,
      response_ocr_receipt: ocrDataRead,
    },
    supreme: {
      receipt_date_play: receipt.value.date || dayjs().format('YYYY-MM-DD'),
      receipt_time_play: ocrDataRead?.receipt?.time || '',
      receipt_amount_play: ocrDataRead?.receipt?.amount || 0,
      receipt_number_play: ocrDataRead?.receipt?.number || 0,
    },
    manage_play: {
      player_token_manage_play: userProfile.userData.player_token_player,
      /* iban_manage_play: userProfile.userData.iban,
      iban_owner_manage_play: `${userProfile.userData.first_name_player} ${userProfile.userData.last_name_player}`,
      url1_manage_play: ocrDataNonEncrypted.value.front,
      url2_manage_play: ocrDataNonEncrypted.value.rear,
      refund_manage_play: '10.00', // '30.00' // NOTE: How does this work? */
    },
    player: {
      player_token_player: userProfile.userData.player_token_player,
      username_player: userProfile.userData.username_player || 'username_player',
      first_name_player: userProfile.userData.first_name_player || 'first_name_player',
      last_name_player: userProfile.userData.last_name_player || 'last_name_player',
      iban_player: userProfile.userData.iban || 'iban',
      iban_owner_player: `${userProfile.userData.first_name_player} ${userProfile.userData.last_name_player}`,
      phone_player: userProfile.userData.phone_player || 'phone_player',
      agreement1_player: userProfile.userData.agreement1_player || '0',
      agreement2_player: userProfile.userData.agreement2_player || '0',
      agreement3_player: userProfile.userData.agreement3_player || '0',
      agreement4_player: userProfile.userData.agreement4_player || '0',
    },
  }
  const { data } = await useFetchCall('play/web', {
    body: axiosData,
  })

  console.log(data)
}
