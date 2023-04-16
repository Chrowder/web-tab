import { defineStore } from "pinia";
import { computed, reactive, shallowReactive } from "vue";
import { useStorage } from "./storage";
import { useIcons } from "./icons";
import { useConfig } from "./config";

const MenuType = {
  System: 'sys'
}

const SiderBarPosition = {
  Left: 0,
  right: 1
}

const useSider = defineStore('sider', () => {
  const { icons, setActiveGroup } = useIcons()
  const { show } = useConfig()

  const { value: config } = useStorage('sider_config', {
    position: SiderBarPosition.Left
  })

  const menus = computed(() => {
    const result = []
    for (let group of icons.groups) {
      result.push({
        label: group.name,
        icon: group.icon,
        local: group.local,
        onClick: () => setActiveGroup(group)
      })
    }

    result.push({
      icon: 'SettingsOutline',
      onClick: show,
      type: MenuType.System
    })

    return result
  })

  const sider = reactive({
    menus,
    config
  })

  const onMenuClick = (menu) => {
    if (sider.menus.includes(menu)) {
      menu.onClick()
    }
  }

  return { sider, onMenuClick }
})

export { useSider, MenuType, SiderBarPosition }