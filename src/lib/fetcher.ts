/**
 * https://github.com/axios/axios
 */

import axios from 'axios'

export function fetcher(options) {
  let client = typeof window !== 'undefined'
  const config = {
    baseURL: options?.baseURL || (client ? window.location.origin : process.env.NEXTAUTH_URL || process.env.VERCEL_URL),
    method: options.method || 'get',
    url: options.url,
    data: options.data,
    params: options.params,
    withCredentials: options.withCredentials || false, // 是否允许携带cookie
    ...options,
  }
  if (options?.headers) {
    config['headers'] = options.headers
  }
  return axios(config)
    .then(res => {
      if (options.done) {
        // done回调里不能有window等客户端属性
        options.done(res.data)
      }
      return res.data
    })
    .catch(err => {
      console.error(err)
      if (err.response) {
        if (options.fail) {
          // fail回调里不能有window等客户端属性
          options.fail(err.response)
        }
        return err.response.data
      } else {
        return err
      }
    })
}
