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
          <div class="q-pa-md text-white bg-blue text-body1">组织结构</div>
          <!-- <div class="q-my-md bg-white" v-for="i in 3" :key="i">
            <q-tree
              :nodes="slidesimple"
              accordion
              node-key="label"
              :selected.sync="selectedtree"
              @update:selected="selectedfun"
            />
          </div> -->
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
              <q-input ref="role" class="q-mr-sm" clearable clear-icon="close" v-model="dialogobj.role" label="值" Placeholder="请输入工位编号或工位名称" :dense="true"/>
              <q-btn color="primary" class="q-mr-sm" @click="serch">搜索</q-btn>
            </div>
          </div>
	       	<div class="q-pa-md">
       			<q-table
       				class="my-sticky-column-table"
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
            <div class="text-h6">{{typegw == 0 ? '新增' : '编辑'}}</div>
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
                  label="工位编码"
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
                  label="工位名称"
                  :dense="false"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select clearable color="primary" label="有效性" v-model="dialogobj.role" :options="['有效','无效']" :dense="false"/>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select clearable color="primary" label="所属组织" v-model="dialogobj.role" :options="['组织1','组织2']" :dense="false"/>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select clearable color="primary" label="所属产线" v-model="dialogobj.role" :options="['组织1','组织2']" :dense="false"/>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select clearable color="primary" label="工位属性" v-model="dialogobj.role" :options="['JOBO','JOB1']" :dense="false"/>
           		</div>
            </div>
            <q-card class="q-mt-md">
            	<q-tabs
				        v-model="tab"
				        align="justify"
				        narrow-indicator
				        dense
				        active-color="primary"
          			indicator-color="primary"
          			@input="tabinput"
				      >
				        <q-tab v-for="(tb,ix) in tabs" :key="ix" :name="tb.name" :label="tb.label" />
				      </q-tabs>
				      <q-tab-panels v-model="tab" animated>
			          <q-tab-panel :name="tb.name" v-for="(tb,ix) in tabs" :key="ix">
			            <div class="text-body">
			            	<span>{{tb.label}}</span>
			            	<q-btn icon="add" dense size="xs" color="primary" class="q-ml-sm" @click="adddata()"></q-btn>
		                <q-btn icon="remove" dense size="xs" color="primary" class="q-ml-sm" @click="deletedata()"></q-btn>
			            </div>
			            <div class="q-pt-md">
			            	<q-table
				              :data="data"
				              :columns="columns0"
				              row-key="index"
				              selection="single"
				              :selected-rows-label="getSelectedString"
				              :rows-per-page-label="'行'"
				              :selected.sync="selected"
				              separator="cell"
				            	>
					          </q-table>
			            </div>
			          </q-tab-panel>
			        </q-tab-panels>
            </q-card>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" v-close-popup ></q-btn>
            <q-btn flat label="保存" color="primary" @click="sureskill" ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog ref="fixedimport">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">导入用户</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
            <div class="row">
              <div class="col-xs-12 col-sm-12">
                <p class="q-py-md text-red">{{tip}}</p>
                <q-input
                  @input="val => { file = val[0] }"
                  type="file"
                  v-model="tipfile"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" v-close-popup ></q-btn>
            <q-btn flat label="确定" color="primary" @click="sureskill" ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-layout>
  </div>
</template>

<script>
	import mock from '../../mock/warehouse'
export default {
  name: 'workManage',
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
      tab: 0,
      typegw: 0,
      tip: '(注:文档内标题标红的列为必填项,请勿输入以下非法字符：~、@、$、^、&、《、》、<、>、￥)',
      tipfile: null,
      columns: [
        { name: 'index', label: '序号', field: 'index', align: 'center', required: true },
        { name: 'status', label: '工位编码', field: 'status', sortable: true,align: 'center',required: true},
        { name: 'zy_order', label: '工位名称', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '所属组织', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '所属产线', field: 'order', sortable: true, align: 'center' },
        { name: 'ry', label: '人员', field: 'ry', sortable: true, align: 'center' },
        { name: 'gx', label: '工序', field: 'gx', sortable: true, align: 'center' },
        { name: 'shebei', label: '设备', field: 'shebei', sortable: true, align: 'center' },
        { name: 'gz', label: '工装', field: 'gz', sortable: true, align: 'center' },
        { name: 'yq', label: '仪器', field: 'yq', sortable: true, align: 'center' },
        { name: 'gwsx', label: '工位属性', field: 'gwsx', sortable: true, align: 'center' },
        { name: 'yxx', label: '有效性', field: 'yxx', sortable: true, align: 'center' }
      ],
      columns0:[
      	{ name: 'index', label: '工号', field: 'index', align: 'center', required: true },
        { name: 'status', label: '姓名', field: 'status', sortable: true,align: 'center',required: true},
        { name: 'zy_order', label: '所属组织', field: 'zy_order', sortable: true, align: 'center' }
      ],
      columns1:[
      	{ name: 'index', label: '工序号', field: 'index', align: 'center', required: true },
        { name: 'status', label: '工序编号', field: 'status', sortable: true,align: 'center',required: true},
        { name: 'zy_order', label: '工序名称', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '准备工时', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '绩效工时', field: 'order', sortable: true, align: 'center' },
        { name: 'ry', label: '关键工序', field: 'ry', sortable: true, align: 'center' },
      ],
      columns2:[
      	{ name: 'index', label: '设备编号', field: 'index', align: 'center', required: true },
        { name: 'status', label: '设备名称', field: 'status', sortable: true,align: 'center',required: true},
        { name: 'zy_order', label: '规格型号', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '设备类型', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '设备状态', field: 'order', sortable: true, align: 'center' },
      ],
      columns3:[
      	{ name: 'index', label: '编码', field: 'index', align: 'center', required: true },
        { name: 'status', label: '名称', field: 'status', sortable: true,align: 'center',required: true},
      ],
      columns4:[
      	{ name: 'index', label: '编码', field: 'index', align: 'center', required: true },
        { name: 'status', label: '名称', field: 'status', sortable: true,align: 'center',required: true},
      ],
      data: [
        {
          index: '1',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          ry: 'AVG转运',
          gx: '',
          shebei: '',
          gz: '',
          yq: '',
          gwsx: '',
          yxx: ''
        },
        {
          index: '2',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          ry: 'AVG转运',
          gx: '',
          shebei: '',
          gz: '',
          yq: '',
          gwsx: '',
          yxx: ''
        },
      ],
      tabs:[
      	{name:0,label:'人员'},
      	{name:1,label:'工序'},
      	{name:2,label:'设备'},
      	{name:3,label:'工装'},
      	{name:4,label:'仪器'}
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
    	this.$refs.fixedskillinfo.show()
    },
    // table 选中数据显示文字
    getSelectedString (val) {
      return val + '条' // 不返回空时，table自带的左下角显示为默认的文字
    },
    // 搜索
    serch(){

    },
    // 表格添加按钮
    adddata (val) {

    },
    // 表格删除按钮
    deletedata (val) {

    },
    tabinput (val) {
    	console.log(val)
    	const self = this
    	if(val == 0){
    		self.columns0 = self.columns0
    	}else if(val == 1){
    		self.columns0 = self.columns1
    	}else if (val  == 2) {
    		self.columns0 = self.columns2
    	}else if (val == 3) {
    		self.columns0 = self.columns3
    	}else if (val == 4) {
    		self.columns0 = self.columns4
    	}
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
      	self.$refs.fixedimport.show()
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
<style lang="scss">
	.my-sticky-column-table{
		/* specifying max-width so the example can
    highlight the sticky column on any browser window */
  	thead{
  		/* bg color is important for th; just specify one */
  		tr{
  			background-color: #fff;
  			th{
  				&:first-child{
  					width: 72px;
  					background-color: #fff;
  					position: sticky;
				    left: 0;
				    z-index: 1;
  				}
  				&:nth-child(2){
  					background-color: #fff;
  					position: sticky;
				    left: 72px;
				    z-index: 1;
  				}
  			}
  		}
  	}
  	tbody{
  		tr{
  			td{
  				&:first-child{
  					width: 72px;
  					background-color: #f5f5dc;
  					position: sticky;
				    left: 0;
				    z-index: 1;
  				}
  				&:nth-child(2){
  					background-color: #f5f5dc;
  					position: sticky;
				    left: 72px;
				    z-index: 1;
  				}
  			}
  		}
  	}
	}
</style>