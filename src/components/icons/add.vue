<script setup>
import { NModal, NCard, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { IconsInjectKey } from './interface'
import { computed, inject, ref } from 'vue'
import { useStyle } from '../../base/services/style'
import { request } from '../../base/common/request'
import { IconImageType } from '../../base/services/icons'
import Tabs from '../../base/ui/tabs/tabs.vue'
import TabPane from '../../base/ui/tabs/tab-pane.vue'
import ColorPicker from '../../base/ui/color-picker/color-picker.vue'
import cls from 'classnames'
import { IconType } from '../../base/services/icons'
import { useNLS } from '../../base/hooks/nls'

const { localize } = useNLS()

const { modalShow, addIcon, hideModal } = inject(IconsInjectKey)
const { style } = useStyle()
const formValue = ref({})
const iconSrc = ref()
const iconType = ref(IconImageType.Text)

const textIconStyle = computed(() => {
  if (formValue.value.backgroundColor) {
    return { backgroundColor: formValue.value.backgroundColor }
  }
})

const calcPreviewClassname = (type) => cls('icon-preview', { active: iconType.value === type })

const getIcon = async () => {
  const url = formValue.value.url

  const response = await request({
    method: 'get',
    url: '/website/info',
    params: { lang: 'cn', url }
  })

  const content = response.data.data

  formValue.value.name = content?.name
  formValue.value.text = content?.name.slice(0, 3).toUpperCase()

  iconSrc.value = content?.src
}

const handlePreviewTypeChange = (type) => {
  iconType.value = type
}

const createIcon = () => {
  return {
    name: formValue.value.name,
    url: formValue.value.url,
    type: IconType.Link,
    backgroundColor: formValue.value.backgroundColor ?? 'transparent',
    iconType: iconType.value,
    iconUrl: iconSrc.value,
    iconText: formValue.value.text
  }
}

const save = () => {
  const icon = createIcon()
  addIcon(icon)
  hideModal()

  formValue.value = {}
  iconType.value = IconImageType.Text
  iconSrc.value = undefined
}
</script>

<template>
  <NModal v-model:show="modalShow">
    <n-card class="icon-add-card" :content-style="{ padding: 0 }">
      <Tabs>
        <TabPane :name="localize('icon.custom.title')" tab="1">
          <n-form :model="formValue" :label-width="80" label-placement="left" label-align="left">
            <n-form-item :label="localize('icon.custom.address')" path="url">
              <n-input v-model:value="formValue.url" :style="{ width: '420px' }"
                :placeholder="localize('icon.custom.address.placeholder')">
                <template #suffix>
                  <div @click="getIcon">{{ localize('icon.custom.get') }}</div>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item :label="localize('icon.custom.name')" path="name">
              <n-input v-model:value="formValue.name" :style="{ width: '420px' }"
                :placeholder="localize('icon.custom.name.placeholder')"></n-input>
            </n-form-item>
            <n-form-item :label="localize('icon.custom.icon.color')" path="backgroundColor">
              <color-picker :style="{ width: '420px' }" v-model:value="formValue.backgroundColor"
                :options="style.icon.colorOptions" :allow-custom="true"></color-picker>
            </n-form-item>
            <n-form-item :label="localize('icon.custom.icon.text')" path="text">
              <n-input v-model:value="formValue.text" :style="{ width: '420px' }" :maxlength="5"
                :placeholder="localize('icon.custom.icon.text.placeholder')"></n-input>
            </n-form-item>
            <div class="icon-preview-box">
              <div class="icon-preview-wrapper">
                <div :class="calcPreviewClassname(IconImageType.Text)"
                  @click="() => handlePreviewTypeChange(IconImageType.Text)">
                  <div class="icon-preview-text" :style="textIconStyle">{{ formValue.text }}</div>
                </div>
                <div class="icon-preview-label">
                  {{ localize('icon.custom.text.icon') }}
                </div>
              </div>
              <div class="icon-preview-wrapper" v-if="iconSrc">
                <div :class="calcPreviewClassname(IconImageType.Image)"
                  @click="() => handlePreviewTypeChange(IconImageType.Image)">
                  <img class="icon-preview-img" :style="textIconStyle" :src="iconSrc" />
                </div>
                <div class="icon-preview-label">
                  {{ localize('icon.custom.icon') }}
                </div>
              </div>

            </div>
          </n-form>
          <div class="save">
            <n-button @click="save">保存</n-button>
          </div>
        </TabPane>
      </Tabs>
    </n-card>
  </NModal>
</template>

<style>
.icon-add-card {
  width: 1000px;
  padding: 0;
}

.w420 {
  width: 420px;
}

.icon-preview-box {
  padding-left: 80px;
  box-sizing: border-box;
  display: flex;
}

.icon-preview-wrapper {
  margin-right: 16px;
}

.icon-preview {
  height: var(--icon-size);
  width: var(--icon-size);
  border: 2px solid transparent;
  position: relative;
  border-radius: var(--icon-raduis);
  overflow: hidden;
  user-select: none;
}


.icon-preview:hover {
  border-color: #fff;
  box-shadow: 0 0 12px 3px #0003;
}

.icon-preview.active {
  border-color: #fff;
  box-shadow: 0 0 12px 3px #0003;
}

.icon-preview.active::before {
  content: "\2714";
  position: absolute;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  z-index: 1;
  border-radius: 20px;
}

.icon-preview-text {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 500;
  color: #fff;

}

.icon-preview-img {
  height: 100%;
  width: 100%;
}

.icon-preview-label {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7px;
}

.save {
  padding-left: 80px;
}

.save-btn {
  display: inline-block;
  padding: 8px 16px;
  width: 120px;
  text-align: center;
  box-sizing: border-box;
}
</style>