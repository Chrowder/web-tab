import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useStorage } from './storage'



const useTime = defineStore('time', () => {

  const dates = ['日', ' 一', '二', '三', '四', '五', '六']

  const { value: config } = useStorage('time_config', {
    formatted: '',
    format: {
      month: false,
      week: false,
      hour: false,
      second: false,
    },
    date: '',
    week: ''
  })

  const time = reactive({
    ...config,
    current: undefined
  })

  const format = computed(() => {
    let base = time.format.hour ? 'HH:MM' : 'hh:MM'

    if (time.format.second) {
      base += ':ss'
    }

    return base
  })

  const start = () => {
    const updateTime = () => {
      doUpdateCurrentTime()

      requestAnimationFrame(updateTime)
    }

    requestAnimationFrame(updateTime)
  }

  const doUpdateCurrentTime = () => {
    const current = dayjs()
    time.current = current
    time.formatted = current.format(format.value)
    time.date = `${current.get('M') + 1}月${current.get('D')}日`,
      time.week = `星期 ${dates[current.get('d')]}`
  }

  const init = () => {
    doUpdateCurrentTime()
  }

  init()

  return { time, init, start }
})

export { useTime }