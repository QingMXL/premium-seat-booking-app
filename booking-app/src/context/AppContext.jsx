import { createContext, useContext, useEffect, useState } from 'react'
import {
  fetchRestaurants, fetchOrders, fetchProfile,
  fetchContacts, fetchPointHistory, fetchTrendingDishes,
  fetchThemes, fetchRanks, fetchCities,
} from '../data/api.js'
import { coupons } from '../data/mock.js'   // coupons 暂未入库，保留 mock

const AppContext = createContext(null)

const DEFAULT_USER = {
  name: '', phone: '', avatar: '', level: '—', levelDesc: '',
  points: 0, bookings: 0, favs: 0, dishFavs: 0,
}

const EMPTY = {
  restaurants:    [],
  orders:         [],
  user:           DEFAULT_USER,
  contacts:       [],
  pointHistory:   [],
  trendingDishes: [],
  themes:         [],
  ranks:          [],
  cities:         [],
  coupons,
  loading:        true,
  error:          null,
}

export function AppProvider({ children }) {
  const [state, setState] = useState(EMPTY)

  useEffect(() => {
    // 公开数据与用户数据分开加载：公开数据失败才算致命错误
    async function load() {
      try {
        // ① 公开数据（anon key 下可访问）
        const [restaurants, trendingDishes, themes, ranks, cities] = await Promise.all([
          fetchRestaurants(),
          fetchTrendingDishes(),
          fetchThemes(),
          fetchRanks(),
          fetchCities(),
        ])

        // ② 用户数据（需要登录 / service_role；失败时优雅降级为空）
        const [orders, user, contacts, pointHistory] = await Promise.allSettled([
          fetchOrders(),
          fetchProfile(),
          fetchContacts(),
          fetchPointHistory(),
        ]).then(results => results.map(r => r.value ?? (r.reason && null)))

        setState({
          restaurants, trendingDishes, themes, ranks, cities,
          orders:       orders       ?? [],
          user:         user         ?? DEFAULT_USER,
          contacts:     contacts     ?? [],
          pointHistory: pointHistory ?? [],
          coupons,
          loading: false,
          error: null,
        })
      } catch (err) {
        console.error('[AppContext] 公开数据加载失败:', err)
        setState(s => ({ ...s, loading: false, error: err.message }))
      }
    }
    load()
  }, [])

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
