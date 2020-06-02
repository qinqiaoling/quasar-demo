<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: calc(100vh - 50px);" class="shadow-2 rounded-borders">
      <q-page-container>
        <q-page>
          <div class="q-pa-md">
            <div class="flex">
              <q-btn-dropdown color="primary" label="操作" class="q-mr-sm">
                <q-list>
                  <q-item clickable v-close-popup v-for="(btn,index) in btnoption" :key="index" @click="onAdd(btn,index)">
                    <q-item-section>
                      <q-item-label>{{btn.label}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <!-- <q-input ref="role" class="q-mr-sm" clearable clear-icon="close" v-model="dialogobj.role" label="值" Placeholder="请输入工单号" :dense="true"/>
              <q-btn color="primary" class="q-mr-sm" @click="serch">搜索</q-btn> -->
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
            <div class="text-h6">新增生产订单</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
          	<div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">客户信息</span></div>
           	<q-separator color="primary"></q-separator>
            <div class="row">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="客户名称"
                  :dense="false"
                >
                	<template v-slot:append>
					          <q-icon name="more_horiz" @click="khinputss(6)" />
					        </template>
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="销售订单号"
                  :dense="false"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
           			<q-input v-model="dialogobj.date" mask="date" label="交货日期">
						      <template v-slot:append>
						        <q-icon name="event" class="cursor-pointer">
						          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
						            <q-date v-model="dialogobj.date" minimal @input="() => $refs.qDateProxy.hide()" />
						          </q-popup-proxy>
						        </q-icon>
						      </template>
						    </q-input>
           		</div>
            </div>
            <div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">物料信息</span></div>
           	<q-separator color="primary"></q-separator>
           	<div class="row">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="所属产品"
                  :dense="false"
                >
                	<template v-slot:append>
					          <q-icon name="more_horiz" @click="khinputss(1)" />
					        </template>
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="物料名称"
                  :dense="false"
                >
                	<template v-slot:append>
					          <q-icon name="more_horiz" @click="khinputss(2)" />
					        </template>
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="物料编码"
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
                  label="规格型号"
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
                  label="计量单位"
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
                  label="执行要求"
                  :dense="false"
                >
                	<template v-slot:append>
					          <q-icon name="more_horiz" @click="khinputss(3)" />
					        </template>
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="工艺版本"
                  :dense="false"
                >
                	<template v-slot:append>
					          <q-icon name="more_horiz" @click="khinputss(4)" />
					        </template>
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="产出率"
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
                  label="生产批号"
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
                  label="序列号"
                  :dense="false"
                >
                </q-input>
           		</div>
            </div>
           	<div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">生产信息</span></div>
           	<q-separator color="primary"></q-separator>
           	<div class="row">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="生产订单号"
                  :dense="false"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select v-model="dialogobj.role" :options="options" label="订单类型" >
         					<template v-slot:no-option>
					          <q-item>
					            <q-item-section class="text-italic text-grey">
					              无可用数据
					            </q-item-section>
					          </q-item>
					        </template>
         				</q-select>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select v-model="dialogobj.role" :options="options" label="承制部门" >
         					<template v-slot:no-option>
					          <q-item>
					            <q-item-section class="text-italic text-grey">
					              无可用数据
					            </q-item-section>
					          </q-item>
					        </template>
         				</q-select>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="部门编号"
                  :dense="false"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select v-model="dialogobj.role" :options="options" label="计划员" >
         					<template v-slot:no-option>
					          <q-item>
					            <q-item-section class="text-italic text-grey">
					              无可用数据
					            </q-item-section>
					          </q-item>
					        </template>
         				</q-select>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select v-model="dialogobj.role" :options="options" label="优先级" >
         					<template v-slot:no-option>
					          <q-item>
					            <q-item-section class="text-italic text-grey">
					              无可用数据
					            </q-item-section>
					          </q-item>
					        </template>
         				</q-select>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="计划生产数量"
                  :dense="false"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
           			<q-input v-model="dialogobj.date1" label="计划作业开始时间">
						      <template v-slot:append>
						        <q-icon name="event" class="cursor-pointer">
						          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
						            <q-date v-model="dialogobj.date1" mask="YYYY-MM-DD HH:mm" />
						            <q-time v-model="dialogobj.date1" mask="YYYY-MM-DD HH:mm" format24h @input="() => $refs.qDateProxy.hide()"/>
						          </q-popup-proxy>
						        </q-icon>
						      </template>
						    </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
           			<q-input v-model="dialogobj.date1" label="计划作业完成时间">
						      <template v-slot:append>
						        <q-icon name="event" class="cursor-pointer">
						          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
						            <q-date v-model="dialogobj.date1" mask="YYYY-MM-DD HH:mm" />
						            <q-time v-model="dialogobj.date1" mask="YYYY-MM-DD HH:mm" format24h @input="() => $refs.qDateProxy.hide()"/>
						          </q-popup-proxy>
						        </q-icon>
						      </template>
						    </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="父级生产订单号"
                  :dense="false"
                >
                	<template v-slot:append>
					          <q-icon name="more_horiz" @click="khinputss(5)" />
					        </template>
                </q-input>
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

      <q-dialog ref="fixedskillkh">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">{{dtitle}}</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
            <div class="row q-pb-md">
            	<div class="col-xs-12 col-md-6 q-px-md" v-if="addserchshow">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="查询"
                  :dense="true"
                >
                </q-input>
           		</div>
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="输入单位名称/行业/区域"
                  :dense="true"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
                <q-btn color="primary" @click="serch">搜索</q-btn>
           		</div>
            </div>
           	<q-table
           		:data="kh_data"
              :columns="khcolumns6"
              row-key="index"
              selection="single"
              :selected-rows-label="getSelectedString"
              :rows-per-page-label="'行'"
              :selected.sync="selected"
              separator="cell"
           	>
           	</q-table>
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
  name: 'reportingTable',
  data () {
    return {
      btnoption:[
      	{
      		label:'工单撤回'
      	},
      	{
      		label:'导入'
      	},
      	{
      		label:'导出'
      	},
      	{
      		label:'新增'
      	},
      	{
      		label:'编辑'
      	},
      	{
      		label:'删除'
      	},
      	{
      		label:'工艺查看'
      	},
      	{
      		label:'BOM查看'
      	},
      	{
      		label:'审核'
      	},
      	{
      		label:'提交审核'
      	},
      	{
      		label:'生成工序计划'
      	}
      ],
      selected: [],
      columns: [
        { name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'scddh', label: '生产订单号', field: 'main', sortable: true, align: 'center' },
        { name: 'wxbs', label: '订单来源', field: 'main', sortable: true, align: 'center' },
        { name: 'gdlx', label: '订单类型', field: 'status', sortable: true, align: 'center' },
        { name: 'status', label: '状态', field: 'status', sortable: true, align: 'center' },
        { name: 'wlbm', label: '物料编号', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'wlmc', label: '物料名称', field: 'status', sortable: true, align: 'center' },
        { name: 'scph', label: '生产批号', field: 'status', sortable: true, align: 'center' },
        { name: 'dw', label: '单位', field: 'main', sortable: true, align: 'center' },
        { name: 'scbb', label: '生产版本', field: 'main', sortable: true, align: 'center' },
        { name: 'jhrq', label: '交货日期', field: 'main', sortable: true, align: 'center' },
        { name: 'yxj', label: '优先级', field: 'main', sortable: true, align: 'center' },
        { name: 'jhy', label: '计划员', field: 'main', sortable: true, align: 'center' },
        { name: 'jhscsl', label: '计划生产数量', field: 'main', sortable: true, align: 'center' },
        { name: 'jhkssj', label: '作业计划开始时间', field: 'main', sortable: true, align: 'center' },
        { name: 'jhwcsj', label: '作业计划完成时间', field: 'main', sortable: true, align: 'center' },
        { name: 'sjkssj', label: '实际开始时间', field: 'main', sortable: true, align: 'center' },
        { name: 'sjwcsj', label: '实际完成时间', field: 'main', sortable: true, align: 'center' }
      ],
      data: [
        {
          index: '1',
          status: '转运中',
          gdlx: 'dd001',
          scddh: 'dd001',
          wxbs: '',
          gdh: 'cd001',
          scph: 'gd022',
          wlmc: '',
          wlbm: '',
          jhy: '转运中',
          yxj: '',
          gxmc: 'gd022',
          jhrq: '',
          jhscsl: '',
          dw: '转运中',
          scbb: '',
          jhjq: 'cd001',
          jhkssj: 'gd022',
          jhwcsj: 'dd001',
          sjkssj: 'AVG转运',
          sjwcsj: 'AVG转运'
        },
      ],
      khcolumns6: [
      	{ name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'scddh', label: '单位编号', field: 'main', sortable: true, align: 'center' },
        { name: 'wxbs', label: '单位名称', field: 'main', sortable: true, align: 'center' },
        { name: 'gdlx', label: '行业', field: 'status', sortable: true, align: 'center' },
        { name: 'status', label: '地址', field: 'status', sortable: true, align: 'center' },
        { name: 'wlbm', label: '单位类型', field: 'zy_order', sortable: true, align: 'center' }
      ],
      khcolumns1: [
      	{ name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'scddh', label: '物料编码', field: 'main', sortable: true, align: 'center' },
        { name: 'wxbs', label: '物料名称', field: 'main', sortable: true, align: 'center' },
        { name: 'gdlx', label: '规格型号', field: 'status', sortable: true, align: 'center' },
        { name: 'status', label: '计量单位', field: 'status', sortable: true, align: 'center' },
        { name: 'wlbm', label: '物料版本号', field: 'zy_order', sortable: true, align: 'center' }
      ],
      khcolumns2: [
      	{ name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'scddh', label: '物料编码', field: 'main', sortable: true, align: 'center' },
        { name: 'wxbs', label: '物料名称', field: 'main', sortable: true, align: 'center' },
        { name: 'gdlx', label: '规格型号', field: 'status', sortable: true, align: 'center' },
        { name: 'status', label: '计量单位', field: 'status', sortable: true, align: 'center' },
        { name: 'wlbm', label: '物料版本号', field: 'zy_order', sortable: true, align: 'center' }
      ],
      khcolumns3: [
      	{ name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'scddh', label: '文件编码', field: 'main', sortable: true, align: 'center' },
        { name: 'wxbs', label: '文件名称', field: 'main', sortable: true, align: 'center' }
      ],
      khcolumns4: [
      	{ name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'scddh', label: '单位编号', field: 'main', sortable: true, align: 'center' },
      ],
      khcolumns5: [
      	{ name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'scddh', label: '销售订单号', field: 'main', sortable: true, align: 'center' },
        { name: 'wxbs', label: '生产订单号', field: 'main', sortable: true, align: 'center' },
        { name: 'gdlx', label: '订单状态', field: 'status', sortable: true, align: 'center' }
      ],
      kh_data: [
      	{
      		index: '1',
          status: '转运中',
          gdlx: 'dd001',
          scddh: 'dd001',
          wxbs: '',
          gdh: 'cd001',
      	}
      ],
      options: [],
      dialogobj: {
        group: 'no',
        desc: '',
        role: '',
        date: '',
        date1: '',
      },
      addserchshow: false,
      dtitle: '客户信息',
    }
  },
  mounted(){
  },
  methods: {
    // table 选中数据显示文字
    getSelectedString (val) {
      return val + '条' // 不返回空时，table自带的左下角显示为默认的文字
    },
    onAdd () {
      console.log('添加按钮')
      const self = this
      self.$refs.fixedskill.show()
    },
    // 搜索
    serch () {},
    // 确定按钮
    sureskill () {},
    khinputss (type) {
    	console.log('所属产品按钮')
      const self = this
      if(type == 1){
      	self.addserchshow = false
      	self.dtitle = '所属产品'
      	self.khcolumns6 =self.khcolumns1
      }else if(type == 2){
      	self.addserchshow = true
      	self.dtitle = '物料名称'
      	self.khcolumns6 =self.khcolumns2
      }else if(type == 3){
      	self.addserchshow = false
      	self.dtitle = '执行要求'
      	self.khcolumns6 =self.khcolumns3
      }else if(type == 4){
      	self.addserchshow = false
      	self.dtitle = '工艺版本'
      	self.khcolumns6 =self.khcolumns4
      }else if(type == 5){
      	self.addserchshow = false
      	self.dtitle = '父级生产订单号'
      	self.khcolumns6 =self.khcolumns5
      }else if(type == 6){
      	self.addserchshow = false
      	self.dtitle = '客户信息'
      	self.khcolumns6 =self.khcolumns6
      }
      self.$refs.fixedskillkh.show()
    },
  }
}
</script>

<style lang="scss" scoped="scoped">
  .max-height{max-height: 50vh;}
  .limt-w{width: 800px; max-width: 80vw!important;}
</style>
