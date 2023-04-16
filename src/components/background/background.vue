<script setup>
import { computed } from 'vue'
import { useStyle } from '../../base/services/style'
import { useBackground } from '../../base/services/background'
import cls from 'classnames'

const { style } = useStyle()
const { background } = useBackground()

const blur = computed(() => `${style.background.blur}px`)
const opacity = computed(() => style.background.opacity / 100)
const imageUrl = computed(() => background.url)
const classname = computed(() => cls("background-image", { loading: background.loading }))

</script>

<template>
  <div class="background">
    <div :class="classname" :style="{ backgroundImage: `url(${imageUrl})` }" />
    <div class="background-mask" />
  </div>
</template>


<style>
.background {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.background-image.loading {
  transform: scale(1.1);
}

.background-image,
.background-mask {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.background-image {
  transform-origin: center;
  background-size: cover;
  transition: transform 0.3s;
}


.background-mask {
  backdrop-filter: blur(v-bind("blur"));
  background-color: rgba(0, 0, 0, v-bind(opacity));
  z-index: 2;
}
</style>