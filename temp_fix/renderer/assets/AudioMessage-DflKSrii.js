import {
  I as IconWrapper,
  H as createVNode,
  t as defineComponent,
  a1 as ref,
  a4 as reactive,
  L as createElementBlock,
  U as openBlock,
  M as createBaseVNode,
  aL as withModifiers,
  O as unref,
  N as NIcon,
  P as withDirectives,
  F as Fragment,
  a9 as renderList,
  Q as vShow,
  d2 as normalizeStyle,
  R as toDisplayString,
  W as _export_sfc
} from './index-CP-MMhae.js'
const PauseOne = IconWrapper('pause-one', false, function (props) {
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
          d: 'M19 18V30',
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
          d: 'M29 18V30',
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
const PlayOne = IconWrapper('play-one', true, function (props) {
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
          d: 'M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const _hoisted_1 = { class: 'immsg-audio' }
const _hoisted_2 = ['src']
const _hoisted_3 = { class: 'play' }
const _hoisted_4 = { class: 'desc' }
const _hoisted_5 = { class: 'time' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AudioMessage',
  props: {
    src: {}
  },
  setup(__props) {
    const audioRef = ref()
    const durationDesc = ref('-')
    const state = reactive({
      isAudioPlay: false,
      progress: 0,
      duration: 0,
      currentTime: 0,
      loading: true
    })
    const onPlay = () => {
      if (state.isAudioPlay) {
        audioRef.value.pause()
      } else {
        audioRef.value.play()
      }
      state.isAudioPlay = !state.isAudioPlay
    }
    const onPlayEnd = () => {
      state.isAudioPlay = false
      state.progress = 0
    }
    const onCanplay = () => {
      state.duration = audioRef.value.duration
      durationDesc.value = formatTime(parseInt(audioRef.value.duration))
      state.loading = false
    }
    const onError = (e) => {
      console.log('音频播放异常===>', e)
    }
    const onTimeUpdate = () => {
      let audio = audioRef.value
      if (audio.duration == 0) {
        state.progress = 0
      } else {
        state.currentTime = audio.currentTime
        state.progress = (audio.currentTime / audio.duration) * 100
      }
    }
    const formatTime = (value = 0) => {
      if (value == 0) {
        return '-'
      }
      const minutes = Math.floor(value / 60)
      let seconds = value
      if (minutes > 0) {
        seconds = Math.floor(value - minutes * 60)
      }
      return `${minutes}'${seconds}"`
    }
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          createBaseVNode(
            'audio',
            {
              ref_key: 'audioRef',
              ref: audioRef,
              preload: 'auto',
              type: 'audio/mp3,audio/wav',
              src: _ctx.src,
              onTimeupdate: onTimeUpdate,
              onEnded: onPlayEnd,
              onCanplay,
              onError
            },
            null,
            40,
            _hoisted_2
          ),
          createBaseVNode('div', _hoisted_3, [
            createBaseVNode(
              'div',
              {
                class: 'btn pointer',
                onClick: withModifiers(onPlay, ['stop'])
              },
              [
                createVNode(
                  _component_n_icon,
                  {
                    size: 18,
                    component: state.isAudioPlay ? unref(PauseOne) : unref(PlayOne)
                  },
                  null,
                  8,
                  ['component']
                )
              ]
            )
          ]),
          createBaseVNode('div', _hoisted_4, [
            (openBlock(),
            createElementBlock(
              Fragment,
              null,
              renderList(23, (i) => {
                return createBaseVNode('span', {
                  class: 'line',
                  key: i
                })
              }),
              64
            )),
            withDirectives(
              createBaseVNode(
                'span',
                {
                  class: 'indicator',
                  style: normalizeStyle({ left: state.progress + '%' })
                },
                null,
                4
              ),
              [[vShow, state.progress > 0]]
            )
          ]),
          createBaseVNode('div', _hoisted_5, toDisplayString(durationDesc.value), 1)
        ])
      )
    }
  }
})
const AudioMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-2d8ccf1d']])
export { AudioMessage as default }
