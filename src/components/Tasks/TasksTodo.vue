<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top">
    <div :class="{ 'q-mb-lg' : !settings.showTasksInOneList }">
      <list-header
        v-if="!settings.showTasksInOneList"
        bgColor="bg-orange-4">Todo</list-header>
      <q-list
        separator
        bordered>

        <!-- Object.keys(tasks).length =>  tasksのkeyが一個もない場合表示しない -->
        <task
          v-for="(task, key) in tasksTodo"
          :key="key"
          :task="task"
          :id="key">
        </task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "TasksTodo",
  props: ["tasksTodo"],
  computed: {
    ...mapGetters('settings',['settings'])
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Tasks/Modals/Shared/ListHeader").default,
  },
};
</script>
