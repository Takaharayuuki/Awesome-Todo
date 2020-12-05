<template>
  <q-page>

    <div class="q-pa-md absolute full-width full-height column">
      <!-- 検索バー -->
      <div class="row q-mb-lg">
        <search/>
        <sort />
      </div>

      <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No search results...</p>

      <q-scroll-area class="q-scroll-area-tasks">
        <!-- タスクがない場合 -->
        <no-tasks
        class="q-mb-lg"
        v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"
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
        class="q-mb-xl"
        />
      </q-scroll-area>


      <!-- タスクの追加ボタン -->
      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          round
          class="all-pointer-events"
          color="primary"
          size="24px"
          icon="add"
          @click="showAddTask = true" />
          <!-- showAddTaskがtrueになるとq-dialogの<add-task>が表示される -->
      </div>
    </div>


    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
      <!-- AddTask.vueの this.$emit('close') で @close が発火してAddTaskモーダルが非表示になる -->
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
    ...mapGetters("settings", ["settings"]),
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
    "search": require("components/Tasks/Tools/Search").default,
    "sort": require("components/Tasks/Tools/Sort").default
  },
};
</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}

.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
