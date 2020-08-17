import { get } from '@/utils/request'

export const getRankSongs = (data = {}) => {
  return get('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
    format: 'jsonp',
    g_tk: 5381,
    uin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: new Date().getTime(),
    ...data
  })
}
