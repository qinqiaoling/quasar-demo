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
              <q-input ref="role" class="q-mr-sm" clearable clear-icon="close" v-model="dialogobj.role" label="值" Placeholder="请输入工单号" :dense="true"/>
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
      		label:'切换'
      	},
      	{
      		label:'打印随工单'
      	},
      ],
      selected: [],
      columns: [
        { name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'status', label: '状态', field: 'status', sortable: true, align: 'center' },
        { name: 'wlwz', label: '物料位置', field: 'status', sortable: true, align: 'center' },
        { name: 'gdlx', label: '工单类型', field: 'status', sortable: true, align: 'center' },
        { name: 'scddh', label: '生产订单号', field: 'main', sortable: true, align: 'center' },
        { name: 'ddlx', label: '订单类型', field: 'main', sortable: true, align: 'center' },
        { name: 'wxbs', label: '外协标识', field: 'main', sortable: true, align: 'center' },
        { name: 'gdh', label: '工单号', field: 'status', sortable: true, align: 'center' },
        { name: 'scph', label: '生产批号', field: 'status', sortable: true, align: 'center' },
        { name: 'wlmc', label: '物料名称', field: 'status', sortable: true, align: 'center' },
        { name: 'wlbm', label: '物料编码', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'csgx', label: '承上工序', field: 'g_order', sortable: true, align: 'center' },
        { name: 'gxh', label: '工序号', field: 'order', sortable: true, align: 'center' },
        { name: 'gxmc', label: '工序名称', field: 'main', sortable: true, align: 'center' },
        { name: 'gw', label: '工位', field: 'main', sortable: true, align: 'center' },
        { name: 'jhscsl', label: '计划生产数量', field: 'main', sortable: true, align: 'center' },
        { name: 'dw', label: '单位', field: 'main', sortable: true, align: 'center' },
        { name: 'jhjq', label: '计划交期', field: 'main', sortable: true, align: 'center' },
        { name: 'jhkssj', label: '计划开始时间', field: 'main', sortable: true, align: 'center' },
        { name: 'jhwcsj', label: '计划完成时间', field: 'main', sortable: true, align: 'center' },
        { name: 'sjkssj', label: '实际开始时间', field: 'main', sortable: true, align: 'center' },
        { name: 'sjwcsj', label: '实际完成时间', field: 'main', sortable: true, align: 'center' }
      ],
      data: [
        {
          index: '1',
          status: '转运中',
          wlwz: '',
          gdlx: 'dd001',
          scddh: 'dd001',
          ddlx: 'AVG转运',
          wxbs: '',
          gdh: 'cd001',
          scph: 'gd022',
          wlmc: '',
          wlbm: '',
          csgx: '转运中',
          gxh: '',
          gxmc: 'gd022',
          gw: '',
          jhscsl: '',
          dw: '转运中',
          jhjq: 'cd001',
          jhkssj: 'gd022',
          jhwcsj: 'dd001',
          sjkssj: 'AVG转运',
          sjwcsj: 'AVG转运'
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
    onAdd () {
      console.log('添加按钮')
      const self = this
    },
  }
}
</script>

<style lang="scss" scoped="scoped">
  .max-height{max-height: 50vh;}
  .limt-w{width: 800px; max-width: 80vw!important;}
</style>
