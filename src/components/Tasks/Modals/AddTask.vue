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

        <!-- インプット フィールド -->
        <div class="row q-mb-sm">
          <q-input
            ref="inputName"
            class="col"
            outlined
            v-model="taskToSubmit.name"
            label="Task name"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>

        <!-- データピッカー -->
        <div class="row q-mb-sm">
          <q-input label="Due date" outlined v-model="taskToSubmit.dueDate">
            <template v-slot:append>
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

        <!-- タイムピッカー -->
        <div class="row q-mb-sm">
          <q-input label="Due time" outlined v-model="taskToSubmit.dueTime">
            <template v-slot:append>
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
    }
  }
};
</script>
