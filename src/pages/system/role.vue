<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: calc(100vh - 50px);" class="shadow-2 rounded-borders">
      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="300"
        :breakpoint="700"
        elevated
        content-class="bg-grey-2 text-back">
        <q-scroll-area class="fit">
          <div class="q-pa-md text-white bg-blue text-body1">角色</div>
          <div class="q-my-md bg-white">
            <q-list>
              <q-item clickable v-for="(item,index) in sideleft" :key="index" @click="sidesigle(item,index)">
                <q-item-section>
                  <q-item-label class="ellipsis" :class="index == sidelabel ? 'text-blue' : ''">{{item.label}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page>
          <div class="q-pa-md">
            <div class="flex">
              <q-btn icon="menu" color="primary" class="q-mr-sm" @click="drawerLeft = !drawerLeft"></q-btn>
              <q-btn-dropdown color="primary" label="添加">
                <q-list>
                  <q-item clickable v-close-popup @click="onAdd">
                    <q-item-section>
                      <q-item-label>添加</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onEdit">
                    <q-item-section>
                      <q-item-label>编辑</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onDelect">
                    <q-item-section>
                      <q-item-label>删除</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onSave">
                    <q-item-section>
                      <q-item-label>保存</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
          <div class="q-mx-md addborders rounded-borders">
            <div class="q-px-sm border_bt"><q-checkbox v-model="organizersAll" label="组织管理" @input="checkAll(organizersAll)"/>{{organizersA}}</div>
            <div class="q-px-sm border_bt" v-for="(item,index) in organizers" :key="index">
              <q-checkbox v-model="organizersA" :val="item.val" :label="item.label" @input="checkOn(organizersA)"/>
              <q-checkbox v-model="organizersA" :val="item.val" label="添加" @input="checkOn(organizersA)"/>
            </div>
          </div>
        </q-page>
      </q-page-container>

      <q-dialog ref="fixedskill">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">{{roletype == 0 ? '添加' : '编辑'}}角色</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
            <div class="row">
              <div class="col-xs-12 col-sm-12">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.role"
                    label="角色名称"
                    placeholder="请输入角色名称"
                    :dense="false"
                    lazy-rules
                    :rules="[
                      val => val && val.length > 0 || '角色名称必填'
                    ]"
                  >
                    <template v-slot:prepend>
                      <span class="text-red">*</span>
                    </template>
                  </q-input>
                  <q-input
                    ref="desc"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.desc"
                    label="角色描述"
                    placeholder="请输入角色描述"
                    :dense="false"
                  >
                  </q-input>
                </div>
                <div class="q-pa-xs text-body1">
                  <span>是否为管理员</span>
                  <q-radio v-model="dialogobj.group" val="yes" label="是" />
                  <q-radio v-model="dialogobj.group" val="no" label="否" />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" v-close-popup ></q-btn>
            <q-btn flat label="保存" color="primary" @click="sureskill" ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      drawerLeft: false,
      sidelabel: 0,
      sideleft: [
        {label: '计划员'},
        {label: '测试角色20200505_1'}
      ],
      organizersA: [],
      organizersAll: false,
      organizers: [
        {
          label:'组织架构管理',
          val:'zuzhi'
        },
        {
          label:'来往菜单管理',
          val:'menu'
        },
        {
          label:'工厂产线工位架构',
          val:'factory'
        },
      ],
      roletype: 0,
      dialogobj: {
        group: 'no',
        desc: '',
        role: ''
      },
    }
  },
  meta:{
    title: '角色管理',
    titleTemplate: title => `${title} - My Website`,
    meta: {
      description: { name: 'description', content: 'Page 1' },
      keywords: { name: 'keywords', content: 'Quasar website' },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
    }
  },
  methods: {
    sidesigle (item,index) {
      const self = this
      self.sidelabel = index
    },
    onAdd () {
      console.log('添加按钮')
      const self = this
      self.$refs.fixedskill.show()
      self.roletype = 0
    },
    sureskill(){
      console.log('弹窗确定按钮')
    },
    onEdit () {
      console.log('编辑按钮')
      const self = this
      self.$refs.fixedskill.show()
      self.roletype = 1
    },
    onDelect () {
      console.log('删除按钮')
      const self = this
      if (self.organizersA.length > 0) {
        console.log(self.organizersA)
        self.$q.dialog({
          title: '提示',
          message: '确定删除所选用户?',
          ok: {
            push: true,
            label: '确定'
          },
          cancel: {
            push: true,
            label: '取消'
          },
          persistent: true
        }).onOk(() => {
          // console.log('>>>> OK')
          self.$q.notify({
            position: 'center',
            timeout: 1000,
            color: 'negative',
            message: '确定'
          })
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      } else {
        self.$q.notify({
          position: 'center',
          timeout: 1000,
          color: 'negative',
          message: '至少选择一项修改'
        })
      }
    },
    onSave () {
      console.log('保存按钮')
    },
    // checkbox全选
    checkAll (val) {
      let self = this
      self.organizersA = []
      if(val == true){
        self.organizers.forEach((item,index)=>{
          self.organizersA.push(item.val)
          // console.log(self.organizersAll)
        })
      }else{
        self.organizersA = []
      }
    },
    // checkbox单选
    checkOn (val) {
      let self = this
      if(val.length == self.organizers.length){
        self.organizersAll = true
      }else{
        self.organizersAll = false
      }
    },
  }
}
</script>

<style lang="scss" scoped="scoped">
  .addborders{border:1px solid #ccc;}
  .border_bt{border-bottom: 1px solid #ccc;}
  .max-height{max-height: 50vh;}
  .limt-w{width: 800px; max-width: 80vw!important;}
</style>
