<template>
  <!-- タスク名入力欄 -->
  <div class="row q-mb-sm">
    <q-input
      ref="inputName"
      class="col"
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task name"
      :rules="[(val) => !!val || 'Field is required']"
      v-select-all
      autofocus
    >
      <template v-slot:append>
        <q-icon
          v-if="name"
          name="close"
          @click="$emit('update:name', '')"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";

export default {
  name: "ModalTaskName",
  props: ["name"],
  directives: {
    selectAll,
  },
};
</script>

<style lang="scss" scoped>
</style>
