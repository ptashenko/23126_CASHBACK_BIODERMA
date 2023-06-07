import { defineStore } from 'pinia'

interface IPopupData {
  'id_popup': number,
  'code_popup': number,
  'description_popup': string,
  'json_configuration_popup_outcome': string,
  'active_json_popup_outcome': number,
  'modified_at_popup': string
}

interface IState {
  messages: IPopupData[]
}

export const usePopupMessages = defineStore({
  id: 'popupMessages',
  state: () => <IState>({
    messages: [],
  }),
  actions: {
    async getMessages () {
      const { valid, data } = await useFetchCall('createPopUp')

      if (valid) {
        this.messages = data.message as IPopupData[]
      }
    },
  },
})
