/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/financial',
  component: Layout,
  redirect: '/table/financial',
  name: 'Table',
  //openeds: ['1'],
  meta: {
    title: 'financial',
    icon: 'table'
  },
  children: [
    
    {
      path: 'analysis',
      component: () => import('@/views/financial/analysis'),
      name: 'analysis',
      meta: { title: '财务分析页',roles: ['admin', 'editor'] }
    },
    {
      path: 'consumption',
      component: () => import('@/views/financial/consumption'),
      name: 'consumption',
      meta: { title: '消费管理页',roles: ['admin', 'editor'] }
    },
    {
      path: 'income',
      component: () => import('@/views/financial/income'),
      name: 'income',
      meta: { title: '收入管理页',roles: ['admin', 'editor'] }
    },
    {
      path: 'debt',
      component: () => import('@/views/financial/debt'),
      name: 'debt',
      meta: { title: '债务管理页',roles: ['admin', 'editor'] }
    },
    {
      path: 'investment',
      component: () => import('@/views/financial/investment'),
      name: 'investment',
      meta: { title: '理财管理页',roles: ['admin', 'editor'] }
    }
  ]
}
export default tableRouter
