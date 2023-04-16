import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useNLS } from '../../hooks/nls'
import { useIcons } from '../icons'
import { MenuItemType } from './common'

const useIconContextMenu = defineStore('icon_contextmanu', () => {
  const { localize } = useNLS()
  const { remove, upadte } = useIcons()
  const { showAddModal } = useIcons()

  const menus = computed(() => ([
    { label: localize('contextMenu.icon.layout'), onClick: onLayout, type: MenuItemType.Layout },
    { label: localize('contextMenu.icon.delete'), onClick: onRemove, type: MenuItemType.Normal },
  ]))

  const menu = reactive({
    currentIcon: null,
    menus,
    show: false,
    position: { x: 0, y: 0 }
  })

  const show = (icon) => {
    menu.currentIcon = icon
    menu.show = true
  }
  const hide = () => {
    menu.currentIcon = null
    menu.show = false
  }

  const onLayout = (value) => {
    upadte(menu.currentIcon, value)
  }

  const onRemove = () => {
    remove(menu.currentIcon)
  }

  const updatePosition = (position) => {
    const { x, y } = position

    menu.position = { x, y }
  }

  return { menu, show, hide, updatePosition }
})

export { useIconContextMenu }

