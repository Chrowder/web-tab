<script setup>
import Card from '../../base/ui/card/card.vue'
import Slider from '../../base/ui/slider/slider.vue'
import { useStyle } from '../../base/services/style'
import { useBackground } from '../../base/services/background';
import { computed } from 'vue';
import { useNLS } from '../../base/hooks/nls';

const { style } = useStyle()
const { background } = useBackground()
const { localize } = useNLS()

const imageUrl = computed(() => background.url)

</script>

<template>
  <Card>
    <div class="background-config-card">
      <div class="background-config-title">{{ localize('config.background.title') }}</div>
      <div class="background-config-image" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <Slider :title="localize('config.background.blur')" v-model:value="style.background.blur" :max="40"></Slider>
      <Slider :title="localize('config.background.opacity')" v-model:value="style.background.opacity"
        :value-formatter="(value) => `${value}%`"></Slider>
    </div>
  </Card>
</template>

<style>
.background-config-card {
  padding: 12px;
}

.background-config-title {
  height: 32px;
  line-height: 32px;
}

.background-config-image {
  height: 160px;
  border-radius: 4px;
  margin-bottom: 8px;
  background-size: cover;
}
</style>