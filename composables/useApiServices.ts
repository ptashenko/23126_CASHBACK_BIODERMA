/* import axios from 'axios'
import { Routes } from '~/types/enums'
import { IProvince } from '~/types/types'
// import { SweetAlertFeedback } from '~/composables/utils/Swal'

const handleErrors = (text = '') => {
  console.log(text)
  /!* SweetAlertFeedback.fire({
    title: 'Opps, qualcosa è andata storta',
    text,
    icon: 'error',
  }) *!/
} */

// FixMe: implement Axios from Nuxt... const { $axios } = useNuxtApp() is not working right now
/* const axiosInstance = axios.create({
  baseURL: 'https://contestengine.ubiqubit.it/api',
  headers: {
    Authorization: 'Bearer 37a164b0982a431e4b56306c63bcaccb74d9367a',
    'Content-type': 'multipart/form-data;',
  },
}) */

export class ApiServices {
  /* async getProvinces (): Promise<IProvince[]> {
    return await axiosInstance.get(Routes.GET_PROVINCES)
      .then(({ data }) => (data ?? []))
      .catch(error => handleErrors(error))
  }

  async uploadImage (data: FormData): Promise<any> {
    return await axiosInstance.post(Routes.UPLOAD_IMAGES, data)
      .then(({ data }) => (data ?? {}))
      .catch(error => handleErrors(error))
  } */
}
