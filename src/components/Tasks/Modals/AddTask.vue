<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn 
      v-close-popup 
      flat
      round 
      dense 
      icon="close" />
    </q-card-section>

    <q-card-section >
     <q-input
     ooutlined
     v-model="text"
     label="Outlined"/>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn 
        flat 
        label="Save" 
        color="primary" 
        v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      taskToSubmit : {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  }
};
</script>