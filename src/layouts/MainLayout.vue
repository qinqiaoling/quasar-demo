<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <!-- <q-item-label
          header
          class="text-grey-8"
        > -->
        </q-item-label>
        <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        /> -->
        <EssentialLink :menulist="essentialLinks"/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: '系统管理',
          path: '',//没有路径就会有级联关系
          icon: 'settings',
          color: 'primary',
          children: [
            {
              title: '用户管理',
              path: '/'
              // icon:'mail',
              // color:'purple',
              // children:[
              //   {
              //     title:'标题1.1.1',
              //     path:'/',
              //     icon:'star',
              //     color:'orange',
              //   }
              // ]
            },
            {
              title: '角色管理权限',
              path: '/st/role'
              // icon:'send',
              // color:'green',
            },
            {
              title: '数字字典',
              path: '/st/dd'
              // icon:'send',
              // color:'green',
            },
            {
              title: '物料分组管理',
              path: '/st/mg'
              // icon:'send',
              // color:'green',
            }
          ]
        },
        {
          title: '基础数据',
          path: '',//没有路径就会有级联关系
          icon: 'settings',
          color: 'primary',
          children: [
            {
              title: '工位管理',
              path: '/bd/wm'
            },
            {
              title: '岗位管理',
              path: '/bd/pm'
            },
            {
              title: 'BOM管理',
              path: '/bd/bom'
            },
            {
              title: '物料管理',
              path: '/bd/mm'
            },
            {
              title: '工厂日历',
              path: '/bd/fc'
            },
            {
              title: '生产周期维护',
              path: '/bd/pcm'
            },
            {
              title: '班制管理',
              path: '/bd/cm'
            },
            {
              title: '工艺管理',
              path: '/bd/prm'
            }
          ]
        },
        {
          title: '车间计划',
          path: '',//没有路径就会有级联关系
          icon: 'settings',
          color: 'primary',
          children: [
            {
              title: '生产订单管理',
              path: '/pp/pm'
            },
            {
              title: '派工管理',
              path: '/pp/dm'
            },
            {
              title: '工单查看',
              path: '/pp/rc'
            },
            {
              title: '报工工作台',
              path: '/pp/rt'
            }
          ]
        },
        {
          title: '仓库管理',
          path: '',//没有路径就会有级联关系
          icon: 'settings',
          color: 'primary',
          children: [
            {
              title: '库房设置',
              path: '/sm/ws'
            },
            {
              title: '物料配送',
              path: '/sm/ms'
            }
          ]
        },
        {
          title: '生产执行管理',
          path: '',//没有路径就会有级联关系
          icon: 'settings',
          color: 'primary',
          children: [
            {
              title: '转运单查看',
              path: '/pem/ito'
            }
          ]
        }
      ]
    }
  }
}
</script>
