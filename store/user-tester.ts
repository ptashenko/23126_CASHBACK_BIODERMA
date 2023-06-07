import type { RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'

interface IState {
  secret: RemovableRef<string>
  userTestIsAuth: boolean
}

export interface ILoginFormTester {
  username: string
  password: string
}

export const useUserTester = defineStore({
  id: 'userTester',
  state: () => <IState>({
    secret: useStorage('trusted', ''), // useStorage<string>('trusted', ''),
    userTestIsAuth: false,
  }),
  actions: {
    async login (body: ILoginFormTester) {
      await useFetch('/api/sign-in-staging', {
        method: 'POST',
        body,
      })
        .then(({ data }) => {
          this.userTestIsAuth = !!data.value?.valid
          // if (data.value?.valid) {
          if (body.username === 'tester' && body.password === 'sdfh456ybw5se5scvg') {
            localStorage.setItem('trusted', body.password)
            useRouter().push('/')
            window.location.reload()
            this.secret = body.password
          } else {
            SweetAlertFeedback.fire({
              icon: 'warning',
              text: 'Credenziali Errati!',
            })
          }
        })
        .catch(() => {
          SweetAlertFeedback.fire({
            icon: 'error',
            text: 'Credenziali Errati!',
          })
        })
    },
  },
  getters: {
    isAuth: state => state.userTestIsAuth ||
      localStorage.getItem('trusted') === 'sdfh456ybw5se5scvg', // TODO: find a way to handle this value dynamically
  },
})
