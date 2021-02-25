import { request } from "../utils/request";

export const getBannerRequest = () => {
  return request.get ('/banner');
}

export const getRecommendListRequest = () => {
  return request.get ('/personalized');
}

export const getHotSingerListRequest = (count) => {
  return request.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  return request.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

export const getRankListRequest = () => {
  return request.get (`/toplist/detail`);
};

export const getAlbumDetailRequest = id => {
  return request.get (`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = id => {
  return request.get (`/artists?id=${id}`);
};

export const getSingers = () => {
  const categoryTypes = [{
    name: "华语男",
    key: "1001"
  },
  {
    name: "华语女",
    key: "1002"
  },
  {
    name: "华语组合",
    key: "1003"
  },
  {
    name: "欧美男",
    key: "2001"
  },
  {
    name: "欧美女",
    key: "2002"
  },
  {
    name: "欧美组合",
    key: "2003"
  },
  {
    name: "日本男",
    key: "6001"
  },
  {
    name: "日本女",
    key: "6002"
  },
  {
    name: "日本组合",
    key: "6003"
  },
  {
    name: "韩国男",
    key: "7001"
  },
  {
    name: "韩国女",
    key: "7002"
  },
  {
    name: "韩国组合",
    key: "7003"
  },
  {
    name: "其他男歌手",
    key: "4001"
  },
  {
    name: "其他女歌手",
    key: "4002"
  },
  {
    name: "其他组合",
    key: "4003"
  },
  ];
  
  // 歌手首字母
  const alphaTypes = [{
      key: "A",
      name: "A"
    },
    {
      key: "B",
      name: "B"
    },
    {
      key: "C",
      name: "C"
    },
    {
      key: "D",
      name: "D"
    },
    {
      key: "E",
      name: "E"
    },
    {
      key: "F",
      name: "F"
    },
    {
      key: "G",
      name: "G"
    },
    {
      key: "H",
      name: "H"
    },
    {
      key: "I",
      name: "I"
    },
    {
      key: "J",
      name: "J"
    },
    {
      key: "K",
      name: "K"
    },
    {
      key: "L",
      name: "L"
    },
    {
      key: "M",
      name: "M"
    },
    {
      key: "N",
      name: "N"
    },
    {
      key: "O",
      name: "O"
    },
    {
      key: "P",
      name: "P"
    },
    {
      key: "Q",
      name: "Q"
    },
    {
      key: "R",
      name: "R"
    },
    {
      key: "S",
      name: "S"
    },
    {
      key: "T",
      name: "T"
    },
    {
      key: "U",
      name: "U"
    },
    {
      key: "V",
      name: "V"
    },
    {
      key: "W",
      name: "W"
    },
    {
      key: "X",
      name: "X"
    },
    {
      key: "Y",
      name: "Y"
    },
    {
      key: "Z",
      name: "Z"
    }
  ];

  return {
    categoryTypes,
    alphaTypes
  }
}

export const playMode = {
  sequence: 0, // 顺序循环
  loop: 1, // 单曲循环
  random: 2 // 随机播放
};

export const playList = [
  {
    ftype: 0,
    djId: 0,
    a: null,
    cd: '01',
    crbt: null,
    no: 1,
    st: 0,
    rt: '',
    cf: '',
    alia: ['手游《梦幻花园》苏州园林版推广曲'],
    rtUrls: [],
    fee: 0,
    s_id: 0,
    copyright: 0,
    h: {
      br: 320000,
      fid: 0,
      size: 9400365,
      vd: -45814
    },
    mv: 0,
    al: {
      id: 84991301,
      name: '拾梦纪',
      picUrl:
        'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
      tns: [],
      pic_str: '109951164627180052',
      pic: 109951164627180050
    },
    name: '拾梦纪',
    l: {
      br: 128000,
      fid: 0,
      size: 3760173,
      vd: -41672
    },
    rtype: 0,
    m: {
      br: 192000,
      fid: 0,
      size: 5640237,
      vd: -43277
    },
    cp: 1416668,
    mark: 0,
    rtUrl: null,
    mst: 9,
    dt: 234947,
    ar: [
      {
        id: 12084589,
        name: '妖扬',
        tns: [],
        alias: []
      },
      {
        id: 12578371,
        name: '金天',
        tns: [],
        alias: []
      }
    ],
    pop: 5,
    pst: 0,
    t: 0,
    v: 3,
    id: 1416767593,
    publishTime: 0,
    rurl: null
  }
]