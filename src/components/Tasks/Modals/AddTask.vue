<template>
  <!-- タスクの追加ダイアログ -->
  <q-card>
  <modal-header>Add Task</modal-header>
  <!-- slotの中にAdd Taskが入る -->

    <!-- フォーム -->
    <q-form @submit="submitForm"  class="q-gutter-md">
      <q-card-section>

      <!-- タスク名入力欄 -->
      <modal-task-name :name.sync="taskToSubmit.name" />

        <!-- 日付入力欄 -->
        <modal-due-date :date.sync="taskToSubmit.dueDate" @clear="clearDueDate"/>

        <!-- 時間入力欄 -->
        <div v-if="taskToSubmit.dueDate" class="row q-mb-sm">
          <!-- v-if="taskToSubmit.dueDate" => 日付を入力しないと非表示にする -->
          <q-input label="Due time" outlined v-model="taskToSubmit.dueTime" class="col">
            <template v-slot:append>
               <q-icon
                v-if="taskToSubmit.dueTime"
                name="close"
                @click="taskToSubmit.dueTime = ''"
                class="cursor-pointer" />
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <!-- 保存ボタン -->
      <q-card-section align="right">
        <q-btn
          label="Save"
          color="primary"
          type="submit"
          />
      </q-card-section>

      <pre>{{ taskToSubmit }}</pre>

    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import ModalHeader from './Shared/ModalHeader.vue';
import ModalTaskName from './Shared/ModalTaskName.vue';
import ModalDueDate from './Shared/ModalDueDate.vue';

export default {
  name: 'AddTask',
  components: { ModalHeader, ModalTaskName, ModalDueDate },
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false,
      },
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitForm() {
      console.log('submitForm');
      this.$refs.inputName.validate()
      if(!this.$refs.inputName.hasError) {
        this.submitTask()
      }
    },
    submitTask() {
      console.log('submit完了');
      this.addTask(this.taskToSubmit)
      this.$emit('close')
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = ''
      this.taskToSubmit.dueTime = ''
    }
  }
};
</script>
