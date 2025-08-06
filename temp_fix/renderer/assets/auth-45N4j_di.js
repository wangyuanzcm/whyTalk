import { C as createIpcApi } from './index-CP-MMhae.js'
const ServAuthLogin = createIpcApi('/api/v1/auth/login')
const ServAuthRegister = createIpcApi('/api/v1/auth/register')
const ServAuthForget = createIpcApi('/api/v1/auth/forget')
export { ServAuthLogin as S, ServAuthRegister as a, ServAuthForget as b }
