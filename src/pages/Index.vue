<template>
  <q-page class="q-gutter-lg">
  <button style="position: absolute">
    {{ counter }}
  </button>

    <input v-model="message"
    @keyup.esc="clearText"
    @mouseenter="alertMessage"
    v-autoforcus
    :style="errorStyle"/>
    <button @click="clearText()">clear</button>

    <div>{{ message.length }}</div>

    <h5
      v-if="message.length"
      class="border-grey" >{{ message }}</h5>
    <h6 v-else>No Message entered</h6>

    <hr>

    <p>Uppercase message: {{ messageUppercase}}</p>
    <p>Lowercase message: {{ message | messageLowercase}}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      message: 'I Love vue.js',
      counter: 0
    }
  },
  computed: {
     messageUppercase() {
      return this.message.toUpperCase()
    },
    errorStyle() {
      if (this.message.length > 22) {
        return {
          'color' : 'red',
          'background' : 'pink'
        }
      }
    }
  },
  methods: {
    clearText() {
      this.message = ""
    },
    handleKeyUp(e) {
      console.log(e);
      if(e.keyCode === 8) {
        this.clearText()
      } else if(e.keyCode === 13) {
        this.alertMessage()
      }
    },
    alertMessage() {
      alert(this.message)
    },
  },
  filters: {
    messageLowercase(value) {
      return value.toLowerCase()
    }
  },
  directives: {
    autoforcus: {
      inserted(el) {
        console.log('input inserted');
        el.focus();
      }
    }
  }
}
</script>

<style>
  .border-grey {
    border: 1px solid grey;
  }

  .error {
    color: red;
    background: pink;
  }
</style>
