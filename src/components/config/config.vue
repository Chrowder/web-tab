<script setup>
import { NDrawer, NDrawerContent } from 'naive-ui'
import { useConfig } from '../../base/services/config'
import { useNLS } from '../../base/hooks/nls';
import { computed } from 'vue';
import Tabs from '../../base/ui/tabs/tabs.vue'
import TabPane from '../../base/ui/tabs/tab-pane.vue'
import BackgroundConfig from './background-config.vue'
import IconConfig from './icon-config.vue'
import SiderConfig from './sider-config.vue'
import LayoutConfig from './layout-config.vue'
import Author from './author.vue'
import LangaugeConfig from './langauge-config.vue';
import TimeConfig from './time-config.vue';

const { config } = useConfig()
const { localize, config: nls } = useNLS()

const Tab = {
  Theme: 1,
  Icon: 2,
  Sider: 3,
  Layout: 4,
  Author: 5,
  Langauge: 6,
  Time: 7
}

const Title = {
  [Tab.Langauge]: { title: localize('config.menu.langauge.title'), desc: localize('config.menu.langauge.desc') },
  [Tab.Theme]: { title: localize('config.menu.theme.title'), desc: localize('config.menu.theme.desc') },
  [Tab.Icon]: { title: localize('config.menu.icon.title'), desc: localize('config.menu.icon.desc') },
  [Tab.Sider]: { title: localize('config.menu.sider.title'), desc: localize('config.menu.sider.desc') },
  [Tab.Author]: { title: localize('config.menu.author.title'), desc: localize('config.menu.author.desc') },
  [Tab.Layout]: { title: localize('config.menu.layout.title'), desc: localize('config.menu.layout.desc') },
  [Tab.Time]: { title: localize('config.menu.time.title'), desc: localize('config.menu.time.desc') }
}

const title = computed(() => Title[config.activeMenu]?.title)
const desc = computed(() => Title[config.activeMenu]?.desc)

</script>

<template>
  <div>
    <n-drawer v-model:show="config.show" placement="right" :width="450">
      <n-drawer-content :body-content-style="{ padding: '0px' }" :closable="false">
        <div class="config">
          <div class="config-header">
            <div class="config-header-icon">
              <img src="" alt="">
            </div>
            <div class="config-header-title">
              <div class="title">{{ title }}</div>
              <div class="desc">{{ desc }}</div>
            </div>
          </div>
          <div class="config-main">
            <Tabs v-model:value="config.activeMenu">
              <tab-pane :name="localize('config.menu.theme')" :tab="Tab.Theme">
                <background-config />
              </tab-pane>
              <tab-pane :name="localize('config.menu.icon')" :tab="Tab.Icon">
                <icon-config />
              </tab-pane>
              <tab-pane :name="localize('config.menu.time')" :tab="Tab.Time">
                <time-config />
              </tab-pane>
              <tab-pane :name="localize('config.menu.sider')" :tab="Tab.Sider">
                <sider-config />
              </tab-pane>
              <tab-pane :name="localize('config.menu.layout')" :tab="Tab.Layout">
                <layout-config />
              </tab-pane>
              <tab-pane :name="localize('config.menu.author')" :tab="Tab.Author">
                <Author />
              </tab-pane>
              <tab-pane :name="localize('config.menu.langauge')" :tab="Tab.Langauge">
                <langauge-config />
              </tab-pane>
            </Tabs>
          </div>

        </div>
      </n-drawer-content>
    </n-drawer>

  </div>
</template>

<style>
.config {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.config-header {
  height: 86px;
  display: flex;
  justify-content: space-between;
}

.config-main {
  flex-grow: 1;
  display: flex;
  box-sizing: border-box;
}


.config-header-icon {
  height: 80px;
  width: 80px;
  position: relative;
  left: -16px;
  top: -16px;
  border-radius: 50%;
  background-color: black;
}

.config-header-title {
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 24px;
  box-sizing: border-box;
}

.config-header-title .title {
  font-size: 18px;

}

.config-header-title .desc {
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--sub-color);
}


.config-content {}
</style>