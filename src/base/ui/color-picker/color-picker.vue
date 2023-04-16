<script setup>
import { defineProps, toRefs } from 'vue'
import { NColorPicker, NIcon } from 'naive-ui'
import { CheckmarkOutline } from '@vicons/ionicons5'
import Color from 'color'

const props = defineProps({
  title: String,
  value: String,
  allowCustom: Boolean,
  options: Array
})

const emit = defineEmits(['update:value'])

const { title, value } = toRefs(props)

const onValueChange = (value) => emit('update:value', value)

const { options, allowCustom } = toRefs(props)

const createColorItemStyle = (color) => {
  const parsed = Color(color)
  const isLight = parsed.rgbNumber() === 16777215 //#fff
  const colorStr = parsed.toString()
  return {
    border: isLight ? `1px solid rgba(0,0,0,0.4)` : '',
    backgroundColor: `${colorStr}`
  }
}

</script>

<template>
  <div class="color-select">
    <div class="color-label">{{ title }}</div>
    <div class="colors-box">
      <div v-for="color of options" class="colors-box-wrapper">
        <div class="color" :style="createColorItemStyle(color)" @click="() => onValueChange(color)"></div>
        <n-icon class="color-checkmark" :component="CheckmarkOutline" v-if="color === value"></n-icon>
      </div>
      <div class="colors-box-wrapper" v-if="allowCustom">
        <n-color-picker :value="value" :on-update-value="onValueChange">
          <template #label>
            <div class="color custom"></div>
          </template>
        </n-color-picker>
      </div>

    </div>
  </div>
</template>

<style>
.color-select {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.color-select .color-label {
  flex-shrink: 0;
  margin-right: 4px;
  width: 60px;
  flex-grow: 1;
  line-height: 36px;
}

.colors-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.colors-box .n-color-picker {
  height: 18px;
  width: 18px;
  border-radius: 50%;
}

.colors-box .n-color-picker-trigger {
  border: 0;

}

.colors-box-wrapper {
  cursor: pointer;
  position: relative;
}

.color-checkmark {
  height: 18px;
  width: 18px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.color {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  box-sizing: border-box;
}

.color.custom {
  background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAoACgDAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABwgFCQECAwb/xAAbAQEAAgMBAQAAAAAAAAAAAAAHBQgEBgkCA//aAAwDAQACEAMQAAAAtDxz5W1UCFyvPjBIQ3DFlnlQSIjmYjFNq9UXBpsZ4z082a8AvOs5DAi8eCll17Fx33nreeBxljInF9fGdVbdb7EI+oXh8+aZq4cPoRWE8NMu9OXutT//xAAwEAABBAECAwcDAwUAAAAAAAABAgMEBREABgghMQcJEhMUIkFRYXEVUpGBweHx8v/aAAgBAQABPwDi84td0jcs3su7MbdyDGgrLNnZxTh514ZCm0K6oCTyKhhWQeYHXcz1hcFyZZz3n3lc1uyHCtRJ+SVEnW80+QF5T01a7ptdvThYUlrJiSWiFIfivKbWkjoQpJBB/rruzO9I30e0ur4cuIfdD1xXXb6Ye3r+evxSoks8m2HnOrqHFe0KVlYWtIJKelk7ItZ0iwmKK3ZDynHVk5JUo5Jz9zqTEICs9NdrjIq2HHDyH/P51vLc7YecAc6f4+2ou/JtBfRb+rlKalQJbchhxCiClxCgtJB+CCAdekJGPDr9Jcd9qU9dcbZ3PtXbEM0tJ6lEnzPUP+oSnyMKRj2nJVnOOXTVuL6Y+pctzw5+PCP7aVVKJytXPT9S9DluwpDZDjLim3AfhQOCP5GpTkasYL7vXXEbYK3Mw608vI/b/H4+mtx0CGH3EeXg/wCvvqt2jMv7uJQ1jBclTZTceM2gElTi1BKQAOpJI1xJcOF7HvJnaBsGqXLYlrLs2DHGXG3DzUtKRzWFHmQMkE631NnQluRJsV5hYOFIdQUKBGOoIBGu0F31SVk6vNq2txY+hpayRMfWQlLEZhS1qJwAAACSc/TXdi915v17tHq+IniE2u9UVlM+mXQUM5GJEuSnm286jq0hB9wSrCipKSQEjn//xAAlEQABBAEEAgIDAQAAAAAAAAABAAIDBAUGBxESITETIwhBUWH/2gAIAQIBAT8Ar365sDgrB3YpAAFh3d3BVqTLMBa4cgrcbbalWoOymNZ1LfLmj0R/QP0sdqf7eSVpLVcTpACVo2w27wQqzPiYrELbEJZKOQVDmbUb+wKx2tb9KXsF+Ou7ta+ZIckehbx1/wBUOrqU7eY/IQzrHD2pq89eUsKq13Sv44W30AxkgkHsrTeobIiHY+FWzj+PJW4W21uW669jm8tPsfxUMZLV+t7eCtPM+PhYS49o4Cfk52w9fRX/xAAkEQABBAICAgIDAQAAAAAAAAABAAIDBAURBiESMQcTCBRBUf/aAAgBAwEBPwDleVsgGCt6V1skFol6xXnN2sRDJIRpY+rZdB2Fk+OufETpcl4w9kRc0drBNlEv1riHGZrDA/SxXGCYfSODilGiFc4JXug9Li/42NyeVNqOTQHetLEfHEWFg+jw9JuHhg6a1Voopm7Co48OcuIV46ThsK9joJmecY7Ku1YqbC6Q6C4ZyyrHE2ncd469H+LENhmYJGHYKwsbmHtfuVqtIvlOgPZK+YflrFWaEmKxD/NzunPHoD/Af7tf/9k=) no-repeat;
  background-size: cover;
}
</style>