<template>
  <q-layout view="hHh lpR fFf">
    <!-- ヘッダー -->
    <q-header elevated>
      <q-toolbar>
        <!-- タイトル -->
        <q-toolbar-title class="absolute-center">
          高原 Todo
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          class="absolute-right"
          icon-right="account_circle"
          label="ログイン" />

        <q-btn
          v-else
          @click="logoutUser"
          flat
          class="absolute-right"
          icon-right="account_circle"
          label="ログアウト" />

      </q-toolbar>
    </q-header>
    <!-- フッター -->
    <q-footer>
      <q-tabs>
       <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label" />
      </q-tabs>

    </q-footer>
    <!-- ドロワーメニュー -->
    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <!-- ドロワータイトル -->
       <q-item-label
          header
          class="text-grey-4">Navigation</q-item-label>

        <!-- ドロワーアイテム -->
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          clickable
          :to="nav.to"
          class="text-grey-4">
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Layout',
  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: 'Todo',
          icon: 'list',
          to: '/'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        },
      ]
    }
  },
  computed: {
    ...mapState('auth',['loggedIn'])
  },
  methods: {
    ...mapActions('auth',['logoutUser'])
  },
}
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 768px){
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>
