import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import 'dayjs/locale/it'

dayjs.locale('it-IT')
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dayjs,
    },
  }
})
