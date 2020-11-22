<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          to="/"
          icon="list"
          label="Todo" />
        <q-route-tab
          to="/settings"
          icon="settings"
          label="Settings" />
      </q-tabs>

    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <!-- ドロワータイトル -->
        <q-item-label header class="text-grey-8">Navigation</q-item-label>

        <!-- ドロワーアイテム -->
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Todo</q-item-label>
          </q-item-section>
        </q-item>

        <!-- ドロワーアイテム -->
        <q-item clickable to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'Layout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>
