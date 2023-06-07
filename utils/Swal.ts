import Swal from 'sweetalert2'

export const SweetAlertConfirm = Swal.mixin({
  buttonsStyling: false,
  icon: 'info',
  showCancelButton: true,
  cancelButtonText: 'CHIUDI',
  showLoaderOnConfirm: true,
  preConfirm () {},
  allowOutsideClick: () => !Swal.isLoading(),
  backdrop: true,
})

export const SweetAlertFeedback = Swal.mixin({
  buttonsStyling: false,
  icon: 'success',
})
