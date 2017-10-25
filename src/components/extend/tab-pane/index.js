import ExtendTabPane from '../tabs/src/tab-pane.vue'

/* istanbul ignore next */
ExtendTabPane.install = function (Vue) {
  Vue.component(ExtendTabPane.name, ExtendTabPane)
}

export default ExtendTabPane
