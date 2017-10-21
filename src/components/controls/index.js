import Vue from 'vue'
import ControlConfig from '@/components/base/ControlConfig'
import ControlConfigPyy from '@/components/base/ControlConfigPyy'
import ControlConfigXyl from '@/components/base/ControlConfigXyl'
import ControlConfigMtw from '@/components/base/ControlConfigMtw'
import CIcon from '@/components/base/CIcon'
import CValidate from '@/components/base/CValidate'
import CInput from '@/components/controls/CInput'
import CLayout from '@/components/layout/CLayout'
import CCollapse from '@/components/controls/CCollapse'
import CRadio from '@/components/controls/CRadio'
import CCheckbox from '@/components/controls/CCheckbox'
import CSelect from '@/components/controls/CSelect'
import CTag from '@/components/controls/CTag'
import CButton from '@/components/controls/CButton'

const components = [
  ControlConfig,
  ControlConfigPyy,
  ControlConfigXyl,
  ControlConfigMtw,
  CIcon,
  CLayout,
  CCollapse,
  CValidate,
  CInput,
  CRadio,
  CCheckbox,
  CSelect,
  CTag,
  CButton
]
export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
