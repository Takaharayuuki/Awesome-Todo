<template>
  <div>
    <list-header
    bgColor="bg-green-4"
    >Completed</list-header>
    <q-list
      separator
      bordered　>
      <!-- Object.keys(tasks).length =>  tasksのkeyが一個もない場合表示しない -->
      <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key">
      </task>
    </q-list>
  </div>
</template>

<script>

export default {
  name: 'TasksCompleted',
  props: [
    'tasksCompleted'
  ],
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Tasks/Modals/Shared/ListHeader").default,
  }
}
</script>
