<template>
  <!-- タスクの追加ダイアログ -->
  <q-card>
    <modal-header>Add Task</modal-header>
    <!-- slotの中にAdd Taskが入る -->

    <!-- フォーム -->
  <q-form
      @submit="submitForm"
      class="q-gutter-md">
      <q-card-section>
        <!-- タスク名入力欄 -->
        <modal-task-name
          :name.sync="taskToSubmit.name"
          ref="modalTaskName" />

        <!-- 日付入力欄 -->
      <modal-due-date
        :dueDate.sync="taskToSubmit.dueDate"
        @clear="clearDueDate" />

        <!-- 時間入力欄 -->
      <modal-due-time
         v-if="taskToSubmit.dueDate"
         :dueTime.sync="taskToSubmit.dueTime" />
      </q-card-section>

      <!-- 保存ボタン -->
      <modal-buttons />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from '../../../mixins/mixin-add-edit-task';

export default {
  name: "AddTask",
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false,
      },
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    },
  },
};
</script>
