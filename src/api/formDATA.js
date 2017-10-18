const jsonList = [
  {
    'CNameCN': '输入框',
    'CNameEN': 'input',
    'parent': 'form',
    'type': 'input',
    'component': 'CInput',
    'config': {
      'ControlID': 'b76d4370-37ec-4f58-9ac1-06e968540e47',
      'CBelong': 'form',
      'CTitleCN': '输入框',
      'CTitleEN': 'input Control',
      'CName': 'CInput',
      'layoutModel': 'flexLayout',
      'currentLayout': null,
      'CLayout': [
        {
          'name': '自适应布局',
          'default': 1,
          'value': 'flexLayout',
          'status': true,
          'max': 10
        },
        {
          'name': '百分比布局',
          'default': 100,
          'value': 'percentLayout',
          'status': false,
          'max': 100
        },
        {
          'name': '像素布局',
          'default': 100,
          'value': 'pixelLayout',
          'status': false,
          'max': null
        },
        {
          'name': '栅格布局',
          'default': 12,
          'value': 'columnLayout',
          'status': false,
          'max': 12
        }
      ],
      'CAttribute': {
        'prepend': '',
        'append': '',
        'type': [
          {
            'value': 'input',
            'name': '文本框'
          },
          {
            'value': 'textarea',
            'name': '多行文本'
          }
        ],
        'typeModel': 'input',
        'description': '',
        'placeholder': '请输入默认值或者为空',
        'height': '',
        'vertical': [
          'top',
          'middle',
          'bottom'
        ]
      },
      'CKey': {
        'default': '',
        'type': '',
        'keyMethods': ''
      },
      'Status': {
        'status': false,
        'rules': [
          {
            'value': 'readonly',
            'name': '只读'
          },
          {
            'value': '',
            'name': '隐藏'
          }
        ],
        'ruleList': []
      },
      'Icon': {
        'status': false,
        'chooseStatus': false,
        'position': [
          {
            'name': '左侧',
            'value': 'left'
          },
          {
            'name': '右侧',
            'value': 'right'
          }
        ],
        'positionModel': '',
        'className': '',
        'content': '',
        'title': '',
        'library': ''
      },
      'CValidate': {
        'status': false,
        'chooseStatus': false,
        'validateModel': ''
      },
      'methodDB': [
        {
          'name': '提交',
          'methodName': 'save',
          'action': '/form/saveAction'
        }
      ]
    },
    'id': 'b76d4370-37ec-4f58-9ac1-06e968540e47'
  },
  {
    'CNameCN': '布局控件',
    'CNameEN': 'layout',
    'parent': 'form',
    'type': 'layout',
    'component': 'CLayout',
    'config': {
      'ControlID': '',
      'CBelong': 'form',
      'CTitleCN': '布局控件',
      'CTitleEN': 'layout Control',
      'CName': 'CLayout',
      'layoutModel': 'flexLayout',
      'currentLayout': null,
      'CLayout': [
        {
          'name': '自适应布局',
          'default': 1,
          'value': 'flexLayout',
          'status': true,
          'max': 10
        },
        {
          'name': '百分比布局',
          'default': 100,
          'value': 'percentLayout',
          'status': false,
          'max': 100
        },
        {
          'name': '像素布局',
          'default': 100,
          'value': 'pixelLayout',
          'status': false,
          'max': null
        },
        {
          'name': '栅格布局',
          'default': 12,
          'value': 'columnLayout',
          'status': false,
          'max': 12
        }
      ],
      'CAttribute': {
        'description': '',
        'height': '',
        'vertical': [
          'top',
          'middle',
          'bottom'
        ]
      },
      'CKey': {
        'default': '',
        'type': '',
        'keyMethods': ''
      },
      'CValidate': {
        'status': false,
        'chooseStatus': false,
        'validateModel': ''
      }
    },
    'children': [
      [
        {
          'CNameCN': '多选框',
          'CNameEN': 'checkbox',
          'parent': 'form',
          'type': 'checkbox',
          'component': 'CCheckbox',
          'config': {
            'ControlID': 'e332c84f-deb5-4f6d-a05f-b6ca723c15cd',
            'CBelong': 'form',
            'CTitleCN': '多选框',
            'CTitleEN': 'checkbox Control',
            'CName': 'CCheckbox',
            'layoutModel': 'flexLayout',
            'currentLayout': null,
            'CLayout': [
              {
                'name': '自适应布局',
                'default': 1,
                'value': 'flexLayout',
                'status': true,
                'max': 10
              },
              {
                'name': '百分比布局',
                'default': 100,
                'value': 'percentLayout',
                'status': false,
                'max': 100
              },
              {
                'name': '像素布局',
                'default': 100,
                'value': 'pixelLayout',
                'status': false,
                'max': null
              },
              {
                'name': '栅格布局',
                'default': 12,
                'value': 'columnLayout',
                'status': false,
                'max': 12
              }
            ],
            'CAttribute': {
              'type': [
                {
                  'value': 'checkbox',
                  'name': '普通样式'
                },
                {
                  'value': 'button',
                  'name': '按钮样式'
                }
              ],
              'typeModel': 'checkbox',
              'description': '',
              'size': [
                {
                  'value': 'large',
                  'name': '大'
                },
                {
                  'value': 'small',
                  'name': '小'
                }
              ],
              'sizeModel': 'small',
              'itemAttr': [
                {
                  'label': '1',
                  'showContent': '样例1',
                  'isDisabled': false
                },
                {
                  'label': '2',
                  'showContent': '样例2',
                  'isDisabled': false
                }
              ],
              'indeterminateCheckbox': true,
              'checkAllCheckbox': true,
              'showAllCheckbox': false,
              'addStatus': false,
              'currentSelected': 0,
              'defaultCheckboxSelected': [],
              'textColor': '#fff',
              'fillColor': '',
              'ableSelectedMin': 1,
              'ableSelectedMax': 2
            },
            'CKey': {
              'default': '',
              'type': '',
              'keyMethods': ''
            },
            'Status': {
              'status': false,
              'rules': [
                {
                  'value': 'readonly',
                  'name': '只读'
                },
                {
                  'value': '',
                  'name': '隐藏'
                },
                {
                  'value': '',
                  'name': '禁用'
                }
              ],
              'ruleList': []
            },
            'CValidate': {
              'status': false,
              'chooseStatus': false,
              'validateModel': ''
            },
            'methodDB': [
              {
                'name': '提交',
                'methodName': 'save',
                'action': '/form/saveAction'
              }
            ]
          },
          'id': 'e332c84f-deb5-4f6d-a05f-b6ca723c15cd'
        },
        {
          'CNameCN': '单选框',
          'CNameEN': 'radio',
          'parent': 'form',
          'type': 'radio',
          'component': 'CRadio',
          'config': {
            'ControlID': '72847973-ed23-4aa6-85ee-871285c7bb7f',
            'CBelong': 'form',
            'CTitleCN': '单选框',
            'CTitleEN': 'radio Control',
            'CName': 'CRadio',
            'layoutModel': 'flexLayout',
            'currentLayout': null,
            'CLayout': [
              {
                'name': '自适应布局',
                'default': 1,
                'value': 'flexLayout',
                'status': true,
                'max': 10
              },
              {
                'name': '百分比布局',
                'default': 100,
                'value': 'percentLayout',
                'status': false,
                'max': 100
              },
              {
                'name': '像素布局',
                'default': 100,
                'value': 'pixelLayout',
                'status': false,
                'max': null
              },
              {
                'name': '栅格布局',
                'default': 12,
                'value': 'columnLayout',
                'status': false,
                'max': 12
              }
            ],
            'CAttribute': {
              'type': [
                {
                  'value': 'radio',
                  'name': '普通单选框'
                },
                {
                  'value': 'button',
                  'name': '按钮样式'
                }
              ],
              'typeModel': 'radio',
              'description': '',
              'size': [
                {
                  'value': 'large',
                  'name': '大'
                },
                {
                  'value': 'small',
                  'name': '小'
                }
              ],
              'sizeModel': 'small',
              'itemAttr': [
                {
                  'label': '1',
                  'showContent': '样例1',
                  'isDisabled': false
                },
                {
                  'label': '2',
                  'showContent': '样例2',
                  'isDisabled': false
                }
              ],
              'addStatus': false,
              'currentSelected': 0,
              'defaultRadioSelected': '1',
              'textColor': '#fff',
              'fillColor': '',
              'isDisabled': false
            },
            'CKey': {
              'default': '',
              'type': '',
              'keyMethods': ''
            },
            'Status': {
              'status': false,
              'rules': [
                {
                  'value': 'readonly',
                  'name': '只读'
                },
                {
                  'value': '',
                  'name': '隐藏'
                },
                {
                  'value': '',
                  'name': '禁用'
                }
              ],
              'ruleList': []
            },
            'CValidate': {
              'status': false,
              'chooseStatus': false,
              'validateModel': ''
            },
            'methodDB': [
              {
                'name': '提交',
                'methodName': 'save',
                'action': '/form/saveAction'
              }
            ]
          },
          'id': '72847973-ed23-4aa6-85ee-871285c7bb7f'
        }
      ]
    ],
    'childrenDefault': [
      []
    ],
    'id': '6b9df362-99fc-4dfe-91cf-df5839e405cf'
  },
  {
    'CNameCN': '输入框',
    'CNameEN': 'input',
    'parent': 'form',
    'type': 'input',
    'component': 'CInput',
    'config': {
      'ControlID': 'b84f992e-c112-45cc-ae1d-6fedec10b237',
      'CBelong': 'form',
      'CTitleCN': '输入框',
      'CTitleEN': 'input Control',
      'CName': 'CInput',
      'layoutModel': 'flexLayout',
      'currentLayout': null,
      'CLayout': [
        {
          'name': '自适应布局',
          'default': 1,
          'value': 'flexLayout',
          'status': true,
          'max': 10
        },
        {
          'name': '百分比布局',
          'default': 100,
          'value': 'percentLayout',
          'status': false,
          'max': 100
        },
        {
          'name': '像素布局',
          'default': 100,
          'value': 'pixelLayout',
          'status': false,
          'max': null
        },
        {
          'name': '栅格布局',
          'default': 12,
          'value': 'columnLayout',
          'status': false,
          'max': 12
        }
      ],
      'CAttribute': {
        'prepend': '',
        'append': '',
        'type': [
          {
            'value': 'input',
            'name': '文本框'
          },
          {
            'value': 'textarea',
            'name': '多行文本'
          }
        ],
        'typeModel': 'input',
        'description': '',
        'placeholder': '请输入默认值或者为空',
        'height': '',
        'vertical': [
          'top',
          'middle',
          'bottom'
        ]
      },
      'CKey': {
        'default': '',
        'type': '',
        'keyMethods': ''
      },
      'Status': {
        'status': false,
        'rules': [
          {
            'value': 'readonly',
            'name': '只读'
          },
          {
            'value': '',
            'name': '隐藏'
          }
        ],
        'ruleList': []
      },
      'Icon': {
        'status': false,
        'chooseStatus': false,
        'position': [
          {
            'name': '左侧',
            'value': 'left'
          },
          {
            'name': '右侧',
            'value': 'right'
          }
        ],
        'positionModel': '',
        'className': '',
        'content': '',
        'title': '',
        'library': ''
      },
      'CValidate': {
        'status': false,
        'chooseStatus': false,
        'validateModel': ''
      },
      'methodDB': [
        {
          'name': '提交',
          'methodName': 'save',
          'action': '/form/saveAction'
        }
      ]
    },
    'id': 'b84f992e-c112-45cc-ae1d-6fedec10b237'
  },
  {
    'CNameCN': '布局控件',
    'CNameEN': 'layout',
    'parent': 'form',
    'type': 'layout',
    'component': 'CLayout',
    'config': {
      'ControlID': '0dce236f-5d26-4940-af55-3a9536c9b66c',
      'CBelong': 'form',
      'CTitleCN': '布局控件',
      'CTitleEN': 'layout Control',
      'CName': 'CLayout',
      'layoutModel': 'flexLayout',
      'currentLayout': null,
      'CLayout': [
        {
          'name': '自适应布局',
          'default': 1,
          'value': 'flexLayout',
          'status': true,
          'max': 10
        },
        {
          'name': '百分比布局',
          'default': 100,
          'value': 'percentLayout',
          'status': false,
          'max': 100
        },
        {
          'name': '像素布局',
          'default': 100,
          'value': 'pixelLayout',
          'status': false,
          'max': null
        },
        {
          'name': '栅格布局',
          'default': 12,
          'value': 'columnLayout',
          'status': false,
          'max': 12
        }
      ],
      'CAttribute': {
        'description': '',
        'height': '',
        'vertical': [
          'top',
          'middle',
          'bottom'
        ]
      },
      'CKey': {
        'default': '',
        'type': '',
        'keyMethods': ''
      },
      'CValidate': {
        'status': false,
        'chooseStatus': false,
        'validateModel': ''
      }
    },
    'children': [
      [
        {
          'CNameCN': '选择器',
          'CNameEN': 'select',
          'parent': 'form',
          'type': 'select',
          'component': 'CSelect',
          'config': {
            'ControlID': '9f34a208-3cdd-45e4-a7c5-965fdfada0fe',
            'CBelong': 'form',
            'CTitleCN': '选择器',
            'CTitleEN': 'select Control',
            'CName': 'CSelect',
            'layoutModel': 'flexLayout',
            'currentLayout': null,
            'CLayout': [
              {
                'name': '自适应布局',
                'default': 1,
                'value': 'flexLayout',
                'status': true,
                'max': 10
              },
              {
                'name': '百分比布局',
                'default': 100,
                'value': 'percentLayout',
                'status': false,
                'max': 100
              },
              {
                'name': '像素布局',
                'default': 100,
                'value': 'pixelLayout',
                'status': false,
                'max': null
              },
              {
                'name': '栅格布局',
                'default': 12,
                'value': 'columnLayout',
                'status': false,
                'max': 12
              }
            ],
            'CAttribute': {
              'type': [
                {
                  'value': 'select',
                  'name': '选项不分组'
                },
                {
                  'value': 'selectGroup',
                  'name': '选项分组'
                }
              ],
              'typeModel': 'select',
              'description': '',
              'size': [
                {
                  'value': 'large',
                  'name': '大'
                },
                {
                  'value': 'small',
                  'name': '小'
                },
                {
                  'value': 'mini',
                  'name': 'mini'
                }
              ],
              'sizeModel': 'small',
              'itemAttr': [
                {
                  'label': '0',
                  'showContent': '请选择默认值',
                  'isDisabled': false
                },
                {
                  'label': '1',
                  'showContent': '样例1',
                  'isDisabled': false
                },
                {
                  'label': '2',
                  'showContent': '样例2',
                  'isDisabled': false
                }
              ],
              'itemAttrSelectGroup': [
                {
                  'label': '组名1',
                  'options': [
                    {
                      'label': '1-1',
                      'showContent': '样例1',
                      'isDisabled': false
                    }
                  ]
                },
                {
                  'label': '组名2',
                  'options': [
                    {
                      'label': '2-1',
                      'showContent': '样例2',
                      'isDisabled': false
                    }
                  ]
                }
              ],
              'placeholder': '',
              'isMultiple': false,
              'ableSelectedMax': 0,
              'addStatus': false,
              'currentSelected': 0,
              'currentSelectedGroup': [
                0,
                0
              ],
              'defaultSelected': '',
              'isDisabled': false,
              'isSelectClearable': false,
              'isSelectFilterable': false,
              'isSelectRemote': false,
              'isSelectCreate': false
            },
            'CKey': {
              'default': '请选择值',
              'type': '',
              'keyMethods': ''
            },
            'Status': {
              'status': false,
              'rules': [
                {
                  'value': 'readonly',
                  'name': '只读'
                },
                {
                  'value': '',
                  'name': '隐藏'
                },
                {
                  'value': '',
                  'name': '禁用'
                }
              ],
              'ruleList': []
            },
            'CValidate': {
              'status': false,
              'chooseStatus': false,
              'validateModel': ''
            },
            'methodDB': [
              {
                'name': '提交',
                'methodName': 'save',
                'action': '/form/saveAction'
              }
            ]
          },
          'id': '9f34a208-3cdd-45e4-a7c5-965fdfada0fe'
        },
        {
          'CNameCN': '标签',
          'CNameEN': 'tag',
          'parent': 'form',
          'type': 'tag',
          'component': 'CTag',
          'config': {
            'ControlID': 'e864f2f8-0eea-4199-ab6d-5e383db687f2',
            'CBelong': 'form',
            'CTitleCN': '标签',
            'CTitleEN': 'Tag Control',
            'CName': 'CTag',
            'layoutModel': 'flexLayout',
            'currentLayout': null,
            'CLayout': [
              {
                'name': '自适应布局',
                'default': 1,
                'value': 'flexLayout',
                'status': true,
                'max': 10
              },
              {
                'name': '百分比布局',
                'default': 100,
                'value': 'percentLayout',
                'status': false,
                'max': 100
              },
              {
                'name': '像素布局',
                'default': 100,
                'value': 'pixelLayout',
                'status': false,
                'max': null
              },
              {
                'name': '栅格布局',
                'default': 12,
                'value': 'columnLayout',
                'status': false,
                'max': 12
              }
            ],
            'CAttribute': {
              'defaultTagName': '标签一',
              'type': [
                {
                  'value': '',
                  'name': '默认标签'
                },
                {
                  'value': 'primary',
                  'name': '原始标签'
                },
                {
                  'value': 'gray',
                  'name': '灰色标签'
                },
                {
                  'value': 'warning',
                  'name': '警告标签'
                },
                {
                  'value': 'danger',
                  'name': '危险标签'
                },
                {
                  'value': 'success',
                  'name': '成功标签'
                }
              ],
              'typeModel': 'tag',
              'typeDefaultSelect': '',
              'description': '',
              'closable': {
                'closableStatus': false,
                'transitionModel': false,
                'closeTransition': [
                  {
                    'value': true,
                    'name': '禁用渐变动画'
                  },
                  {
                    'value': false,
                    'name': '使用渐变动画'
                  }
                ]
              },
              'hit': {
                'hitStatus': true,
                'hitable': [
                  {
                    'value': true,
                    'name': '是'
                  },
                  {
                    'value': false,
                    'name': '否'
                  }
                ]
              }
            },
            'position': [
              {
                'name': '左侧',
                'value': 'left'
              },
              {
                'name': '右侧',
                'value': 'right'
              }
            ],
            'positionModel': '',
            'methodDB': [
              {
                'name': '提交',
                'methodName': 'save',
                'action': '/form/saveAction'
              }
            ]
          },
          'id': 'e864f2f8-0eea-4199-ab6d-5e383db687f2'
        },
        {
          'CNameCN': '折叠面板',
          'CNameEN': 'collapse',
          'parent': 'form',
          'type': 'collapse',
          'component': 'CCollapse',
          'config': {
            'ControlID': '99fd16b2-9356-47ae-90ad-19a2a9fb65b6',
            'CBelong': 'others',
            'CTitleCN': '折叠面板',
            'CTitleEN': 'collapse Control',
            'CName': 'CCollapse',
            'layoutModel': 'flexLayout',
            'currentLayout': null,
            'CLayout': [
              {
                'name': '自适应布局',
                'default': 1,
                'value': 'flexLayout',
                'status': true,
                'max': 10
              },
              {
                'name': '百分比布局',
                'default': 100,
                'value': 'percentLayout',
                'status': false,
                'max': 100
              },
              {
                'name': '像素布局',
                'default': 100,
                'value': 'pixelLayout',
                'status': false,
                'max': null
              },
              {
                'name': '栅格布局',
                'default': 12,
                'value': 'columnLayout',
                'status': false,
                'max': 12
              }
            ],
            'CAttribute': {
              'collapseItem': [
                {
                  'name': '0',
                  'title': '面板标题',
                  'content': '面板内容'
                }
              ],
              'addCollapseStatus': false,
              'currentValue': 0,
              'description': '',
              'height': '',
              'vertical': [
                'top',
                'middle',
                'bottom'
              ]
            },
            'CKey': {
              'default': '',
              'type': '',
              'keyMethods': ''
            },
            'Status': {
              'status': false,
              'rules': [
                {
                  'value': 'readonly',
                  'name': '只读'
                },
                {
                  'value': '',
                  'name': '隐藏'
                }
              ],
              'ruleList': []
            },
            'Icon': {
              'status': false,
              'chooseStatus': false,
              'position': [
                {
                  'name': '左侧',
                  'value': 'left'
                },
                {
                  'name': '右侧',
                  'value': 'right'
                }
              ],
              'positionModel': '',
              'className': '',
              'content': '',
              'title': '',
              'library': ''
            },
            'CValidate': {
              'status': false,
              'chooseStatus': false,
              'validateModel': ''
            },
            'methodDB': [
              {
                'name': '提交',
                'methodName': 'save',
                'action': '/form/saveAction'
              }
            ]
          },
          'id': '99fd16b2-9356-47ae-90ad-19a2a9fb65b6'
        }
      ]
    ],
    'childrenDefault': [
      []
    ],
    'id': '0dce236f-5d26-4940-af55-3a9536c9b66c'
  }
]

export default jsonList
