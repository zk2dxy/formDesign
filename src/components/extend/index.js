import Vue from 'vue'
import ExtendInput from '@/components/extend/input/src/input'
import ExtendCollapse from '@/components/extend/collapse/src/collapse'
import ExtendCollapseItem from '@/components/extend/collapse/src/collapse-item'
import ExtendSwitch from '@/components/extend/switch/src/component'
import ExtendCheckbox from '@/components/extend/checkbox/src/checkbox'
import ExtendCheckboxButton from '@/components/extend/checkbox/src/checkbox-button'
import ExtendCheckboxGroup from '@/components/extend/checkbox/src/checkbox-group'

const components = [
  ExtendInput,
  ExtendCollapse,
  ExtendCollapseItem,
  ExtendSwitch,
  ExtendCheckbox,
  ExtendCheckboxButton,
  ExtendCheckboxGroup
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
