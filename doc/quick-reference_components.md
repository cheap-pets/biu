# MUSSEL 4 - 组件

该文档为组件开发快速参考，请结合示例代码进行使用



## 1 - 布局



### MuHBox

水平方向的 Flex 布局容器

> [!NOTE]
>
> 建议直接使用 <div class="mu-h-box" />。
>
> 详情参看 box.md 与 flex-layout.md 中的属性配置说明。



### MuVBox

垂直方向的 Flex 布局容器

> [!NOTE]
>
> 建议直接使用 <div class="mu-v-box" />。
>
> 详情参看 box.md 与 flex-layout.md 中的属性配置说明。




### MuGridBox

网格布局容器

> [!NOTE]
>
> 建议直接使用 <div class="mu-grid-box" />。
> 
> 详情参看 box.md 与 grid-layout.md 中的属性配置说明。




### MuGridCell

网格布局单元格容器

> [!NOTE]
>
> 建议直接使用 <div class="mu-grid-cell" />。
>
> 详情参看 box.md 与 grid-layout.md 中的属性配置说明。



### MuFlexSplitter

Flex 布局子元素分隔条，可拖拽调整元素尺寸。

| 属性名称           | 类型    | 说明                                                     |
| ------------------ | ------- | -------------------------------------------------------- |
| appearance         | String  | 外观选项：normal - 默认；slim - 细线条；concealed - 隐蔽 |
| collapse-button    | Boolean | 是否显示收拢按钮，默认 false                             |
| collapse-threshold | Number  | 收拢尺寸阈值， px 单位，默认 200                         |
| resizable          | String  | 当为 "false" 时，不可拖拽调整尺寸                        |

> [!NOTE]
>
> 仅能用于 Flex 容器中，包括但不限于 MuHBox 和 MuVBox。



### MuScrollBox

带非原生渲染滚动条的容器

示例：

```vue
<template>
  <mu-scroll-box />
	<div v-mu-scrollbar style="overflow: auto" />
  <div v-mu-scrollbar="false" style="overflow: auto" />
</template>
```

> [!NOTE]
>
> 由 overflow (-x / -y) 样式控制滚动条的显示，使用组件时默认自带 overflow: auto 样式。
>
> 亦可使用 v-mu-scrollbar 指令为容器元素增加同款滚动条，指令绑定参数为 false 时将不渲染滚动条。



### MuTabs

多页签容器

| 属性名称      | 类型   | 说明                                        |
| ------------- | ------ | ------------------------------------------- |
| active-tab    | String | 双向绑定属性，用于指定活动标签页的名称      |
| tab-style     | String | button、small-button、simple                |
| tab-buttons   | Array  | 页签按钮，默认按内部 tab-panel 组件自动生成 |
| tab-position  | String | top、bottom、left、right                    |
| tab-bar-attrs | Object | 绑定到内置 MuTabBar 的各种属性              |



| 插槽名称        | 说明                 |
| --------------- | -------------------- |
| tab-bar-prepend | 页签按钮栏的前置内容 |
| tab-bar-append  | 页签按钮栏的后置内容 |



### MuTabBar

独立使用的页签栏

| 属性名称   | 类型   | 说明                                   |
| ---------- | ------ | -------------------------------------- |
| active-tab | String | 双向绑定属性，用于指定活动标签页的名称 |
| tab-style     | String | button、small-button、simple                |
| tab-buttons   | Array  | 页签按钮 |
| tab-position  | String | top、bottom、left、right                    |



| 插槽名称        | 说明                 |
| --------------- | -------------------- |
| prepend | 前置内容 |
| append  | 后置内容 |



### MuTabPanel

单个页签内容容器，必须放置于 MuTabs 中

| 属性名称  | 类型    | 说明                                             |
| --------- | ------- | ------------------------------------------------ |
| name      | String  | 页签名称，在 Tabs 内唯一，用于标识当前选中标签页 |
| icon      | String  | 对应页签栏按钮的图标                             |
| caption   | String  | 对应页签栏按钮的标题                             |
| title     | String  | 对应页签栏按钮的 tooltip 标题                    |
| disabled  | Boolean | 对应页签的禁用状态                               |
| tab-order | Number  | 手动指定的页签顺序，默认值为 0                   |



### MuToolbar

工具栏，具有特殊样式的 MuBar



## 2 - 图标、图形、徽章



### MuIcon

图标，支持 svg 和 icon-font class。



图标建议在使用前进行集中注册，这样便于管理应用中所用到的图标。

注册代码示例：

``` javascript
import { install as installMussel, installIcons } from 'mussel'

import MySvgIcon from 'path/name/icon.svg'

const myApp = createApp()

// 在安装 mussel 时注册
installMussel(myApp, {
  icons: {
    icon1: MySvgIcon, // svg data
    icon2: 'icon icon-bolt' // icon-font class
  }
})

// 或在其他时候注册
installIcons({
  icon1: MySvgIcon, // svg data
  icon2: 'icon icon-bolt' // icon-font class
})
```



| 属性名称 | 类型   | 说明                                                  |
| -------- | ------ | ----------------------------------------------------- |
| icon     | String | 已注册的 icon 名称，或者以 "." 开头的 icon-font class |
| tag      | String | 渲染的图标 dom 的 tagName，默认是 span                |



### MuSvgStripe

一个 svg 画的装饰条纹，例如可用于作为拖拽条装饰



### MuBadge

徽章，可用作标签或角标显示

```vue
<template>
	<mu-badge primary|accent|success|warning|danger>{{ caption }}</mu-badge>
</template>
```



## 3 - 按钮、按钮组



### MuButton

各种形态的按钮

| 属性名称     | 类型    | 说明                                              |
| ------------ | ------- | ------------------------------------------------- |
| type         | String  | HTML INPUT 元素 type 属性，默认为 "button"        |
| caption      | String  | 按钮标题                                          |
| icon         | String  | 按钮图标                                          |
| size         | String  | 按钮尺寸：small \| normal \| large                |
| button-style | String  | 按钮风格：normal \| outline \| text \| link       |
| round        | Boolean | 左右圆弧形态                                      |
| active       | Boolean | 选中状态                                          |
| disabled     | Boolean | 禁用状态                                          |
| primary      | Boolean | 主色按钮                                          |
| danger       | Boolean | 危险色按钮                                        |
| accent       | Boolean | 强调色按钮                                        |
| xColor       | String  | 指定特殊的按钮颜色，值可为标准颜色值或 CSS 变量值 |



### MuButtonGroup

按钮组。按钮组的某些外观设置将覆盖其中按钮的设置。

| 属性名称    | 类型    | 说明                                         |
| ----------- | ------- | -------------------------------------------- |
| round       | Boolean | 左右圆弧形态                                 |
| disabled    | Boolean | 禁用状态，若为 true， 其内部 Button 全部禁用 |
| size        | String  | 同 MuButton，将覆盖内部 Button 属性          |
| buttonStyle |         | 按钮风格：normal \| outline                  |
| primary      | Boolean | 默认按钮颜色为主色                                 |
| danger       | Boolean | 默认按钮颜色为危险色                               |
| accent       | Boolean | 默认按钮颜色为强调色                                 |
| xColor       | String  | 指定特殊的默认按钮颜色 |



### MuToolButton

用在快速工具栏或列表项中的快捷按钮，仅支持图标，不包含文字标题。

| 属性名称 | 类型    | 说明                                                    |
| -------- | ------- | ------------------------------------------------------- |
| icon     | String  | 按钮图标                                                |
| toggle   | Boolean | 是否开关按钮，若为 true，按下后将会选中或取消选中该按钮 |
| active   | Boolean | 双向绑定属性，表示选中状态                              |
| danger   | Boolean | 危险色按钮                                              |
| disabled | Boolean | 禁用状态                                                |



## 4 - 模态窗口、抽屉



### MuDialog

模态对话框

| 属性名称             | 类型              | 说明                                        |
| -------------------- | ----------------- | ------------------------------------------- |
| visible              | Boolean           | 可见状态                                    |
| width                | String \| Number  | 窗口宽度                                    |
| height               | String  \| Number | 窗口高度                                    |
| title                | String            | 对话框标题                                  |
| close-button         | Boolean           | 是否显示右上角关闭按钮，默认为 true         |
| z-index              | String            | 窗口元素的垂直堆叠顺序                      |
| mask-class           |                   | 遮罩元素 class                              |
| mask-attrs           | Object            | 遮罩元素绑定属性                            |
| easy-hide            | Boolean           | 是否允许快速关闭（点击遮罩、按下 ESC 等）   |
| lazy                 | Boolean           | 为 true 时，仅当第一次打开时渲染对话框内容  |
| keep-position        | Boolean           | 窗口再次打开时，是否使用上次关闭时的位置    |
| ignore-button-action | Boolean           | 是否忽略按钮的默认 Action（目前仅支持关闭） |
| buttons              | Array             | 对话框底部的操作按钮                        |



| 事件           | 参数                                                         | 说明                                   |
| -------------- | ------------------------------------------------------------ | -------------------------------------- |
| update:visible | value - 变更值, <br />action - 触发事件, <br />trigger - 触发元素 | 可在事件中判断触发原因，进行表单检查等 |
| show           |                                                              |                                        |
| hide           |                                                              |                                        |



### MuDrawer

可从四周浮出的抽屉面板

| 属性名称      | 类型             | 说明                                           |
| ------------- | ---------------- | ---------------------------------------------- |
| visible       | Boolean          | 可见状态                                       |
| width         | String \| Number | 窗口宽度                                       |
| height        | String \| Number | 窗口高度                                       |
| teleport      | Boolean          | 默认 true，是否渲染到指定的页面根容器 DOM 中。 |
| easy-hide     | Boolean          | 是否允许快速关闭（点击遮罩、按下 ESC 等）      |
| mask          | Boolean          | 是否显示遮罩，默认 true                        |
| mask-class    |                  | 遮罩元素 class                                 |
| mask-attrs    | Object           | 遮罩元素绑定属性                               |
| position      | String           | 浮出位置。top \| right \| bottom \| left       |
| border-radius | Boolean          | 是否为圆角                                     |
| lazy          | Boolean          | 为 true 时，仅当第一次打开时渲染抽屉内容       |




| 事件           | 参数                                                         | 说明                                   |
| -------------- | ------------------------------------------------------------ | -------------------------------------- |
| update:visible | value - 变更值, <br />action - 触发事件, <br />trigger - 触发元素 | 可在事件中判断触发原因，进行表单检查等 |
| show           |                                                              |                                        |
| hide           |                                                              |                                        |



## 5 - 表单和输入组件



### MuForm

表单容器

目前仅为布局用途，后续会支持表单项快速定义

| 属性名称    | 类型             | 说明                                      |
| ----------- | ---------------- | ----------------------------------------- |
| width       | String \| Number | 表单宽度                                  |
| height      | String \| Number | 表单高度                                  |
| label-width | String           | 默认标签宽度                              |
| label-align | String           | 默认标签对齐方式，left \| center \| right |



### MuFormRow

表单行容器



### MuFormField

表单字段

| 属性名称    | 类型             | 说明                                  |
| ----------- | ---------------- | ------------------------------------- |
| width       | String \| Number | 表单宽度                              |
| height      | String \| Number | 表单高度                              |
| label-width | String           | 标签宽度                              |
| label-align | String           | 标签对齐方式，left \| center \| right |
| label       | String           | 标签                                  |



### MuInput

基本输入框

| 属性名称    | 类型             | 说明                                |
| ----------- | ---------------- | ----------------------------------- |
| modelValue  |                  | 输入的值双向绑定属性                |
| type        | String           | 原生 Input 元素的 type，默认为 text |
| placeholder | String           | 占位文本                            |
| clearable   | Boolean          | 是否显示清除按钮                    |
| readonly    | Boolean          | 是否只读                            |
| disabled    | Boolean          | 是否禁用                            |
| prefix      | String \| Object | 前置文本或按钮                      |
| Suffix      | String \| Object | 后置文本或按钮                      |
| tabindex    | String           | 元素 tab 聚焦顺序，默认为 -1        |
| small       |                  | 小尺寸输入框                        |
| round       |                  | 左右是圆边的输入框                  |
| invalid     |                  | 表示无效状态的样式                  |
| input-style | String           | default \| solid \| underline       |



| 事件              | 参数  | 说明                   |
| ----------------- | ----- | ---------------------- |
| update:modelValue | value | 输入值变更事件         |
| prefix-click      |       | 当前置按钮被点击时触发 |
| suffix-click      |       | 当后置按钮被点击时触发 |



### MuInputGroup

输入框组



### MuSelect

下拉单选框

| 属性名称   | 类型   | 说明                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| options    | Array  | 下拉选项列表                                                 |
| option-key | String | 下拉选项的 key 属性，默认为 'value'                          |
| value-mode | String | normal - 默认；composite - modelValue 结构为 { label, value } |
| (其他)     |        | 包含全部 MuInput 属性、MuDropdown 中 "dropdown-" 为前缀的属性 |



### MuComboBox

组合输入框，可支持输入与单选。

| 属性名称 | 类型    | 说明                           |
| -------- | ------- | ------------------------------ |
| editable | Boolean | 是否可由用户输入，默认为 false |
| (其他)   |         | 包含全部 MuSelect 属性         |

> [!NOTE]
>
> 若无需用户输入，建议使用 MuSelect。
>
> 若设置为可编辑，则不支持选项中的 label 属性，直接使用 value 属性进行显示。



### MuMultiSelect

下拉多选框

| 属性名称    | 类型        | 说明                                                         |
| ----------- | ----------- | ------------------------------------------------------------ |
| max-tags    | Number      | 最大显示已选项标签数量，默认为 2，超出部分将合并省略显示     |
| tag-shrink  | Boolean     | 已选标签是否可缩小，默认为 true                              |
| tag-tooltip | Boolean     | 已选标签是否显示标题文字 tooltip，默认为 true                |
| nowrap      | (attribute) | 已选结果不自动进行换行显示。默认多选项若超出选择框宽度将自动换行 |
| (其他)      |             | 包含全部 MuSelect 属性                                       |



### MuDateInput

日期选择框，目前支持选择到日或月

| 属性名称  | 类型   | 说明                                                   |
| --------- | ------ | ------------------------------------------------------ |
| type      | String | date - 选择日期; month - 选择月份                      |
| format    | String | 日期格式，默认为 yyyy-MM-dd                            |
| valueType | String | 返回日期值的类型，可选 date (默认) \| string \| object |
| (其他)    |        | 包含其他 MuSelect 属性，options 相关属性除外           |



### MuCheck

复选按钮  -

| 属性名称   | 类型             | 说明                                               |
| ---------- | ---------------- | -------------------------------------------------- |
| modelValue | Boolean \| Array | 双向绑定的输入值                                   |
| value      |                  | 选项值（当输入值是数组时，该选项在数组中的对应值） |
| label      | String           | 标签文字                                           |
| disabled   | Boolean          | 禁用状态                                           |



### MuRadio

单选按钮

| 属性名称   | 类型    | 说明             |
| ---------- | ------- | ---------------- |
| modelValue |         | 双向绑定的输入值 |
| value      |         | 选项值，必填     |
| label      | String  | 标签文字         |
| disabled   | Boolean | 禁用状态         |




### MuSwitch

开关

| 属性名称       | 类型   | 说明                     |
| -------------- | ------ | ------------------------ |
| modelValue     |        | 双向绑定的输入值         |
| label          | String | 标签文字                 |
| active-label   | String | 打开状态的标签文字       |
| Inactive-label | String | 关闭状态的标签文字       |
| active-value   |        | 打开状态值，默认为 true  |
| Inactive-value |        | 关闭状态值，默认为 false |



## 6 - 导航



### MuDropdownPanel

下拉面板

| 属性名称       | 类型    | 说明                                     |
| -------------- | ------- | ---------------------------------------- |
| width          | String  | 面板宽度                                 |
| height         | String  | 面板高度                                 |
| scrollbar      | Boolean | 是否渲染 mussel 滚动条                   |
| trigger        | String  | 显示触发方式：hover \| click             |
| position       | String  | 弹出位置：auto \| fixed \| top \| bottom |
| dropdown-items | Array   | 列表项                                   |



| 事件      | 参数                         | 说明                         |
| --------- | ---------------------------- | ---------------------------- |
| show      |                              | 面板弹出时触发               |
| hide      |                              | 面板关闭时触发               |
| action    | action - 下拉项定义的 action | 包含 action 的下拉项点击触发 |
| itemclick | item - 下拉项属性            | 下拉项点击触发               |



| 方法 | 参数 | 说明     |
| ---- | ---- | -------- |
| show |      | 弹出面板 |
| hide |      | 关闭面板 |



### MuDropdown

下拉菜单

| 属性名称           | 类型    | 说明                                             |
| ------------------ | ------- | ------------------------------------------------ |
| dropdown-class     |         | 下拉面板 class                                   |
| dropdown-style     |         | 下拉面板样式                                     |
| dropdown-snap-to   |         | 下拉面板吸附目标，默认为组件根元素               |
| dropdown-panel     | Object  | 指定外部下拉面板，用于重复使用                   |
| dropdown-attrs     | Object  | 下拉面板绑定属性                                 |
| dropdown-width     | String  | 下拉面板宽度                                     |
| dropdown-height    | String  | 下拉面板宽度                                     |
| dropdown-icon      | String  | 下拉按钮图标，默认为下箭头                       |
| dropdown-disabled  | Boolean | 下拉面板禁用状态                                 |
| dropdown-scrollbar | Boolean | 下拉面板是否渲染 Mussel 滚动条                   |
| dropdown-items     | Array   | 下拉项列表                                       |
| dropdown-trigger   | String  | 下拉面板弹出触发方式：click \| hover (默认)      |
| dropdown-position  | String  | 下拉面板弹出位置：auto \| fixed \| top \| bottom |



| 事件               | 参数                         | 说明                         |
| ------------------ | ---------------------------- | ---------------------------- |
| action             | action - 下拉项定义的 action | 包含 action 的下拉项点击触发 |
| dropdown:itemclick | Item - 下拉项属性            | 下拉项点击触发               |
| dropdown:show      |                              | 下拉面板弹出时触发           |
| dropdown:hide      |                              | 下拉面板关闭时触发           |



### MuDropdownButton

带下拉菜单的按钮，支持分割按钮形式

| 属性名称               | 类型    | 说明               |
| ---------------------- | ------- | ------------------ |
| split-button           | Boolean | 是否显示为分割按钮 |
| (其他 MuButton 属性)   |         |                    |
| (其他 MuDropdown 属性) |         |                    |



### MuContextMenu

上下文菜单，在需要的地方弹出。

示例：

```vue
<template>
	<mu-context-menu ref="contextMenu" :menus="menuItems" @action="onMenuAction"/>
  <div @contextmenu="contextMenu.show" />
</template>
<script setup>
  const contextMenu = shallowRef()
  
  function onMenuAction (action) {
    // do something
  }
</script>
```



| 属性名称 | 类型  | 说明         |
| -------- | ----- | ------------ |
| menus    | Array | 菜单项列表项 |

事件与方法同 MuDropdownPanel



## 7 - 数据



### MuList

列表



### MuListItem

列表项，用于数据显示或导航，默认外观包含一个图标加标题

| 属性名称 | 类型   | 说明                                  |
| -------- | ------ | ------------------------------------- |
| icon     | String | 注册的图标名称或者 icon-font class    |
| label    | String | 标题                                  |
| tag      | String | 渲染的图标 dom 的 tagName，默认是 div |



### MuListDivider

列表分隔项



### MuTree

树

| 属性说明           | 类型                       | 说明                                      |
| ------------------ | -------------------------- | ----------------------------------------- |
| data               | Array                      | 树节点数据                                |
| props              | Object                     | 树节点数据属性定义                        |
| buttons            | Array                      | 树节点工具按钮                            |
| checkbox           | Boolean                    | 是否显示节点勾选框                        |
| cascaded-check     | Boolean                    | 是否级联勾选                              |
| checked-nodes-keys | Set                        | 已选节点（多）唯一标识                    |
| auto-expand-level  | Number                     | 自动展开层级数                            |
| active-node        | Object \| Number \| String | 当前选中节点                              |
| node-icons         | Boolean \| Object          | 是否显示节点图标 & 自定义图标             |
| expand-icons       | Boolean \| Object          | 是否显示节点展开状态图标 & 自定义展开图标 |



| 事件              | 参数          | 说明                                           |
| ----------------- | ------------- | ---------------------------------------------- |
| node-click        | node          | 节点点击时触发，不含展开按钮和节点工具按钮点击 |
| node-expand       | node          | 节点展开时触发，可用于子节点懒加载             |
| node-collapse     | node          | 节点收拢时触发                                 |
| node-button-click | node, button  | 节点工具按钮点击时触发                         |
| node-check-change | node, checked | 节点勾选状态改变时触发                         |



| 插槽名称 | 说明                              |
| -------- | --------------------------------- |
| default  | 树节点模板，作用域参数为 node     |
| buttons  | 树节点工具模板，作用域参数为 node |



### MuTags

标签组

| 属性名称         | 类型    | 说明                                         |
| ---------------- | ------- | -------------------------------------------- |
| tags             | String  | 标签数据                                     |
| max              | Number  | 最大显示标签个数                             |
| removable        | Boolean | 是否可删除                                   |
| expandable       | Boolean | 是否可下拉展开显示所有标签项                 |
| tooltip          | Boolean | 是否显示标签标题 tooltip，默认 true          |
| dropdown-snap-to |         | 下拉面板吸附目标，默认为当前组件根元素父节点 |



| 事件       | 参数 | 说明                   |
| ---------- | ---- | ---------------------- |
| tag-remove | tag  | 点击标签删除按钮时触发 |



### MuCalendar

月历

| 属性名称   | 类型                              | 说明                                                 |
| ---------- | --------------------------------- | ---------------------------------------------------- |
| modeValue  | Date \| String \| Object \| Array | 双向绑定的日期值                                     |
| format     | String                            | String 类型下的日期格式，默认为 yyyy-MM-dd           |
| value-type | String                            | 返回日期值的类型，可选 date (默认) \|string \|object |





## 8 - 反馈



### MessageBox

消息提示对话框

示例：

```vue
<script setup>
	import { inject } from 'vue'
  
  const { messageBox } = inject('$mussel')
  
  messageBox.alert('Hello World').then(btn => console.log(btn))
  messageBox.confirm('Hello World').then(btn => console.log(btn))
  messageBox.error('Hello World').then(btn => console.log(btn))
  messageBox.warn('Hello World').then(btn => console.log(btn))
</script>
```



### Notifier

浮动消息提示

```vue
<script setup>
	import { inject } from 'vue'
  
  const { messageBox } = inject('$mussel')
  
  messageBox.notify({
    title: '提示标题',
    message: '提示消息内容',
    type: 'success' // alert | success | warn | error
  })
</script>
```





### MuStatusBox

状态显示面板

| 属性名称 | 类型   | 说明     |
| -------- | ------ | -------- |
| icon     | String | 状态图标 |
| title    | String | 状态标题 |
| message  | String | 消息内容 |



| 插槽名称 | 说明                   |
| -------- | ---------------------- |
| default  | 自定义内容             |
| icon     | 自定义图标（图片）内容 |

