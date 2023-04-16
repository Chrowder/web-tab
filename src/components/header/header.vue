<script setup>
import { computed } from 'vue';
import { useGlobal } from '../../base/hooks/global';

const { isComponentLayout } = useGlobal()

const style = computed(() => !isComponentLayout.value ? { height: '18vh' } : {})
</script>

<template>
  <div class="header" :style="style"></div>
</template>

<style>
.header {
  height: 11vh;
  width: 100%;
  transition: all 0.3s;
}
</style>