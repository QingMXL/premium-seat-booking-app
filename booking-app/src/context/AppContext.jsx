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
    Promise.all([
      fetchRestaurants(),
      fetchOrders(),
      fetchProfile(),
      fetchContacts(),
      fetchPointHistory(),
      fetchTrendingDishes(),
      fetchThemes(),
      fetchRanks(),
      fetchCities(),
    ])
      .then(([restaurants, orders, user, contacts, pointHistory,
              trendingDishes, themes, ranks, cities]) => {
        setState({
          restaurants, orders, user, contacts, pointHistory,
          trendingDishes, themes, ranks, cities,
          coupons,
          loading: false,
          error: null,
        })
      })
      .catch(err => {
        console.error('[AppContext] 数据加载失败:', err)
        setState(s => ({ ...s, loading: false, error: err.message }))
      })
  }, [])

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
