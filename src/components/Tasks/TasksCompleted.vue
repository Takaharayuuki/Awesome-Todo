<template>
  <q-list
    separator
    bordered
    v-if="Object.keys(tasksCompleted).length" >
    <!-- Object.keys(tasks).length =>  tasksのkeyが一個もない場合表示しない -->
    <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key">
    </task>
  </q-list>
</template>

<script>

export default {
  name: 'TasksCompleted',
  props: [
    'tasksCompleted'
  ],
  components: {
    task: require("components/Tasks/Task.vue").default,
  }
}
</script>
