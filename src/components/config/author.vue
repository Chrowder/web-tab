<script setup>
import Card from '../../base/ui/card/card.vue'
import Slider from '../../base/ui/slider/slider.vue'
import { useStyle } from '../../base/services/style'
import { useSider, SiderBarPosition } from '../../base/services/sider'
import { useNLS } from '../../base/hooks/nls'
import { NTag } from 'naive-ui'
import cls from 'classnames'

const { style } = useStyle()
const { sider } = useSider()
const { localize } = useNLS()

const calcCalssname = (value) => cls('sider-position-item', { checked: value === sider.config.position })
const onPositionChange = (position) => sider.config.position = position

const authors = ['Kkkk']

</script>

<template>
  <div class="authors">

    <Card>
      <div class="authors-card">
        <div>{{ localize('config.menu.author') }}</div>
        <div class="author-wrapper">
          <div class="author" v-for="author of authors">
            <n-tag>{{ author }}</n-tag>
          </div>
        </div>
      </div>
    </Card>

  </div>
</template>

<style>
.authors-card {
  padding: 8px 16px;
}

.author-wrapper {
  margin-top: 8px;
}
</style>