<script setup>
import { NIcon, NAvatar, useDialog } from 'naive-ui'
import { MenuType, SiderBarPosition, useSider } from '../../base/services/sider'
import { computed, onUpdated } from 'vue';
import { useStyle } from '../../base/services/style'
import { useGlobal } from '../../base/hooks/global'
import { useUser } from '../../base/services/user'
import { useNLS } from '../../base/hooks/nls';
import { getIcon } from '../../base/ui/icons/icons';
import { pipe } from '../../base/common/function'
import cls from 'classnames'

const { sider, onMenuClick } = useSider()
const { style } = useStyle()
const { isComponentLayout } = useGlobal()
const { user, logout } = useUser()
const { localize } = useNLS()

const dialog = useDialog()

const width = computed(() => `${style.sider.width}px`)
const opacity = computed(() => style.sider.opacity / 100)

const systemMenus = computed(() => sider.menus.filter(menu => menu.type === MenuType.System))
const customMenus = computed(() => sider.menus.filter(menu => menu.type !== MenuType.System))

const classname = computed(() => cls('sider', { right: sider.config.position === SiderBarPosition.right }))

const handleUserClick = () => {

  if (user.login) {
    dialog.create({
      title: localize('user.logout.title'),
      content: localize('user.logout.tips'),
      positiveText: localize('user.logout.button.positive'),
      negativeText: localize('user.logout.button.negative'),
      onPositiveClick: pipe(logout),
    })

    return
  }
  user.show = true
}

const getIconLable = (item) => item.name || localize(item.local)


</script>

<template>
  <div :class="classname" v-if="isComponentLayout">
    <div class="user">
      <div class="avatar" @click="handleUserClick">
        <n-avatar v-if="user.login" :round="true" :src="`/file/download?fileName=${user.avatar}`"></n-avatar>
        <n-avatar v-else :round="true"
          src="https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100"></n-avatar>
      </div>
    </div>
    <div class="sider-menu">
      <div class="sider-menu-box">
        <div class="sider-menu-item" v-for="item of customMenus" @click="() => onMenuClick(item)">
          <div class="sider-item-icon">
            <n-icon :component="getIcon(item.icon)"></n-icon>
          </div>
          <div>
            <div class="sider-item-name">{{ getIconLable(item) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sider-app">
      <div class="sider-setting">
        <div class="sider-menu-item" v-for="item of systemMenus" @click="() => onMenuClick(item)">
          <div class="sider-item-icon">
            <n-icon :component="getIcon(item.icon)"></n-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sider {
  width: v-bind(width);
  background-color: rgba(var(--side-bar-background), v-bind(opacity));
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  box-sizing: border-box;
  z-index: 10;
  backdrop-filter: blur(6px);
  color: rgba(var(--side-bar-color), .6);
}

.sider.right {
  right: 0;
}

.user {
  height: 130px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sider-menu {
  flex-grow: 1;
}

.sider-setting {
  display: flex;
  justify-content: center;
  align-self: center;
}

.sider-menu-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sider-menu-item {
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 8px 0;
}


.sider-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.sider-menu-item:hover .sider-item-icon {
  transform: scale(1.2);
}

.sider-item-icon {
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  transition: all 0.3s;
  font-size: 20px;
}

.sider-item-icon-box {
  transition: all 0.3s;
}

.sider-item-name {
  font-size: 12px;

  text-align: center;
  line-height: 12px;
}

.sider .sider-app {
  flex-grow: 0;
}
</style>