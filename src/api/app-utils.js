import {Message, Notification} from 'element-ui'

const AppUtils = {
  showMsg: function (msg) {
    Message({
      message: msg,
      type: 'success'
    })
  },
  showWarning: function (msg) {
    Message({
      message: msg,
      type: 'warning'
    })
  },
  showNWarning: function (msg, options = {}) {
    let duration = options.duration || 0
    Notification({
      type: 'warning',
      message: msg,
      duration: duration // 不会自动关闭
    })
  }
}
export default AppUtils
