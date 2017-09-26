import Vue from 'vue'
import CInput from '@/components/controls/CInput'

const components = [
  CInput
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
