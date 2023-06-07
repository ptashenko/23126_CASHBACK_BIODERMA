import dayjs from 'dayjs'
import { useTimeStore } from '~/store/time-store'
import { useUserProfile } from '~/store/user-profile'
// import dragonConfig from '~/config/dragonConfig'
import type { IFetchResponse } from '~/types/types'
// import type { IDragonConfig, IFetchResponse } from '~/types/types'
import type { IPlay } from '~/types/interfaces'

// const { PROJECT_KEY, APP_MECHANISM, CAN_WIN_MORE_THEN_ONE_TIME }:IDragonConfig = decrypt(dragonConfig)
/* const generateKeyId = () => {
  let key = ''
  if (APP_MECHANISM === 'INSTANT_WIN' && !CAN_WIN_MORE_THEN_ONE_TIME) {
    const xkey = localStorage.getItem(`$%r332d2we24#@$234${PROJECT_KEY}1SDe452@#$%`)
    if (xkey === '$&@(*(@Jde20)($40E#@_(_Q#($_@(*_EIS') {
      key = localStorage.getItem(`$%r332d324#@$234${PROJECT_KEY}245DSDe452@#$%`) || ''
    }
  }

  return key
} */

/* Note: If we agree to have some sort of stable data we could create 3 object depending on the contest type. */
export default async function (values: Record<string, any>, hasOcr: boolean): Promise<IFetchResponse> {
  const router = useRouter()
  const userProfile = useUserProfile()
  const ocrDataRead = useOcrDataRead()
  const ocrDataNonEncrypted = useOcrDataNonEncrypted()
  const receipt = useReceipt()
  const timeStore = useTimeStore()
  const formData = useFormData()

  const body = {
    // NOTE: Why do we need to pass all this data to the BE?, BackEnd should never trust Frontend :), I believe BE should get most of this data from session
    play: {
      first_name_play: userProfile.userData.first_name_player || 'first_name_player',
      last_name_play: userProfile.userData.last_name_player || 'last_name_player',
      username_play: userProfile.userData.username_player || 'username_player',
      player_token_play: userProfile.userData.player_token_player || 'player_token_player',
      front_picture_play: ocrDataNonEncrypted.value.front || '',
      rear_picture_play: ocrDataNonEncrypted.value.rear || '',
      receipt_date_play: dayjs(receipt.value.date, 'DD/MM/YYYY').format('YYYY-MM-DD') || dayjs(values.date).format('YYYY-MM-DD'),
      receipt_time_play: receipt.value.time ? `${receipt.value.time}:00` : '00:00:01',
      receipt_amount_play: values.amount.includes(',') ? values.amount : Number(values.amount).toFixed(2),
      receipt_number_play: values.number,
      support_id_play: userProfile.userData.support_id_player,
      play_specification_play: 2, // NOTE: How does this work?
    },
    supreme: {
      receipt_date_play: dayjs(receipt.value.date, 'DD/MM/YYYY').format('YYYY-MM-DD') || dayjs(values.date).format('YYYY-MM-DD'), // timeStore.value.now.format('YYYY-MM-DD')
      receipt_time_play: receipt.value.time ? `${receipt.value.time}:00` : '00:00:01',
      receipt_amount_play: values.amount.includes(',') ? values.amount : Number(values.amount).toFixed(2),
      receipt_number_play: values.number || timeStore.now?.valueOf(),
    },
    receipt: {
      player_token_receipt: userProfile.userData.player_token_player,
      front_url_receipt: ocrDataNonEncrypted.value.front,
      rear_url_receipt: ocrDataNonEncrypted.value.rear,
      status_receipt: 600, // NOTE: How does this work? */
      response_ocr_receipt: hasOcr ? ocrDataRead.value : '',
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
      email_player: userProfile.userData.username_player || 'email_player',
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
    product: formData.value.product,
    /*
    email: {
      customReplacement: {
        win_image: 'sdfsd'
      },
    }, */
    // xkeyID: generateKeyId(),
  }

  const { status, data, valid } = await useFetchCall('play/web', { body })

  const message = data.message as IPlay

  if (valid) {
    if (message.result_play < 400 || message.result_play > 404) {
      // dispatch modal
      popupErrorCode(message.result_play)
    } else {
      // Redirect the user to the outcome page
      await router.push({
        name: 'play-outcome-code',
        params: { code: encrypt(message.practice_code_play) },
      })
    }
  }

  return { status, data, valid }
}
