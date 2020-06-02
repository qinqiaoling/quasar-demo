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
              <!-- <q-select style="min-width: 150px" class="q-mr-sm" clearable color="primary" v-model="dialogobj.role" :options="serchoptions" :dense="true"/> -->
              <q-input ref="role" class="q-mr-sm" clearable clear-icon="close" v-model="dialogobj.role" label="值" :dense="true"/>
              <q-btn color="primary" class="q-mr-sm" @click="serch">搜索</q-btn>
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
            <div class="text-h6">{{typegw == 0 ? '新增班制' : '编辑班制'}}</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
          	<div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">班制信息</span></div>
            <div class="row q-pb-md">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="班制编码"
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
                  label="班制名称"
                  :dense="false"
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select clearable color="primary" label="请选择" v-model="dialogobj.role" :options="['启用','禁用']" :dense="false"/>
           		</div>
           		<div class="col-xs-12 col-md-12 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="备注"
                  :dense="false"
                  type="textarea"
                >
                </q-input>
           		</div>
            </div>
            <q-table
              :data="ddata"
              :columns="dcolumns"
              row-key="index"
              
              :selected-rows-label="getSelectedString"
              :rows-per-page-label="'行'"
              :selected.sync="selected"
              separator="cell"
            	>
            	<template v-slot:header="props">
				        <q-tr :props="props">
				          <q-th
				            v-for="(col,index) in props.cols"
				            :key="col.name"
				            :props="props"
				          >
				          	<q-icon name="note_add" size="1.3em" v-if="index == 0 || index == 5 || index == 6 ? false : true" />
				            {{ col.label }}
				          </q-th>
				        </q-tr>
				      </template>
				      <template v-slot:body="props">
				        <q-tr :props="props">
				          <q-td key="index" :props="props">
				            {{ props.row.index }}
				          </q-td>
				          <q-td key="status" :props="props">
				            {{ props.row.status }}
				            <q-popup-edit v-model="props.row.status" title="Update status" buttons>
				              <q-input type="text" v-model="props.row.status" dense autofocus />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="zy_order" :props="props">
				            <div class="text-pre-wrap">{{ props.row.zy_order }}</div>
				            <q-popup-edit v-model="props.row.zy_order" buttons>
				              <q-input type="text" v-model="props.row.zy_order" dense autofocus />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="g_order" :props="props">
				            {{ props.row.g_order }}
				            <q-popup-edit v-model="props.row.g_order" title="Update g_order" buttons persistent>
				              <q-input type="text" v-model="props.row.g_order" dense autofocus hint="Use buttons to close" />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="order" :props="props">
				          	{{ props.row.order }}
				          	<q-popup-edit v-model="props.row.order" title="Update order" buttons persistent>
				              <q-input type="text" v-model="props.row.order" dense autofocus hint="Use buttons to close" />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="main" :props="props">
				          	<q-checkbox v-model="props.row.main" />
				          </q-td>
				          <q-td key="handle" :props="props">
		                <q-btn icon="add" dense size="xs" color="primary" class="q-mr-sm" @click="adddata(props.row)"></q-btn>
		                <q-btn icon="delete_sweep" dense size="xs" color="primary" @click="deletedata(props.row)"></q-btn>
		              </q-td>
				        </q-tr>
				      </template>
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
	import mock from '../../mock/warehouse'
export default {
  name: 'warehouseset',
  data () {
    return {
      btnoption:[
      	{
      		label:'新增'
      	},
      	{
      		label:'编辑'
      	},
      	{
      		label:'删除'
      	},
      ],
      selected: [],
      typegw: 0,
      columns: [
        { name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'status', label: '班制编码', field: 'status', sortable: true, align: 'center' },
        { name: 'zy_order', label: '班制名称', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '状态', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '备注', field: 'order', sortable: true, align: 'center' }
      ],
      data: [
        {
          index: '1',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001'
        }
      ],
      dcolumns:[
      	{ name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'status', label: '班次编码', field: 'status', sortable: true, align: 'center' },
        { name: 'zy_order', label: '班次名称', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '开始时间', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '结束时间', field: 'order', sortable: true, align: 'center' },
        { name: 'main', label: '是否跨日', field: 'main', sortable: true, align: 'center' },
        { name: 'handle', label: '操作', field: 'handle', sortable: true, align: 'center' }
      ],
      ddata: [
        {
          index: '1',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          main: true,
          handle: ''
        },
        {
          index: '2',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          main: false,
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
  },
  methods: {
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
  // .title{
  // 	border-bottom:2px solid var(--q-color-primary);;
  // }
  .border_bt{border-bottom: 1px solid #ccc;}
  .max-height{max-height: 50vh;}
  .limt-w{width: 800px; max-width: 80vw!important;}
</style>
