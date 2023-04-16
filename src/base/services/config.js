import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useConfig = defineStore('config', () => {
  const config = reactive({
    show: false,
    activeMenu: 1
  })

  const show = () => config.show = true
  const hide = () => config.show = false

  return { config, show, hide }
})

export { useConfig }