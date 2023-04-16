export function useStorage<T>(key: string, defaultValue: T): { value: T }
export function useServerStorage(): { save: Function }