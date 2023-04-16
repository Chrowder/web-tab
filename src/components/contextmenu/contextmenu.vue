<script setup>
import { computed } from '@vue/reactivity';
import { useContextMenu } from '../../base/services/contextmenu/contextmenu';
import { MenuItemType } from '../../base/services/contextmenu/common'
import { onMounted, ref } from 'vue';
import Separator from './separator.vue'
import MenuItem from './item.vue'
import Layout from './layout.vue'
import cls from 'classnames'
import { isNil } from 'lodash';

const ComponentsMap = {
  [MenuItemType.Separator]: Separator,
  [MenuItemType.Normal]: MenuItem,
  [MenuItemType.Layout]: Layout
}

const { menu, hide } = useContextMenu()

const contextMenuRef = ref()

const classname = computed(() => cls('contextmenu', { active: menu.show }))
const style = computed(() => ({ top: `${menu.position.y}px`, left: `${menu.position.x}px` }))
const menus = computed(() => menu.menus.filter(item => isNil(item.show) ? true : item.show))

const registerEvent = () => {
  const onDocumentClick = (event) => {
    if (contextMenuRef.value) {
      const target = event.target
      if (contextMenuRef.value.contains(target)) {
        return
      }
      hide()
    }
  }
  window.addEventListener('mouseup', onDocumentClick, true)
}

onMounted(registerEvent)

</script>

<template>
  <div :class="classname" :style="style" ref="contextMenuRef">
    <div class="contextmenu-item-wrapper">
      <component v-for="menu of menus" :menu="menu" :is="ComponentsMap[menu.type]"></component>
    </div>
  </div>
</template>

<style>
.contextmenu {
  position: absolute;
  background-color: black;
  display: none;
  z-index: 10;
  backdrop-filter: blur(8px);
  box-shadow: #00000080 0 10px 30px;
  background-color: #0b0b0bcc;
  border-radius: 8px;
  border: 1px solid rgba(11, 11, 11, .2);
  padding: 5px 4px;

}

.contextmenu.active {
  display: block;
  animation: scale .2s both;
  transform-origin: 0% 0%;
}



@keyframes scale {
  0% {
    transform: scale(0);
    opacity: 0
  }

  60% {
    transform: scale(1.03);
    opacity: 1
  }

  to {
    transform: scale(1)
  }
}
</style>