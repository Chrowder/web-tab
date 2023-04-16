<script setup>
import { isEqual } from 'lodash'
import cls from 'classnames'
import { useNLS } from '../../base/hooks/nls';
import { useContextMenu } from '../../base/services/contextmenu/contextmenu'
const props = defineProps({ menu: Object })

const { localize } = useNLS()
const { hide } = useContextMenu()

const layoutOptions = [
  { lable: '1x1', value: [1, 1] },
  { lable: '1x2', value: [1, 2] },
  { lable: '2x1', value: [2, 1] },
  { lable: '2x2', value: [2, 2] },
  { lable: '2x4', value: [2, 4] },
]

const handleLayoutChange = (option) => {
  props.menu?.onClick(option.value)
  hide()
}

const calcClassname = (option) => cls("contextmenu-layout-value", { checked: isEqual(props.menu?.value, option.value) })

</script>

<template>
  <div class="contextmenu-layout">
    <div class="contextmenu-layout-title">
      {{ localize('contextMenu.icon.layout') }}
    </div>
    <div class="contextmenu-layout-options">
      <div v-for="option of layoutOptions" @click="() => handleLayoutChange(option)" :class="calcClassname(option)">
        {{ option.lable }}
      </div>
    </div>
  </div>
</template>

<style>
.contextmenu-layout {
  width: 130px;
  border-radius: 4px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.contextmenu-layout-title {
  margin-bottom: 4px;
}

.contextmenu-layout-options {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.contextmenu-layout-value {
  width: 36px;
  text-align: center;
  border-radius: 12px;
  text-align: center;
  margin: 0 2px 4px;
  cursor: pointer;
  float: left;
  transition: background-color .25s;
  background-color: #ffffff1a;
}
</style>