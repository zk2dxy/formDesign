import Vue from 'vue'
import ControlConfig from '@/components/base/ControlConfig'
import CIcon from '@/components/base/CIcon'
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
