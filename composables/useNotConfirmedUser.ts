import { SweetAlertConfirm, SweetAlertFeedback } from '~/utils/Swal'

export default function (username_player: string) {
  SweetAlertConfirm.fire({
    title: 'Non hai ricevuto l\'e-mail ?',
    text: 'Segui le indicazioni ricevute nella mail di conferma registrazione per confermare il tuo account...',
    confirmButtonText: 'INVIA NUOVA E-MAIL',
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      return await useFetchCall('resendEmailForUser', {
        body: {
          username_player,
          from: 'new_registration_email',
        },
      })
    },
  }).then(({ value }: Record<string, any>) => {
    if (value?.valid) {
      SweetAlertFeedback.fire({
        icon: value.valid ? 'success' : 'error',
        title: value.valid ? 'E-mail inviata con successo' : `Oops... ${value.data.message}`,
      }).then(() => {})
    }
  })
}
