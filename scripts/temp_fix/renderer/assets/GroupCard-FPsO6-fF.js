import {
  W as _export_sfc,
  aC as resolveComponent,
  L as createElementBlock,
  U as openBlock,
  M as createBaseVNode,
  H as createVNode,
  P as withDirectives,
  R as toDisplayString,
  Q as vShow,
  aL as withModifiers,
  O as unref,
  N as NIcon
} from './index-CP-MMhae.js'
import { P as PeoplePlusOne } from './PeoplePlusOne-BIXCI58o.js'
import { S as SendOne } from './SendOne-Ck-Fsq0E.js'
const _hoisted_1 = { class: 'items-box' }
const _hoisted_2 = { class: 'left-item' }
const _hoisted_3 = { class: 'right-item' }
const _hoisted_4 = { class: 'username' }
const _hoisted_5 = { class: 'text-ellipsis' }
const _hoisted_6 = { class: 'badge' }
const _hoisted_7 = { class: 'flags text-ellipsis' }
const _hoisted_8 = { class: 'helper' }
const _hoisted_9 = { class: 'status' }
const _hoisted_10 = { class: 'tool' }
const _sfc_main = {
  __name: 'GroupCard',
  props: {
    avatar: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    gender: {
      type: Number,
      default: 0
    },
    motto: {
      type: String,
      default: ''
    },
    flag: {
      type: String,
      default: ''
    },
    isMember: {
      type: Boolean,
      default: false
    },
    isQiye: {
      type: Boolean,
      default: false
    }
  },
  emits: ['talk', 'join'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    return (_ctx, _cache) => {
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_icon = NIcon
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          createBaseVNode('div', _hoisted_2, [
            createVNode(
              _component_im_avatar,
              {
                src: __props.avatar,
                size: 40,
                username: __props.username
              },
              null,
              8,
              ['src', 'username']
            )
          ]),
          createBaseVNode('div', _hoisted_3, [
            createBaseVNode('div', _hoisted_4, [
              createBaseVNode('span', _hoisted_5, toDisplayString(__props.username || '-'), 1),
              withDirectives(createBaseVNode('span', _hoisted_6, '企业', 512), [
                [vShow, __props.isQiye]
              ])
            ]),
            createBaseVNode('div', _hoisted_7, toDisplayString(__props.motto || '...'), 1),
            createBaseVNode('div', _hoisted_8, [
              createBaseVNode('div', _hoisted_9, toDisplayString(__props.flag), 1),
              createBaseVNode('div', _hoisted_10, [
                createVNode(
                  _component_n_icon,
                  {
                    component: __props.isMember ? unref(SendOne) : unref(PeoplePlusOne),
                    onClick:
                      _cache[0] ||
                      (_cache[0] = withModifiers(
                        ($event) => emit(__props.isMember ? 'talk' : 'join'),
                        ['stop']
                      ))
                  },
                  null,
                  8,
                  ['component']
                )
              ])
            ])
          ])
        ])
      )
    }
  }
}
const GroupCard = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-9d38097f']])
export { GroupCard as G }
