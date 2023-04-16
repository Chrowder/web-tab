import { defineStore } from 'pinia'
import { useStorage } from './storage'

const Target = {
  blank: '_blank',
  self: '_self'
}

const useSearch = defineStore('search', () => {

  const { value: search } = useStorage('search_config', {
    active: 'google',
    target: Target.blank,
    engine: [
      { name: 'Google', key: 'google', url: 'https://www.google.com/search?q=' },
      { name: '百度', key: 'baidu', url: 'https://www.baidu.com/s?wd=' },
      { name: '必应', key: 'bing', url: 'https://www.bing.com/search?q=' }
    ]
  })

  const getActiveEngine = () => {
    for (let engine of search.engine) {
      if (engine.key === search.active) {
        return engine
      }
    }
  }

  const doSearch = (query) => {
    const engine = getActiveEngine()

    if (engine) {
      const { url } = engine

      window.open(`${url}${query}`, search.target)
    }

  }


  return { search, doSearch }


})

export { useSearch }