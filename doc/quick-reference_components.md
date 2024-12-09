# MUSSEL 4 - 组件



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

> [!NOTE]
>
> 由 overflow (-x / -y) 样式控制滚动条的显示。
>
> 亦可使用 v-mu-scrollbar 指令为容器元素增加同款滚动条。



### MuTabs

多页签容器

| 属性名称      | 类型   | 说明                                        |
| ------------- | ------ | ------------------------------------------- |
| active-tab    | String | 双向绑定属性，用于指定活动标签页的名称      |
| tab-style     | String | button、small-button、simple                |
| tab-position  | String | top、bottom、left、right                    |
| tab-bar-attrs | Object | 绑定到内置 MuTabBar 的各种属性              |
| tab-buttons   | Array  | 页签按钮，默认按内部 tab-panel 组件自动生成 |



### MuTabBar

多页签容器的页签栏，必须放置于 MuTabs 中





### MuTabPanel

单个页签内容容器，必须放置于 MuTabs 中





### MuToolbar

工具栏



## 2 - 图标、图形、徽章



### MuIcon

图标，支持 svg 和 icon-font class，需先注册



### MuSvgStripe

一个 svg 画的装饰条纹，通常用于作为拖拽条装饰



### MuBadge

徽章，可用作标签显示



## 3 - 按钮、按钮组



### MuButton

各种形态的按钮



### MuButtonGroup

按钮组。按钮组的某些外观设置将覆盖其中按钮的设置。



### MuToolButton

工具栏中的快捷按钮，仅支持图标，不包含文字标题。



## 4 - 模态窗口、抽屉



### MuDialog

模态对话框



### MuDrawer

可从四周浮出的抽屉面板



## 5 - 表单和输入组件



### MuForm

表单容器



### MuFormRow

表单行容器



### MuFormField

表单字段容器



### MuInput

基本输入框



### MuComboBox

组合输入框，可支持输入与选择



### MuSelect

下拉选择框，仅单选



### MuMultiSelect

下拉多选框



### MuDateInput

日期选择框，目前支持选择到日或月



### MuCheck

复选按钮



### MuRadio

单选按钮



### MuSwitch

开关



## 6 - 导航



### MuDropdown

下拉菜单



### MuDropdownButton

带下拉菜单的按钮，支持分割按钮形式



### MuContextMenu

右键菜单



## 7 - 数据



### MuList

列表



### MuListItem

列表项



### MuListDivider

列表分隔项



### MuTree

树



### MuTreeNode

树节点



### MuTags

标签组



### MuCalendar

日历面板



## 8 - 反馈



### MuMessageBox

消息提示对话框



### MuNotifier

浮动消息提示



### MuStatusBox

状态显示面板

