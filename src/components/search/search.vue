<script setup>
import { NIcon } from 'naive-ui'
import { CaretDownOutline, SearchOutline } from '@vicons/ionicons5'
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { useSearch } from '../../base/services/search'
import { useNLS } from '../../base/hooks/nls';
import cls from 'classnames'

const { search, doSearch } = useSearch()
const { localize } = useNLS()

const active = ref(false)
const listRef = ref()
const inputValue = ref()

const showList = () => active.value = true
const hideList = () => active.value = false

const onEngineClick = () => {
  showList()

  const onDocumentClick = (event) => {
    const target = event.target

    if (listRef.value) {
      if (!listRef.value.contains(target)) {
        hideList()
      }
    }

    window.removeEventListener('click', onDocumentClick)
  }

  document.addEventListener('click', onDocumentClick, true)
}

const listClassName = computed(() => cls('search-engine-list', { active: active.value }))

const handleSearch = () => {
  const query = inputValue.value || ''
  doSearch(query)
}

const changeEngine = (engine) => {
  const { key } = engine

  search.active = key

  hideList()
}


</script>

<template>
  <div class="search">
    <div class="search-box">
      <div class="search-engine" @click="onEngineClick">
        <img :src="`https://files.codelife.cc/itab/search/${search.active}.svg`" alt="">
        <n-icon :component="CaretDownOutline" class="search-engine-arrow" />
      </div>
      <div class="search-input">
        <input type="text" :placeholder="localize('search.placeholder')" v-model="inputValue"
          @keydown.enter="handleSearch">
      </div>
      <div class="search-icon" @click="handleSearch">
        <n-icon :component="SearchOutline" />
      </div>
    </div>
    <div :class="listClassName" ref="listRef">
      <ul class="search-engine-all">
        <li class="search-engine-item" v-for="engine of search.engine" @click="() => changeEngine(engine)">
          <div class="search-engine-icon">
            <img :src="`https://files.codelife.cc/itab/search/${engine.key}.svg`" alt="">
          </div>
          <div class="search-engine-name">{{ engine.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.search {
  margin: 3vh auto 20px;
  width: 600px;
  height: 48px;

  position: relative;
}

.search-box {
  box-shadow: 0 0 10px 3px #0000001a;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 26px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.6);
}

.search-engine {
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s;
  transform-origin: top;
}

.search-engine:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.search-engine-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 200px;
  z-index: 10;
  transform: scaleY(0);
  transition: all 0.3s;
  transform-origin: top;
}

.search-engine-list.active {
  transform: scaleY(1);

}

.search-engine-all {
  list-style: none;
  border-radius: 26px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
}

.search-engine-item {
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 8px;
  padding: 8px 0;
}

.search-engine-item:hover {
  background-color: rgba(255, 255, 255, 0.4);

}

.search-engine-icon {
  height: 36px;
  width: 36px;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.search-engine-icon img {
  width: 20px;
  height: 20px;
  margin: auto;
}

.search-engine-arrow {
  position: absolute;
  right: 2px;
  top: 50%;
  margin-top: -5px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 12px;
}

.search-engine img {
  height: 20px;
  width: 20px;
}


.search-input {
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: stretch;
}

.search-input input {
  width: 100%;
  height: 100%;
  outline: none;
  border: 0;
  background-color: transparent;
}

.search-icon {
  width: 50px;
  height: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.52);
  transition: all 0.3s;
  cursor: pointer;
}

.search-icon:hover {
  background-color: rgba(255, 255, 255, 0.4)
}
</style>