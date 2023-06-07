import { useState } from 'nuxt/app'
import { useUserProfile } from '~/store/user-profile'
import type { IFormShipment } from '~/types/forms'

export const useFormShipment = () => (
  useState<IFormShipment>('formShipment', () => {
    const userProfile = useUserProfile()

    return {
      player_token_manage_play: userProfile.userData.player_token_player,
      practice_code_manage_play: '',
      shipping_address_manage_play: '',
      shipping_city_manage_play: '',
      shipping_civic_number_manage_play: '',
      shipping_first_name_manage_play: '',
      shipping_last_name_manage_play: '',
      shipping_notes_manage_play: '',
      shipping_phone_manage_play: '',
      shipping_province_manage_play: '',
      shipping_zip_manage_play: '',
    }
  }))
