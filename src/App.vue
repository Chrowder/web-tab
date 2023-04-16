<script setup>
import Background from './components/background/background.vue'
import Config from './components/config/config.vue'
import Sider from './components/sider/sider.vue'
import Time from './components/time/time.vue'
import Header from './components/header/header.vue'
import Search from './components/search/search.vue'
import Icons from './components/icons/icons.vue'
import ContentMenu from './components/contextmenu/contextmenu.vue'
import Hitokoto from './components/hitokoto/hitokoto.vue'
import User from './components/user/user.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useContextMenu } from './base/services/contextmenu/contextmenu'
import { Layout, useStyle } from './base/services/style'
import { registerGlobal } from './base/hooks/global'
import { useNLS } from './base/hooks/nls'
import { NDialogProvider } from 'naive-ui'

const { config, init } = useNLS()
const { show, updatePosition } = useContextMenu()
const { style } = useStyle()
const ready = ref()
const mainRef = ref()

const isComponentLayout = computed(() => style.layout === Layout.Component)
const cssVars = computed(() => {
  return {
    '--icon-size': `${style.icon.size}px`,
    '--icon-gap-y': `${style.icon.gap.column}px`,
    '--icon-gap-x': `${style.icon.gap.row}px`,
    '--icon-raduis': `${style.icon.radius}px`,
    '--icon-color': style.icon.color
  }
})

const onMouseup = (event) => {
  updatePosition(event)
  setTimeout(show);
}

const updateCssVars = () => {
  const style = document.documentElement.style

  for (let key in cssVars.value) {
    style.setProperty(key, cssVars.value[key])
  }
}

watch(() => style, updateCssVars, { deep: true })

onMounted(() => {
  const langaugeImportPormise = import(`./langauge/${config.local}.json`)
  langaugeImportPormise.then((langauge) => {
    init(langauge.default)
    ready.value = true

    window.addEventListener('contextmenu', (event) => event.preventDefault(), true)
  })
  updateCssVars()
})

registerGlobal({ isComponentLayout, contextmenu: { show, updatePosition } })
</script>

<template>
  <n-dialog-provider>
    <Background />
    <Config />
    <User />
    <div class="main" ref="mainRef" @mouseup.right="onMouseup">
      <ContentMenu />
      <Sider />
      <Header />
      <Time />
      <Search />
      <Icons />
      <Hitokoto />
    </div>
  </n-dialog-provider>
</template>

<style>
.main {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;

  display: flex;
  flex-direction: column;
}
</style>

