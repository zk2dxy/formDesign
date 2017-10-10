import Vue from 'vue'
import ControlConfig from '@/components/controls/ControlConfig'
import CIcon from '@/components/controls/CIcon'
import CInput from '@/components/controls/CInput'

const components = [
  ControlConfig,
  CIcon,
  CInput
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
