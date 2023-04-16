<script setup>
import { useHitokoto } from '../../base/services/hitokoto';
import { useStyle } from '../../base/services/style';

const { config: hitokoto, update } = useHitokoto()
const { style } = useStyle()
</script>

<template>
  <div v-if="style.hitokoto" class="hitokoto" @click="update">「{{ hitokoto.content }}」</div>
</template>

<style>
.hitokoto {
  height: 30px;
  width: 100;
  text-align: center;
  color: #fff;
  font-size: 14px;
  user-select: none;
}
</style>