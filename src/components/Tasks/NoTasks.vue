<template>
  <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut absolute-top"
    >
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      No Tasks to do Today!
      <template v-slot:action>
        <q-btn
          @click="$root.$emit('showAddTask')"
          flat
          color="primary"
          label="add Task"
        />
      </template>
    </q-banner>
  </transition>
</template>

<script>
export default {};
</script>

<style>
</style>
