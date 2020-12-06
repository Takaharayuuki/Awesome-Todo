import { Dialog } from 'quasar'

export function showErrorMessage(errorMessage) { //? export functiion 関数を送れる 使用できる
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })

}
