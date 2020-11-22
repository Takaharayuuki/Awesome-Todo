<template>
  <q-page padding>
    <ul>
      <Task
        v-for="(task, index) in tasks"
        :key="task.id"
        :task="task"
        :index="index" ></Task>
    </ul>
  </q-page>
</template>

<script>
import Task from 'components/Task.vue'

export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          name: 'Go to shop',
          duDate: '2019/05/12',
          dueTime: '18:30'
        },
        {
          id: 2,
          name: 'Get Banana',
          duDate: '2019/05/13',
          dueTime: '20:30'
        },
        {
          id: 3,
          name: 'Get Apples',
          duDate: '2019/05/14',
          dueTime: '16:00'
        }
      ]
    }
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index,1)
    }
  },
  components: {
    Task
  }
}
</script>

<style>

</style>
