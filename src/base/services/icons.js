import { defineStore } from 'pinia'
import { useStorage } from './storage'
import { remove as doRemove } from 'lodash'
import { reactive } from 'vue'
import { useNLS } from '../hooks/nls'

const IconType = {
  Link: 'link',
  Note: 'note',
  Add: 'add'
}

const IconImageType = {
  Text: 'text',
  Image: 'image'
}

const SystemIconKey = {
  Add: 'add',
  Note: 'note'
}

const useIcons = defineStore('icons', () => {
  const { localize } = useNLS()

  const Add = {
    local: 'icon.system.add',
    key: SystemIconKey.Add,
    type: IconType.Add,
  }

  const Note = {
    local: 'icon.system.add',
    key: SystemIconKey.Note,
    type: IconType.Note,
  }

  const { value: config } = useStorage('icon_config', {
    active: 0,
    groups: [
      {
        local: 'icon.system.home',
        icons: [Add, Note],
        icon: 'HomeOutline'
      },
      {
        local: 'icon.system.code',
        icons: [Add],
        icon: 'CodeOutline'
      },
      {
        local: 'icon.system.design',
        icons: [Add],
        icon: 'ColorPaletteOutline'
      },
      {
        local: 'icon.system.product',
        icons: [Add],
        icon: 'ThumbsUpOutline'
      },
      {
        local: 'icon.system.play',
        icons: [Add],
        icon: 'GameControllerOutline'
      }
    ]
  })

  const icons = reactive({
    ...config,
    showAddModal: false
  })

  const setActiveGroup = (group) => {
    const index = icons.groups.findIndex(g => g === group)
    icons.active = index
  }

  const showAddModal = () => {
    icons.showAddModal = true
  }
  const hideAddModal = () => icons.showAddModal = false

  const getCurrentGroup = () => icons.groups[icons.active]

  const remove = (icon) => {
    const group = getCurrentGroup()

    doRemove(group.icons, icon)
  }

  const add = (icon) => {
    const group = getCurrentGroup()

    group.icons.push(icon)
  }

  const upadte = (icon, size) => {
    icon.size = size
  }

  return { icons, setActiveGroup, showAddModal, hideAddModal, remove, add, upadte }
})

export { useIcons, IconType, SystemIconKey, IconImageType }