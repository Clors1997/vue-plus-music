import axios from 'axios'

// 基础路径
const baseURL = '/api'

const instance = axios.create({
  baseURL,
  timeout: 16000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 请进行相关请求配置如临时url，token等
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * Promise 封装
 * @param {*} options
 */
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(({ data, code, msg }) => {
        if (code == 200) {
          resolve(data)
        } else {
          reject(msg)
        }
      })
      .catch(result => {
        if (!result || !result.response) {
          reject(result)
        }
        const {
          response: { code, msg }
        } = result
        switch (code) {
          case 401:
            sessionStorage.clear()
            reject('您还未登录')
            break
          case 403:
            reject('登录失效')
            break
          case 404:
            reject('访问异常，请联系系统管理员')
            break
          default:
            reject(msg)
            break
        }
      })
  })
}

const get = (url, params = {}) => {
  return request({
    url,
    method: 'get',
    params
  })
}

const put = (url, data = {}) => {
  return request({
    url,
    method: 'put',
    data
  })
}

const post = (url, data = {}) => {
  return request({
    url,
    method: 'post',
    data
  })
}

const del = (url, data = {}) => {
  return request({
    url,
    method: 'delete',
    data
  })
}

export { request, get, post, put, del, instance as axios }
