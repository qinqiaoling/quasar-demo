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
          <div class="q-pa-md text-white bg-blue text-body1">岗位结构</div>
          <div class="q-my-md bg-white" v-for="i in 1" :key="i">
            <q-tree
              :nodes="slidesimple"
              accordion
              node-key="label"
              :selected.sync="selectedtree"
              @update:selected="selectedfun"
            />
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page>
          <div class="q-pa-md">
            <div class="flex">
              <q-btn icon="menu" color="primary" class="q-mr-sm" @click="drawerLeft = !drawerLeft"></q-btn>
              <q-btn-dropdown color="primary" label="操作" class="q-mr-sm">
                <q-list>
                  <q-item clickable v-close-popup v-for="(btn,index) in btnoption" :key="index" @click="onAdd(btn,index)">
                    <q-item-section>
                      <q-item-label>{{btn.label}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <!-- <q-select style="min-width: 150px" class="q-mr-sm" clearable color="primary" v-model="dialogobj.role" :options="serchoptions" :dense="true"/> -->
              <q-input ref="role" class="q-mr-sm" clearable clear-icon="close" v-model="dialogobj.role" label="值" :dense="true"/>
              <q-btn color="primary" class="q-mr-sm" @click="serch()">搜索</q-btn>
            </div>
          </div>
	       	<div class="q-pa-md">
       			<q-table
              :data="data"
              :columns="columns"
              row-key="index"
              selection="single"
              :selected-rows-label="getSelectedString"
              :rows-per-page-label="'行'"
              :selected.sync="selected"
              separator="cell"
            	>
	          </q-table>
          </div>
        </q-page>
      </q-page-container>

      <q-dialog ref="fixedskill">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">{{typegw == 0 ? '新增岗位' : '编辑岗位'}}</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
            <div class="row">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="岗位编码"
                  :dense="false"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="岗位名称"
                  :dense="false"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select clearable color="primary" label="所属组织" v-model="dialogobj.role" :options="['组织1','组织2']" :dense="false"/>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select clearable color="primary" label="直属上级" v-model="dialogobj.role" :options="['JOBO','JOB1']" :dense="false"/>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select clearable color="primary" label="有效性" v-model="dialogobj.role" :options="['有效','无效']" :dense="false"/>
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
	import mock from '../../mock/warehouse'
export default {
  name: 'warehouseset',
  data () {
    return {
      drawerLeft: false,
      slidesimple: [],
      selectedtree: '',
      btnoption:[
      	{
      		label:'添加'
      	},
      	{
      		label:'修改'
      	},
      	{
      		label:'删除'
      	},
      	{
      		label:'导入'
      	},
      	{
      		label:'导出'
      	}
      ],
      selected: [],
      typegw: 0,
      columns: [
        { name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'status', label: '岗位编码', field: 'status', sortable: true, align: 'center' },
        { name: 'zy_order', label: '岗位名称', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '所属组织', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '直属上级', field: 'order', sortable: true, align: 'center' },
        { name: 'main', label: '创建时间', field: 'main', sortable: true, align: 'center' },
        { name: 'handle', label: '有效性', field: 'handle', sortable: true, align: 'center' }
      ],
      data: [
        {
          index: '1',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          main: 'AVG转运',
          handle: ''
        },
        {
          index: '2',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          main: 'AVG',
          handle: ''
        },
      ],
      dialogobj: {
        group: 'no',
        desc: '',
        role: ''
      },
    }
  },
  mounted(){
  	this.slidesimple = mock.treeSource.data
    this.getnodetree()
  },
  methods: {
  	getnodetree(){
	    console.log('axios',mock.treeSource.data)
    },
    // tree select
    selectedfun(val){
    	console.log(val)
    	this.$refs.fixedskill.show()
    },
    // table 选中数据显示文字
    getSelectedString (val) {
      return val + '条' // 不返回空时，table自带的左下角显示为默认的文字
    },
    // 搜索
    serch(){

    },
    onAdd (val,index) {
      console.log('添加按钮')
      const self = this
      if(index == 0){
      	self.$refs.fixedskill.show()
      	self.typegw = 0
      }else if(index == 1){
      	self.$refs.fixedskill.show()
      	self.typegw = 1
      }else if(index == 2){
      	if (self.selected.length > 0) {
	        console.log(self.selected)
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
      }else if(index == 3){
      	self.$q.notify({
          position: 'center',
          timeout: 1000,
          color: 'negative',
          message: '导入'
        })
      }else if(index == 4){
      	self.$q.notify({
          position: 'center',
          timeout: 1000,
          color: 'negative',
          message: '导出'
        })
      }
    },
    sureskill(){
      console.log('弹窗确定按钮')
    },
  }
}
</script>

<style lang="scss" scoped="scoped">
  .addborders{border:1px solid #ccc;}
  .addborder{border-left: 1px solid rgba(0, 0, 0, 0.12) !important;}
  .title{
  	border-bottom:2px solid var(--q-color-primary);;
  }
  .border_bt{border-bottom: 1px solid #ccc;}
  .max-height{max-height: 50vh;}
  .limt-w{width: 800px; max-width: 80vw!important;}
</style>
