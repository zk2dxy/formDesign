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
    name: '不能输入特殊字符(下划线除外)',
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
    name: '电话号码',
    property: 'telephone',
    reg: '/\\d{3}-\\d{8}|\\d{4}-\\d{7}/'
  },
  {
    status: false,
    name: '邮箱地址',
    property: 'email',
    reg: '/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/'
  },
  {
    status: false,
    name: '网址',
    property: 'url',
    reg: '/^(\\w+:\\/\\/)?\\w+(\\.\\w+)+.*$/'
  },
  {
    status: false,
    name: '身份证号',
    property: 'identification',
    reg: '/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/'
  },
  {
    status: false,
    name: '日期格式',
    property: 'date',
    reg: '/(^\\d{4}(\\-|\\.)\\d{1,2}(\\-|\\.)\\d{1,2})/'
  },
  {
    status: false,
    name: '浮点数',
    property: 'float',
    reg: '/(^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$)|(^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$ )/'
  },
  {
    status: false,
    name: '正数,负数和小数',
    property: '+-123.123',
    reg: '/^(\\-|\\+)?\\d+(\\.\\d+)?$/'
  },
  {
    status: false,
    name: 'IP地址',
    property: 'IP',
    reg: '/((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/'
  },
  {
    status: false,
    name: '钱',
    property: 'money',
    reg: '/^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$/'
  },
  {
    status: false,
    name: '只允许输入中文',
    property: 'chinese',
    reg: '/^[\u4e00-\u9fa5]*$/'
  },
  {
    status: false,
    name: '图片格式',
    property: 'image',
    reg: '/[\\w\\W](\\.gif|\\.jpeg|\\.png|\\.jpg|\\.bmp)/i'
  },
  {
    status: false,
    name: '视频格式',
    property: 'video',
    reg: '/[\\w\\W](\\.mp4|\\.rmvb|\\.flv|\\.mpeg|\\.avi)/i'
  },
  {
    status: false,
    name: '只允许输入中文,英文,数字',
    property: '中文s1',
    reg: '/^[\\u4E00-\\u9FA5A-Za-z0-9]+$/'
  },
  {
    status: false,
    name: '只允许输入大写字母',
    property: 'ABC',
    reg: '/^[A-Z]+$/'
  },
  {
    status: false,
    name: '只允许输入小写字母',
    property: 'abc',
    reg: '/^[a-z]+$/'
  },
  {
    status: false,
    name: '数字和英文字母',
    property: '123abc',
    reg: '/^[A-Za-z0-9]+$/'
  },
  {
    status: false,
    name: '数字,英文字母和下划线',
    property: '123abc_',
    reg: '/^\\w+$/'
  },
  {
    status: false,
    name: '首字母大写',
    property: 'Aabc',
    reg: '/^[A-Z]+\\S[a-zA-Z]*/'
  }
]

export default validateRules
