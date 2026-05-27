import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/home',     label: '首页',  icon: '⌂' },
  { path: '/discover', label: '发现',  icon: '✦' },
  { path: '/orders',   label: '订单',  icon: '☷' },
  { path: '/profile',  label: '我的',  icon: '◔' },
]

export default function TabBar() {
  const loc = useLocation()
  const nav = useNavigate()
  return (
    <div className="tabbar">
      {tabs.map(t => {
        const active = loc.pathname.startsWith(t.path)
        return (
          <div key={t.path}
               className={`tab ${active ? 'active' : ''}`}
               onClick={() => nav(t.path)}>
            <span className="tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </div>
        )
      })}
    </div>
  )
}
