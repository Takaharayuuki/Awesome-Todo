<template>
  <q-input
    class="col"
    outlined
    v-model="searchField"
    label="Search">

    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer" />
      <q-icon name="search" />
    </template>

  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('tasks',['search']),

    searchField: {
      get() {
        return this.search
      },
      set(value) {
        console.log(value);
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['setSearch'])
  }
}
</script>

<style>

</style>