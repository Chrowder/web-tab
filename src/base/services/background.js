import { defineStore } from 'pinia'
import { useStorage } from './storage'
import { request } from '../common/request'

const useBackground = defineStore('background', () => {
  const { value: background } = useStorage('background_config', {
    url: 'https://files.codelife.cc/itab/defaultWallpaper/defaultWallpaper.webp',
    loading: false
  })

  const update = async () => {
    doUpate()
  }

  const doUpate = async () => {
    background.loading = true
    const result = await request({ method: 'get', url: '/wallpaper/random' })

    const url = result.data.data

    const img = new Image()

    img.onload = () => {
      background.loading = false
      background.url = url
    }

    img.onerror = () => {
      background.loading = false
    }

    img.src = url

  }

  return { background, update }
})

export { useBackground }