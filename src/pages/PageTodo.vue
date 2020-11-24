<template>
  <q-page class="q-pa-md">
    <q-list
    separator
    bordered>
    <task
      v-for="(task, key) in tasks"
      :key="key"
      :task="task"
      :id="key">
    </task>

    </q-list>
  </q-page>
</template>

<script>
import Task from 'src/components/Tasks/Task.vue'
import { mapGetters } from 'vuex'


export default {
  computed: {
    ...mapGetters('tasks', ['tasks'])
  },
  components: {
    'task' : require('components/Tasks/Task').default
  }
}
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>
