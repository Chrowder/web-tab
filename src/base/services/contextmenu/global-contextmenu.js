import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useBackground } from '../background'
import { useConfig } from '../config'
import { useNLS } from '../../hooks/nls'
import { useServerStorage } from '../storage'
import { useUser } from '../user'
import { useIcons } from '../icons'
import { MenuItemType } from './common'


const useGlobalContextMenu = defineStore('gloabl_contextmanu', () => {
  const { update } = useBackground()
  const { show: showConfig } = useConfig()
  const { save } = useServerStorage()
  const { user } = useUser()
  const { localize } = useNLS()
  const { showAddModal } = useIcons()

  const menus = computed(() => ([
    { label: localize('contextMenu.background.change'), onClick: update, type: MenuItemType.Normal },
    { label: localize('contextMenu.icon.add'), onClick: showAddModal, type: MenuItemType.Normal },
    { label: localize('contextMenu.config.save'), onClick: save, show: user.login, type: MenuItemType.Normal },
    { label: localize('contextMenu.setting'), onClick: showConfig, type: MenuItemType.Normal },
  ]))

  const menu = reactive({
    menus,
  })

  const show = () => menu.show = true
  const hide = () => menu.show = false

  const updatePosition = (position) => {
    const { x, y } = position

    menu.position = { x, y }
  }

  return { menu, show, hide, updatePosition }
})

export { useGlobalContextMenu }

