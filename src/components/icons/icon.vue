<script setup>
import { toRefs, computed, ref } from 'vue';
import { useStyle } from '../../base/services/style'
import { ContextMenuType } from '../../base/services/contextmenu/contextmenu'
import cls from 'classnames'
import { IconImageType } from '../../base/services/icons';

const props = defineProps(['icon', 'size'])
const emit = defineEmits(['update:size', 'icon-click', 'delete'])

const { style } = useStyle()
const { icon, size } = toRefs(props)
const iconRef = ref()

const classname = () => {
  const sizeValue = size.value || [1, 1]
  return cls('icons-item', `size-${sizeValue[0]}-${sizeValue[1]}`)
}

const iconNameStyle = computed(() => ({ fontSize: `${style.icon.fontSize}px` }))

const calcBackground = (icon) => ({ backgroundColor: icon.backgroundColor ?? '#fff' })

const handleIconClick = () => {
  emit('icon-click', icon.value)
}

const iconUrl = computed(() => {
  if (icon.value.iconUrl) {
    return icon.value.iconUrl
  }
  return `https://files.codelife.cc/icons/${icon.value.key}.svg`
})

</script>

<template>
  <div ref="iconRef" :class="classname(icon)" @click="handleIconClick" :data-context-menu="ContextMenuType.Icon">
    <div class="icons-icon" :style="calcBackground(icon)">
      <div class="icons-icon-text" v-if="icon.iconType === IconImageType.Text">
        <span>{{ icon.iconText }}</span>
      </div>
      <img v-else :src="iconUrl" :alt="icon.name">
    </div>
    <div class="icons-name" :style="iconNameStyle" v-if="style.icon.showName">
      <span>{{ icon.name }}</span>
    </div>
  </div>
</template>
