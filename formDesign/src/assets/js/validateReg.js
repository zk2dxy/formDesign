const validateRules = [
  {
    status: false,
    name: '不能为空',
    property: '*',
    reg: '/[\\w\\W]+/'
  },
  {
    status: false,
    name: '6到16位任意字符',
    property: '*6-16',
    reg: '/^[\\w\\W]{6,16}$/'
  },
  {
    status: false,
    name: '请填写数字',
    property: 'n',
    reg: '/^\\d+$/'
  },
  {
    status: false,
    name: '6到16位数字',
    property: 'n6-16',
    reg: '/^\\d{6,16}$/'
  },
  {
    status: false,
    name: '不能输入特殊字符',
    property: 's',
    reg: '/^[\u4E00-\u9FA5\uf900-\ufa2d\\w\\.\\s]+$/'
  },
  {
    status: false,
    name: '6到18位字符',
    property: 's6-18',
    reg: '/^[\u4E00-\u9FA5\uf900-\ufa2d\\w\\.\\s]{6,18}$/'
  },
  {
    status: false,
    name: '邮政编码',
    property: 'area',
    reg: '/^[0-9]{6}$/'
  },
  {
    status: false,
    name: '手机号码',
    property: 'mobile',
    reg: '/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/'
  },
  {
    status: false,
    name: '邮箱地址',
    property: '',
    reg: '/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/'
  },
  {
    status: false,
    name: '网址',
    property: 'url',
    reg: '/^(\\w+:\\/\\/)?\\w+(\\.\\w+)+.*$/'
  }
]

export default validateRules
