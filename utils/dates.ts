// TODO: Document the functions and add the proper types if needed
// Start date validity of the receipt
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import type { IDragonConfig } from '~/types/types'
import { useTimeStore } from '~/store/time-store'

export const dateIsBefore = (date: string, limit: Dayjs) => {
  return dayjs(date).isBefore(limit)
}
export const dateIsAfter = (date: string, limit: Dayjs) => {
  return dayjs(date).isAfter(limit)
}
export const calcFromDate = (): Date => {
  const timeStore = useTimeStore()
  const { START_VALIDITY, DATEPICKER_MAX_DAYS }: IDragonConfig = decrypt(dragonConfig)

  // Get the receipt start date
  const start = dayjs(START_VALIDITY)
  // subtract the days from settings

  if (!timeStore.now) {
    throw new Error('There\'s something wrong with TimeStore')
  }

  const date = timeStore.now.subtract(Number(DATEPICKER_MAX_DAYS), 'days')

  // If the date from settings is after the calculated date return the start date
  return (start.isAfter(date) || !DATEPICKER_MAX_DAYS) ? start.toDate() : date.toDate()
}

// End date validity of the receipt
export const calcToDate = (): Date => {
  const timeStore = useTimeStore()
  const { STOP_VALIDITY }: IDragonConfig = decrypt(dragonConfig)

  // Get the stopDate from dragonConfig
  const stopDate = dayjs(STOP_VALIDITY)

  return (timeStore?.now?.isBefore(stopDate)) ? timeStore.now.toDate() : stopDate.toDate()
}
