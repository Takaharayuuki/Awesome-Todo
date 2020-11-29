<template>
  <q-page class="q-pa-md">

    <tasks-todo
    :tasksTodo="tasksTodo"
    />

    <hr>

    <tasks-completed
    :tasksCompleted="tasksCompleted"
    />

    <div class="absolute-bottom text-center q-mb-xl">
      <!-- タスクの追加ボタン -->
      <q-btn
        round
        color="primary"
        size="24px"
        icon="add"
        @click="showAddTask = true" />
        <!-- showAddTaskがtrueになるとq-dialogの<add-task>が表示される -->
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
      <!-- AddTask.vueの this.$emit('close') で　@close が発火してAddTaskモーダルが非表示になる -->
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'PageTodo',
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo","tasksCompleted"]),
  },
  components: {
    "task": require("components/Tasks/Task").default,
    "add-task": require("components/Tasks/Modals/AddTask").default,
    "tasks-todo": require("components/Tasks/TasksTodo").default,
    "tasks-completed": require("components/Tasks/TasksCompleted").default,
  },
};
</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>
