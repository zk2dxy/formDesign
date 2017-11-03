const Pages = [{
  path: '/Form',
  name: 'Form',
  component: () => import('@/components/Form')
}, {
  path: '/HelloWorld',
  name: 'HelloWorld',
  component: () => import('@/components/HelloWorld')
}]
export default Pages
