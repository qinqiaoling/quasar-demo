
const routes = [
  {
    path: '/',//系统管理-用户管理
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },//系统管理-用户管理
      { path: '/st/role', component: () => import('pages/system/role.vue') },//系统管理-角色权限管理
      { path: '/st/mg', component: () => import('pages/system/materialGroupManage.vue') },//系统管理-物料分组管理
      { path: '/st/dd', component: () => import('pages/system/digitalDictionary.vue') },//系统管理-数字字典

      { path: '/bd/wm', component: () => import('pages/basicData/workManage.vue') },//基础数据-工位管理
      { path: '/bd/pm', component: () => import('pages/basicData/postManage.vue') },//基础数据-岗位管理
      { path: '/bd/bom', component: () => import('pages/basicData/BOMManage.vue') },//基础数据-BOM管理
      { path: '/bd/mm', component: () => import('pages/basicData/materialManagement.vue') },//基础数据-物料管理
      { path: '/bd/fc', component: () => import('pages/basicData/factoryCalendar.vue') },//基础数据-工厂日历
      { path: '/bd/pcm', component: () => import('pages/basicData/productCycleMaintenance.vue') },//基础数据-生产周期维护
      { path: '/bd/cm', component: () => import('pages/basicData/classManage.vue') },//基础数据-班制管理
      { path: '/bd/prm', component: () => import('pages/basicData/processManage.vue') },//基础数据-工艺管理

      { path: '/pp/pm', component: () => import('pages/productPlan/productManage.vue') },//车间计划-生产订单管理
      { path: '/pp/dm', component: () => import('pages/productPlan/dispatchingManage.vue') },//车间计划-派工管理
      { path: '/pp/rc', component: () => import('pages/productPlan/repairOrderCheck.vue') },//车间计划-工单查看
      { path: '/pp/rt', component: () => import('pages/productPlan/reportingTable.vue') },//车间计划-报工工作台

      { path: '/sm/ws', component: () => import('pages/storeManage/warehouseSet.vue') },//仓库管理-库房设置
      { path: '/sm/ms', component: () => import('pages/storeManage/materialSend.vue') },//仓库管理-物料配送

      { path: '/pem/ito', component: () => import('pages/productExeManage/inspectTranshOrder.vue') },//生产执行管理-转运单查看
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
