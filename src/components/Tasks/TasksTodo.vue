<template>
  <div class="q-mb-lg">
    <list-header bgColor="bg-orange-4">Todo</list-header>
    <q-list separator bordered>

      <!-- Object.keys(tasks).length =>  tasksのkeyが一個もない場合表示しない -->
      <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key">
      </task>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "TasksTodo",
  props: ["tasksTodo"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Tasks/Modals/Shared/ListHeader").default,
  },
};
</script>
