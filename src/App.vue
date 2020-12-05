<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

  export default {
    name: 'App',
    methods: {
      ...mapActions('settings', ['getSettings'])
    },
    mounted() {
      this.getSettings();
    }
  }
</script>
