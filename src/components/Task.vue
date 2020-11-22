<template>
  <li>
    <div>{{ task.name }} {{ index }}</div>
    <small>{{ task.duDate }} @ {{ task.dueTime }}</small>
    <button @click="deleteTask(index)">x</button>
  </li>
</template>

<script>
export default {
  props: ['task','index']
}
</script>
<style lang="scss" scoped>

</style>
