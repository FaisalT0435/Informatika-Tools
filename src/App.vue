<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui';
import { darkThemeOverrides, lightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';
import VantaBackground from './components/VantaBackground.vue';
import { useI18n } from 'vue-i18n';
import { useStorage, syncRef } from '@vueuse/core';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

const theme = computed(() => (styleStore.isDarkTheme ? darkTheme : null));
const themeOverrides = computed(() => (styleStore.isDarkTheme ? darkThemeOverrides : lightThemeOverrides));

const { locale } = useI18n();
syncRef(locale, useStorage('locale', locale));
</script>

<template>
  <VantaBackground />
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style>
body, html {
  min-height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* === GLOBAL TEXT STYLE: AUTOMATIC DARK/LIGHT === */
body[data-theme='dark'], .dark, .vanta-dark ~ * {
  /* color: #fff !important; */
  color: #222 !important;
  font-weight: bold !important;
}
body[data-theme='light'], .light, .vanta-light ~ * {
  /* color: #222 !important; */
  color: #fff !important;
  font-weight: bold !important;
}

/* Naive UI boxes, card, modal, sidebar, dst */
.n-card, .n-modal, .n-layout, .n-layout-content, .n-message, .n-notification,
.box, .custom-box, .n-layout-sider, .n-menu, .sidebar-menu {
  backdrop-filter: blur(2.5px);
  font-weight: bold !important;
}

.n-card-header, .n-modal-header, h1, h2, h3, .main-title {
  color: inherit !important;
  font-weight: 700;
  text-shadow: 0 2px 12px rgba(0,0,0,0.21);
}
.n-card-content, .n-modal-content, .main-desc, .subtitle {
  color: inherit !important;
}

.n-menu-item, .sidebar-menu-item {
  color: inherit !important;
}

/* Tooltip, Popover, Table, dll */
.n-tooltip, .n-popover {
  background: rgba(36,53,78,0.97) !important;
  color: inherit !important;
  border-radius: 8px;
}
.n-table-th, .n-table-td {
  color: inherit !important;
}
</style>
