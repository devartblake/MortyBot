import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// Creating an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api base_url
  timeout: 15000 // request time-out
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['X-Token'] = getToken // Allow each request to carry a custom token according to the actual situation of your own modification
    }
    return config
}, 
error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
  }
)

// respone interception device
service.interceptors.response.use(
  response => response,
  /**
  * code for non-20000 is a mistake can be combined with their own business to modify
  */
 response => {
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:illegal token; 50012:Other clients are logged in ;  50014:Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('You have been logged out，You can cancel to stay on this page，or log back in', 'determine the logout', {
          confirmButtonText: 'Re-login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // In order to re-instantiate the Vue-router object, avoid bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },

  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
