export default {
  path: '/p2p',
  name: 'p2p',
  meta: { auth: true },
  component: () => import('@/views/p2p/P2PManager.vue')
}