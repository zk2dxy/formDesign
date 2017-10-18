# Attribute 属性

> 控件属性集合

## 单属性及值

``` bash

  `prepend`
  > input 前置头部
  > 类型 string

  `append`
  > input 后置尾部

  `type`
  > 控件类型
  > example: { value: 'input', name: '文本框'}

  `typeModel`
  > 控件类型绑定值
  > 类型 string

  `description`
  > 控件描述
  > 类型 string

  `placeholder`
  > 控件提示值 (input/textarea等可输入控件类型值)
  > 类型 string

  `width`
  > 控件宽度
  > 类型 number

  `height`
  > 控件高度
  > 类型 number

  `vertical`
  > 控件与其他 inline-block 控件的对齐方式
  > 类型 string
  > 可选值 ['top', 'middle', 'bottom']

  `size`
  > 控件尺寸
  > {value: 'large', name: '大'}

  `sizeModel`
  > 尺寸绑定值
  > 类型 string

  `itemAttr`
  > checkbox 选项子选项
  > { label: '1', showContent: '样例1', isDisabled: false // 是否禁用该选项 }
    >> `indeterminateCheckbox`
      >> checkbox 全选样式
    >> `checkAllCheckbox`
      >> 默认全选选中
    >> `showAllCheckbox`
      >> 是否显示全选选项
    >> addStatus
      >> 增加Checkbox选项状态
    >> `currentSelected`
      >> 选中项的索引(index)
    >> `defaultCheckboxSelected`
      >> 默认选中项
    >> `textColor`
      >> 按钮激活时的文本颜色
    >> `fillColor`
      >> 按钮激活时的填充色和边框色（默认继承主题样式：设置default）
    >> `ableSelectedMin`
      >> 可被勾选的 checkbox 的最小数量
    >> `ableSelectedMax`
      >> 可被勾选的 checkbox 的最大数量


```
