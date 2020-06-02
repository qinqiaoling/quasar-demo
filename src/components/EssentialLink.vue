<template>
  <!-- <q-item
    clickable
    @click="onRoter(link)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item> -->
  <div>
    <q-list class="leftmenu">
      <q-expansion-item
        expand-separator
        :default-opened="index == expend ? true : false"
        :group="'somegroupA'"
        v-for="(item,index) in menulist"
        :key="index"
        :to="item.path == '' || item.path == undefined ? '' : item.path"
        :class="item.path == '' ? '' : 'noright'"
        exact-active-class="bg-light"
      >
        <template v-slot:header>
          <q-item-section avatar class="a_w">
            <q-avatar v-if="item.icon == '' || item.icon == undefined ? false : true" class="avatar" size="30px" :icon="item.icon" :color="item.color" text-color="white" />
          </q-item-section>
          <q-item-section >
            <div class="avatar_text">{{item.title}}</div>
          </q-item-section>
          <q-item-section side v-if="item.path == '' || item.path == undefined ? false : true" class="c_p">
            <q-icon name="keyboard_arrow_right" class="keyright" />
          </q-item-section>
        </template>

        <q-expansion-item
          expand-separator
          class="addbordertop"
          :header-inset-level="0.5"
          :label-lines="1"
          :group="'somegroupB'"
          v-for="(itm,inx) in item.children"
          :key="inx"
          :to="itm.path == '' || itm.path == undefined ? '' : itm.path"
          :class="itm.path == '' ? '' : 'noright'"
          exact-active-class="bg-light"
        >
          <template v-slot:header>
            <q-item-section avatar class="a_w" v-if="itm.icon == '' || itm.icon == undefined ? false : true">
              <q-avatar class="avatar" size="30px" :icon="itm.icon" :color="itm.color" text-color="white" />
            </q-item-section>
            <q-item-section >
              <div class="avatar_text">{{itm.title}}</div>
            </q-item-section>
            <q-item-section side v-if="itm.path == '' || itm.path == undefined ? false : true" class="c_p">
              <q-icon name="keyboard_arrow_right" class="keyright" />
            </q-item-section>
          </template>

          <q-expansion-item 
            expand-separator 
            class="addbordertop" 
            :header-inset-level="1" 
            :label-lines="1" 
            :group="'somegroupC' + ix" 
            v-for="(it,ix) in itm.children"
            :key="ix"
            :to="it.path == '' || it.path == undefined ? '' : it.path"
            :class="it.path == '' ? '' : 'noright'"
            exact-active-class="bg-light"
            >
            <template v-slot:header>
              <q-item-section avatar class="a_w" v-if="it.icon == '' || it.icon == undefined ? false : true">
                <q-avatar class="avatar" size="30px" :icon="it.icon" :color="it.color" text-color="white" />
              </q-item-section>
              <q-item-section >
                <div class="avatar_text">{{it.title}}</div>
              </q-item-section>
              <q-item-section side v-if="it.path == '' || it.path == undefined ? false : true" class="c_p">
                <q-icon name="keyboard_arrow_right" class="keyright" />
              </q-item-section>
            </template>
          </q-expansion-item>
        </q-expansion-item>
      </q-expansion-item>

    </q-list>
  </div>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    // title: {
    //   type: String,
    //   required: true
    // },

    // caption: {
    //   type: String,
    //   default: ''
    // },

    // link: {
    //   type: String,
    //   default: '#'
    // },

    // icon: {
    //   type: String,
    //   default: ''
    // },
    menulist:{
      type: Array,
      default: ()=>[]
    }
  },
  data(){
    return{
      expend: 0
      // menulist:[
      //   {
      //     title:'标题一',
      //     path:'',
      //     icon:'school',
      //     color:'primary',
      //     children:[
      //       {
      //         title:'标题1.1',
      //         path:'',
      //         icon:'mail',
      //         color:'purple',
      //         children:[
      //           {
      //             title:'标题1.1.1',
      //             path:'/',
      //             icon:'star',
      //             color:'orange',
      //           }
      //         ]
      //       },
      //       {
      //         title:'标题1.2',
      //         path:'/manage',
      //         icon:'send',
      //         color:'green',
      //       }
      //     ],
      //   },
      //   {
      //     title:'标题一标题一标题一标题一标题一标题一标题一标题一',
      //     path:'/role',
      //     icon:'settings',
      //     color:'teal',
      //   }
      // ]
    }
  },
  computed:{
    // expend(){
    //   let r = this.$route.path
    //   this.menulist.map(function(elem, index) {
    //     // console.log(index,elem)
    //     if(elem.children){
    //       elem.children.map(function(ele, ide) {
    //         if(ele.path == r){
    //           return index
    //         }
    //       })
    //     }
    //   })
    // }
  },
  created(){
    this.expendindex()
  },
  methods: {
    // onRoter (val) {
    //   this.$router.push({ path: val })
    // },
    expendindex(){
      let r = this.$route.path
      let self = this
      self.menulist.map(function(elem, index) {
        if(elem.children){
          elem.children.map(function(ele, ide) {
            if(ele.path == r){
              self.expend = index
            }
          })
        }
      })
    },
  },
  watch:{
    // $route: {
    //   handler: function(val, oldVal){
    //     console.log(val,oldVal);
    //   },
    //   // 深度观察监听
    //   deep: true
    // }
  }
}
</script>

<style type="text/css" scoped="scoped" lang="scss">
  .leftmenu{}
  .leftmenu .a_w{min-width: 40px;padding-right: 10px;}
  .leftmenu .avatar_text{text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 100%;color: #333;}
  .leftmenu .addbordertop{border-top: 1px solid rgba(0, 0, 0, 0.12);}
  /deep/ .leftmenu .noright .q-item__section--side i{display: none;}
  /deep/ .leftmenu .noright .q-item__section--side .avatar i{display: block;}
  /deep/ .leftmenu .noright .q-item__section--side .keyright{display: block;position: absolute;right: 16px;padding-left: 0;}
  /deep/ .leftmenu .noright .q-item__section--side.c_p{padding-left: 0;}
  /deep/ .leftmenu .bg-light .avatar_text{color: var(--q-color-primary);}
  /deep/ .leftmenu .bg-light{background: $blue-1 !important;}
</style>
