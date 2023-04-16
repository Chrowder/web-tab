import { HomeOutline, CodeOutline, ColorPaletteOutline, ThumbsUpOutline, GameControllerOutline, SettingsOutline } from '@vicons/ionicons5'

const _icons = {
  HomeOutline,
  CodeOutline,
  ColorPaletteOutline,
  ThumbsUpOutline,
  GameControllerOutline,
  SettingsOutline
}

const resigterIcon = (key, component) => {
  _icons[key] = component
}

const getIcon = (key) => {
  return _icons[key]
}


export { resigterIcon, getIcon }