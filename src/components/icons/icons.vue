<script setup>
import { computed, onMounted, provide, ref, toRef } from 'vue';
import { wait } from '../../base/common/promise'
import { useIcons } from '../../base/services/icons'
import { IconContainerUnit, useStyle } from '../../base/services/style'
import { useGlobal } from '../../base/hooks/global';
import { IconsInjectKey } from './interface'

import AddModal from './add.vue'
import Grid from './grid.vue'

const { icons, add, showAddModal, hideAddModal } = useIcons()
const { style } = useStyle()
const { isComponentLayout } = useGlobal()

const width = computed(() => {
  if (style.iconContainer.unit === IconContainerUnit.Px.value) {
    return `${style.iconContainer.width}px`
  }

  return `${style.iconContainer.width}%`
})

const viewRef = ref()
const viewBoxHeight = ref(0)
const modalShow = toRef(icons, 'showAddModal')

const Direction = {
  Top: 0,
  Bottom: 1
}

let scrollDuration = 300
let scrolling = false

const containerStyle = computed(() => {
  if (viewBoxHeight.value) {
    return {
      transition: `all ${scrollDuration / 1000}s`,
      transform: `translateY(${-icons.active * 100}%)`
    }
  }
})

const updateHeight = () => {
  if (viewRef.value) {
    viewBoxHeight.value = viewRef.value.clientHeight
  }
}

onMounted(updateHeight)

const scrollToNext = () => {
  if (icons.active === icons.groups.length - 1) {
    return
  }
  scrolling = true
  icons.active += 1
  wait(scrollDuration).then(() => scrolling = false)
}

const scrollToPrev = () => {
  if (icons.active === 0) {
    return
  }
  scrolling = true
  icons.active -= 1
  wait(scrollDuration).then(() => scrolling = false)
}

const onViewWhell = (event) => {
  if (viewRef.value && !scrolling) {
    const { deltaY } = event

    const direction = deltaY > 0 ? Direction.Bottom : Direction.Top

    if (direction === Direction.Bottom) {
      scrollToNext()
    } else {
      scrollToPrev()
    }
  }
}

provide(IconsInjectKey, {
  modalShow,
  showModal: showAddModal,
  hideModal: hideAddModal,
  addIcon: add
})

</script>

<template>
  <div class="icons">
    <div class="icons-view" v-if="isComponentLayout" @wheel="onViewWhell" ref="viewRef">
      <div class="icons-box" :style="containerStyle">
        <div class="view-box" v-if="viewRef" v-for="group of icons.groups" :key="group.name">
          <Grid :icons="group" />
        </div>
      </div>
    </div>
    <add-modal></add-modal>
  </div>
</template>

<style>
.icons {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 200px;
  flex-grow: 1;
}

.icons-view {
  width: v-bind(width);
  height: 100%;
  overflow: hidden;
  position: relative;
}

.icons-box {
  width: 100%;
  height: 100%;

}

.view-box {
  height: 100%;
  width: 100%;
}

.icons-item {
  height: var(--icon-size);
  width: var(--icon-size);
  border-radius: var(--icon-raduis);
  grid-column: span 1;
  grid-row: span 1;
  cursor: pointer;
  position: relative;
  transition-duration: 0.3s;
}


.icons-icon {
  pointer-events: none;
  height: 100%;
  width: 100%;
  border-radius: var(--icon-raduis);
  transition: all 0.3s;
  overflow: hidden;
  box-shadow: 0 0 5px #0000001a;
}

.icons-item:hover {
  box-shadow: 0 0 12px 3px #0003;
}

.icons-icon-text {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 500;
  color: #fff;
}

.icons-icon img {
  height: 100%;
  width: 100%;
}

.icons-name {
  pointer-events: none;
  width: 100%;
  margin-top: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--icon-color);
  white-space: nowrap;
}

.size-1-2 {
  grid-column: span 2;
  grid-row: span 1;
  width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 1);
  height: var(--icon-size);
}

.size-2-1 {
  grid-column: span 1;
  grid-row: span 2;
  width: var(--icon-size);
  height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 1);

}

.size-2-2 {
  grid-column: span 2;
  grid-row: span 2;
  width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 1);
  height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 1);
}

.size-2-4 {
  grid-column: span 4;
  grid-row: span 2;
  width: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 3);
  height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 1);
}

.flip-move {
  transition-duration: 0.3s;
  transition-timing-function: ease
}

.flip-enter-from,
.flip-leave-to {
  opacity: 0;
  transform-origin: center center;
  transform: scale(.1);
}

.flip-leave-active {
  position: absolute
}
</style>