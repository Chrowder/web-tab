<script setup>
import { NModal, NCard, NTabs, NForm, NFormItemRow, NInput, NButton, NTabPane } from 'naive-ui';
import { computed, reactive } from 'vue';
import { useUser } from '../../base/services/user'
import { useNLS } from '../../base/hooks/nls';

const value = reactive({})
const { user, register: doRegister, login: doLogin } = useUser()
const { localize } = useNLS()

const resigterPasswordStatus = computed(() => {
  if (value.password && value.passwordConfirm) {
    if (value.password !== value.passwordConfirm) {
      return 'error'
    }
  }
  return 'success'
})

const register = () => {
  if (value.username && value.password && value.passwordConfirm) {
    if (value.password === value.passwordConfirm) {
      doRegister(value.username, value.password)
    }
  }
}

const login = async () => {
  if (value.username && value.password) {
    await doLogin(value.username, value.password)

    reset()
    hide()
  }
}

const reset = () => {
  value.username = ''
  value.password = ''
  value.passwordConfirm = ''
}

const hide = () => {
  user.show = false
}


</script>

<template>
  <n-modal title="123" :close-on-esc="true" v-model:show="user.show" class="user-modal" :mask-closable="true">
    <n-card>
      <n-tabs class="card-tabs" default-value="signin" size="large" animated style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;" @update-value="reset">
        <n-tab-pane name="signin" :tab="localize('user.signin')">
          <n-form>
            <n-form-item-row :label="localize('user.username')">
              <n-input v-model:value="value.username" :placeholder="localize('user.username.placeholder')" />
            </n-form-item-row>
            <n-form-item-row :label="localize('user.password')">
              <n-input type="password" v-model:value="value.password"
                :placeholder="localize('user.password.placeholder')" />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="login">
            {{ localize('user.signin') }}
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" :tab="localize('user.signup')">
          <n-form>
            <n-form-item-row :label="localize('user.username')">
              <n-input v-model:value="value.username" :placeholder="localize('user.username.placeholder')" />
            </n-form-item-row>
            <n-form-item-row :label="localize('user.password')">
              <n-input type="password" v-model:value="value.password"
                :placeholder="localize('user.password.placeholder')" />
            </n-form-item-row>
            <n-form-item-row :label="localize('user.password.confirm')">
              <n-input type="password" :status="resigterPasswordStatus" v-model:value="value.passwordConfirm"
                :placeholder="localize('user.password.confirm.placeholder')" />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="register">
            {{ localize('user.signup') }}
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>

<style>
.user-modal {
  width: 500px;
}
</style>