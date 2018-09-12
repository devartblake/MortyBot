import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// register globally
Vue.component('svg-icon', SvgIcon)

const reguireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\/svg$/)
reguireAll(req)
