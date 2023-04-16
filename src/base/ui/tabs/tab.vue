<script setup>
import { defineProps, toRefs, inject, computed, onUpdated } from 'vue'
import { tabInjectKey } from './interface';
import cls from 'classnames'


const { activeTab, mergedValue } = inject(tabInjectKey)

const props = defineProps({ name: String, tab: [String, Number] })

const { name, tab } = toRefs(props)

const classname = computed(() => cls('tab', { active: mergedValue.value == tab.value }))

const handleTabClick = () => {
  activeTab(tab.value)
}
</script>

<template>
  <div :class="classname" @click="handleTabClick">
    <div class="tab-icon">{{ }}</div>
    <div class="tab-label">{{ name }}</div>
  </div>
</template>

<style>
.tab {
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  margin-top: 4px;
}

.tab:first-child {
  margin-top: 0;
}

.tab.active {
  color: var(--primary-color);
  background-color: var(--active-bg-color);
}

.tab:hover {
  background-color: var(--bg-color);
}
</style>