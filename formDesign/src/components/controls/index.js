import Vue from 'vue'
import ControlConfig from '@/components/base/ControlConfig'
import ControlConfigPyy from '@/components/base/ControlConfigPyy'
import CIcon from '@/components/base/CIcon'
import CValidate from '@/components/base/CValidate'
import CInput from '@/components/controls/CInput'
import CLayout from '@/components/layout/CLayout' // 布局控件
const components = [
  ControlConfig,
  ControlConfigPyy,
  CLayout,
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
