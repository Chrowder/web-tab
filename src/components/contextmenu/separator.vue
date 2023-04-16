<script setup>

const props = defineProps({ menu: Object })
</script>

<template>
  <div class="separator"></div>
</template>

<style>
.separator {
  height: 1px;
  width: 100%;
  background-color: var(--separator-color);
  margin: 4px 0;
}
</style>