export default {
  get_url: {
    url: 'http://u.y.qq.com/cgi-bin/musicu.fcg',
    params: data => {
      return {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        callback: 'player_jsonp_1',
        _: new Date().getTime(),
        data: '{"comm":{"ct":23,"cv":0},"data_mid":{"module":"track_info.UniformRuleCtrlServer","method":"GetTrackInfo","param":{"mids":["'+data.mid+'"],"types":[0]}},"url_mid":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"9529670314","songmid":["'+data.mid+'"],"songtype":[0],"uin":"0","loginflag":0,"platform":"23"}}}',
      }
    }
  },
  rank_songs: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    params: data => {
      return {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        _: new Date().getTime(),
        ...data
      }
    },
    jsonp: 'jsonpCallback'
  },
  rank_list: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    params: data => {
      return {
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
      }
    },
    jsonp: 'jsonpCallback'
  },
  album: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
    params: id => {
      return {
        albummid: id,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'jsonpCallback'
  },
  singer_info: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
    params: id => {
      return {
        order: 'listen',
        begin: 0,
        num: 8,
        singermid: id,
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5page',
        needNewCode: 1,
        from: 'h5',
        _: new Date().getTime()
      }
    },
    jsonp: 'jsonpCallback'
  },
  search: {
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
    params: data => {
      return {
        is_xml: 0,
        format: 'jsonp',
        key: data.key,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'jsonpCallback'
  },
  hotkey: {
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    params: () => {
      return {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'jsonpCallback'
  },
  home_page_data: {
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    params: () => {
      return {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
      }
    },
    jsonp: 'jsonpCallback'
  },
  lyric: {
    url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
    params: id => {
      return {
        nobase64: 1,
        musicid: id,
        songtype: 0
      }
    },
    jsonp: 'callback'
  },
  cd: {
    url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    params: id => {
      return {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: id,
        format: 'jsonp',
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'jsonpCallback'
  },
  first_page_data: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg',
    params() {
      return {
        format: 'jsonp',
        tpl: 'v12',
        page: 'other',
        rnd: 0,
        g_tk: new Date().getTime(),
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'GB2312',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'jsonpCallback'
  }
}
