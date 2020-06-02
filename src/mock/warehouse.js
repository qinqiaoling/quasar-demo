const Mock = require('mockjs');

let treeSource = Mock.mock({
  "data":[
    {
      label: '全部',
      expanded: true,
      type: '总',
      children: [
        {
          label: '北京一仓',
          id: 2,
          type: '仓',
          children: [
            {
              label: '合格品区',
              id: 3,
              type: '区',
              children: [
                {
                  label: '货架A01',
                  id: 4,
                  type: '架',
                  children: [
                    {
                      label: 'A01001',
                      type: '架区'
                    },
                    {
                      label: 'A01002'
                    }
                  ]
                },
                {
                  label: '货架A02',
                  children: [
                    {
                      label: 'A02001'
                    },
                    {
                      label: 'A02002'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '北京二仓',
          children: [
            {
              label: '合格品区',
              children: [
                {
                  label: '货架A01',
                  children: [
                    {
                      label: 'A01001'
                    },
                    {
                      label: 'A01002'
                    }
                  ]
                },
                {
                  label: '货架A02',
                  children: [
                    {
                      label: 'A02001'
                    },
                    {
                      label: 'A02002'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

let adminList = Mock.mock({
  "data":[
    {
      //插入节点对应的数据
      number: '1',
      name: '张三',
      organization: '石景山',
      contactWay: '13577777',
      cross: ''
    },
    {
      number: '1',
      name: '张三',
      organization: '石景山',
      contactWay: '13577777',
      cross: '1'
    }
  ]
})

export default{treeSource,adminList}