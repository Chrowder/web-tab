import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '../services/storage';
import defaultLangauge from '../../langauge/zh-cn.json'

const Langauge = {
  zhcn: {
    label: '简体中文',
    value: 'zh-cn'
  },
  enus: {
    label: 'English',
    value: 'en-us'
  }
}

const useNLS = defineStore('nls', () => {

  const { value: config } = useStorage('nls_config', {
    local: 'zh-cn',
  })

  const langauge = ref(defaultLangauge)

  function _format(message, args) {
    let result

    if (args.length === 0) {
      result = message;
    } else {
      result = message.replace(/\{(\d+)\}/g, (match, rest) => {
        const index = rest[0];
        const arg = args[index];
        let result = match;
        if (typeof arg === 'string') {
          result = arg;
        } else if (typeof arg === 'number' || typeof arg === 'boolean' || arg === void 0 || arg === null) {
          result = String(arg);
        }
        return result;
      });
    }

    return result;
  }

  function init(settings) {
    langauge.value = settings
  }

  const updateLocal = (local) => {
    config.local = local

    import(`../../langauge/${config.local}.json`).then(setting => {
      langauge.value = setting.default
    })
  }

  function localize(key, ...args) {
    let message = langauge.value[key]

    return _format(message, args);
  }

  return { config, localize, init, updateLocal }
})

export { useNLS, Langauge }