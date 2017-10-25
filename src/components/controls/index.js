import Vue from 'vue'
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
import CBadge from '@/components/controls/CBadge'
import CCard from '@/components/controls/CCard'
import CCascade from '@/components/controls/CCascader'
import CUpload from '@/components/controls/CUpload'
import CStep from '@/components/controls/CStep'
import CDateTimePicker from '@/components/controls/CDateTimePicker'
import CDialog from '@/components/controls/CDialog'
import CLoading from '@/components/controls/CLoading'
import CMessageBox from '@/components/controls/CMessageBox'
import CPage from '@/components/controls/CPage'
import CPopover from '@/components/controls/CPopover'
import CProgress from '@/components/controls/CProgress'
import CSlider from '@/components/controls/CSlider'
import CSwitch from '@/components/controls/CSwitch'
import CTabs from '@/components/controls/CTabs'

const components = [
  CCard,
  CProgress,
  CSwitch,
  CPopover,
  CSlider,
  CCascade,
  CDateTimePicker,
  CLoading,
  CMessageBox,
  CPage,
  CDialog,
  CIcon,
  CLayout,
  CCollapse,
  CCard,
  CUpload,
  CStep,
  CValidate,
  CInput,
  CRadio,
  CCheckbox,
  CSelect,
  CTag,
  CButton,
  CBadge,
  CTabs
]
export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
