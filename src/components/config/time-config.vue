<script setup>
import { useNLS } from '../../base/hooks/nls'
import { useStyle } from '../../base/services/style';
import cls from 'classnames'
import Card from '../../base/ui/card/card.vue'
import Switch from '../../base/ui/radio/switch.vue'
import Slider from '../../base/ui/slider/slider.vue'
import ColorPicker from '../../base/ui/color-picker/color-picker.vue';
import { useTime } from '../../base/services/time';


const { localize } = useNLS()
const { style } = useStyle()
const { time } = useTime()

const pxFormatter = (value) => `${value}px`

const toggle = (key) => {
  console.log(time)
  time.format[key] = !time.format[key]

  console.log(key, time[key])
}

const calcClassname = (key) => cls('time-formatter-item-wrapper', { active: time.format[key] })

</script>

<template>
  <div class="time-config">
    <Card>
      <div class="time-card">
        <Switch :title="localize('config.time.show')" v-model:value="style.time.show" />
        <div class="time-config-wrapper" v-if="style.time.show">
          <div class="time-formatter">
            <div class="time-formatter-content">
              <div class="time-formatter-item">
                <div :class="calcClassname('month')" @click="() => toggle('month')">{{
                  localize('config.time.format.month') }}</div>
              </div>
              <div class="time-formatter-item">
                <div :class="calcClassname('week')" @click="() => toggle('week')">{{ localize('config.time.format.week')
                }}</div>
              </div>
              <div class="time-formatter-item">
                <div :class="calcClassname('hour')" @click="() => toggle('hour')">{{ localize('config.time.format.hour')
                }}</div>
              </div>
              <div class="time-formatter-item">
                <div :class="calcClassname('second')" @click="() => toggle('second')">{{
                  localize('config.time.format.second') }}</div>
              </div>
            </div>
          </div>
          <Slider :title="localize('config.time.font.size')" :max="130" :min="30" v-model:value="style.time.size"
            :value-formatter="pxFormatter" />

          <color-picker :title="localize('config.time.color')" :options="style.color.options"
            v-model:value="style.time.color"></color-picker>
        </div>
      </div>
    </Card>
  </div>
</template>

<style>
.time-card {
  padding: 8px 16px;
}

.time-formatter {


  padding-bottom: 16px;
  border-bottom: 1px solid rgba(var(--alpha-color), .06);
}

.time-formatter-content {
  background-color: rgba(var(--alpha-color), 0.06);
  padding: 0 0px 8px 8px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  border-radius: 8px;
  height: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

}

.time-formatter-item {
  padding-right: 8px;
  margin-top: 8px;
  width: 50%;

  box-sizing: border-box;
  text-align: center;
  flex-grow: 0;
}

.time-formatter-item-wrapper {
  background-color: #fff;
  padding: 16px 0;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #fff;
  transition: all 0.3s;
}

.time-formatter-item-wrapper.active {
  color: var(--primary-color);
  border-color: var(--primary-color);
  background-color: rgba(var(--active-color), 0.06);
}
</style>