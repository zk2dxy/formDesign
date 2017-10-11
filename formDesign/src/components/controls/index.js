import Vue from 'vue'
import ControlConfig from '@/components/base/ControlConfig'
import CIcon from '@/components/base/CIcon'
import CValidate from '@/components/base/CValidate'
import CInput from '@/components/controls/CInput'

const components = [
  ControlConfig,
  CIcon,
  CValidate,
  CInput
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
