<script setup>
import { NIcon } from 'naive-ui'
import { useContextMenu } from '../../base/services/contextmenu/contextmenu'

const props = defineProps({ menu: Object })

const { hide } = useContextMenu()

const onMenuItemClick = () => {
  props.menu.onClick?.()
  hide()
}

</script>

<template>
  <div @click="onMenuItemClick" class="contextmenu-item">
    <div>{{ menu.label }}</div>
    <div class="contextmenu-item-icon" v-if="menu.icon">
      <n-icon :component="menu.icon"></n-icon>
    </div>
  </div>
</template>

<style>
.contextmenu-item {
  width: 130px;
  height: 30px;
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  cursor: pointer;
}

.contextmenu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.contextmenu-item-icon {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>