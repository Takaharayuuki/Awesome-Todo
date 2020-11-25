<template>
  <q-page class="q-pa-md">
    <q-list
      separator
      bordered
      v-if="Object.keys(tasks).length" >
      <!-- Object.keys(tasks).length =>  tasksのkeyが一個もない場合表示しない -->
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key">
      </task>
    </q-list>

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
import Task from "src/components/Tasks/Task.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasks"]),
  },
  components: {
    task: require("components/Tasks/Task").default,
    "add-task": require("components/Tasks/Modals/AddTask").default,
  },
};
</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>
