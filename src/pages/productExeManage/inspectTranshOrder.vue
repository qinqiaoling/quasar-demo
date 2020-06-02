<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: calc(100vh - 50px);" class="shadow-2 rounded-borders">
      <q-page-container>
        <q-page>
          <div class="q-pa-md">
            <div class="flex">
              <q-btn-dropdown color="primary" label="操作">
                <q-list>
                  <q-item clickable v-close-popup @click="onAdd">
                    <q-item-section>
                      <q-item-label>打印转运单</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onEdit">
                    <q-item-section>
                      <q-item-label>高级搜索</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
          <div class="hs" v-if="hs">
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="生产订单号"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="配料单号"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="转运单号"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="转运方式"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="发起人"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="发起工位"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="接收人"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="目的位置"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="转运类别"
                    placeholder=""
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input label="发起时间" v-model="dialogobj.date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="dialogobj.date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input label="发起时间" v-model="dialogobj.date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="dialogobj.date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input label="接收时间" v-model="dialogobj.date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="dialogobj.date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input label="接收时间" v-model="dialogobj.date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="dialogobj.date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input label="到达时间" v-model="dialogobj.date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="dialogobj.date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input label="到达时间" v-model="dialogobj.date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="dialogobj.date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
          <q-table
            :data="data"
            :columns="columns"
            row-key="index"
            selection="single"
            :selected-rows-label="getSelectedString"
            :rows-per-page-label="'行'"
            :selected.sync="selected"
          >
            <template v-slot:body-cell-handle="props">
              <q-td :props="props">
                <q-btn dense size="xs" color="primary" label="查看" @click="lookdata(props.row)"></q-btn>
              </q-td>
            </template>
	      	</q-table>
        </q-page>
      </q-page-container>

      <q-dialog ref="fixedskill">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">转运单详情</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
            <div class="q-py-xs text-body1 border_t">基本信息</div>
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="生产订单号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.g_order"
                    label="工单号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.zy_order"
                    label="物料编码"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.index"
                    label="物料名称"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.index"
                    label="规格型号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.index"
                    label="计量单位"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.zy_order"
                    label="生产批号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.index"
                    label="序列号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.zy_order"
                    label="配料单号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.status"
                    label="转运类别"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.zy_f"
                    label="转运方式"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.zy_order"
                    label="转运单号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.f_p"
                    label="发起人"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.f_adrs"
                    label="发起位置"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.g_p"
                    label="接收人"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.g_adrs"
                    label="目的位置"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.index"
                    label="转运数量"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.f_time"
                    label="发起时间"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.r_time"
                    label="接收时间"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.a_time"
                    label="到达时间"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
            </div>
            <div class="q-py-xs q-mb-md text-body1 border_t">物料信息</div>
            <q-table
              :data="zydata"
              :columns="columns"
              row-key="index"
              :selected-rows-label="getSelectedString"
              :rows-per-page-label="'行'"
              :selected.sync="selected"
            />
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" v-close-popup ></q-btn>
            <!-- <q-btn flat label="保存" color="primary" @click="sureskill" ></q-btn> -->
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog ref="fixedskilldy">
        <q-card class="limt-w">
          <q-card-section>
            <div class="text-h6">转运单</div>
          </q-card-section>
          <q-separator ></q-separator>
          <q-card-section class="scroll max-height">
            <div class="q-py-xs text-body1 border_t row" style="display: flex;align-items: center;">
              <div class="col-xs-12 col-md-6"><span>生产转运单</span></div>
              <div class="col-xs-12 col-md-6" style="text-align: right;"><img src="../../statics/img/qcard.png" width="100" height="100" /></div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="转运单号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="配料单号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="工单号"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="发起人"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="发起工位"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <q-input
                    ref="role"
                    clearable
                    clear-icon="close"
                    v-model="dialogobj.order"
                    label="目的位置"
                    placeholder=""
                    readonly
                    :dense="false"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pa-xs">
                  <span>转运方式</span>
                  <q-radio v-model="dialogobj.zy_f" val="yes" label="人工转运" />
                  <q-radio v-model="dialogobj.zy_f" val="no" label="AVG转运" />
                </div>
              </div>
            </div>
            <div class="q-py-xs q-mb-md text-body1 border_t">物料信息</div>
            <q-table
              :data="dydata"
              :columns="columns"
              row-key="index"
              :selected-rows-label="getSelectedString"
              :rows-per-page-label="'行'"
              :selected.sync="selected"
            />
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
export default {
  name: 'ito',
  data () {
    return {
    	selected: [],
      columns: [
        { name: 'index', label: '序号', field: 'index', align: 'center' },
        { name: 'status', label: '状态', field: 'status', sortable: true, align: 'center' },
        { name: 'zy_order', label: '转运单号', field: 'zy_order', sortable: true, align: 'center' },
        { name: 'g_order', label: '工单号', field: 'g_order', sortable: true, align: 'center' },
        { name: 'order', label: '订单号', field: 'order', sortable: true, align: 'center' },
        { name: 'zy_f', label: '转运方式', field: 'zy_f', sortable: true, align: 'center' },
        { name: 'f_p', label: '发起人', field: 'f_p', sortable: true, align: 'center' },
        { name: 'f_adrs', label: '发起位置', field: 'f_adrs', sortable: true, align: 'center' },
        { name: 'g_p', label: '接收人', field: 'g_p', sortable: true, align: 'center' },
        { name: 'g_adrs', label: '目的位置', field: 'g_adrs', sortable: true, align: 'center' },
        { name: 'f_time', label: '发起时间', field: 'f_time', sortable: true, align: 'center' },
        { name: 'r_time', label: '接收时间', field: 'r_time', sortable: true, align: 'center' },
        { name: 'a_time', label: '到达时间', field: 'a_time', sortable: true, align: 'center' },
        { name: 'desc', label: '备注', field: 'desc', sortable: true, align: 'center' },
        { name: 'handle', label: '操作', field: 'handle', sortable: true, align: 'center' }
      ],
      data: [
        {
          index: '1',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          zy_f: 'AVG转运',
          f_p: '登录人',
          f_adrs: '包含在制品库',
          g_p: '',
          g_adrs: '',
          f_time: '2020-05-20',
          r_time: '2020-05-20',
          a_time: '2020-05-20',
          desc: '',
          handle: ''
        },
        {
          index: '2',
          status: '转运中',
          zy_order: 'cd001',
          g_order: 'gd022',
          order: 'dd001',
          zy_f: 'AVG转运',
          f_p: '登录人',
          f_adrs: '包含在制品库',
          g_p: '',
          g_adrs: '',
          f_time: '2020-05-20',
          r_time: '2020-05-20',
          a_time: '2020-05-20',
          desc: '',
          handle: ''
        }
      ],
      zydata: [],
      dydata: [],
      hs: false,
      dialogobj: {
        index: '',
        status: '',
        zy_order: '',
        g_order: '',
        order: '',
        zy_f: '',
        f_p: '',
        f_adrs: '',
        g_p: '',
        g_adrs: '',
        f_time: '',
        r_time: '',
        a_time: '',
        desc: '',
        handle: '',
        date: '',
      },
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
    onAdd () {
      console.log('打印按钮')
      const self = this
      if(self.selected.length > 0){
        self.$refs.fixedskilldy.show()
        self.dydata = self.selected
      }else{
        self.$q.notify({
          position: 'center',
          timeout: 1000,
          color: 'negative',
          message: '至少选择一项打印'
        })
      }
    },
    onEdit () {
      console.log('高级搜索')
      const self = this
      self.hs = !self.hs
    },
    sureskill(){
      console.log('弹窗确定按钮')
    },
  }
}
</script>

<style lang="scss" scoped="scoped">
  .border_t{border-bottom: 1px solid #ccc;}
  .max-height{max-height: 50vh;}
  .limt-w{width: 800px; max-width: 80vw!important;}
  .hs{padding: 10px;}
</style>
