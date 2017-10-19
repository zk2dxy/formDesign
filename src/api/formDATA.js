const jsonList = [{
  'CNameCN': '布局控件',
  'CNameEN': 'layout',
  'parent': 'form',
  'type': 'layout',
  'component': 'CLayout',
  'config': {
    'ControlID': '45a851f0-4240-4c86-9ac2-ce4f611b294e',
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
      'ControlID': '7b948eb5-3a4b-436e-b7be-c47578f71ccb',
      'CBelong': 'form',
      'CTitleCN': '用户名',
      'CTitleEN': 'input Control',
      'labelPositionModel': 'right',
      'labelPositionValue': [{'value': 'left', 'name': '文字左对齐'}, {'value': 'right', 'name': '文字右对齐'}, {
        'value': 'top',
        'name': '文字居上对齐'
      }],
      'labelWidth': 80,
      'CName': 'CInput',
      'layoutModel': 'percentLayout',
      'currentLayout': {'name': '百分比布局', 'default': '50', 'value': 'percentLayout', 'status': true, 'max': 100},
      'CLayout': [{'name': '自适应布局', 'default': 1, 'value': 'flexLayout', 'status': false, 'max': 10}, {
        'name': '百分比布局',
        'default': '50',
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
        'placeholder': '请输入用户名',
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
    'id': '7b948eb5-3a4b-436e-b7be-c47578f71ccb'
  }, {
    'CNameCN': '输入框',
    'CNameEN': 'input',
    'parent': 'form',
    'type': 'input',
    'component': 'CInput',
    'config': {
      'ControlID': '3debdc22-6a2c-41b7-9272-dcbcbdc28e8a',
      'CBelong': 'form',
      'CTitleCN': '密码',
      'CTitleEN': 'input Control',
      'labelPositionModel': 'right',
      'labelPositionValue': [{'value': 'left', 'name': '文字左对齐'}, {'value': 'right', 'name': '文字右对齐'}, {
        'value': 'top',
        'name': '文字居上对齐'
      }],
      'labelWidth': 80,
      'CName': 'CInput',
      'layoutModel': 'percentLayout',
      'currentLayout': {'name': '百分比布局', 'default': '50', 'value': 'percentLayout', 'status': true, 'max': 100},
      'CLayout': [{'name': '自适应布局', 'default': 1, 'value': 'flexLayout', 'status': false, 'max': 10}, {
        'name': '百分比布局',
        'default': '50',
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
        'placeholder': '请输入密码',
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
    'id': '3debdc22-6a2c-41b7-9272-dcbcbdc28e8a'
  }, {
    'CNameCN': '单选框',
    'CNameEN': 'radio',
    'parent': 'form',
    'type': 'radio',
    'component': 'CRadio',
    'config': {
      'ControlID': 'b6f4d781-df4d-41ff-8186-7db143ea0b43',
      'CBelong': 'form',
      'CTitleCN': '记住密码',
      'CTitleEN': 'radio Control',
      'labelPositionModel': 'right',
      'labelPositionValue': [{'value': 'left', 'name': '文字左对齐'}, {'value': 'right', 'name': '文字右对齐'}, {
        'value': 'top',
        'name': '文字居上对齐'
      }],
      'labelWidth': 80,
      'CName': 'CRadio',
      'layoutModel': 'percentLayout',
      'currentLayout': {'name': '百分比布局', 'default': '50', 'value': 'percentLayout', 'status': true, 'max': 100},
      'CLayout': [{'name': '自适应布局', 'default': 1, 'value': 'flexLayout', 'status': false, 'max': 10}, {
        'name': '百分比布局',
        'default': '50',
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
        'type': [{'value': 'radio', 'name': '普通单选框'}, {'value': 'button', 'name': '按钮样式'}],
        'typeModel': 'radio',
        'description': '',
        'size': [{'value': 'large', 'name': '大'}, {'value': 'small', 'name': '小'}],
        'sizeModel': 'small',
        'itemAttr': [{'label': '1', 'showContent': '是', 'isDisabled': false}, {
          'label': '2',
          'showContent': '否',
          'isDisabled': false
        }],
        'addStatus': false,
        'currentSelected': 1,
        'defaultRadioSelected': '1',
        'textColor': '#fff',
        'fillColor': '',
        'isDisabled': false
      },
      'CKey': {'default': '', 'type': '', 'keyMethods': ''},
      'Status': {
        'status': false,
        'rules': [{'value': 'readonly', 'name': '只读'}, {'value': '', 'name': '隐藏'}, {'value': '', 'name': '禁用'}],
        'ruleList': []
      },
      'CValidate': {'status': false, 'chooseStatus': false, 'validateModel': ''},
      'methodDB': [{'name': '提交', 'methodName': 'save', 'action': '/form/saveAction'}]
    },
    'id': 'b6f4d781-df4d-41ff-8186-7db143ea0b43'
  }, {
    'CNameCN': '选择器',
    'CNameEN': 'select',
    'parent': 'form',
    'type': 'select',
    'component': 'CSelect',
    'config': {
      'ControlID': '4dbc0274-13e9-4935-8c7a-48cc2075a03a',
      'CBelong': 'form',
      'CTitleCN': '登陆方式',
      'CTitleEN': 'select Control',
      'labelPositionModel': 'right',
      'labelPositionValue': [{'value': 'left', 'name': '文字左对齐'}, {'value': 'right', 'name': '文字右对齐'}, {
        'value': 'top',
        'name': '文字居上对齐'
      }],
      'labelWidth': 80,
      'CName': 'CSelect',
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
        'type': [{'value': 'select', 'name': '选项不分组'}, {'value': 'selectGroup', 'name': '选项分组'}],
        'typeModel': 'select',
        'description': '',
        'size': [{'value': 'large', 'name': '大'}, {'value': 'small', 'name': '小'}, {'value': 'mini', 'name': 'mini'}],
        'sizeModel': 'small',
        'itemAttr': [{'label': '0', 'showContent': '航嘉电器', 'isDisabled': false}, {
          'label': '1',
          'showContent': '样例1',
          'isDisabled': false
        }, {'label': '2', 'showContent': '样例2', 'isDisabled': false}],
        'itemAttrSelectGroup': [{
          'label': '组名1',
          'options': [{'label': '1-1', 'showContent': '样例1', 'isDisabled': false}]
        }, {'label': '组名2', 'options': [{'label': '2-1', 'showContent': '样例2', 'isDisabled': false}]}],
        'placeholder': '',
        'isMultiple': false,
        'ableSelectedMax': 0,
        'addStatus': false,
        'currentSelected': 0,
        'currentSelectedGroup': [0, 0],
        'defaultSelected': '',
        'isDisabled': false,
        'isSelectClearable': false,
        'isSelectFilterable': false,
        'isSelectRemote': false,
        'isSelectCreate': false
      },
      'CKey': {'default': '航嘉电器', 'type': '', 'keyMethods': ''},
      'Status': {
        'status': false,
        'rules': [{'value': 'readonly', 'name': '只读'}, {'value': '', 'name': '隐藏'}, {'value': '', 'name': '禁用'}],
        'ruleList': []
      },
      'CValidate': {'status': false, 'chooseStatus': false, 'validateModel': ''},
      'methodDB': [{'name': '提交', 'methodName': 'save', 'action': '/form/saveAction'}]
    },
    'id': '4dbc0274-13e9-4935-8c7a-48cc2075a03a'
  }, {
    'CNameCN': '折叠面板',
    'CNameEN': 'collapse',
    'parent': 'form',
    'type': 'collapse',
    'component': 'CCollapse',
    'config': {
      'ControlID': 'c82ccf99-f75e-4dee-9d02-a3a171adc419',
      'CBelong': 'others',
      'CTitleCN': '折叠面板',
      'CTitleEN': 'collapse Control',
      'CName': 'CCollapse',
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
        'typeModel': 'collapse',
        'collapseItem': [{'name': '0', 'title': '登陆历史记录', 'content': '192.168.1.110 @航嘉电器 2017年10月11日 21:00:00'}],
        'addCollapseStatus': false,
        'currentValue': 0,
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
    'id': 'c82ccf99-f75e-4dee-9d02-a3a171adc419'
  }]],
  'childrenDefault': [[]],
  'id': '45a851f0-4240-4c86-9ac2-ce4f611b294e'
}]

export default jsonList
