import Vue from 'vue'
import ExtendInput from '@/components/extend/input/src/input'
import ExtendCollapse from '@/components/extend/collapse/src/collapse'
import ExtendCollapseItem from '@/components/extend/collapse/src/collapse-item'
import ExtendSteps from '@/components/extend/steps/src/steps'
import ExtendStep from '@/components/extend/steps/src/step'
import ExtendSwitch from '@/components/extend/switch/src/component'
import ExtendCheckbox from '@/components/extend/checkbox/src/checkbox'
import ExtendCheckboxButton from '@/components/extend/checkbox/src/checkbox-button'
import ExtendCheckboxGroup from '@/components/extend/checkbox/src/checkbox-group'
import ExtendTabPane from '@/components/extend/tab-pane'

const components = [
  ExtendInput,
  ExtendCollapse,
  ExtendCollapseItem,
  ExtendSteps,
  ExtendStep,
  ExtendSwitch,
  ExtendCheckbox,
  ExtendCheckboxButton,
  ExtendCheckboxGroup,
  ExtendTabPane
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
