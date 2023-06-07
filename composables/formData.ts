import { useState } from 'nuxt/app'
import type { ITime } from '~/types/types'

interface IFormData {
  number: string
  date: Date | string | undefined
  formatted_date: string | undefined
  time: ITime,
  formatted_time: string
  amount_obj: {
    integer: string,
    decimal: string,
  },
  product: Object,
  count_product: number,
}

export const useTime = () => useState<ITime>('time', () => ({ HH: '', mm: '' }))
export const useFormData = () => useState<IFormData>('formData', () => ({
  number: '',
  date: '',
  formatted_date: '',
  time: { HH: '', mm: '' },
  formatted_time: '',
  amount_obj: {
    integer: '',
    decimal: '',
  },
  product: {},
  count_product: 0,
}))
