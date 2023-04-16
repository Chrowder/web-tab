<script setup>
import Card from '../../base/ui/card/card.vue'
import Slider from '../../base/ui/slider/slider.vue'
import { useStyle } from '../../base/services/style'
import { useSider, SiderBarPosition } from '../../base/services/sider'
import { useNLS } from '../../base/hooks/nls'
import cls from 'classnames'

const { style } = useStyle()
const { sider } = useSider()
const { localize } = useNLS()

const calcCalssname = (value) => cls('sider-position-item', { checked: value === sider.config.position })
const onPositionChange = (position) => sider.config.position = position

</script>

<template>
  <div class="sider-config">

    <Card>
      <div class="sider-config-card">
        <div class="sider-position">
          <div :class="calcCalssname(SiderBarPosition.Left)" @click="() => onPositionChange(SiderBarPosition.Left)">
            <div class="sider-position-radio left">
              <div class="sider-position-icon">
                <span></span>
              </div>
            </div>
            <div class="sider-position-label">
              {{ localize("config.sider.position.left") }}
            </div>
          </div>
          <div :class="calcCalssname(SiderBarPosition.right)" @click="() => onPositionChange(SiderBarPosition.right)">
            <div class="sider-position-radio right">
              <div class="sider-position-icon">
                <span></span>
              </div>
            </div>
            <div class="sider-position-label">
              {{ localize("config.sider.position.right") }}
            </div>
          </div>
        </div>
        <Slider :title="localize('config.sider.width')" v-model:value="style.sider.width" :max="130" :min="40" />
        <Slider :title="localize('config.sider.opacity')" v-model:value="style.sider.opacity" :max="100" :min="10"
          :value-formatter="(value) => `${value}%`" />
      </div>
    </Card>

  </div>
</template>

<style>
.sider-config-card {
  padding: 8px 16px;
}

.sider-position {
  padding: 10px 4px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(var(--alpha-color), .06);
  margin-bottom: 10px;
}

.sider-position-item {
  width: 46%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

.sider-position-item.checked .sider-position-label {
  color: #fff;
  background-color: var(--primary-color);
}

.sider-position-item.checked .sider-position-radio {
  background-color: rgba(24, 144, 255, 0.063);
}


.sider-position-label {
  margin-top: 8px;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  width: 50px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  transition: all 0.3s;
}

.sider-position-radio {
  width: 100%;
}

.sider-position-item.checked .sider-position-icon {
  border-color: var(--primary-color);
}

.sider-position-icon {
  border: var(--border-width, 2px) solid var(--border-color, transparent);
  color: var(--primary-color);
  transition: border .2s;
  width: 100%;
  height: 70px;
  border-radius: var(--raidus, 6px);
  background: rgba(var(--alpha-color), .06);
  box-sizing: border-box;
  position: relative;
}

.sider-position-icon span {
  content: "";
  display: block;
  width: 10px;
  height: 100%;
  background: rgba(var(--alpha-color), .1);
  position: relative;
}

.sider-position-radio.right span {
  position: absolute;
  right: 0;
}

.sider-position-icon span:before {
  content: "";
  position: absolute;
  top: 26px;
  left: 2px;
  width: 6px;
  height: 2px;
  border-radius: 2px;
  background: rgba(var(--alpha-color), .3);
  box-shadow: 0 10px 0 0 rgba(var(--alpha-color), .3), 0 20px 0 0 rgba(var(--alpha-color), .3);
}

.sider-position-icon span:after {
  content: "";
  position: absolute;
  left: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: 10px;
  background: rgba(var(--alpha-color), .5);
}
</style>