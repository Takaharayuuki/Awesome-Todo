<template>
  <q-page class="q-pa-md">
    <!-- 検索バー -->
    <div class="row q-mb-lg">
      <search/>
    </div>

    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No search results...</p>

    <!-- タスクがない場合 -->
    <no-tasks
    class="q-mb-lg"
    v-if="!Object.keys(tasksTodo).length && !search"
    @showAddTask="showAddTask = true"
    />

    <!-- 未完了のタスク一覧 -->
    <tasks-todo
    v-if="Object.keys(tasksTodo).length"
    :tasksTodo="tasksTodo"
    />

    <!-- 済みのタスク一覧 -->
    <tasks-completed
    v-if="Object.keys(tasksCompleted).length"
    :tasksCompleted="tasksCompleted"
    />

    <!-- タスクの追加ボタン -->
    <div class="absolute-bottom text-center q-mb-xl">
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
import { mapGetters, mapState } from "vuex";

export default {
  name: 'PageTodo',
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo","tasksCompleted"]),
    ...mapState('tasks',['search'])
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    "task": require("components/Tasks/Task").default,
    "add-task": require("components/Tasks/Modals/AddTask").default,
    "tasks-todo": require("components/Tasks/TasksTodo").default,
    "tasks-completed": require("components/Tasks/TasksCompleted").default,
    "no-tasks": require("components/Tasks/NoTasks").default,
    "search": require("components/Tasks/Tools/Search").default
  },
};
</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>
