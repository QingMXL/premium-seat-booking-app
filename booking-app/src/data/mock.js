// 模拟数据 —— 餐厅、菜品、订单、用户
import { IMG } from './images.js'

export const cities = [
  { name: '上海', hot: true }, { name: '北京', hot: true }, { name: '广州', hot: true },
  { name: '深圳', hot: true }, { name: '杭州', hot: true }, { name: '成都', hot: true },
  { name: '南京' }, { name: '苏州' }, { name: '武汉' }, { name: '西安' },
  { name: '重庆' }, { name: '天津' }, { name: '长沙' }, { name: '青岛' },
  { name: '厦门' }, { name: '宁波' },
]

// 快捷筛选 —— key 用于过滤
export const quickFilters = [
  { key: 'all',      label: '全部' },
  { key: 'nearby',   label: '附近' },
  { key: 'room',     label: '包间' },
  { key: 'tonight',  label: '今晚可订' },
  { key: 'friends',  label: '朋友聚会' },
  { key: 'biz',      label: '商务宴请' },
  { key: 'family',   label: '家庭聚餐' },
  { key: 'bar',      label: '小酒馆' },
  { key: 'hotel',    label: '酒店餐厅' },
]

export const scenes = [
  { key: 'biz',     name: '商务宴请', desc: '体面、安静、可预订包间', cover: IMG.scene.biz },
  { key: 'family',  name: '家庭聚餐', desc: '人多、菜量足、可坐儿童椅', cover: IMG.scene.family },
  { key: 'friends', name: '朋友聚会', desc: '气氛好、人均合理、可分享', cover: IMG.scene.friends },
  { key: 'date',    name: '情侣约会', desc: '环境精致、菜品有创意',   cover: IMG.scene.date },
]

export const restaurants = [
  {
    id: 'r1', name: '雍福会', tag: '私房菜',
    rating: 4.8, reviews: 3268, price: 880,
    cuisine: '本帮江浙菜', district: '徐汇区 · 永福路',
    distance: '1.2km', distanceVal: 1.2,
    hasRoom: true, hasParking: true, canBook: true,
    nextSlot: '今晚 19:00', tonight: true,
    suits: ['biz', 'family'],
    cover: IMG.rest.yongfuhui,
    intro: '上海老洋房中的私房菜地标，雅致幽静，适合宴请与商务接待。',
    hours: '午餐 11:30-14:30 · 晚餐 17:30-22:00',
    address: '上海市徐汇区永福路 200 号',
    phone: '021-5466 2727',
    tags: ['包间', '可选座', '可停车', '适合宴请'],
    gallery: [
      { src: IMG.env.door,  label: '门头' },
      { src: IMG.env.hall_1, label: '大厅' },
      { src: IMG.room.room_1, label: '包间' },
      { src: IMG.env.night,  label: '夜景' },
      { src: IMG.env.hall_3, label: '环境' },
    ],
    dishes: [
      { name: '葱油东星斑', price: 388, img: IMG.dish.fish_steamed },
      { name: '红烧狮子头', price: 168, img: IMG.dish.pork_braised },
      { name: '蟹粉小笼皇', price: 88,  img: IMG.dish.xiaolong },
      { name: '蜜汁火方',   price: 268, img: IMG.dish.pork_glazed },
    ],
    rooms: [
      { name: '外滩厅 10-12 人', minSpend: '¥ 6888 起', img: IMG.room.room_1 },
      { name: '雅集厅 6-8 人',   minSpend: '¥ 3888 起', img: IMG.room.room_2 },
      { name: '怡安厅 4-6 人',   minSpend: '¥ 2288 起', img: IMG.room.room_3 },
    ],
    reviewBreakdown: { taste: 98, env: 96, service: 97, room: 95 },
    deposit: 50,
  },
  {
    id: 'r2', name: '玉芝兰', tag: '私厨预约',
    rating: 4.7, reviews: 1697, price: 688,
    cuisine: '川味私厨', district: '黄浦区 · 新天地',
    distance: '2.0km', distanceVal: 2.0,
    hasRoom: true, hasParking: true, canBook: true,
    nextSlot: '今晚 19:30', tonight: true,
    suits: ['biz', 'friends'],
    cover: IMG.rest.yuzhilan,
    intro: '川味私厨臻品，专注每日新鲜食材，主厨菜单按季更换。',
    hours: '晚餐 17:30-22:00 · 仅晚市',
    address: '上海市黄浦区新天地北里 18 号',
    phone: '021-5302 6688',
    tags: ['包间', '可选座', '可停车'],
    gallery: [
      { src: IMG.env.hall_2,  label: '门头' },
      { src: IMG.env.hall_4,  label: '大厅' },
      { src: IMG.room.room_2, label: '包间' },
      { src: IMG.env.bar,     label: '吧台' },
      { src: IMG.env.hall_1,  label: '环境' },
    ],
    dishes: [
      { name: '鸡豆花',   price: 218, img: IMG.dish.soup_chicken },
      { name: '开水白菜', price: 198, img: IMG.dish.soup_clear },
      { name: '麻婆豆腐', price: 88,  img: IMG.dish.tofu_mapo },
      { name: '坛子肉',   price: 268, img: IMG.dish.pot_meat },
    ],
    rooms: [
      { name: '兰庭包间 6 人', minSpend: '¥ 3888 起', img: IMG.room.room_2 },
      { name: '玉堂包间 8 人', minSpend: '¥ 4888 起', img: IMG.room.room_4 },
    ],
    reviewBreakdown: { taste: 97, env: 94, service: 95, room: 93 },
    deposit: 50,
  },
  {
    id: 'r3', name: 'ULTRAVIOLET by Paul Pairet', tag: '臻选',
    rating: 4.9, reviews: 1572, price: 6000,
    cuisine: '创意料理', district: '黄浦区 · 外滩',
    distance: '2.4km', distanceVal: 2.4,
    hasRoom: true, hasParking: true, canBook: false,
    nextSlot: '本周六 19:45', tonight: false,
    suits: ['biz'],
    cover: IMG.rest.ultra,
    intro: '十座限定的多感官料理体验，全球美食殿堂级目的地之一。',
    hours: '晚餐 19:45-23:00 · 仅晚市',
    address: '上海市黄浦区外滩 18 号',
    phone: '021-6321 6622',
    tags: ['包间', '臻选体验', '可停车'],
    gallery: [
      { src: IMG.banner.shanghai_night, label: '夜景' },
      { src: IMG.env.hall_2,            label: '大厅' },
      { src: IMG.room.room_5,           label: '主厅' },
      { src: IMG.env.bar,               label: '吧台' },
      { src: IMG.env.night,             label: '环境' },
    ],
    dishes: [
      { name: 'Tasting Menu 22 道', price: 6000, img: IMG.dish.tasting },
      { name: 'Wine Pairing',       price: 3800, img: IMG.dish.wine_pair },
    ],
    rooms: [{ name: '主厅 10 人独享', minSpend: '¥ 60000 起', img: IMG.room.room_5 }],
    reviewBreakdown: { taste: 99, env: 99, service: 99, room: 98 },
    deposit: 300,
  },
  {
    id: 'r4', name: '新荣记（南阳路店）', tag: '臻选',
    rating: 4.8, reviews: 2634, price: 788,
    cuisine: '台州菜', district: '静安区 · 南阳路',
    distance: '3.1km', distanceVal: 3.1,
    hasRoom: true, hasParking: false, canBook: true,
    nextSlot: '明日 18:00', tonight: false,
    suits: ['biz', 'family'],
    cover: IMG.rest.xinrong,
    intro: '米其林三星，台州菜代表，海鲜与季节食材为主打。',
    hours: '午餐 11:30-14:00 · 晚餐 17:30-22:00',
    address: '上海市静安区南阳路 22 号',
    phone: '021-6266 8888',
    tags: ['包间', '可选座'],
    gallery: [
      { src: IMG.env.hall_3,  label: '门头' },
      { src: IMG.env.hall_1,  label: '大厅' },
      { src: IMG.room.room_3, label: '包间' },
      { src: IMG.env.bund,    label: '景观' },
      { src: IMG.env.hall_4,  label: '环境' },
    ],
    dishes: [
      { name: '黄鱼面',     price: 188, img: IMG.dish.fish_noodle },
      { name: '家烧大黄鱼', price: 588, img: IMG.dish.fish_whole },
      { name: '沙蒜豆面',   price: 168, img: IMG.dish.sand_noodle },
    ],
    rooms: [
      { name: '台州厅 6 人',  minSpend: '¥ 3288 起', img: IMG.room.room_3 },
      { name: '南阳厅 10 人', minSpend: '¥ 5288 起', img: IMG.room.room_5 },
    ],
    reviewBreakdown: { taste: 97, env: 95, service: 96, room: 94 },
    deposit: 100,
  },
  {
    id: 'r5', name: 'Mr & Mrs Bund', tag: '法餐',
    rating: 4.6, reviews: 982, price: 580,
    cuisine: '现代法餐', district: '黄浦区 · 外滩',
    distance: '2.6km', distanceVal: 2.6,
    hasRoom: true, hasParking: true, canBook: true,
    nextSlot: '今晚 20:00', tonight: true,
    suits: ['friends', 'bar'],
    cover: IMG.rest.bund,
    intro: '外滩 18 号，法式精致与轻松氛围并存，深夜也可宴客。',
    hours: '晚餐 17:30-02:00',
    address: '上海市黄浦区中山东一路 18 号 6 楼',
    phone: '021-6323 9898',
    tags: ['包间', '可停车', '夜宵'],
    gallery: [
      { src: IMG.env.night,   label: '夜景' },
      { src: IMG.env.hall_2,  label: '大厅' },
      { src: IMG.env.bar,     label: '吧台' },
      { src: IMG.room.room_4, label: '包间' },
      { src: IMG.banner.shanghai_night, label: '景观' },
    ],
    dishes: [
      { name: '招牌蟹肉冻', price: 248, img: IMG.dish.crab_jelly },
      { name: '香煎鹅肝',   price: 288, img: IMG.dish.foie_gras },
    ],
    rooms: [{ name: '外滩景包间 8 人', minSpend: '¥ 4888 起', img: IMG.room.room_4 }],
    reviewBreakdown: { taste: 95, env: 98, service: 95, room: 96 },
    deposit: 100,
  },
  {
    id: 'r6', name: '老克勒小酒馆', tag: '小酒馆',
    rating: 4.5, reviews: 612, price: 280,
    cuisine: '海派小馆', district: '徐汇区 · 武康路',
    distance: '0.8km', distanceVal: 0.8,
    hasRoom: false, hasParking: false, canBook: true,
    nextSlot: '今晚 21:00', tonight: true,
    suits: ['friends', 'bar'],
    cover: IMG.rest.bistro,
    intro: '武康路法式洋房，氛围松弛的海派小酒馆。',
    hours: '17:00-02:00',
    address: '上海市徐汇区武康路 376 号',
    phone: '021-6418 8888',
    tags: ['可订', '夜宵', '小酒'],
    gallery: [
      { src: IMG.env.bar,    label: '吧台' },
      { src: IMG.env.hall_1, label: '环境' },
      { src: IMG.env.night,  label: '夜景' },
    ],
    dishes: [
      { name: '红酒煨牛尾', price: 188, img: IMG.dish.beef_red },
      { name: '罗宋汤',     price: 38,  img: IMG.dish.soup_red },
    ],
    rooms: [],
    reviewBreakdown: { taste: 92, env: 94, service: 90, room: 88 },
    deposit: 50,
  },
]

export const trendingDishes = [
  { id: 'd1', name: '葱油东星斑', restaurant: '雍福会',         rid: 'r1', price: 388, tag: '招牌菜', img: IMG.dish.fish_steamed,  likes: 1238 },
  { id: 'd2', name: '红烧狮子头', restaurant: '雍福会',         rid: 'r1', price: 168, tag: '必点',   img: IMG.dish.pork_braised,  likes: 982  },
  { id: 'd3', name: '麻婆豆腐',   restaurant: '玉芝兰',         rid: 'r2', price: 88,  tag: '招牌菜', img: IMG.dish.tofu_mapo,     likes: 1432 },
  { id: 'd4', name: '黄鱼面',     restaurant: '新荣记',         rid: 'r4', price: 188, tag: '招牌菜', img: IMG.dish.fish_noodle,   likes: 2103 },
  { id: 'd5', name: '招牌蟹肉冻', restaurant: 'Mr & Mrs Bund',  rid: 'r5', price: 248, tag: '推荐',   img: IMG.dish.crab_jelly,    likes: 645  },
  { id: 'd6', name: '蟹粉小笼',   restaurant: '雍福会',         rid: 'r1', price: 88,  tag: '必点',   img: IMG.dish.xiaolong,      likes: 1789 },
  { id: 'd7', name: '开水白菜',   restaurant: '玉芝兰',         rid: 'r2', price: 198, tag: '必点',   img: IMG.dish.soup_clear,    likes: 567  },
  { id: 'd8', name: '香煎鹅肝',   restaurant: 'Mr & Mrs Bund',  rid: 'r5', price: 288, tag: '推荐',   img: IMG.dish.foie_gras,     likes: 433  },
  { id: 'd9', name: '鸡豆花',     restaurant: '玉芝兰',         rid: 'r2', price: 218, tag: '推荐',   img: IMG.dish.soup_chicken,  likes: 521  },
  { id: 'd10', name: '家烧大黄鱼', restaurant: '新荣记',        rid: 'r4', price: 588, tag: '招牌菜', img: IMG.dish.fish_whole,    likes: 1102 },
]

// 主题集合（发现页 - 主题 tab）
export const themes = [
  { id: 't1', name: '外滩夜景宴请', desc: '8 家可俯瞰外滩夜景的高级餐厅',  count: 8,  cover: IMG.theme.bund_night },
  { id: 't2', name: '私密包间精选', desc: '商务、家庭、宴请必备',          count: 12, cover: IMG.theme.private_room },
  { id: 't3', name: '安静私厨',     desc: '主厨菜单 · 限量预订',           count: 6,  cover: IMG.theme.quiet_diner },
  { id: 't4', name: '露台 / 屋顶',  desc: '夏夜首选，自带氛围',            count: 5,  cover: IMG.theme.rooftop },
  { id: 't5', name: '主厨开放厨房', desc: 'Chef\'s Table 沉浸式体验',      count: 4,  cover: IMG.theme.chefs_table },
  { id: 't6', name: '米其林之选',   desc: '上海米其林 1-3 星集合',         count: 16, cover: IMG.theme.michelin },
]

// 榜单（发现页 - 榜单 tab）
export const ranks = [
  { id: 'rk1', title: '上海 · 人气榜 TOP 10',   desc: '近 30 天预订量最高的餐厅', cover: IMG.banner.shanghai_night,
    list: ['r3','r1','r4','r2','r5','r6'] },
  { id: 'rk2', title: '上海 · 商务宴请榜',       desc: '客单价 ≥ 500 · 商务接待首选', cover: IMG.theme.private_room,
    list: ['r3','r1','r4','r2'] },
  { id: 'rk3', title: '上海 · 包间排行',         desc: '可订包间最多的餐厅', cover: IMG.theme.chefs_table,
    list: ['r1','r4','r2','r3','r5'] },
]

// 订单 —— 精简后：待支付 1 / 待到店 1 / 已完成 2 / 已取消 1
export const orders = [
  {
    id: 'o2001',
    restaurantId: 'r1',
    restaurant: '雍福会',
    status: 'unpaid',
    statusText: '待支付',
    date: '2026-05-30（周六）',
    time: '19:30',
    party: 4,
    area: '包间',
    table: '雅集厅 4 人桌',
    deposit: 200,
    countdown: '00:08:35',
    payExpire: '8 分 35 秒后自动取消',
    cover: IMG.rest.yongfuhui,
    rTag: '私房菜',
  },
  {
    id: 'o1001',
    restaurantId: 'r1',
    restaurant: '雍福会',
    status: 'pending',
    statusText: '待到店',
    date: '2026-05-28（周四）',
    time: '19:30',
    party: 4,
    area: '包间',
    table: '外滩厅 A08',
    deposit: 200,
    countdown: '02:46:25',
    cover: IMG.rest.yongfuhui,
    rTag: '臻选',
  },
  {
    id: 'o1000',
    restaurantId: 'r2',
    restaurant: '玉芝兰',
    status: 'done',
    statusText: '已完成',
    date: '2026-05-12（周一）',
    time: '19:30',
    party: 2,
    area: '大厅',
    table: '靠窗 B6',
    deposit: 50,
    consumed: 688,
    cover: IMG.rest.yuzhilan,
    rTag: '私厨',
    reviewed: false,
  },
  {
    id: 'o0999',
    restaurantId: 'r3',
    restaurant: 'ULTRAVIOLET by Paul Pairet',
    status: 'done',
    statusText: '已到店',
    date: '2026-05-04（周日）',
    time: '19:45',
    party: 2,
    area: '主厅',
    table: '主厅 6 号位',
    deposit: 300,
    consumed: 12000,
    cover: IMG.rest.ultra,
    rTag: '臻选',
    reviewed: true,
  },
  {
    id: 'o0998',
    restaurantId: 'r4',
    restaurant: '新荣记（南阳路店）',
    status: 'cancelled',
    statusText: '已退款',
    date: '2026-05-02（周五）',
    time: '18:00',
    party: 6,
    area: '包间',
    table: '台州厅',
    deposit: 100,
    cover: IMG.rest.xinrong,
    rTag: '臻选',
    cancelReason: '用户取消（用餐前 26 小时）',
    refundStatus: '已原路退还 ¥100',
  },
]

export const user = {
  name: 'Flora Zhang',
  avatar: IMG.avatar.flora,
  level: '金卡会员',
  levelDesc: '尊享礼遇·专属预订·优先体验',
  points: 2680,
  bookings: 12,
  favs: 18,
  dishFavs: 9,
  phone: '188****8888',
}

export const coupons = [
  { id: 'c1', value: 50,  title: '厅订减代金券', desc: '至 2026.04.06', status: 'available' },
  { id: 'c2', value: 100, title: '包间减代金券', desc: '至 2026.04.06', status: 'available' },
  { id: 'c3', value: 0,   title: '生日礼遇',     desc: '至 2026.04.06', status: 'available', special: '免费蛋糕' },
]

export const pointHistory = [
  { id: 1, title: '到店核销 · 玉芝兰', pts: +120, date: '2025-05-12' },
  { id: 2, title: '完成预订 · 雍福会', pts: +50,  date: '2025-05-10' },
  { id: 3, title: '分享餐厅 · 新荣记', pts: +20,  date: '2025-05-08' },
  { id: 4, title: '兑换 50 元代金券',  pts: -800, date: '2025-04-26' },
  { id: 5, title: '邀请好友首单',      pts: +300, date: '2025-04-12' },
]

export const contacts = [
  { id: 'p1', name: 'Flora',  phone: '188 8888 8888', tag: '本人' },
  { id: 'p2', name: '李先生', phone: '139 0000 1234' },
  { id: 'p3', name: '王经理', phone: '137 1111 2222' },
]

export const slotsLunch  = ['11:00','11:30','12:00','12:30','13:00']
export const slotsDinner = ['17:30','18:00','18:30','19:00','19:30','20:00','20:30']

export const slotStatus = {
  '12:00': 'few',
  '12:30': 'few',
  '13:00': 'full',
  '17:30': 'few',
  '18:00': 'full',
  '20:30': 'full',
}

export const areas = ['大厅', '包间', '露台', '吧台', '安静区']
export const partySizes = [2, 4, 6, 8, 10]

export function nextDays(n = 7) {
  const days = []
  const wkLabel = ['周日','周一','周二','周三','周四','周五','周六']
  const today = new Date()
  for (let i = 0; i < n; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      key: `${d.getMonth()+1}-${d.getDate()}`,
      m: d.getMonth() + 1,
      d: d.getDate(),
      label: i === 0 ? '今天' : i === 1 ? '明天' : i === 2 ? '后天' : wkLabel[d.getDay()],
    })
  }
  return days
}

// 餐厅平面图配置 —— 用于预订页 SVG 平面图
// 坐标系：viewBox 0 0 360 460
export const floorPlanLayout = {
  walls: [
    // 外墙
    { x: 10, y: 10, w: 340, h: 440 },
  ],
  partitions: [
    // 包间分区线
    { x1: 10,  y1: 180, x2: 200, y2: 180 },
    { x1: 200, y1: 10,  x2: 200, y2: 180 },
  ],
  labels: [
    { x: 105, y: 30,  text: '包间区' },
    { x: 280, y: 30,  text: '大厅' },
    { x: 105, y: 200, text: '大厅 / 散座' },
    { x: 180, y: 440, text: '入口' },
    { x: 320, y: 440, text: '吧台' },
  ],
  doors: [
    { x: 170, y: 440, w: 36, h: 10 },
  ],
  bar: [
    { x: 260, y: 410, w: 80, h: 30 },
  ],
  // 桌位 —— round/square 形状；cap 容量；status 由 booked 列表决定
  tables: [
    // 包间区
    { id: 'P01', x: 60,  y: 70,  shape: 'square', cap: 8, label: '雅集厅' },
    { id: 'P02', x: 150, y: 70,  shape: 'square', cap: 6, label: '怡安厅' },
    { id: 'P03', x: 60,  y: 140, shape: 'square', cap: 4, label: '兰庭' },
    { id: 'P04', x: 150, y: 140, shape: 'square', cap: 4, label: '玉堂' },

    // 大厅靠窗
    { id: 'A01', x: 250, y: 60,  shape: 'round', cap: 2 },
    { id: 'A02', x: 310, y: 60,  shape: 'round', cap: 2 },
    { id: 'A03', x: 250, y: 130, shape: 'round', cap: 4 },
    { id: 'A04', x: 310, y: 130, shape: 'round', cap: 2 },

    // 大厅中心 / 散座
    { id: 'A05', x: 60,  y: 240, shape: 'round', cap: 4 },
    { id: 'A06', x: 150, y: 240, shape: 'round', cap: 6 },
    { id: 'A07', x: 250, y: 240, shape: 'round', cap: 4 },
    { id: 'A08', x: 310, y: 240, shape: 'round', cap: 2 },

    { id: 'A09', x: 60,  y: 320, shape: 'square', cap: 4 },
    { id: 'A10', x: 130, y: 320, shape: 'square', cap: 2 },
    { id: 'A11', x: 200, y: 320, shape: 'round',  cap: 6 },
    { id: 'A12', x: 290, y: 320, shape: 'round',  cap: 4 },

    { id: 'A13', x: 60,  y: 390, shape: 'round', cap: 2 },
    { id: 'A14', x: 130, y: 390, shape: 'round', cap: 4 },
    { id: 'A15', x: 200, y: 390, shape: 'square', cap: 2 },
  ],
  booked: ['P01', 'A03', 'A06', 'A11', 'A13'],
  recommended: 'A07',  // 默认推荐桌
}
