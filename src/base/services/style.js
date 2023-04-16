import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from './storage'
import { set } from 'lodash'

const IconContainerUnit = {
  Px: {
    label: 'px',
    value: false
  },
  Percent: {
    label: '%',
    value: true
  }
}

const Layout = {
  Component: 'component',
  Simple: 'simple'
}

const useStyle = defineStore('style', () => {
  const { value: style } = useStorage('style_config', {
    background: {
      blur: 15,
      opacity: 40,
    },
    iconContainer: {
      unit: IconContainerUnit.Px.value,
      width: 1360
    },
    icon: {
      size: 40,
      fontSize: 12,
      showName: true,
      color: '#fff',
      gap: {
        row: 30,
        column: 30
      },
      radius: 4
    },
    sider: {
      width: 50,
      opacity: 10
    },
    time: {
      show: true,
      size: 30,
      color: '#fff'
    },
    layout: Layout.Component,
    hitokoto: true,
    color: {
      options: ['#fff', 'rgb(46, 204, 113)', 'rgb(51, 197, 197)', 'rgb(155, 89, 182)', 'rgb(241, 196, 15)', 'rgb(230, 126, 34)', 'rgb(231, 76, 60)'],
    }
  })

  const updateStyle = (key, style) => {
    set(style, key, value)
  }

  return { style, updateStyle }
})

export { useStyle, IconContainerUnit, Layout }