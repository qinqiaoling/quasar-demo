<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: calc(100vh - 50px);" class="shadow-2 rounded-borders">
      <q-page-container>
        <q-page>
          <div class="q-pa-md">
            <q-card>
			        <q-tabs
			          v-model="tab"
			          dense
			          class="bg-grey-3 text-grey-7"
          			active-color="primary"
          			indicator-color="primary"
			          align="justify"
			          narrow-indicator
			        >
			          <q-tab :name="item.name" :label="item.label" v-for="(item,index) in tabs" :key="index"/>
			        </q-tabs>
			        <q-separator />
			        <q-tab-panels v-model="tab" animated>
			          <q-tab-panel :name="item.name" v-for="(item,index) in tabs" :key="index">
			          	<div style="margin: -16px;">
			          		<q-table
					            :data="item.name == 0 ? data : dataout"
					            :columns="item.name == 0 ? columns : columnsout"
					            row-key="index"
					            selection="single"
					            :selected-rows-label="getSelectedString"
					            :rows-per-page-label="'行'"
					            :selected.sync="selected"
					          >
					            <!-- <template v-slot:body-cell-handle="props">
					              <q-td :props="props">
					                <q-btn dense size="xs" color="primary" label="查看" @click="lookdata(props.row)"></q-btn>
					              </q-td>
					            </template> -->
						      	</q-table>
			          	</div>
			          </q-tab-panel>
			        </q-tab-panels>
			      </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'ito',
  data () {
    return {
    	selected: [],
      columns: [
        { name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'status', label: '叫料单编号', field: 'status', sortable: true, align: 'center' },
        { name: 'g_order', label: '工单号', field: 'g_order', sortable: true, align: 'center' },
        { name: 'style', label: '工单类型', field: 'style', sortable: true, align: 'center' },
        { name: 'zy_order', label: '叫料单位', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'order', label: '申请工位', field: 'order', sortable: true, align: 'center' },
        { name: 'zy_f', label: '申请工序', field: 'zy_f', sortable: true, align: 'center' },
        { name: 'f_p', label: '申请人员', field: 'f_p', sortable: true, align: 'center' },
        { name: 'f_adrs', label: '申请时间', field: 'f_adrs', sortable: true, align: 'center' },
        { name: 'g_p', label: '状态', field: 'g_p', sortable: true, align: 'center' },
        { name: 'g_adrs', label: '工位叫料状态', field: 'g_adrs', sortable: true, align: 'center' },
        { name: 'f_time', label: '详情', field: 'f_time', sortable: true, align: 'center' },
      ],
      data: [
        {
          index: '1',
          status: '转运中',
          g_order: 'gd022',
          style: '',
          zy_order: 'cd001',
          order: 'dd001',
          zy_f: 'AVG转运',
          f_p: '登录人',
          f_adrs: '包含在制品库',
          g_p: '',
          g_adrs: '',
          f_time: '2020-05-20',
          desc: '',
          handle: ''
        },
      ],
      columnsout: [
        { name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'status', label: '转运单号', field: 'status', sortable: true, align: 'center' },
        { name: 'g_order', label: '配料单编号', field: 'g_order', sortable: true, align: 'center' },
        { name: 'no', label: '工单编号', field: 'no', sortable: true, align: 'center' },
        { name: 'zy_order', label: '转运方式', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'order', label: '转运人', field: 'order', sortable: true, align: 'center' },
        { name: 'zy_f', label: '转运工位', field: 'zy_f', sortable: true, align: 'center' },
        { name: 'f_p', label: '转运发起时间', field: 'f_p', sortable: true, align: 'center' },
        { name: 'f_adrs', label: '转运接收时间', field: 'f_adrs', sortable: true, align: 'center' },
        { name: 'g_p', label: '退库原因', field: 'g_p', sortable: true, align: 'center' },
        { name: 'g_adrs', label: '状态', field: 'g_adrs', sortable: true, align: 'center' },
      ],
      dataout: [
        {
          index: '1',
          status: '转运中',
          g_order: 'gd022',
          no: '',
          zy_order: 'cd001',
          order: 'dd001',
          zy_f: 'AVG转运',
          f_p: '登录人',
          f_adrs: '包含在制品库',
          g_p: '',
          g_adrs: '',
          desc: '',
          handle: ''
        },
      ],
      tab: '0',
      tabs:[{name:'0',label:'物料出库'},{name:'1',label:'转运退库'}],
    }
  },
  methods: {
  	// table 选中数据显示文字
    getSelectedString (val) {
      return val + '条' // 不返回空时，table自带的左下角显示为默认的文字
    },
    lookdata (val) {
      const self = this
      self.$refs.fixedskill.show()
      self.zydata = [val]
    	console.log('表格单个数据',val,[val])
    },
  }
}
</script>

<style lang="scss" scoped="scoped">
</style>
