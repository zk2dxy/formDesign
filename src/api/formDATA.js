const jsonList = [{
  'CNameCN': '折叠面板',
  'CNameEN': 'collapse',
  'parent': 'form',
  'type': 'collapse',
  'component': 'CCollapse',
  'config': {
    'ControlID': 'dc8023cb-9ed2-4262-9277-6c7d55f30b7c',
    'CBelong': 'others',
    'CTitleCN': '折叠面板',
    'CTitleEN': 'collapse Control',
    'CName': 'CCollapse',
    'labelPositionModel': 'left',
    'labelPositionValue': [{'value': 'left', 'name': '左对齐'}, {'value': 'right', 'name': '右对齐'}, {
      'value': 'top',
      'name': '居上对齐'
    }],
    'labelWidth': 80,
    'layoutModel': 'percentLayout',
    'currentLayout': {'name': '百分比布局', 'default': 100, 'value': 'percentLayout', 'status': true, 'max': 100},
    'CLayout': [{'name': '自适应布局', 'default': 1, 'value': 'flexLayout', 'status': false, 'max': 10}, {
      'name': '百分比布局',
      'default': 100,
      'value': 'percentLayout',
      'status': true,
      'max': 100
    }, {'name': '像素布局', 'default': 100, 'value': 'pixelLayout', 'status': false, 'max': null}, {
      'name': '栅格布局',
      'default': 12,
      'value': 'columnLayout',
      'status': false,
      'max': 12
    }],
    'CAttribute': {
      'collapseItem': [{'name': '0', 'title': '面板标题', 'content': '面板内容'}],
      'addCollapseStatus': false,
      'currentValue': 0,
      'typeModel': 'collapse',
      'description': '',
      'height': '',
      'vertical': ['top', 'middle', 'bottom']
    },
    'CKey': {'default': '', 'type': '', 'keyMethods': ''},
    'Status': {
      'status': false,
      'rules': [{'value': 'readonly', 'name': '只读'}, {'value': '', 'name': '隐藏'}],
      'ruleList': []
    },
    'Icon': {
      'status': false,
      'chooseStatus': false,
      'position': [{'name': '左侧', 'value': 'left'}, {'name': '右侧', 'value': 'right'}],
      'positionModel': '',
      'className': '',
      'content': '',
      'title': '',
      'library': ''
    },
    'CValidate': {'status': false, 'chooseStatus': false, 'validateModel': ''},
    'methodDB': [{'name': '提交', 'methodName': 'save', 'action': '/form/saveAction'}]
  },
  'id': 'dc8023cb-9ed2-4262-9277-6c7d55f30b7c'
}, {
  'CNameCN': '布局控件',
  'CNameEN': 'layout',
  'parent': 'form',
  'type': 'layout',
  'component': 'CLayout',
  'config': {
    'ControlID': 'df85db92-5e6d-452e-ba1e-0b34258daf07',
    'CBelong': 'form',
    'CTitleCN': '布局控件',
    'CTitleEN': 'layout Control',
    'CName': 'CLayout',
    'layoutModel': 'percentLayout',
    'currentLayout': {'name': '百分比布局', 'default': 100, 'value': 'percentLayout', 'status': true, 'max': 100},
    'CLayout': [{'name': '自适应布局', 'default': 1, 'value': 'flexLayout', 'status': false, 'max': 10}, {
      'name': '百分比布局',
      'default': 100,
      'value': 'percentLayout',
      'status': true,
      'max': 100
    }, {'name': '像素布局', 'default': 100, 'value': 'pixelLayout', 'status': false, 'max': null}, {
      'name': '栅格布局',
      'default': 12,
      'value': 'columnLayout',
      'status': false,
      'max': 12
    }],
    'CAttribute': {'description': '', 'height': '', 'vertical': ['top', 'middle', 'bottom']},
    'CKey': {'default': '', 'type': '', 'keyMethods': ''},
    'CValidate': {'status': false, 'chooseStatus': false, 'validateModel': ''}
  },
  'children': [[{
    'CNameCN': '输入框',
    'CNameEN': 'input',
    'parent': 'form',
    'type': 'input',
    'component': 'CInput',
    'config': {
      'ControlID': '87b7e116-9e13-4383-852a-a45ef8936eb4',
      'CBelong': 'form',
      'CTitleCN': '输入框',
      'CTitleEN': 'input Control',
      'CName': 'CInput',
      'labelPositionModel': 'left',
      'labelPositionValue': [{'value': 'left', 'name': '左对齐'}, {'value': 'right', 'name': '右对齐'}, {
        'value': 'top',
        'name': '居上对齐'
      }],
      'labelWidth': 80,
      'layoutModel': 'percentLayout',
      'currentLayout': {'name': '百分比布局', 'default': 100, 'value': 'percentLayout', 'status': true, 'max': 100},
      'CLayout': [{'name': '自适应布局', 'default': 1, 'value': 'flexLayout', 'status': false, 'max': 10}, {
        'name': '百分比布局',
        'default': 100,
        'value': 'percentLayout',
        'status': true,
        'max': 100
      }, {'name': '像素布局', 'default': 100, 'value': 'pixelLayout', 'status': false, 'max': null}, {
        'name': '栅格布局',
        'default': 12,
        'value': 'columnLayout',
        'status': false,
        'max': 12
      }],
      'CAttribute': {
        'prepend': '',
        'append': '',
        'type': [{'value': 'input', 'name': '文本框'}, {'value': 'textarea', 'name': '多行文本'}],
        'typeModel': 'input',
        'description': '',
        'placeholder': '请输入默认值或者为空',
        'height': '',
        'vertical': ['top', 'middle', 'bottom']
      },
      'CKey': {'default': '', 'type': '', 'keyMethods': ''},
      'Status': {
        'status': false,
        'rules': [{'value': 'readonly', 'name': '只读'}, {'value': '', 'name': '隐藏'}],
        'ruleList': []
      },
      'Icon': {
        'status': false,
        'chooseStatus': false,
        'position': [{'name': '左侧', 'value': 'left'}, {'name': '右侧', 'value': 'right'}],
        'positionModel': '',
        'className': '',
        'content': '',
        'title': '',
        'library': ''
      },
      'CValidate': {'status': false, 'chooseStatus': false, 'validateModel': ''},
      'methodDB': [{'name': '提交', 'methodName': 'save', 'action': '/form/saveAction'}]
    },
    'id': '87b7e116-9e13-4383-852a-a45ef8936eb4'
  }]],
  'childrenDefault': [[]],
  'id': 'df85db92-5e6d-452e-ba1e-0b34258daf07'
}, {
  'CNameCN': '分页控件',
  'CNameEN': 'CPage',
  'parent': 'form',
  'type': 'page',
  'component': 'CPage',
  'config': {
    'ControlID': 'e3f1353f-2788-4dad-8312-29374e1c7887',
    'CBelong': 'others',
    'CTitleCN': '',
    'CTitleEN': 'page Control',
    'CName': 'CPage',
    'labelPositionModel': 'left',
    'labelPositionValue': [{'value': 'left', 'name': '左对齐'}, {'value': 'right', 'name': '右对齐'}, {
      'value': 'top',
      'name': '居上对齐'
    }],
    'labelWidth': '0',
    'layoutModel': 'flexLayout',
    'currentLayout': {'name': '自适应布局', 'default': 1, 'value': 'flexLayout', 'status': true, 'max': 10},
    'CLayout': [{'name': '自适应布局', 'default': 1, 'value': 'flexLayout', 'status': true, 'max': 10}, {
      'name': '百分比布局',
      'default': 100,
      'value': 'percentLayout',
      'status': false,
      'max': 100
    }, {'name': '像素布局', 'default': 100, 'value': 'pixelLayout', 'status': false, 'max': null}, {
      'name': '栅格布局',
      'default': 12,
      'value': 'columnLayout',
      'status': false,
      'max': 12
    }],
    'CAttribute': {
      'pageSmall': false,
      'pageSize': 5,
      'pageCurrent': 2,
      'pageTotal': 100,
      'pageSmallList': [{'name': '是', 'value': true}, {'name': '否', 'value': false}],
      'type': [{'value': 'pageBasic', 'name': '基础分页'}, {'value': 'pageTotal', 'name': '显示总数'}, {
        'value': 'pageItem',
        'name': '调整每页显示条数'
      }, {'value': 'pageDirect', 'name': '直接前往'}, {'value': 'pageComplete', 'name': '完整功能'}],
      'typeModel': 'pageBasic',
      'description': '',
      'height': '',
      'vertical': ['top', 'middle', 'bottom']
    },
    'CKey': {'default': '', 'type': '', 'keyMethods': ''},
    'Status': {
      'status': false,
      'rules': [{'value': 'readonly', 'name': '只读'}, {'value': '', 'name': '隐藏'}],
      'ruleList': []
    },
    'Icon': {
      'status': false,
      'chooseStatus': false,
      'position': [{'name': '左侧', 'value': 'left'}, {'name': '右侧', 'value': 'right'}],
      'positionModel': '',
      'className': '',
      'content': '',
      'title': '',
      'library': ''
    },
    'CValidate': {'status': false, 'chooseStatus': false, 'validateModel': ''},
    'methodDB': [{'name': '提交', 'methodName': 'save', 'action': '/form/saveAction'}]
  },
  'id': 'e3f1353f-2788-4dad-8312-29374e1c7887'
}]

export default jsonList
