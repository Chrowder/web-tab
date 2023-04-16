<script setup>
import Card from '../../base/ui/card/card.vue'
import { useStyle, Layout } from '../../base/services/style'
import { useTime } from '../../base/services/time'
import { useNLS } from '../../base/hooks/nls'
import Switch from '../../base/ui/radio/switch.vue'
import cls from 'classnames'

const { style } = useStyle()
const { time } = useTime()
const { localize } = useNLS()

const calcCalssname = (value) => cls('layout-style-item', { checked: value === style.layout })
const onLayoutChange = (layout) => style.layout = layout

</script>

<template>
  <div class="layout-config">
    <Card>
      <div class="layout-card">
        <div class="layout-style">
          <div :class="calcCalssname(Layout.Component)" @click="() => onLayoutChange(Layout.Component)">
            <div class="layout-radio component">
              <div class="layout-icon">
                <div class="layout-time">{{ time.current.format('HH:MM') }}</div>
                <span></span>
                <div class="layout-components">
                  <div v-for="i of 12"></div>
                </div>
              </div>
            </div>
            <div class="layout-label">
              {{ localize('config.layout.component') }}
            </div>
          </div>
          <div :class="calcCalssname(Layout.Simple)" @click="() => onLayoutChange(Layout.Simple)">
            <div class="layout-radio simple">
              <div class="layout-icon">
                <div class="layout-time">{{ time.current.format('HH:MM') }}</div>
                <span></span>
              </div>
            </div>
            <div class="layout-label">
              {{ localize('config.layout.simple') }}

            </div>
          </div>
        </div>

        <div class="hitokoto-config">
          <Switch :title="localize('config.hitokoto.show')" v-model:value="style.hitokoto" />
        </div>
      </div>

    </Card>
  </div>
</template>

<style>
.layout-card {
  padding: 8px 16px;
}

.layout-style {
  padding: 0 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(var(--alpha-color), .06);
  margin-bottom: 10px;
}

.layout-style-item {
  width: 46%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

.layout-style-item.checked .layout-label {
  color: #fff;
  background-color: var(--primary-color);
}

.layout-style-item.checked .layout-radio {
  background-color: rgba(24, 144, 255, 0.063);
}


.layout-label {
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

.layout-radio {
  width: 100%;
}

.layout-style-item.checked .layout-icon {
  border-color: var(--primary-color);
}

.layout-icon {
  border: var(--border-width, 2px) solid var(--border-color, transparent);
  transition: border .2s;
  width: 100%;
  height: 72px;
  border-radius: var(--raidus, 6px);
  background: rgba(var(--alpha-color), .06);
  box-sizing: border-box;
  position: relative;
  color: #939393;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.layout-icon .layout-time {
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin: 5px 0 0;
}

.layout-radio.simple .layout-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.layout-radio.simple .layout-time {
  margin: 0;
}

.layout-icon span {
  content: "";
  display: block;
  width: 60%;
  height: 6px;
  background: rgba(var(--alpha-color), .1);
  border-radius: 3px;

}

.layout-components {
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  margin-top: 5px;
  justify-content: space-around;
  margin-bottom: 5px;
}

.layout-components div {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  background-color: rgba(var(--alpha-color), .1);
  margin: 2px;
}
</style>