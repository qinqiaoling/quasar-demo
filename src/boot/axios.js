// import something here
import Vue from 'vue'
import axios from 'axios'

// import apiAxios from 'src/plugins/api/axios'
import {server} from 'src/plugins/api/http'

// 引入mockjs
require('mockjs')

// we add it to Vue prototype
// so we can reference it in Vue files
// without the need to import axios
Vue.prototype.$axios = axios
// 挂载全局
//定义全局axios变量
// Vue.use(apiAxios)
Vue.prototype.$http = server // ajax请求方法
// Example: this.$axios will reference Axios now so you don't need stuff like vue-axios

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async ( { app, router, store, Vue} ) => {
//   // something to do
//   router.beforeEach((to, from, next) => {
//     // Now you need to add your authentication logic here, like calling an API endpoint
//   })
// }
