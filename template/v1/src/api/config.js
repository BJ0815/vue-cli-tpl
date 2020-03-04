/**
 * axios default config setting
 */
export default {
  baseURL: 'https://api.github.com',
  timeout: 100000,
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // Authorization: 'test' // `${store.state.auth.authToken}` auth token in vuex
  }
}