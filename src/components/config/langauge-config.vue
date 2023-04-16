<script setup>
import Card from '../../base/ui/card/card.vue'
import { useNLS, Langauge } from '../../base/hooks/nls'
import cls from 'classnames'
import { onUpdated } from 'vue';

const { config, localize, updateLocal } = useNLS()

const changeLocal = (local) => updateLocal(local)

const calcClassname = (value) => cls('langauge-item', { active: value === config.local })


</script>

<template>
  <div class="langauge-config">
    <Card>
      <div class="langauge-card">
        {{ localize('config.langauge.title') }}
        <div class="langauge">
          <div v-for="langauge of Langauge" :class="calcClassname(langauge.value)"
            @click="() => changeLocal(langauge.value)">
            {{ langauge.label }}
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style>
.langauge-card {
  padding: 8px 16px;
}

.langauge {
  margin-top: 4px;
}

.langauge-item {
  padding: 4px 8px;
  border: 1px solid rgba(var(--alpha-color), .06);
  margin-bottom: 4px;
  cursor: pointer;
}

.langauge-item.active {
  border-color: rgba(var(--active-color), .6);
}
</style>