import { defineStore } from 'pinia'
import type { Dayjs } from 'dayjs'
import type { IDragonConfig } from '~/types/types'

const { START_DATE, STOP_DATE, WIZARD_HAS_TIME_FOR_PLAY, WIZARD_OPEN_TIME_PLAY, WIZARD_CLOSE_TIME_PLAY }: IDragonConfig = decrypt(dragonConfig)
interface IState {
  now: Dayjs | undefined
  status: string
  diff: number
}

export const useTimeStore = defineStore({
  id: 'timeStore',
  state: () => <IState>({
    now: undefined,
    status: 'init',
    diff: 0,
  }),
  actions: {
  },
  getters: {
    ifStart: state => state.now && dateIsBefore(START_DATE, state.now),
    ifEnd: state => state.now && dateIsBefore(STOP_DATE, state.now),
    ifTime: state => !WIZARD_HAS_TIME_FOR_PLAY || (state.now && dateIsAfter(state.now.format('YYYY-MM-DD') + ' ' + WIZARD_CLOSE_TIME_PLAY + ':00:00', state.now) && dateIsBefore(state.now.format('YYYY-MM-DD') + ' ' + WIZARD_OPEN_TIME_PLAY + ':00:00', state.now)),
  },
})
