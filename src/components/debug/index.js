/**
 * Created by Mr.zack on 2017/10/22.
 */
import Vue from 'vue'
import ControlConfig from '@/components/debug/ControlConfig'
import ControlConfigPyy from '@/components/debug/ControlConfigPyy'
import ControlConfigXyl from '@/components/debug/ControlConfigXyl'
import ControlConfigMtw from '@/components/debug/ControlConfigMtw'

const components = [
  ControlConfig,
  ControlConfigPyy,
  ControlConfigXyl,
  ControlConfigMtw
]
export default {
  install () {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
