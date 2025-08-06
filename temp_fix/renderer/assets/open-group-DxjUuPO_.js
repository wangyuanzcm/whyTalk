import {
  I as IconWrapper,
  H as createVNode,
  t as defineComponent,
  a1 as ref,
  a5 as createBlock,
  a6 as __unplugin_components_3,
  O as unref,
  ad as isRef,
  T as withCtx,
  U as openBlock,
  M as createBaseVNode,
  V as createTextVNode,
  aa as Button,
  dd as ServGroupApplyCreate,
  a4 as reactive,
  L as createElementBlock,
  a8 as createCommentVNode,
  R as toDisplayString,
  P as withDirectives,
  F as Fragment,
  a9 as renderList,
  Q as vShow,
  N as NIcon,
  de as ServGroupOvertList,
  W as _export_sfc
} from './index-CP-MMhae.js'
import {
  _ as __unplugin_components_3$1,
  a as __unplugin_components_7
} from './FormItem-BYV9eAmm.js'
import { _ as __unplugin_components_1 } from './Input-9scKSWkl.js'
import { G as GroupCard } from './GroupCard-FPsO6-fF.js'
import { d as debounce } from './common-CbVb2jfY.js'
import { N as NAlert } from './Alert-DLBfJ5gj.js'
import { N as NEmpty } from './Empty-DXO3k6Nm.js'
import { S as Search } from './Search-ywW15yaZ.js'
import './use-locale-sP6dOhdq.js'
import './PeoplePlusOne-BIXCI58o.js'
import './SendOne-Ck-Fsq0E.js'
import './index-88uWzgFD.js'
const AddOne = IconWrapper('add-one', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 16V32',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M16 24L32 24',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const _hoisted_1$1 = { style: { width: '100%', 'text-align': 'right' } }
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: 'GroupApply',
  props: {
    groupId: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const remark = ref('')
    const props = __props
    const emit = __emit
    const isShow = ref(true)
    const loading = ref(false)
    const onMaskClick = () => {
      emit('close')
    }
    const onSubmit = async () => {
      const { code } = await ServGroupApplyCreate(
        {
          group_id: props.groupId,
          remark: remark.value
        },
        { loading, successText: '入群申请提交成功...' }
      )
      if (code == 200) onMaskClick()
    }
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1
      const _component_n_form_item = __unplugin_components_3$1
      const _component_n_form = __unplugin_components_7
      const _component_n_button = Button
      const _component_n_modal = __unplugin_components_3
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: unref(isShow),
            'onUpdate:show':
              _cache[1] ||
              (_cache[1] = ($event) => (isRef(isShow) ? (isShow.value = $event) : null)),
            preset: 'card',
            title: '入群申请',
            class: 'modal-radius',
            style: { 'max-width': '450px' },
            'on-after-leave': onMaskClick
          },
          {
            footer: withCtx(() => [
              createBaseVNode('div', _hoisted_1$1, [
                createVNode(
                  _component_n_button,
                  {
                    type: 'tertiary',
                    onClick: onMaskClick
                  },
                  {
                    default: withCtx(
                      () => _cache[2] || (_cache[2] = [createTextVNode(' 取消 ', -1)])
                    ),
                    _: 1,
                    __: [2]
                  }
                ),
                createVNode(
                  _component_n_button,
                  {
                    type: 'primary',
                    class: 'mt-l15',
                    loading: unref(loading),
                    disabled: !unref(remark),
                    onClick: onSubmit
                  },
                  {
                    default: withCtx(
                      () => _cache[3] || (_cache[3] = [createTextVNode(' 提交 ', -1)])
                    ),
                    _: 1,
                    __: [3]
                  },
                  8,
                  ['loading', 'disabled']
                )
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_n_form, null, {
                default: withCtx(() => [
                  createVNode(
                    _component_n_form_item,
                    {
                      label: '申请备注',
                      required: ''
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_input,
                          {
                            placeholder: '请填写申请备注',
                            type: 'textarea',
                            value: unref(remark),
                            'onUpdate:value':
                              _cache[0] ||
                              (_cache[0] = ($event) =>
                                isRef(remark) ? (remark.value = $event) : null)
                          },
                          null,
                          8,
                          ['value']
                        )
                      ]),
                      _: 1
                    }
                  )
                ]),
                _: 1
              })
            ]),
            _: 1
          },
          8,
          ['show']
        )
      )
    }
  }
})
const _hoisted_1 = { class: 'el-container height100' }
const _hoisted_2 = { class: 'el-main' }
const _hoisted_3 = { class: 'el-container is-vertical height100' }
const _hoisted_4 = { class: 'el-header me-view-header border-bottom' }
const _hoisted_5 = {
  key: 0,
  class: 'el-main'
}
const _hoisted_6 = {
  style: { 'min-height': '400px' },
  class: 'flex-center'
}
const _hoisted_7 = {
  key: 1,
  class: 'el-main me-scrollbar me-scrollbar-thumb pd-10'
}
const _hoisted_8 = { class: 'cards' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'open-group',
  setup(__props) {
    const model = reactive({
      isShow: false,
      groupId: 0
    })
    const search = reactive({
      page: 1,
      name: '',
      next: false
    })
    const items = ref([])
    const onLoadData = async () => {
      const { code, data } = await ServGroupOvertList({
        page: search.page,
        name: search.name
      })
      if (code != 200) return
      const list = data.items || []
      if (search.page == 1) {
        items.value = list
      } else {
        items.value.push(...list)
      }
      search.next = data.next
    }
    const onLoadMore = () => {
      search.page++
      onLoadData()
    }
    const onSearchInput = debounce((value) => {
      search.page = 1
      search.name = value
      onLoadData()
    }, 300)
    const onJoin = (item) => {
      model.isShow = true
      model.groupId = item.group_id
    }
    onLoadData()
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_input = __unplugin_components_1
      const _component_n_empty = NEmpty
      const _component_n_alert = NAlert
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('section', _hoisted_1, [
              createBaseVNode('main', _hoisted_2, [
                createBaseVNode('section', _hoisted_3, [
                  createBaseVNode('header', _hoisted_4, [
                    createBaseVNode(
                      'div',
                      null,
                      '公开群聊(' + toDisplayString(unref(items).length) + ')',
                      1
                    ),
                    createBaseVNode('div', null, [
                      createVNode(
                        _component_n_input,
                        {
                          placeholder: '搜索',
                          clearable: '',
                          style: { width: '200px' },
                          'on-input': unref(onSearchInput),
                          round: ''
                        },
                        {
                          prefix: withCtx(() => [
                            createVNode(_component_n_icon, { component: unref(Search) }, null, 8, [
                              'component'
                            ])
                          ]),
                          _: 1
                        },
                        8,
                        ['on-input']
                      )
                    ])
                  ]),
                  unref(items).length == 0
                    ? (openBlock(),
                      createElementBlock('main', _hoisted_5, [
                        createBaseVNode('div', _hoisted_6, [
                          createVNode(_component_n_empty, { description: '暂无相关数据' })
                        ])
                      ]))
                    : (openBlock(),
                      createElementBlock('main', _hoisted_7, [
                        createVNode(
                          _component_n_alert,
                          {
                            type: 'info',
                            bordered: false,
                            closable: '',
                            class: 'mt-b10'
                          },
                          {
                            default: withCtx(
                              () =>
                                _cache[1] ||
                                (_cache[1] = [
                                  createTextVNode(
                                    ' 公开群聊可自行添加入群申请，待群主（管理员）同意后方可入群！ ',
                                    -1
                                  )
                                ])
                            ),
                            _: 1,
                            __: [1]
                          }
                        ),
                        createBaseVNode('div', _hoisted_8, [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(unref(items), (item) => {
                              return (
                                openBlock(),
                                createBlock(
                                  GroupCard,
                                  {
                                    key: item.group_id,
                                    avatar: item.avatar,
                                    username: item.name,
                                    gender: item.gender,
                                    motto: item.profile,
                                    flag: item.count + '/' + item.max_num,
                                    onJoin: ($event) => onJoin(item)
                                  },
                                  null,
                                  8,
                                  ['avatar', 'username', 'gender', 'motto', 'flag', 'onJoin']
                                )
                              )
                            }),
                            128
                          )),
                          withDirectives(
                            createBaseVNode(
                              'div',
                              {
                                class: 'flex-center more',
                                onClick: onLoadMore
                              },
                              [
                                createVNode(
                                  _component_n_icon,
                                  { component: unref(AddOne) },
                                  null,
                                  8,
                                  ['component']
                                ),
                                _cache[2] || (_cache[2] = createTextVNode('  加载更多 ', -1))
                              ],
                              512
                            ),
                            [[vShow, unref(search).next]]
                          )
                        ])
                      ]))
                ])
              ])
            ]),
            unref(model).isShow
              ? (openBlock(),
                createBlock(
                  _sfc_main$1,
                  {
                    key: 0,
                    'group-id': unref(model).groupId,
                    onClose: _cache[0] || (_cache[0] = ($event) => (unref(model).isShow = false))
                  },
                  null,
                  8,
                  ['group-id']
                ))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const openGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-056a2a47']])
export { openGroup as default }
