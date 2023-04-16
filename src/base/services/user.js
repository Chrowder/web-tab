import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { request } from '../common/request'

const useUser = defineStore('user', () => {
  const user = reactive({
    show: false,
    avatar: 'default-avatar.png',
    login: false
  })

  const login = async (username, password) => {
    await request({ method: 'post', url: '/user/login', data: { username, password } })

    getUserInfo()

    user.login = true
  }

  const logout = async () => {
    await request({ method: 'post', url: '/user/logOut' })
    user.login = false
  }

  const getUserInfo = async () => {
    const response = await request({ method: 'get', url: '/user/info' })

    const info = response.data

    if (info.data) {
      user.avatar = info.data.avatar
    }

    return info
  }

  const register = async (username, password) => {
    return await request({ method: 'post', url: '/user/register', data: { username, nickname: username, password } })
  }

  const save = async (data) => {
    if (!user.login) {
      return
    }

    await request({ method: 'put', url: '/user', data: { data } })
  }

  const init = () => {
    getUserInfo().then(info => {
      if (info.data) {
        user.login = true
      }
    })
  }

  init()

  return { user, login, logout, register, getUserInfo, save }
})

export { useUser }