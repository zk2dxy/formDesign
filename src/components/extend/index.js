import Vue from 'vue'
import ExtendInput from '@/components/extend/input/src/input'
// import ExtendTabNav from '@/components/extend/tabs/src/tab-nav'
import ExtendTabPane from '@/components/extend/tabs/src/tab-pane'
import ExtendCollapse from '@/components/extend/collapse/src/collapse'
import ExtendCollapseItem from '@/components/extend/collapse/src/collapse-item'

const components = [
  ExtendInput,
  ExtendCollapse,
  ExtendCollapseItem,
  ExtendTabPane
]

export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
