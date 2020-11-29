<template>
  <q-list
    separator
    bordered
    v-if="Object.keys(tasksTodo).length" >
    <!-- Object.keys(tasks).length =>  tasksのkeyが一個もない場合表示しない -->
    <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key">
    </task>
  </q-list>
</template>

<script>

export default {
  props: [
    'tasksTodo'
  ],
  components: {
    task: require("components/Tasks/Task.vue").default,
  }

}
</script>
