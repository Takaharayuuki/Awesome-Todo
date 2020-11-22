<template>
  <q-page class="q-gutter-lg">
    <input v-model="message" @keyup="handleKeyUp" />
    <button @click="clearText()">clear</button>
    <h5>{{ message }}</h5>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      message: 'I Love vue.js'
    }
  },
  methods: {
    clearText() {
      this.message = ""
    },
    handleKeyUp(e) {
      console.log(e);
    }
  }
}
</script>
