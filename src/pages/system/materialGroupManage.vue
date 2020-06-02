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
          <div class="q-pa-md text-white bg-blue text-body1">类型结构树</div>
          <div class="q-my-md bg-white">
            <q-tree
              :nodes="slidesimple"
              accordion
              node-key="label"
            />
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
                      <q-item-label>修改</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onDelect">
                    <q-item-section>
                      <q-item-label>删除</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
					<q-table
						:data="data"
						:columns="columns"
						row-key="name"
						selection="single"
						:selected-rows-label="getSelectedString"
						:rows-per-page-label="'行'"
						:selected.sync="selectedtable"
					/>
        </q-page>
      </q-page-container>

      <q-dialog ref="fixedskill">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">{{roletype == 0 ? '添加' : '修改'}}物料类型</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="order"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="编号"
                    placeholder="请输入编号"
                    :dense="false"
                  >
                  </q-input>
                  <q-input
                    ref="name"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.name"
                    label="名称"
                    placeholder="请输入名称"
                    :dense="false"
                  >
                  </q-input>
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="parent"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.parent"
                    label="父级目录"
                    placeholder=""
                    readonly
                    :dense="false"
                  >
                  </q-input>
                  <q-input
                    ref="desc"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.desc"
                    label="备注"
                    placeholder="请输入备注"
                    :dense="false"
                  >
                  </q-input>
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
      slidesimple: [
        {
          label: '物料类型',
          children: [
            {label: '产品库'},
            {label: '零部件库'},
            {label: '原材料库'}
          ]
        }
      ],
      selectedtable: [],
      columns: [
        {
          name: 'index',
          label: '序号',
          field: 'index',
          align: 'left'
        },
        {
          name: 'order',
          required: true,
          label: '编码',
          align: 'left',
          field: row => row.order,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'name', label: '名称', field: 'name', sortable: true },
        { name: 'parent', label: '父级目录', field: 'parent' },
        { name: 'desc', label: '备注', field: 'desc' },
      ],
      data: [
        {
          index: '1',
          order: 'TC-001',
          name: '产品库',
          parent: '',
          desc: ''
        }
      ],
      roletype: 0,
      dialogobj: {
        order: '',
        name: '',
        parent: '',
        desc: ''
      }
    }
  },
  methods: {
  	// table 选中数据显示文字
    getSelectedString (val) {
      return val + '条' // 不返回空时，table自带的左下角显示为默认的文字
    },
    sureskill(){
      console.log('弹窗确定按钮')
    },
    onAdd () {
      console.log('添加按钮')
      const self = this
      self.$refs.fixedskill.show()
      self.roletype = 0
    },
    onEdit () {
      console.log('修改按钮')
      const self = this
      self.$refs.fixedskill.show()
      self.roletype = 1
    },
    onDelect () {
      console.log('删除按钮')
      const self = this
      if (self.selectedtable.length > 0) {
        console.log(self.selectedtable)
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
          message: '请选择一项修改'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  .max-height{max-height: 50vh;}
  .limt-w{width: 800px; max-width: 80vw!important;}
</style>
