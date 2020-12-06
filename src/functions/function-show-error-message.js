import { Dialog, Loading } from 'quasar'

export function showErrorMessage(errorMessage) { //? export functiion 関数を送れる 使用できる
  Loading.hide()
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })
}
