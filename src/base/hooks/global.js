import { provide, inject } from 'vue'
const globalInjectKey = 'global'

const registerGlobal = (global) => {
  provide(globalInjectKey, global)
}

const useGlobal = () => {
  return inject(globalInjectKey)
}

export { registerGlobal, useGlobal }