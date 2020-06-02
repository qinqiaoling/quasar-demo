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
          <div class="q-pa-md text-white bg-blue text-body1">仓库结构树</div>
          <div class="q-my-md bg-white">
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
              <q-btn-dropdown color="primary" label="新增" class="q-mr-sm">
                <q-list>
                  <q-item clickable v-close-popup @click="onAdd">
                    <q-item-section>
                      <q-item-label>新增</q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- <q-item clickable v-close-popup @click="onEdit">
                    <q-item-section>
                      <q-item-label>编辑</q-item-label>
                    </q-item-section>
                  </q-item> -->
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
              <q-select style="min-width: 150px" class="q-mr-sm" clearable color="primary" v-model="dialogobj.role" :options="serchoptions" :dense="true"/>
              <q-input ref="role" class="q-mr-sm" clearable clear-icon="close" v-model="dialogobj.role" label="值" :dense="true"/>
              <q-btn color="primary" class="q-mr-sm" @click="serch">搜索</q-btn>
            </div>
          </div>
          <div class="q-mx-md">
           <q-card>
           	<div>
           		<div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">仓库信息</span></div>
           		<q-separator color="primary"></q-separator>
           		<div class="row q-px-md">
           			<div class="col-xs-12 col-md-6">
           				<q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.role"
                    label="仓库编码"
                    :dense="false"
                    readonly
                  >
                  </q-input>
           			</div>
           			<div class="col-xs-12 col-md-6">
           				<q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.role"
                    label="仓库名称"
                    :dense="false"
                  >
                  </q-input>
           			</div>
           			<div class="col-xs-12 col-md-6">
           				<q-input label="启用时间" v-model="dialogobj.date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="dialogobj.date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
           			</div>
           			<div class="col-xs-12 col-md-6">
           				<q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.role"
                    label="仓库类型"
                    :dense="false"
                    readonly
                  >
                  </q-input>
           			</div>
           			<div class="col-xs-12 col-md-6">
           				<q-select class="q-mr-sm" clearable color="primary" v-model="dialogobj.role" :options="['启动','冻结','禁用']" :dense="false" label="状态"/>
           			</div>
           			<div class="col-xs-12 col-md-6">
           				<q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.role"
                    label="仓"
                    :dense="false"
                    readonly
                  >
                  </q-input>
           			</div>
           			<div class="col-xs-12 col-md-6">
           				<q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.role"
                    label="地址"
                    :dense="false"
                  >
                  </q-input>
           			</div>
           			<div class="col-xs-12 col-md-6">
           				<q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.role"
                    label="备注"
                    :dense="false"
                  >
                  </q-input>
           			</div>
           		</div>
           		<div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">管理员</span></div>
           		<q-separator color="primary"></q-separator>
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
			            <template v-slot:body-cell-handle="props">
			              <q-td :props="props">
			                <q-btn icon="add" dense size="xs" color="primary" class="q-mr-sm" @click="adddata(props.row)"></q-btn>
			                <q-btn icon="delete_sweep" dense size="xs" color="primary" @click="deletedata(props.row)"></q-btn>
			              </q-td>
			            </template>
			            <template v-slot:body-cell-main="props">
			              <q-td :props="props">
			              	<q-radio dense size="xs" color="primary" v-model="dialogobj.group" :val="props.row.main"/>
			              </q-td>
			            </template>
			          </q-table>
           		</div>
           	</div>
           </q-card>
          </div>
        </q-page>
      </q-page-container>

      <q-dialog ref="fixedskill">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">新增</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
          	<div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">所属上级</span></div>
           	<q-separator color="primary"></q-separator>
            <div class="row">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="编码"
                  :dense="false"
                  readonly
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="名称"
                  :dense="false"
                  readonly
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="节点类型"
                  :dense="false"
                  readonly
                >
                </q-input>
           		</div>
            </div>
            <div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">添加子节点</span></div>
           	<q-separator color="primary"></q-separator>
           	<q-table
           		:data="add_data"
              :columns="addcolumns"
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
				            :rowspan="index < 5 || index > 10? 2 : 1"
				            :colspan="index == 5 ? 6 : ''"
				            v-if="index > 5 && index < 11 ? false : true"
				          >
				          	<q-icon name="create" size="1.2em" color="primary" v-if="index == 0 || index == 5 || index == 11 ? false : true" />
				            {{ index == 5 ? '规格' : col.label }}
				          </q-th>
				        </q-tr>
				        <q-tr :props="props">
				        	<q-th
				            v-for="(coll,idx) in props.cols.slice(5,11)"
				            :key="coll.name"
				            :props="props"
				            :class="idx == 0 ? 'addborder' : ''"
				          >
				          	<q-icon name="create" size="1.2em" color="primary" />
				            {{ coll.label }}
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
				          <q-td key="c" :props="props">
				          	{{ props.row.c }}
				          	<q-popup-edit v-model="props.row.c" title="Update c" buttons persistent>
				              <q-input type="text" v-model="props.row.c" dense autofocus hint="Use buttons to close" />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="w" :props="props">
				          	{{ props.row.w }}
				          	<q-popup-edit v-model="props.row.w" title="Update w" buttons persistent>
				              <q-input type="text" v-model="props.row.w" dense autofocus hint="Use buttons to close" />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="g" :props="props">
				          	{{ props.row.g }}
				          	<q-popup-edit v-model="props.row.g" title="Update g" buttons persistent>
				              <q-input type="text" v-model="props.row.g" dense autofocus hint="Use buttons to close" />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="mj" :props="props">
				          	{{ props.row.mj }}
				          	<q-popup-edit v-model="props.row.mj" title="Update mj" buttons persistent>
				              <q-input type="text" v-model="props.row.mj" dense autofocus hint="Use buttons to close" />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="tj" :props="props">
				          	{{ props.row.tj }}
				          	<q-popup-edit v-model="props.row.tj" title="Update tj" buttons persistent>
				              <q-input type="text" v-model="props.row.tj" dense autofocus hint="Use buttons to close" />
				            </q-popup-edit>
				          </q-td>
				          <q-td key="cz" :props="props">
				          	{{ props.row.cz }}
				          	<q-popup-edit v-model="props.row.cz" title="Update cz" buttons persistent>
				              <q-input type="text" v-model="props.row.cz" dense autofocus hint="Use buttons to close" />
				            </q-popup-edit>
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

      <q-dialog ref="fixedskillinfo">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">产品详细信息</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
          	<div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">详细信息</span></div>
           	<q-separator color="primary"></q-separator>
           	<div class="row">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="编码"
                  placeholder="请输入角色名称"
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
                  label="说明"
                  placeholder="请输入角色名称"
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
                  label="节点类型"
                  placeholder="请输入角色名称"
                  :dense="false"
                  readonly
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-select label="状态" clearable color="primary" v-model="dialogobj.role" :options="['禁用','启用']" :dense="false"/>
           		</div>
            </div>
          	<div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">所属上级</span></div>
           	<q-separator color="primary"></q-separator>
            <div class="row">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="编码"
                  placeholder="请输入角色名称"
                  :dense="false"
                  readonly
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="名称"
                  placeholder="请输入角色名称"
                  :dense="false"
                  readonly
                >
                </q-input>
           		</div>
           		<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="节点类型"
                  placeholder="请输入角色名称"
                  :dense="false"
                  readonly
                >
                </q-input>
           		</div>
            </div>
            <div class="text-body1"><span class="title q-pa-md" style="display: inline-block;">规格型号</span></div>
           	<q-separator color="primary"></q-separator>
           	<div class="row">
            	<div class="col-xs-12 col-md-6 q-px-md">
         				<q-input
                  ref="role"
                  clearable
                  clear-icon="close"
                  v-model="dialogobj.role"
                  label="长(m)"
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
                  label="宽(m)"
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
                  label="高(m)"
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
                  label="面积(m²)"
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
                  label="体积(m³)"
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
                  label="承重(kg)"
                  :dense="false"
                >
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
      serchoptions:['仓库', '货区', '货架', '货位'],
      selected: [],
      columns: [
        { name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'status', label: '工号', field: 'status', sortable: true, align: 'center' },
        { name: 'zy_order', label: '姓名', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '组织', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '联系方式', field: 'order', sortable: true, align: 'center' },
        { name: 'main', label: '是否主要', field: 'main', sortable: true, align: 'center' },
        { name: 'handle', label: '操作', field: 'handle', sortable: true, align: 'center' }
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
      addcolumns:[
      	{ name: 'index', label: '序号', field: 'index', align: 'center', field: row => row.index, format: val => `${val}`},
        { name: 'status', label: '节点类型', field: 'status', sortable: true, align: 'center' },
        { name: 'zy_order', label: '编码', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '说明', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '状态', field: 'order', sortable: true, align: 'center' },
        { name: 'c', label: '长(M)', field: 'c', align: 'center' },
        { name: 'w', label: '宽(M)', field: 'w', align: 'center' },
        { name: 'g', label: '高(M)', field: 'g', align: 'center' },
        { name: 'mj', label: '面积(m²)', field: 'mj', align: 'center' },
        { name: 'tj', label: '容积(m³)', field: 'tj', align: 'center' },
        { name: 'cz', label: '承重(KG)', field: 'cz', align: 'center' },
        { name: 'handle', label: '操作', field: 'handle', align: 'center' }
      ],
      add_data: [
      	{
          index: '1',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          c: 'AVG转运',
          w: 'AVG转运',
          g: 'AVG转运',
          mj: 'AVG转运',
          tj: 'AVG转运',
          cz: 'AVG转运',
          handle: ''
        },
        {
          index: '2',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          c: 'AVG转运',
          w: 'AVG转运',
          g: 'AVG转运',
          mj: 'AVG转运',
          tj: 'AVG转运',
          cz: 'AVG转运',
          handle: ''
        }
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
    onAdd () {
      console.log('添加按钮')
      const self = this
      self.$refs.fixedskill.show()
    },
    onDelect () {
      console.log('删除按钮')
      const self = this
      // if (self.organizersA.length > 0) {
      //   console.log(self.organizersA)
      //   self.$q.dialog({
      //     title: '提示',
      //     message: '确定删除所选用户?',
      //     ok: {
      //       push: true,
      //       label: '确定'
      //     },
      //     cancel: {
      //       push: true,
      //       label: '取消'
      //     },
      //     persistent: true
      //   }).onOk(() => {
      //     // console.log('>>>> OK')
      //     self.$q.notify({
      //       position: 'center',
      //       timeout: 1000,
      //       color: 'negative',
      //       message: '确定'
      //     })
      //   }).onCancel(() => {
      //     // console.log('>>>> Cancel')
      //   }).onDismiss(() => {
      //     // console.log('I am triggered on both OK and Cancel')
      //   })
      // } else {
      //   self.$q.notify({
      //     position: 'center',
      //     timeout: 1000,
      //     color: 'negative',
      //     message: '至少选择一项修改'
      //   })
      // }
    },
    onSave () {
      console.log('保存按钮')
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
