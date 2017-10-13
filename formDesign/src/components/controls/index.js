import Vue from 'vue'
import ControlConfig from '@/components/base/ControlConfig'
import ControlConfigPyy from '@/components/base/ControlConfigPyy'
import CIcon from '@/components/base/CIcon'
import CValidate from '@/components/base/CValidate'
import CInput from '@/components/controls/CInput'
import CRadio from '@/components/controls/CRadio'

const components = [
  ControlConfig,
  ControlConfigPyy,
  CIcon,
  CValidate,
  CInput,
  CRadio
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
