const root = [{
  path: '/',
  name: 'Form',
  component: () => import('@/components/Form')
}, {
  path: '/Index',
  name: 'Index',
  component: () => import('@/components/Index')
}]

export default root
