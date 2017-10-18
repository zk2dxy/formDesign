# Attribute 属性

> 控件属性集合

## 单属性及值

> ControlID     控件ID
> CTitleCN      标题
> CTitleEN      英文标题
> CName         控件名称
> layoutModel   布局绑定值
> currentLayout 当前布局值


``` bash

  # `prepend`
  > input 前置头部
  > 类型 string

  # `append`
  > input 后置尾部

  # `type`
  > 控件类型
  > example: { value: 'input', name: '文本框'}

  # `typeModel`
  > 控件类型绑定值
  > 类型 string

  # `description`
  > 控件描述
  > 类型 string

  # `placeholder`
  > 控件提示值 (input/textarea等可输入控件类型值)
  > 类型 string

  # `width`
  > 控件宽度
  > 类型 number

  # `height`
  > 控件高度
  > 类型 number

  # `vertical`
  > 控件与其他 inline-block 控件的对齐方式
  > 类型 string
  > 可选值 ['top', 'middle', 'bottom']

  # `size`
  > 控件尺寸
  > {value: 'large', name: '大'}

  # `sizeModel`
  > 尺寸绑定值
  > 类型 string

  # CCheckbox

    >> `itemAttr`
      >> { label: '1', showContent: '样例1', isDisabled: false // 是否禁用该选项 }

    >> `indeterminateCheckbox`
      >> checkbox 全选样式
      >> 类型 boolean

    >> `checkAllCheckbox`
      >> 默认全选选中
      >> 类型 boolean

    >> `showAllCheckbox`
      >> 是否显示全选选项
      >> 类型 boolean

    >> `currentSelected`
      >> 选中项的索引(index)
      >> 类型 number

    >> `defaultCheckboxSelected`
      >> 默认选中项
      >> 类型 string

    >> `textColor`
      >> 按钮激活时的文本颜色
      >> 类型 string(#FFFFFF)

    >> `fillColor`
      >> 按钮激活时的填充色和边框色（默认继承主题样式：设置default）
      >> 类型 string(#FFFFFF)

    >> `ableSelectedMin`
      >> 可被勾选的 checkbox 的最小数量
      >> 类型 number(#FFFFFF)

    >> `ableSelectedMax`
      >> 可被勾选的 checkbox 的最大数量
      >> 类型 number(#FFFFFF)

  # `addCollapseStatus`
  > 是否可增加折叠面板按钮入口
    >> `currentValue`
      >> 点击各面板选项的当前值
    >>

  # `addStatus`
    > 增加Checkbox/radio/select选项状态
    > 类型 boolean

  # `isDisabled`
    > 是否禁用选项 -> radio

  # CSelect

    >> `itemAttr`
      >> {label: '0', showContent: '请选择默认值', isDisabled: false // 是否禁用该选项 }

    >> `itemAttrSelectGroup`
      >> { label: '组名1',options: [{label: '1-1', showContent: '样例1', isDisabled: false}]}

    >> `isMultiple`
      >> 是否多选

    >> `ableSelectedMax`
      >> 多选时最多可选项目，默认为0，不限制

    >> `currentSelected`
      >> 选中项的索引(index)
      >> 类型 number

    >> `currentSelectedGroup`
      >> [0, 0]

    >> `defaultSelected`
      >> 默认选中项

    >> `isSelectClearable`
      >> 单选时是否显示清除选项

    >> `isSelectFilterable`
      >> 是否可搜索

    >> `isSelectRemote`
      >> 是否可远程搜索

    >> `isSelectCreate`
      >> 是否可创建

```
