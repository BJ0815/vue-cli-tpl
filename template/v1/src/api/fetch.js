import axios from 'axios'
import msgInfo from './errorMessage'
import axiosConfig from './config'

axios.defaults.baseURL = axiosConfig.baseURL
axios.defaults.timeout = axiosConfig.timeout

const pending = []
const cancelToken = axios.CancelToken
// remove request in pending list
const removePending = (config) => {
  for (const p in pending) {
    if (pending[p].u === `${config.url}&${config.method}`) {
      pending[p].f()
      pending.splice(p, 1)
    }
  }
}

axios.interceptors.request.use(config => {
  // 添加 headers 头
  const headers = axiosConfig.headers
  if (headers) {
    for (let header in headers) {
      if (headers[header]) {
        config.headers[header] = headers[header]
      }
    }
  }

  removePending(config) // cancel before send request
  // eslint-disable-next-line new-cap
  config.cancelToken = new cancelToken((c) => {
    // here can customize yourself
    pending.push({ u: `${config.url}&${config.method}`, f: c })
  })
  return config
}, error => Promise.reject(error.message))


axios.interceptors.response.use(response => {
  removePending(response.config)
  return response
}, error => {
  if (error && error.response) {
    error.message = msgInfo.apiErrorMessage[error.response.status]
  } else {
    error.message = 'Internet Server Error'
  }
  return Promise.reject(error.message)
})

export default axios
