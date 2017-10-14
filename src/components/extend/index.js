import Vue from 'vue'
import ExtendInput from '@/components/extend/input/src/input'

const components = [
  ExtendInput
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
