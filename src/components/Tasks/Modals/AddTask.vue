<template>
  <!-- タスクの追加ダイアログ -->
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>

    <!-- フォーム -->
    <q-form @submit="submitForm"  class="q-gutter-md">
      <q-card-section>

        <!-- タスク名入力欄 -->
        <div class="row q-mb-sm">
          <q-input
            ref="inputName"
            class="col"
            outlined
            v-model="taskToSubmit.name"
            label="Task name"
            :rules="[(val) => !!val || 'Field is required']"
            autofocus
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.name"
                name="close"
                @click="taskToSubmit.name = ''"
                class="cursor-pointer" />
            </template>
          </q-input>

        </div>

        <!-- 日付入力欄 -->
        <div class="row q-mb-sm">
          <q-input label="Due date" outlined v-model="taskToSubmit.dueDate">
            <template v-slot:append>
               <q-icon
                v-if="taskToSubmit.dueDate"
                name="close"
                @click="clearDueDate"
                class="cursor-pointer" />
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="taskToSubmit.dueDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

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

    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
