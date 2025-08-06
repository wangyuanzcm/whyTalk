import { t as defineComponent, u as h } from './index-CP-MMhae.js'
const FocusDetector = defineComponent({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(props) {
    return () =>
      h('div', {
        style: 'width: 0; height: 0',
        tabindex: 0,
        onFocus: props.onFocus,
        onBlur: props.onBlur
      })
  }
})
export { FocusDetector as F }
