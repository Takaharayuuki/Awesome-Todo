<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key">
      </task>
    </q-list>

    <div class="absolute-bottom text-center q-mb-xl">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
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
