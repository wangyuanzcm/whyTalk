import { S as SubViewLayout } from './SubViewLayout-Be1_XKlj.js'
import {
  I as IconWrapper,
  H as createVNode,
  t as defineComponent,
  aG as useUserStore,
  a4 as reactive,
  z as computed,
  ag as markRaw,
  aO as Remind,
  b$ as People,
  a5 as createBlock,
  O as unref,
  U as openBlock
} from './index-CP-MMhae.js'
const ChartGraph = IconWrapper('chart-graph', false, function (props) {
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
        'rect',
        {
          x: '17',
          y: '6',
          width: '14',
          height: '9',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'rect',
        {
          x: '6',
          y: '33',
          width: '14',
          height: '9',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'rect',
        {
          x: '28',
          y: '33',
          width: '14',
          height: '9',
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
          d: 'M24 16V24',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M13 33V24H35V33',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const Peoples = IconWrapper('peoples', true, function (props) {
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
          d: 'M19 20C22.866 20 26 16.866 26 13C26 9.13401 22.866 6 19 6C15.134 6 12 9.13401 12 13C12 16.866 15.134 20 19 20Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M32.6077 7C34.6405 8.2249 36.0001 10.4537 36.0001 13C36.0001 15.5463 34.6405 17.7751 32.6077 19',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M4 40.8V42H34V40.8C34 36.3196 34 34.0794 33.1281 32.3681C32.3611 30.8628 31.1372 29.6389 29.6319 28.8719C27.9206 28 25.6804 28 21.2 28H16.8C12.3196 28 10.0794 28 8.36808 28.8719C6.86278 29.6389 5.63893 30.8628 4.87195 32.3681C4 34.0794 4 36.3196 4 40.8Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M43.9999 42.0001V40.8001C43.9999 36.3197 43.9999 34.0795 43.128 32.3682C42.361 30.8629 41.1371 29.6391 39.6318 28.8721',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const PeoplesTwo = IconWrapper('peoples-two', false, function (props) {
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
          d: 'M24 20C27.866 20 31 16.866 31 13C31 9.13401 27.866 6 24 6C20.134 6 17 9.13401 17 13C17 16.866 20.134 20 24 20Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 7.25488C10.1865 8.51983 9 10.6214 9 13.0002C9 15.5465 10.3596 17.7753 12.3924 19.0002',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M36 7.25488C37.8135 8.51983 39 10.6214 39 13.0002C39 15.3789 37.8135 17.4806 36 18.7455',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 40V42H36V40C36 36.2725 36 34.4087 35.391 32.9385C34.5791 30.9783 33.0217 29.4209 31.0615 28.609C29.5913 28 27.7275 28 24 28C20.2725 28 18.4087 28 16.9385 28.609C14.9783 29.4209 13.4209 30.9783 12.609 32.9385C12 34.4087 12 36.2725 12 40Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M43.9999 42.0001V40.8001C43.9999 36.3197 43.9999 34.0795 43.128 32.3682C42.361 30.8629 41.1371 29.6391 39.6318 28.8721',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M4.00009 42.0001V40.8001C4.00009 36.3197 4.00009 34.0795 4.87204 32.3682C5.63902 30.8629 6.86287 29.6391 8.36816 28.8721',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'layout',
  setup(__props) {
    const userStore = useUserStore()
    const menus = reactive([
      {
        name: '好友通知',
        path: '/contact/friend/apply',
        icon: markRaw(Remind),
        tips: computed(() => (userStore.isContactApply ? 'New' : ''))
      },
      {
        name: '群聊通知',
        path: '/contact/group/apply',
        icon: markRaw(Remind),
        tips: computed(() => (userStore.isGroupApply ? 'New' : ''))
      },
      {
        name: '我的好友',
        path: '/contact/friend',
        icon: markRaw(People)
      },
      {
        name: '我的群聊',
        path: '/contact/group',
        icon: markRaw(Peoples)
      },
      {
        name: '公开群聊',
        path: '/contact/open-group',
        icon: markRaw(PeoplesTwo)
      },
      {
        name: '企业组织',
        path: '/contact/organize',
        icon: markRaw(ChartGraph),
        show: computed(() => userStore.isQiye)
      }
    ])
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          SubViewLayout,
          {
            title: '通讯录',
            menus: unref(menus)
          },
          null,
          8,
          ['menus']
        )
      )
    }
  }
})
export { _sfc_main as default }
