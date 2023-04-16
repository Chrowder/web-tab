import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useIconContextMenu } from './icon-contextmenu'
import { useGlobalContextMenu } from './global-contextmenu'
import { MenuItemType } from './common'

const ContextMenuType = {
  Global: 'global',
  Icon: 'icon'
}

const useContextMenu = defineStore('contextmanu', () => {
  const { menu: globalMenu, show: globalShow, hide: globalHide } = useGlobalContextMenu()
  const { menu: iconMenu, show: iconShow, hide: iconHide } = useIconContextMenu()

  const MenusMap = {
    [ContextMenuType.Global]: { menus: globalMenu.menus, show: globalShow, hide: globalHide },
    [ContextMenuType.Icon]: { menus: iconMenu.menus, show: iconShow, hide: iconHide }
  }

  const menu = reactive({
    current: ContextMenuType.Global,
    menus: MenusMap[ContextMenuType.Global].menus,
    show: false,
    position: { x: 0, y: 0 }
  })

  const show = (contextMenuType = ContextMenuType.Global, ...args) => {
    const currentMenu = MenusMap[contextMenuType]
    currentMenu.show(...args)

    menu.current = contextMenuType
    menu.menus = currentMenu.menus
    menu.show = true
  }
  const hide = () => {
    const currentMenu = MenusMap[menu.current]

    currentMenu.hide()

    menu.show = false

  }

  const updatePosition = (position) => {
    const { x, y } = position

    menu.position = { x, y }
  }

  return { menu, show, hide, updatePosition }
})

export { useContextMenu, ContextMenuType, MenuItemType }

