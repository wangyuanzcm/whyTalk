export default {
  path: '/p2p',
  name: 'p2p',
  meta: { auth: false },
  component: () => import('@/views/p2p/LocalSendManager.vue')
}
