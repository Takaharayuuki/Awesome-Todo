<template>
  <!-- タスクの追加ダイアログ -->
  <q-card>
  <modal-header>Edit Task</modal-header>
  <!-- slotの中にAdd Taskが入る -->

    <!-- フォーム -->
    <q-form @submit="submitForm"  class="q-gutter-md">
      <q-card-section>

      <!-- タスク名入力欄 -->
      <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName" />

        <!-- 日付入力欄 -->
        <modal-due-date :dueDate.sync="taskToSubmit.dueDate" @clear="clearDueDate"/>

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
import { mapActions } from 'vuex'
import mixinAddEditTask from '../../../mixins/mixin-add-edit-task';

export default {
  name: 'EditTask',
  mixins: [mixinAddEditTask],
  props: [
    'task', 'id'
  ],
  data() {
    return {
      taskToSubmit: {
      },
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitTask() {
      console.log('submit完了');
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      })
      this.$emit('close')
    }
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task)
  },
};
</script>
