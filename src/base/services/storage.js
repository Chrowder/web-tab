import { reactive, watch } from 'vue'
import { useUser } from './user'
import { debounce } from 'lodash'
import { defineStore } from 'pinia'


const useServerStorage = defineStore('server_storage', () => {
  const { save: doSave, getUserInfo, user } = useUser()

  const global = {}

  const doParse = (data) => {
    try {
      return JSON.parse(data)
    } catch {
      return undefined
    }
  }

  const doStringify = (data) => {
    return JSON.stringify(data)
  }

  const initServerStorage = async () => {
    const info = await getUserInfo()

    getInfoPromise = undefined

    let cache = info?.data?.data

    if (cache) {
      return doParse(cache)
    }

    return cache
  }

  let getInfoPromise
  const init = () => {
    if (!getInfoPromise) {
      getInfoPromise = initServerStorage()
    }

    return getInfoPromise
  }

  const registerStorage = (key, data) => {
    global[key] = data
  }

  const save = debounce(() => {
    let dataStr = doStringify(global)

    return doSave(dataStr)
  }, 300)

  return { init, registerStorage, save }
})

const useStorage = (key, defaultValue) => {
  const { init: initServerStorage, registerStorage, save } = useServerStorage()
  const { user } = useUser()

  const Storage_Key = key

  const initLocalStorage = () => {
    const storageStr = localStorage.getItem(Storage_Key)

    if (!storageStr) {
      return defaultValue
    }

    const storaged = JSON.parse(storageStr)

    return storaged
  }

  const init = () => {

    initServerStorage().then(serverCache => {
      if (serverCache) {
        if (serverCache[Storage_Key]) {
          updateData(serverCache[Storage_Key])
        }
      }
    })

    return initLocalStorage()
  }

  const updateData = (cache) => {
    for (let key in data) {
      delete data[key]
    }

    for (let key in cache) {
      data[key] = cache[key]
    }
  }

  const updateStorage = (value) => {
    const storageStr = JSON.stringify(value)

    localStorage.setItem(Storage_Key, storageStr)
    save()
  }

  const cache = init()
  const data = reactive(cache)


  watch(data, updateStorage, { deep: true })
  watch(() => user.login, (login) => {
    if (login) {
      initServerStorage().then(serverCache => {
        if (serverCache) {
          if (serverCache[Storage_Key]) {
            updateData(serverCache[Storage_Key])
          }
        }
      })
    }
  })

  registerStorage(Storage_Key, data)

  return { value: data }
}

export { useStorage, useServerStorage }