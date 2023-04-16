<script setup>
import { computed, onMounted } from 'vue';
import { useTime } from '../../base/services/time'
import { Layout, useStyle } from '../../base/services/style'

const { time, start } = useTime()
const { style } = useStyle()

const toggleLayout = () => {
  const layout = style.layout

  if (layout == Layout.Component) {
    style.layout = Layout.Simple
  } else {
    style.layout = Layout.Component
  }
}

const timeStyle = computed(() => ({ fontSize: `${style.time.size}px`, lineHeight: `${style.time.size}px` }))
const colorStyle = computed(() => ({ color: style.time.color }))

onMounted(start)

</script>

<template>
  <div class="time" v-if="style.time.show" :style="colorStyle">
    <div class="time-current" :style="timeStyle" @click="toggleLayout">{{ time.formatted }}</div>
    <div class="time-date">
      <span v-if="time.format.month">{{ time.date }}</span>
      <span v-if="time.format.week">{{ time.week }}</span>
    </div>
  </div>
</template>

<style>
.time {
  width: 100%;
  text-align: center;
  user-select: none;
}

.time-current {
  font-size: 72px;
  font-weight: 500;
}

.time-date {
  font-size: 14px;
}

.time-date span {
  margin: 0 4px;
}
</style>