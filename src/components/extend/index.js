import Vue from 'vue'
import ExtendInput from '@/components/extend/input/src/input'
import ExtendCollapse from '@/components/extend/collapse/src/collapse'
import ExtendCollapseItem from '@/components/extend/collapse/src/collapse-item'

const components = [
  ExtendInput,
  ExtendCollapse,
  ExtendCollapseItem
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
