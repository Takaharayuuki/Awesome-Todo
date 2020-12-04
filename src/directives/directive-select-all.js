export const selectAll = {
  inserted(el) {
    let input = el.querySelector('.q-field__native')
    input.addEventListener('focus', () => {
      console.log(input.value);
      if (input.value.length) {
        console.log(input);
        input.select()
      }
    })
  }
}