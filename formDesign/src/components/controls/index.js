import Vue from 'vue'
import ControlConfig from '@/components/controls/ControlConfig'
import CInput from '@/components/controls/CInput'

const components = [
  ControlConfig,
  CInput
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
