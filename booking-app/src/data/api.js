/**
 * Supabase 数据层
 * 所有函数返回值与 mock.js 中的数据结构保持一致，页面改动最小化
 */
import { supabase } from '../lib/supabase.js'
import { IMG } from './images.js'

// TODO: 替换为真实 Auth — supabase.auth.getUser()
// 此值从 VITE_DEMO_USER_ID 读取，仅供演示；生产环境必须使用真实用户 ID
export const CURRENT_USER_ID = import.meta.env.VITE_DEMO_USER_ID || ''

// ─── 图片兜底映射（DB cover_url 为空时使用本地 IMG）────────────
const REST_COVER = {
  r1: IMG.rest.yongfuhui,
  r2: IMG.rest.yuzhilan,
  r3: IMG.rest.ultra,
  r4: IMG.rest.xinrong,
  r5: IMG.rest.bund,
  r6: IMG.rest.bistro,
}

const REST_GALLERY = {
  r1: [
    { src: IMG.env.door,    label: '门头' },
    { src: IMG.env.hall_1,  label: '大厅' },
    { src: IMG.room.room_1, label: '包间' },
    { src: IMG.env.night,   label: '夜景' },
    { src: IMG.env.hall_3,  label: '环境' },
  ],
  r2: [
    { src: IMG.env.hall_2,  label: '门头' },
    { src: IMG.env.hall_4,  label: '大厅' },
    { src: IMG.room.room_2, label: '包间' },
    { src: IMG.env.bar,     label: '吧台' },
    { src: IMG.env.hall_1,  label: '环境' },
  ],
  r3: [
    { src: IMG.banner.shanghai_night, label: '夜景' },
    { src: IMG.env.hall_2,            label: '大厅' },
    { src: IMG.room.room_5,           label: '主厅' },
    { src: IMG.env.bar,               label: '吧台' },
    { src: IMG.env.night,             label: '环境' },
  ],
  r4: [
    { src: IMG.env.hall_3,  label: '门头' },
    { src: IMG.env.hall_1,  label: '大厅' },
    { src: IMG.room.room_3, label: '包间' },
    { src: IMG.env.bund,    label: '景观' },
    { src: IMG.env.hall_4,  label: '环境' },
  ],
  r5: [
    { src: IMG.env.night,             label: '夜景' },
    { src: IMG.env.hall_2,            label: '大厅' },
    { src: IMG.env.bar,               label: '吧台' },
    { src: IMG.room.room_4,           label: '包间' },
    { src: IMG.banner.shanghai_night, label: '景观' },
  ],
  r6: [
    { src: IMG.env.bar,    label: '吧台' },
    { src: IMG.env.hall_1, label: '环境' },
    { src: IMG.env.night,  label: '夜景' },
  ],
}

const DISH_IMG = {
  '葱油东星斑': IMG.dish.fish_steamed,
  '红烧狮子头': IMG.dish.pork_braised,
  '蟹粉小笼皇': IMG.dish.xiaolong,
  '蜜汁火方':   IMG.dish.pork_glazed,
  '鸡豆花':     IMG.dish.soup_chicken,
  '开水白菜':   IMG.dish.soup_clear,
  '麻婆豆腐':   IMG.dish.tofu_mapo,
  '坛子肉':     IMG.dish.pot_meat,
  'Tasting Menu 22 道': IMG.dish.tasting,
  'Wine Pairing':       IMG.dish.wine_pair,
  '黄鱼面':     IMG.dish.fish_noodle,
  '家烧大黄鱼': IMG.dish.fish_whole,
  '沙蒜豆面':   IMG.dish.sand_noodle,
  '招牌蟹肉冻': IMG.dish.crab_jelly,
  '香煎鹅肝':   IMG.dish.foie_gras,
  '红酒煨牛尾': IMG.dish.beef_red,
  '罗宋汤':     IMG.dish.soup_red,
}

const ROOM_IMG = {
  r1: [IMG.room.room_1, IMG.room.room_2, IMG.room.room_3],
  r2: [IMG.room.room_2, IMG.room.room_4],
  r3: [IMG.room.room_5],
  r4: [IMG.room.room_3, IMG.room.room_5],
  r5: [IMG.room.room_4],
}

const STATUS_TEXT = {
  unpaid:    '待支付',
  pending:   '待到店',
  done:      '已完成',
  cancelled: '已取消',
}

const WEEKDAY = ['周日','周一','周二','周三','周四','周五','周六']

// ─── 工具 ────────────────────────────────────────────────────────

function formatDate(dateStr) {
  // '2026-05-30' → '2026-05-30（周六）'
  const d = new Date(dateStr + 'T00:00:00')
  return `${dateStr}（${WEEKDAY[d.getDay()]}）`
}

function formatTime(timeStr) {
  // '19:30:00' → '19:30'
  return timeStr ? timeStr.slice(0, 5) : ''
}

// ─── 映射函数 ────────────────────────────────────────────────────

function mapRestaurant(r) {
  const rooms = (r.rooms || []).map((rm, i) => ({
    name:     rm.name,
    minSpend: rm.min_spend,
    img:      rm.img_url || (ROOM_IMG[r.id] || [])[i] || IMG.room.room_1,
  }))

  const dishes = (r.dishes || []).map(d => ({
    name:  d.name,
    price: d.price,
    img:   d.img_url || DISH_IMG[d.name] || '',
  }))

  const gallery = r.restaurant_gallery?.length
    ? r.restaurant_gallery
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(g => ({ src: g.src_url || '', label: g.label }))
    : (REST_GALLERY[r.id] || [])

  const tags = (r.restaurant_tags || []).map(t => t.tag)

  return {
    id:             r.id,
    name:           r.name,
    tag:            r.tag,
    rating:         parseFloat(r.rating),
    reviews:        r.reviews,
    price:          r.price,
    cuisine:        r.cuisine,
    district:       r.district,
    distance:       r.distance_text,
    distanceVal:    parseFloat(r.distance_val),
    hasRoom:        r.has_room,
    hasParking:     r.has_parking,
    canBook:        r.can_book,
    nextSlot:       r.next_slot,
    tonight:        r.tonight,
    suits:          r.suits || [],
    cover:          r.cover_url || REST_COVER[r.id] || '',
    intro:          r.intro,
    hours:          r.hours,
    address:        r.address,
    phone:          r.phone,
    deposit:        r.deposit,
    tags,
    gallery,
    dishes,
    rooms,
    reviewBreakdown: {
      taste:   r.taste_score,
      env:     r.env_score,
      service: r.service_score,
      room:    r.room_score,
    },
    floorPlanEnabled: r.floor_plan_enabled,
  }
}

function mapOrder(o) {
  const rest = o.restaurants || {}
  return {
    id:           o.id,
    restaurantId: o.restaurant_id,
    restaurant:   rest.name  || '',
    status:       o.status,
    statusText:   STATUS_TEXT[o.status] || o.status,
    date:         formatDate(o.booking_date),
    time:         formatTime(o.booking_time),
    party:        o.party_size,
    area:         o.area,
    table:        o.table_label,
    deposit:      o.deposit,
    consumed:     o.consumed,
    cancelReason: o.cancel_reason,
    refundStatus: o.refund_status,
    reviewed:     o.reviewed,
    cover:        rest.cover_url || REST_COVER[o.restaurant_id] || '',
    rTag:         rest.tag || '',
    // 动态倒计时（简化展示）
    countdown:    o.status === 'unpaid'  ? '00:14:59' : undefined,
    payExpire:    o.status === 'unpaid'  ? '15 分钟内未支付将自动取消' : undefined,
  }
}

function mapProfile(p) {
  return {
    name:      p.name,
    phone:     p.phone,
    avatar:    p.avatar_url || IMG.avatar.flora,
    level:     p.level,
    levelDesc: p.level_desc,
    points:    p.points,
    bookings:  p.bookings_count,
    favs:      p.favs_count,
    dishFavs:  p.dish_favs_count,
  }
}

function mapDish(d) {
  return {
    id:         String(d.id),
    name:       d.name,
    restaurant: d.restaurants?.name || '',
    rid:        d.restaurant_id,
    price:      d.price,
    tag:        d.tag,
    img:        d.img_url || DISH_IMG[d.name] || '',
    likes:      d.likes,
  }
}

// ─── API 函数 ────────────────────────────────────────────────────

export async function fetchRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      *,
      restaurant_tags(tag),
      restaurant_gallery(src_url, label, sort_order),
      dishes(name, price, img_url, tag, likes),
      rooms(name, min_spend, img_url, capacity_min, capacity_max)
    `)
    .order('rating', { ascending: false })

  if (error) throw error
  return data.map(mapRestaurant)
}

export async function fetchOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*, restaurants(name, tag, cover_url)')
    .eq('user_id', CURRENT_USER_ID)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data.map(mapOrder)
}

export async function fetchProfile() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', CURRENT_USER_ID)
    .single()

  if (error) throw error
  return mapProfile(data)
}

export async function fetchContacts() {
  const { data, error } = await supabase
    .from('contacts')
    .select('id, name, phone, tag')
    .eq('user_id', CURRENT_USER_ID)

  if (error) throw error
  return data
}

export async function fetchPointHistory() {
  const { data, error } = await supabase
    .from('point_history')
    .select('id, title, pts, ref_date')
    .eq('user_id', CURRENT_USER_ID)
    .order('ref_date', { ascending: false })

  if (error) throw error
  return data.map(d => ({ ...d, date: d.ref_date }))
}

export async function fetchTrendingDishes() {
  const { data, error } = await supabase
    .from('dishes')
    .select('*, restaurants(name)')
    .eq('is_trending', true)
    .order('likes', { ascending: false })

  if (error) throw error
  return data.map(mapDish)
}

export async function fetchThemes() {
  const { data, error } = await supabase
    .from('themes')
    .select('*')

  if (error) throw error
  return data.map(t => ({
    id:    t.id,
    name:  t.name,
    desc:  t.description,
    count: t.count,
    cover: t.cover_url || IMG.theme?.[t.id] || IMG.banner.shanghai_night,
  }))
}

export async function fetchRanks() {
  const { data, error } = await supabase
    .from('rankings')
    .select('*, ranking_restaurants(restaurant_id, sort_order)')
    .order('id')

  if (error) throw error
  return data.map(r => ({
    id:    r.id,
    title: r.title,
    desc:  r.description,
    cover: r.cover_url || IMG.banner.shanghai_night,
    list:  (r.ranking_restaurants || [])
             .sort((a, b) => a.sort_order - b.sort_order)
             .map(x => x.restaurant_id),
  }))
}

export async function fetchCities() {
  const { data, error } = await supabase
    .from('cities')
    .select('name, is_hot')
    .order('id')

  if (error) throw error
  return data.map(c => ({ name: c.name, hot: c.is_hot }))
}
