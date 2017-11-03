const Pages = [{
  path: '/Form',
  name: 'Form',
  component: () => import('@/components/Form')
}, {
  path: '/HelloWorld',
  name: 'HelloWorld',
  component: () => import('@/components/HelloWorld')
}, {
  path: '/ControlsManage',
  name: 'ControlsManage',
  component: () => import('@/components/controls-manage/ControlsManage')
}]

export default Pages
