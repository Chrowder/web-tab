<script setup>
import Card from '../../base/ui/card/card.vue'
import Slider from '../../base/ui/slider/slider.vue'
import Switch from '../../base/ui/radio/switch.vue'
import Color from '../../base/ui/color-picker/color-picker.vue'
import { IconContainerUnit, useStyle } from '../../base/services/style'
import { useIcons } from '../../base/services/icons'
import { computed, watch } from 'vue';
import { useNLS } from '../../base/hooks/nls'

const { style } = useStyle()
const { icons } = useIcons()
const { localize } = useNLS()

const pxFormatter = (value) => `${value}px`
const percentFormatter = (value) => `${value}%`

const sizeMax = computed(() => style.iconContainer.unit === IconContainerUnit.Px.value ? 2000 : 100)
const sizeMin = computed(() => style.iconContainer.unit === IconContainerUnit.Px.value ? 900 : 40)
const sizeFromatter = computed(() => style.iconContainer.unit === IconContainerUnit.Px.value ? pxFormatter : percentFormatter)

watch(() => style.iconContainer.unit, (value) => {
  if (value === IconContainerUnit.Px.value) {
    style.iconContainer.width = 1350
  } else {
    style.iconContainer.width = 72
  }
})

</script>

<template>
  <div class="icon-config">
    <Card>
      <div class="icon-config-card">
        <Slider :title="localize('config.icon.size')" v-model:value="style.icon.size" :max="130" :min="40" />
        <Slider :title="localize('config.icon.radius')" v-model:value="style.icon.radius" :max="style.icon.size / 2"
          :value-formatter="pxFormatter" />
      </div>
    </Card>

    <div class="icon-config-title mt20">{{ localize('config.icon.gap') }}</div>
    <Card>
      <div class="icon-config-card">
        <Slider :title="localize('config.icon.gap.row')" v-model:value="style.icon.gap.row" :max="100" :min="0" />
        <Slider :title="localize('config.icon.gap.column')" v-model:value="style.icon.gap.column" :max="100" :min="0"
          :value-formatter="pxFormatter" />
      </div>
    </Card>

    <div class="icon-config-title mt20">{{ localize('config.icon.name.title') }}</div>
    <Card>
      <div class="icon-config-card">
        <Switch :title="localize('config.icon.name')" v-model:value="style.icon.showName" />
        <Slider :title="localize('config.icon.name.size')" v-model:value="style.icon.fontSize" :max="20" :min="12"
          :value-formatter="pxFormatter" />
        <Color :title="localize('config.icon.name.color')" v-model:value="style.icon.color" :options="style.color.options"
          :allow-custom="true" />
      </div>
    </Card>

    <div class="icon-config-title mt20">{{ localize('config.icon.width') }}</div>
    <Card>
      <div class="icon-config-card">
        <Switch :title="localize('config.icon.width.unit')" v-model:value="style.iconContainer.unit"
          :options="[IconContainerUnit.Px, IconContainerUnit.Percent]" />
        <Slider v-model:value="style.iconContainer.width" :max="sizeMax" :min="sizeMin"
          :value-formatter="sizeFromatter" />
      </div>
    </Card>
  </div>
</template>

<style>
.icon-config-card {
  padding: 12px;
}


.icon-config-title {
  padding: 0 0 6px 12px;
  color: rgba(var(--alpha-color) .7);
}

.mt20 {
  margin-top: 20px;
}
</style>