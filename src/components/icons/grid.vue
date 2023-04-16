<script setup>
import { toRefs, defineProps, inject, ref, onMounted } from 'vue';
import { useStyle } from '../../base/services/style'
import { computed } from '@vue/reactivity';
import { arrayMoveImmutable } from 'array-move'
import { remove } from 'lodash'
import { IconsInjectKey } from './interface'
import { IconType } from '../../base/services/icons'
import { useGlobal } from '../../base/hooks/global';
import { ContextMenuType } from '../../base/services/contextmenu/contextmenu';
import Icon from './icon.vue'
import Note from './note.vue'
import Add from './add.vue'
import Sortable from 'sortablejs'
import cls from 'classnames'


const props = defineProps({
  icons: Object
})

const IconMap = {
  [IconType.Note]: Note,
  [IconType.Link]: Icon
}

const { contextmenu } = useGlobal()

const { showModal } = inject(IconsInjectKey)

const gridRef = ref()
const sorting = ref()

const classname = computed(() => cls('icons-grid', { sorting: sorting.value }))

const { icons: group } = toRefs(props)

const onDragEnd = (event) => {
  const { oldIndex, newIndex } = event

  group.value.icons = arrayMoveImmutable(group.value.icons, oldIndex, newIndex)

  sorting.value = false
}

const onDragStart = () => {
  sorting.value = true
}

const onIconClick = (icon) => {
  if (icon.key === IconType.Add) {
    showModal()
  } else if (icon.type === IconType.Link && icon.url) {
    let url = icon.url
    if (!/https?:\/\//.exec(icon.url)) {
      url = `https://${icon.url}`
    }
    window.open(url)
  }
}


const onBeforeLeave = (target) => {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(target);
  if (target.style) {
    target.style.left = target.offsetLeft - parseFloat(marginLeft, 10) + "px"
    target.style.top = target.offsetTop - parseFloat(marginTop, 10) + "px"
    target.style.width = width
    target.style.height = height
  }

}

const onMouseup = (event, icon) => {
  contextmenu.updatePosition(event)
  setTimeout(contextmenu.show, 0, ContextMenuType.Icon, icon)
}

onMounted(() => {
  if (gridRef.value) {
    Sortable.create(gridRef.value, {
      animation: 300,
      onEnd: onDragEnd,
      onStart: onDragStart
    })
  }
})


</script>

<template>
  <div ref="gridRef" :class="classname">
    <transition-group name="flip" @before-leave="onBeforeLeave">
      <template v-for="icon of group.icons" :key="icon.name">
        <Icon v-if="icon.type === IconType.Link || icon.type === IconType.Add" :icon="icon" @icon-click="onIconClick"
          v-model:size="icon.size" @mouseup.right.capture.stop="(event) => onMouseup(event, icon)" />
        <Note v-else-if="icon.type === IconType.Note" :icon="icon" v-model:size="icon.size"
          @mouseup.right.capture.stop="(event) => onMouseup(event, icon)" />
      </template>

    </transition-group>
  </div>
</template>

<style>
.icons-grid {
  padding-top: 2vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--icon-size));
  grid-template-rows: repeat(auto-fill, var(--icon-size));
  grid-auto-flow: dense;
  grid-gap: var(--icon-gap-x) var(--icon-gap-y);
  justify-content: center;
}

.sorting .icons-item {
  transition-duration: 0s;
}
</style>