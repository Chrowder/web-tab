<script setup>
import { toRefs, computed, ref, onMounted, onUpdated } from 'vue';
import { useStyle } from '../../base/services/style'
import { ContextMenuType } from '../../base/services/contextmenu/contextmenu'
import { useNLS } from '../../base/hooks/nls'
import { useNote } from '../../base/services/note'
import { NModal, NCard, NInput, NIcon } from 'naive-ui'
import { pickBy } from 'lodash';
import { AddCircleOutline } from '@vicons/ionicons5'
import cls from 'classnames'

const props = defineProps(['icon', 'size'])
const emit = defineEmits(['update:size', 'icon-click', 'delete'])

const { style } = useStyle()
const { notes, add } = useNote()

const { icon, size } = toRefs(props)
const iconRef = ref()
const showNote = ref(false)

const { localize } = useNLS()

const classname = () => {
  const sizeValue = size.value || [1, 1]
  return cls('icons-item', `size-${sizeValue[0]}-${sizeValue[1]}`)
}

const iconNameStyle = computed(() => ({ fontSize: `${style.icon.fontSize}px` }))

const calcBackground = (icon) => ({ backgroundColor: icon.backgroundColor ?? '#fff' })

const handleIconClick = () => {
  showNote.value = true
}

const updateFontSize = (event) => {
  let rect = event[0].contentRect;
  if (!iconRef.value) {
    return
  }
  const width = rect.width
  const height = rect.height
  const min = Math.min(height, width)
  const fontSize = Math.floor(min / 7)

  iconRef.value.style.fontSize = fontSize + 'px'
}

const changeNote = (note) => {
  notes.active = note.key
}

const currentNote = computed(() => {
  for (let note of notes.notes) {
    if (note.key === notes.active) {
      return note
    }
  }
})

const calcSiderClassname = (note) => cls("note-editor-sider-item", { active: notes.active === note.key })

onMounted(() => {
  iconRef.value.style.fontSize = '21px'

  return new ResizeObserver(updateFontSize).observe(iconRef.value)
})


onUpdated(() => {
  console.log(currentNote.notes)
})


</script>

<template>
  <div :class="classname(icon)" @click="handleIconClick">
    <div class="icons-icon" :style="calcBackground(icon)">
      <div class="note" ref="iconRef">
        <div class="note-title">{{ localize('icon.note.title') }}</div>
        <div class="note-content-title">
          <span>{{ notes.notes[0]?.title }}</span>
        </div>
        <div class="note-content-title">
          <span>{{ notes.notes[1]?.title }}</span>
        </div>
        <div class="note-content-title">
          <span>{{ notes.notes[2]?.title }}</span>
        </div>
      </div>

    </div>
    <div class="icons-name" :style="iconNameStyle" v-if="style.icon.showName">
      <span>{{ icon.name }}</span>
    </div>
    <n-modal v-model:show="showNote">
      <n-card :style="{ width: '1000px', border: 0 }" :content-style="{ padding: 0 }">
        <div class="note-editor">
          <div class="note-editor-sider">
            <div class="note-editor-title">
              {{ localize('icon.note.title') }}
            </div>
            <div class="note-editor-sider-items">
              <div v-for="note of notes.notes" @click="() => changeNote(note)" :class="calcSiderClassname(note)">
                <div class="note-editor-sider-title">
                  <span>{{ note.title || '无标题' }}</span>
                </div>
                <div class="note-editor-sider-subtitle">
                  <span>{{ note.subtitle }}</span>
                </div>
              </div>
            </div>

            <div class="note-editor-sider-tools">
              <span :style="{ cursor: 'pointer' }" @click="add">

                <n-icon :component="AddCircleOutline"></n-icon>
              </span>
            </div>
          </div>
          <div class="note-editor-content">
            <div class="note-editor-title-input">
              <n-input :bordered="false" v-model:value="currentNote.title"
                :placeholder="localize('icon.note.input.title.placeholder')"></n-input>
            </div>
            <div class="note-editor-content-input">
              <n-input class="content-input" type="textarea" :bordered="false"
                :placeholder="localize('icon.note.input.content.placeholder')"
                v-model:value="currentNote.content"></n-input>
            </div>
          </div>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<style>
.note {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.note-title {
  height: 25%;
  background: linear-gradient(0deg, #ffc927, #ffa403);
  display: flex;
  justify-content: center;
  align-items: center;
}

.note-content-title {
  height: 25%;
  box-sizing: border-box;
  font-size: 0.62em;
  border-bottom: 1px solid rgba(var(--alpha-color), 0.1);
  padding: 0px 8px;
  display: flex;
  align-items: center;
}

.note-editor {
  height: 660px;
  display: flex;
}

.note-editor-title {
  display: flex;
  padding: 16px;
  font-size: 24px;
}

.note-editor-sider {
  width: 160px;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  background-color: rgba(var(--alpha-color), 0.1);
}

.note-editor-sider-items {
  flex-grow: 1;
}

.note-editor-sider-tools {
  padding: 16px;
  font-size: 24px;
  color: var(--primary-color);
  display: flex;
  justify-content: flex-end;
}

.note-editor-sider-item {
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
}

.note-editor-sider-item.active {
  background-color: rgba(var(--alpha-color), 0.06);
}

.note-editor-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.note-editor-content-input {
  flex-grow: 1;
}

.note-editor-sider-subtitle {
  font-size: 12px;
}

.content-input {
  height: 100%;
}

.note-editor-title-input input {
  font-weight: 600;
}

.content-input textarea {
  --height: 27px;
  --dividing-line: rgba(var(--alpha-color), 0.1);
  line-height: calc(var(--height) + 1px) !important;
  background: linear-gradient(180deg, transparent, transparent var(--height), var(--dividing-line) var(--height), var(--dividing-line) var(--height));
  background-size: 100% calc(var(--height) + 1px);

}
</style>
