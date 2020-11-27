<template>
  <q-card-section class="row">
    <div class="text-h6">
      <slot></slot><!-- モーダルのタイトルが入る -->
    </div>
    <q-space />
    <q-btn
      v-close-popup
      flat
      round
      dense
      icon="close" />
  </q-card-section>
</template>

<script>
export default {
  name: 'ModalHeader',

}
</script>

<style lang="scss" scoped>

</style>
