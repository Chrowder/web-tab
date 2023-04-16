<script setup>
import { tabInjectKey } from './interface'
import { computed, inject, defineProps, toRefs, onUpdated } from 'vue';

const { mergedValue } = inject(tabInjectKey)
const props = defineProps({ name: String, tab: [String, Number] })

const { tab } = toRefs(props)

const show = computed(() => mergedValue.value === tab.value)
</script>

<template>
  <div class="tab-pane" v-if="show">
    <slot></slot>
  </div>
</template>

<style></style>