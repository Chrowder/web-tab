<script setup>
import { provide, ref, useSlots, computed, toRef, onUpdated } from 'vue'
import { tabInjectKey } from './interface'
import { useMergedState } from '../../hooks/use-merged-state'
import Tab from './tab.vue'

const props = defineProps(['value'])
const emit = defineEmits(['update:value'])

const slots = useSlots()

const navs = computed(() => {
  const children = slots.default()
  return children?.map(child => {
    return {
      name: child.props.name,
      tab: child.props.tab,
    }
  })
})

const controlledValue = toRef(props, 'value')
const unContolledValue = ref(controlledValue.value ?? navs.value.length ? navs.value[0].tab : undefined)
const mergedValue = useMergedState(controlledValue, unContolledValue)

const activeTab = (tab) => {
  emit('update:value', tab)
  unContolledValue.value = tab
}

provide(tabInjectKey, {
  mergedValue,
  activeTab
})

</script>

<template>
  <div class="tabs">
    <div class="tabs-nav">
      <div class="tabs-tab">
        <Tab v-for="nav of navs" :name="nav.name" :tab="nav.tab" />
      </div>
    </div>
    <div class="tabs-panes">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.tabs {
  width: 100%;
  display: flex;
}

.tabs-nav {
  flex-shrink: 0;
  width: 150px;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
}

.tabs-tab {
  width: 100%;
  height: 100%;
}

.tabs-panes {
  border-radius: 8px;
  background-color: var(--bg-color);
  padding: 12px 8px;
  flex-grow: 1;
}
</style>