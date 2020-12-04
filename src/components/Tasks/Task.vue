<template>
  <q-item
    @click="updateTask({ id: id, updates: { completed: !task.completed }})"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-touch-hold:1000.mouse="showEditTaskModal"
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed"
      class="no-pointer-events"/>
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough': task.completed }"
        >{{ task.name }}</q-item-label
      >
    </q-item-section>

    <q-item-section v-if="task.dueDate" side top>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">
            {{ task.dueDate }}
          </q-item-label>
          <q-item-label caption class="row justify-end">
            <small>
              {{ task.dueTime }}
            </small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side top>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat
          round
          dense
          color="primary"
          icon="edit" />
      <q-btn
          @click.stop="promptToDelete(id)"
          flat
          round
          dense
          color="red"
          icon="delete" />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task  @close="showEditTask = false"
      :task="task"
      :id="id"/>
    </q-dialog>

  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Task',
  props: ['task', 'id'],
  data() {
    return {
      showEditTask: false
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask','deleteTask']),
    showEditTaskModal() {
      this.showEditTask = true
    },
    promptToDelete(id) {
      // 削除確認ダイアログ
      this.$q.dialog({
        title: 'confilm',
        message: 'Realy Delete?',
        ok: {
          push: true
        },
        cancel: {
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.deleteTask(id)
      })
    },
  },
  components: { "edit-task": require("components/Tasks/Modals/EditTask").default, },
}
</script>

<style>
</style>
