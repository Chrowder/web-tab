<script setup>
import { defineProps, toRefs } from 'vue'
import { NSwitch } from 'naive-ui'

const props = defineProps({
  title: String,
  value: Boolean,
  options: Array
})

const emit = defineEmits(['update:value'])

const { title, value, options } = toRefs(props)

const onValueChange = (value) => emit('update:value', value)

const calcClass = (option) => {
  if (value.value === option.value) {
    return 'checked'
  }
}


</script>

<template>
  <div class="switch">
    <div class="switch-label">{{ title }}</div>
    <div class="switch-box">
      <span v-if="options" :class="calcClass(options[0])">{{ options[0].label }}</span>
      <n-switch :value="value" size="small" @update-value="onValueChange"></n-switch>
      <span v-if="options" :class="calcClass(options[1])">{{ options[1].label }}</span>
    </div>

  </div>
</template>

<style>
.switch {
  height: 36px;
  display: flex;
  align-items: center;
}

.switch .switch-label {
  flex-shrink: 0;
  margin-right: 4px;
  width: 60px;
  flex-grow: 1;
}

.switch-box span {
  padding: 0 4px;
}

.switch-box span.checked {
  color: var(--primary-color);
}

.switch .switch-value {
  flex-shrink: 0;
  width: 40px;
  margin-left: 4px;
  text-align: right;
}
</style>