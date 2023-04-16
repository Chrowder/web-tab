import { defineStore } from 'pinia'
import { useStorage } from './storage'
import dayjs from 'dayjs'

const useNote = defineStore('note', () => {
  const { value: notes } = useStorage('note_config', {
    active: 'default',
    notes: [
      {
        title: '备忘录',
        key: 'default',
        subtitle: '',
        content: ''
      }
    ]
  })

  const add = () => {
    const title = dayjs().format('YYYY-MM-DD')
    const subtitle = title
    const key = dayjs().valueOf()
    const content = ''

    notes.notes.push({
      title,
      subtitle,
      content,
      key
    })
  }

  return { notes, add }
})

export { useNote }