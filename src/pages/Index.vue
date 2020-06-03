<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: calc(100vh - 50px);" class="shadow-2 rounded-borders">
      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="300"
        :breakpoint="700"
        elevated
        content-class="bg-white text-back"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <q-tree
              :nodes="slidesimple"
              accordion
              node-key="label"
            />
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page class="">
          <div class="q-pa-md">
            <div class="flex q-mb-md">
              <q-btn icon="menu" color="primary" class="q-mr-sm" @click="drawerLeft = !drawerLeft"></q-btn>
              <q-btn-dropdown color="primary" label="编辑">
                <q-list>
                  <q-item clickable v-close-popup @click="onEdit">
                    <q-item-section>
                      <q-item-label>编辑</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onResetPasswords">
                    <q-item-section>
                      <q-item-label>重置密码</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onDelete">
                    <q-item-section>
                      <q-item-label>删除</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <q-btn-dropdown color="primary" label="新增" class="q-mx-sm">
                <q-list>
                  <q-item clickable v-close-popup @click="onAdd">
                    <q-item-section>
                      <q-item-label>新增</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onImport">
                    <q-item-section>
                      <q-item-label>导入</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onExport">
                    <q-item-section>
                      <q-item-label>导出</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onSkill">
                    <q-item-section>
                      <q-item-label>技能管理</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <q-input outlined v-model="text" label="搜索用户" class="outInput"></q-input>
            </div>
            <q-table
              :data="data"
              :columns="columns"
              row-key="name"
              selection="single"
              :selected-rows-label="getSelectedString"
              :rows-per-page-label="'行'"
              :selected.sync="selected"
            />
          </div>

          <q-dialog ref="fixed">
            <q-card class="limt-w">
              <q-card-section>
                <div class="text-h6">{{funtype == 0 ? '编辑' : '新增'}}用户</div>
              </q-card-section>
              <q-separator ></q-separator>
              <q-card-section class="scroll max-height">
                <div class="row">
                  <div class="col-xs-12 col-sm-6">
                    <div class="row">
                      <div class="col">
                        <q-avatar square size="100px">
                          <q-img
                            src="https://placeimg.com/500/300/nature"
                            :ratio="1"
                          />
                        </q-avatar>
                      </div>
                      <div class="col">
                        <q-btn class="relative-position" color="white" text-color="black" label="上传头像">
                          <q-input
                            @input="filefun(dialogobj.fileimg)"
                            type="file"
                            class="filebtn"
                            v-model="dialogobj.fileimg"
                          />
                        </q-btn>
                      </div>
                    </div>
                    <p class="q-py-md">支持上传 jpg, gif, bmp, png, jpeg的图片格式</p>
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    <div class="q-pa-md">
                      <q-input
                        ref="jobnumber"
                        clearable
                        clear-icon="close"
                        v-model="dialogobj.jobnumber"
                        label="工号"
                        placeholder="请输入工号"
                        :dense="dialogobj.dense"
                        lazy-rules
                        :rules="[
                          val => val && val.length > 0 || '工号必填'
                        ]"
                      >
                        <template v-slot:prepend>
                          <span class="text-red">*</span>
                        </template>
                      </q-input>
                    </div>
                    <div class="q-pa-md">
                      <q-input
                        ref="name"
                        clearable
                        clear-icon="close"
                        v-model="dialogobj.name"
                        label="姓名"
                        placeholder="请输入姓名"
                        :dense="dialogobj.dense"
                        lazy-rules
                        :rules="[
                          val => val && val.length > 0 || '姓名必填'
                        ]"
                      >
                        <template v-slot:prepend>
                          <span class="text-red">*</span>
                        </template>
                      </q-input>
                    </div>
                    <div class="q-pa-md">
                      <q-input
                        ref="username"
                        clearable
                        clear-icon="close"
                        v-model="dialogobj.username"
                        label="用户名"
                        placeholder="请输入用户名"
                        :dense="dialogobj.dense"
                        lazy-rules
                        :rules="[
                          val => val && val.length > 0 || '用户名必填'
                        ]"
                      >
                        <template v-slot:prepend>
                          <span class="text-red">*</span>
                        </template>
                      </q-input>
                    </div>
                    <div class="q-pa-md text-body1">
                      <span>性别</span>
                      <q-radio v-model="dialogobj.sex" val="男" label="男" />
                      <q-radio v-model="dialogobj.sex" val="女" label="女" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-6">
                    <div class="q-pa-md">
                      <q-input
                        clearable
                        clear-icon="close"
                        v-model="dialogobj.tel"
                        label="电话"
                        placeholder="请输入电话"
                        :dense="dialogobj.dense"
                      >
                      </q-input>
                    </div>
                    <div class="q-pa-md">
                      <q-select
                        label="所属部门"
                        v-model="dialogobj.department"
                        multiple
                        emit-value
                        map-options
                        :dense="dialogobj.dense"
                        :options="dialogobj.depoptions"
                      >
                        <template v-slot:option>
                          <div>
                            <q-input ref="filter" v-model="dialogobj.devfilter" label="查询">
                              <template v-slot:append>
                                <q-icon v-if="dialogobj.devfilter !== ''" name="clear" class="cursor-pointer" @click="devresetFilter" />
                              </template>
                            </q-input>
                            <q-tree
                              :nodes="dialogobj.depoptions"
                              node-key="label"
                              tick-strategy="leaf"
                              :ticked.sync="dialogobj.devticked"
                              :filter="dialogobj.devfilter"
                              default-expand-all
                              @update:ticked="devtickedfun"
                            />
                          </div>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="dialogobj.department !== null"
                            class="cursor-pointer"
                            name="clear"
                            @click.stop="devclear"
                          />
                        </template>
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-italic text-grey">
                              暂无选择数据
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                    <div class="q-pa-md">
                      <q-select
                        label="人员技能"
                        v-model="dialogobj.skill"
                        multiple
                        emit-value
                        map-options
                        :dense="dialogobj.dense"
                        :options="dialogobj.skilloptions"
                      >
                        <template v-slot:option>
                          <div>
                            <!-- <q-input ref="filter" v-model="dialogobj.devfilter" label="查询">
                              <template v-slot:append>
                                <q-icon v-if="dialogobj.devfilter !== ''" name="clear" class="cursor-pointer" @click="devresetFilter" />
                              </template>
                            </q-input> -->
                            <q-tree
                              :nodes="dialogobj.skilloptionstree"
                              node-key="label"
                              tick-strategy="leaf"
                              :ticked.sync="dialogobj.skillticked"
                              default-expand-all
                              @update:ticked="skilltickedfun"
                            />
                          </div>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="dialogobj.skill !== null"
                            class="cursor-pointer"
                            name="clear"
                            @click.stop="skillclear"
                          />
                        </template>
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-italic text-grey">
                              暂无选择数据
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    <div class="q-pa-md">
                      <q-select
                        class="nolabelclass"
                        ref="role"
                        label="角色"
                        v-model="dialogobj.role"
                        multiple
                        emit-value
                        map-options
                        lazy-rules
                        :rules="[
                          val => val && val.length > 0 || '角色必填'
                        ]"
                        :dense="dialogobj.dense"
                        :options="dialogobj.roleoptions"
                      >
                        <template v-slot:option>
                          <div>
                            <!-- <q-input ref="filter" v-model="dialogobj.devfilter" label="查询">
                              <template v-slot:append>
                                <q-icon v-if="dialogobj.devfilter !== ''" name="clear" class="cursor-pointer" @click="devresetFilter" />
                              </template>
                            </q-input> -->
                            <q-tree
                              :nodes="dialogobj.roleoptionstree"
                              node-key="label"
                              tick-strategy="leaf"
                              :ticked.sync="dialogobj.roleticked"
                              default-expand-all
                              @update:ticked="roletickedfun"
                            />
                          </div>
                        </template>
                        <template v-slot:prepend>
                          <span class="text-red">*</span>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="dialogobj.role !== null"
                            class="cursor-pointer"
                            name="clear"
                            @click.stop="roleclear"
                          />
                        </template>
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-italic text-grey">
                              暂无选择数据
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                    <div class="q-pa-md">
                      <q-select
                        label="岗位"
                        v-model="dialogobj.job"
                        multiple
                        emit-value
                        map-options
                        :dense="dialogobj.dense"
                        :options="dialogobj.joboptions"
                      >
                        <template v-slot:option>
                          <div>
                            <!-- <q-input ref="filter" v-model="dialogobj.devfilter" label="查询">
                              <template v-slot:append>
                                <q-icon v-if="dialogobj.devfilter !== ''" name="clear" class="cursor-pointer" @click="devresetFilter" />
                              </template>
                            </q-input> -->
                            <q-tree
                              :nodes="dialogobj.joboptionstree"
                              node-key="label"
                              tick-strategy="leaf"
                              :ticked.sync="dialogobj.jobticked"
                              default-expand-all
                              @update:ticked="jobtickedfun"
                            />
                          </div>
                        </template>
                        <template v-slot:append>
                          <q-icon
                            v-if="dialogobj.job !== null"
                            class="cursor-pointer"
                            name="clear"
                            @click.stop="jobclear"
                          />
                        </template>
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-italic text-grey">
                              暂无选择数据
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                    <div class="q-pa-md text-body1">
                      <span>状态</span>
                      <q-radio v-model="dialogobj.st" val="启用" label="启用" />
                      <q-radio v-model="dialogobj.st" val="停用" label="停用" />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator ></q-separator>
              <q-card-actions align="right">
                <q-btn flat label="取消" color="primary" @click="cancel" v-close-popup ></q-btn>
                <q-btn flat label="确定" color="primary" @click="sure" ></q-btn>
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
                <q-btn flat label="确定" color="primary" @click="sureimport" ></q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog ref="fixedskill">
            <q-card class="limt-w">
              <q-card-section>
                <div class="text-h6">技能管理</div>
              </q-card-section>
              <q-separator ></q-separator>
              <q-card-section class="scroll max-height">
                <div class="q-py-md">
                  <span class="q-px-xs"><q-btn round dense color="primary" icon="add" @click="addskill" /></span>
                  <span class="q-px-xs"><q-btn round dense color="primary" icon="create" @click="createskill" /></span>
                  <span class="q-px-xs"><q-btn round dense color="primary" icon="remove" /></span>
                </div>
                <div class="row" v-if="skilldialog">
                  <div class="col-xs-12 col-sm-12">
                    <div class="q-pa-xs">
                      <q-input
                        ref="jobnumber"
                        clearable
                        clear-icon="close"
                        v-model="dialogobj.jobnumber"
                        label="技能名称"
                        placeholder="请输入技能名称"
                        :dense="dialogobj.dense"
                        lazy-rules
                        :rules="[
                          val => val && val.length > 0 || '技能名称必填'
                        ]"
                      >
                        <template v-slot:prepend>
                          <span class="text-red">*</span>
                        </template>
                      </q-input>
                      <q-input
                        ref="jobnumber"
                        clearable
                        clear-icon="close"
                        v-model="dialogobj.jobnumber"
                        label="描述"
                        type="textarea"
                        placeholder="请输入技能描述"
                        :dense="dialogobj.dense"
                      >
                      </q-input>
                    </div>
                    <div class="q-pa-xs">
                      <q-card-actions align="right">
                        <q-btn flat label="取消" color="primary" @click="cancelskill"></q-btn>
                        <q-btn flat label="保存" color="primary" @click="sureskill" ></q-btn>
                      </q-card-actions>
                    </div>
                    <div class="q-pb-lg">
                      <q-separator ></q-separator>
                    </div>
                  </div>
                </div>
                <q-table
                  :data="data"
                  :columns="columns"
                  row-key="name"
                  selection="single"
                  :selected-rows-label="getSelectedString"
                  :rows-per-page-label="'行'"
                  :selected.sync="selected"
                />
              </q-card-section>
              <q-separator ></q-separator>
              <q-card-actions align="right">
                <q-btn flat label="取消" color="primary" v-close-popup ></q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>

        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
  import mockdata from '../mock/demolist'
  import {getdata} from '../server/index'
export default {
  name: 'PageIndex',
  data () {
    return {
      text: '',
      selected: [],
      // fixed: false,
      tip: '(注:文档内标题标红的列为必填项,请勿输入以下非法字符：~、@、$、^、&、《、》、<、>、￥)',
      funtype: 0,
      tipfile: null,
      skilldialog: false,
      drawerLeft: false,
      slidesimple: [
        {
          label: '天智',
          children: [
            {
              label: '智能制造',
              children: [
                { label: '其他' },
                { label: '项目组' },
                { label: '产品组' }
              ]
            },
          ]
        }
      ],
      dialogobj: {
        dense: true,
        sex: '男',
        st: '停用',
        file: null,
        fileimg: '',
        jobnumber: '',
        name: '',
        username: '',
        tel: '',
        skill: [],
        skilloptions: [{}],
        skilloptionstree: [
          {
            label: 'Node 1'
          },
          {
            label: 'Node 2'
          }
        ],
        department: [],
        depoptions: [
          {
            label: 'Satisfied customers',
            children: [
              {
                label: 'Good food',
                children: [
                  { label: 'Good recipe' }
                ]
              },
              {
                label: 'Pleasant surroundings',
                children: [
                  { label: 'Good table presentation' },
                  { label: 'Pleasing decor' }
                ]
              }
            ]
          }
        ],
        role: [],
        roleoptions: [{}],
        roleoptionstree: [
          {
            label: 'Node 1'
          },
          {
            label: 'Node 2'
          }
        ],
        job: [],
        joboptions: [{}],
        joboptionstree: [],
        devfilter: '',
        devticked: [],
        skillticked: [],
        roleticked: [],
        jobticked: []
      },
      columns: [
        {
          name: 'index',
          label: '序号',
          field: 'index',
          align: 'left'
        },
        { name: 'jobnumber', align: 'center', label: '工号', field: 'jobnumber', sortable: true },
        { name: 'username', label: '用户名', field: 'username', sortable: true },
        {
          name: 'name',
          required: true,
          label: '姓名',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'sex', label: '性别', field: 'sex' },
        { name: 'tel', label: '电话', field: 'tel' },
        { name: 'calcium', label: '创建时间', field: 'calcium', sortable: true },
        { name: 'st', label: '用户状态', field: 'st', sortable: true },
        { name: 'fz', label: '负责范围', field: 'fz', sortable: true },
        { name: 'role', label: 'mes职能', field: 'role', sortable: true }
      ],
      data: [
        {
          index: '1',
          jobnumber: '001',
          username: 'zhangsan',
          name: '张三',
          sex: '男',
          tel: '12345689',
          calcium: '2020-05-08',
          st: '启用',
          fz: '湖北',
          role: '管理员'
        },
        {
          index: '2',
          jobnumber: '002',
          username: 'zhangsan',
          name: '张四',
          sex: '男',
          tel: '12345689',
          calcium: '2020-05-08',
          st: '启用',
          fz: '湖北',
          role: '管理员'
        },
        {
          index: '3',
          jobnumber: '003',
          username: 'zhangsan',
          name: '张五',
          sex: '男',
          tel: '12345689',
          calcium: '2020-05-08',
          st: '启用',
          fz: '湖北',
          role: '管理员'
        }
      ]
    }
  },
  mounted(){
    console.log('4-mounted 被挂载',mockdata.mockdata,mockdata.a);
    this.$axios.get('/api/load').then(res => {
      console.log('axios',res)
    })
    // this.getd()
  },
  methods: {
    // 请求数据
    async getd(){
      let a = await getdata('/api/app/product/info/loadPro',{provider: 'CMCC',rang: 2,category:''})
      console.log('请求',a.data)
    },
    // table 选中数据显示文字
    getSelectedString (val) {
      return val + '条' // 不返回空时，table自带的左下角显示为默认的文字
    },
    // 技能管理
    onSkill () {
      const self = this
      self.$refs.fixedskill.show()
    },
    // 导入
    onImport () {
      const self = this
      self.$refs.fixedimport.show()
    },
    // 导出
    onExport () {
      const self = this
      self.$q.notify({
        position: 'center',
        timeout: 1000,
        color: 'negative',
        message: '导出'
      })
    },
    // 重置密码
    onResetPasswords () {
      const self = this
      self.$q.notify({
        position: 'center',
        timeout: 1000,
        color: 'negative',
        message: '当前密码为初始密码，无需重置'
      })
    },
    // 删除按钮
    onDelete () {
      const self = this
      if (self.selected.length > 0 && self.selected.length < 2) {
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
          self.data.forEach((item, inx, arr) => {
            if (item.name === self.selected[0].name) {
              self.data.splice(inx, 1)
            }
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
    },
    // 新增按钮
    onAdd () {
      // console.log('Clicked on an Item')
      const self = this
      self.funtype = 1
      // self.fixed = true
      self.$refs.fixed.show()
      self.dialogobj = {
        dense: true,
        sex: '男',
        st: '停用',
        file: null,
        fileimg: '',
        jobnumber: '',
        name: '',
        username: '',
        tel: '',
        skill: [],
        skilloptions: [{}],
        skilloptionstree: [],
        department: [],
        depoptions: [],
        role: [],
        roleoptions: [{}],
        roleoptionstree: [
          {
            label: 'Node 1'
          },
          {
            label: 'Node 2'
          }
        ],
        job: [],
        joboptions: [{}],
        joboptionstree: [],
        devfilter: '',
        devticked: [],
        skillticked: [],
        roleticked: [],
        jobticked: []
      }
    },
    // 编辑按钮
    onEdit () {
      const self = this
      if (self.selected.length > 0 && self.selected.length < 2) {
        self.funtype = 0
        // self.fixed = true
        self.$refs.fixed.show()
        self.dialogobj = { ...self.dialogobj, ...self.selected[0] }
        console.log(self.selected)
      } else {
        self.$q.notify({
          position: 'center',
          timeout: 1000,
          color: 'negative',
          message: '请选择一项修改'
        })
      }
    },
    devresetFilter () {
      this.dialogobj.devfilter = ''
      this.$refs.filter.focus()
    },
    devtickedfun (val) {
      console.log(val)
      this.dialogobj.department = val
    },
    devclear () {
      this.dialogobj.department = []
      this.dialogobj.devticked = []
    },
    skilltickedfun (val) {
      this.dialogobj.skill = val
    },
    skillclear () {
      this.dialogobj.skill = []
      this.dialogobj.skillticked = []
    },
    roletickedfun (val) {
      this.dialogobj.role = val
    },
    roleclear () {
      this.dialogobj.role = []
      this.dialogobj.roleticked = []
    },
    jobtickedfun (val) {
      this.dialogobj.job = val
    },
    jobclear () {
      this.dialogobj.job = []
      this.dialogobj.jobticked = []
    },
    // 点击上传头像
    filefun (val) {
      this.dialogobj.fileimg = val[0]
      console.log(val)
    },
    // 弹窗取消按钮
    cancel () {
      console.log('弹窗取消按钮')
    },
    // 弹窗确定按钮
    sure () {
      console.log('弹窗确定按钮')
      const self = this
      self.$refs.jobnumber.validate()
      self.$refs.name.validate()
      self.$refs.username.validate()
      self.$refs.role.validate()
      if (self.$refs.name.hasError || self.$refs.username.hasError || self.$refs.jobnumber.hasError || self.$refs.role.hasError) {
        self.formHasError = true
      } else {
        // self.fixed = false
        self.$refs.fixed.hide()
        if (self.funtype === 0) {
          self.selected = [{ ...self.selected[0], ...self.dialogobj }]
          self.data.forEach((item, ix) => {
            if (item.index === self.selected[0].index) {
              self.data.splice(ix, 1, self.selected[0])
            }
          })
        } else {
          self.dialogobj.index = new Date().getTime()
          self.data.push(self.dialogobj)
        }
        console.log(self.data)
      }
    },
    // 导入用户确定按钮
    sureimport () {
      const self = this
      self.$refs.fixedimport.hide()
      console.log(this.tipfile)
    },
    // 技能管理确定按钮
    sureskill () {

    },
    // 技能管理取消按钮
    cancelskill () {
      this.skilldialog = false
    },
    // 添加技能
    addskill () {
      this.skilldialog = true
    },
    // 创建技能
    createskill () {
      this.skilldialog = true
    }
  }
}
</script>

<style>
  .outInput .q-placeholder{
    padding:0 10px;
    line-height:18px;
  }
  .outInput .q-field__control{
    height:40px;
  }
  .outInput .q-field__label{
    top:10px;
  }
  .nolabelclass{
    padding-bottom: 0;
  }
  .filebtn{
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
  }
  .filebtn .q-field__control{height: auto;}
  .max-height{max-height: 50vh;}
  .limt-w{width: 800px; max-width: 80vw!important;}
</style>
