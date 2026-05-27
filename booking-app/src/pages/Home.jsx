import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { restaurants, quickFilters, scenes } from '../data/mock.js'
import { IMG } from '../data/images.js'
import { useToast } from '../components/Toast.jsx'
import './Home.css'

export default function Home() {
  const nav = useNavigate()
  const toast = useToast()
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return restaurants
    if (active === 'nearby')  return [...restaurants].sort((a,b) => a.distanceVal - b.distanceVal)
    if (active === 'room')    return restaurants.filter(r => r.hasRoom)
    if (active === 'tonight') return restaurants.filter(r => r.tonight)
    if (active === 'bar')     return restaurants.filter(r => r.suits?.includes('bar'))
    if (active === 'hotel')   return restaurants.filter(r => r.price >= 500)
    return restaurants.filter(r => r.suits?.includes(active))
  }, [active])

  const activeFilter = quickFilters.find(f => f.key === active)
  const empty = filtered.length === 0

  return (
    <>
      <div className="home-header">
        <div className="home-topbar">
          <div className="city" onClick={() => nav('/city')}>
            <span>上海</span>
            <span className="caret">▾</span>
          </div>
          <div className="search-box" onClick={() => nav('/search')}>
            <span className="search-icon">⌕</span>
            <span className="search-ph">搜索餐厅 / 菜系 / 商圈</span>
          </div>
          <div className="msg-icon" onClick={() => toast('暂无新消息')}>♡</div>
        </div>

        <div className="banner">
          <div className="banner-img-wrap">
            <SmartImg src={IMG.banner.luxe_dining} alt="精选餐厅" />
          </div>
          <div className="banner-vignette" />
          <div className="banner-mask">
            <div className="banner-en">CURATED · FINE · DINING</div>
            <div className="banner-deco">
              <span className="deco-line" />
              <span className="deco-dot">✦</span>
              <span className="deco-line" />
            </div>
            <div className="banner-title">臻 选 好 餐 厅</div>
            <div className="banner-subtitle">每 一 餐 都 值 得 期 待</div>
            <div className="banner-tags">
              <span>品质甄选</span>
              <span className="sep">·</span>
              <span>预订保障</span>
              <span className="sep">·</span>
              <span>无忧体验</span>
            </div>
          </div>
        </div>

        <div className="quick-scroll">
          {quickFilters.map(f => (
            <span
              key={f.key}
              className={`chip ${active === f.key ? 'solid' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>

      <div className="page-scroll home-scroll">
        <div className="section-title">
          <h3>
            {activeFilter && activeFilter.key !== 'all' ? `${activeFilter.label} · ` : ''}
            推荐餐厅
            <span className="count">{filtered.length}</span>
          </h3>
          <span className="more" onClick={() => nav('/search')}>查看全部 ›</span>
        </div>

        {empty ? (
          <div className="empty">
            <div className="empty-icon">✦</div>
            <div className="empty-text">暂无符合条件的餐厅</div>
            <button className="btn-outline" onClick={() => setActive('all')}>查看全部</button>
          </div>
        ) : (
          filtered.map(r => <RestaurantCard r={r} key={r.id} />)
        )}

        <div className="section-title">
          <h3>热门场景</h3>
          <span className="more" onClick={() => toast('更多场景即将上线')}>查看更多 ›</span>
        </div>

        <div className="scenes-grid">
          {scenes.map(s => (
            <div className="scene" key={s.key} onClick={() => { setActive(s.key); window.scrollTo({top: 0}) }}>
              <div className="scene-cover">
                <SmartImg src={s.cover} alt={s.name} />
                <div className="scene-mask">{s.name}</div>
              </div>
              <div className="scene-meta">
                <div className="scene-name">{s.name}</div>
                <div className="scene-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{height: 28, textAlign: 'center', color: 'var(--c-text-4)', fontSize: 12, padding: '10px 0'}}>
          — 已经到底了 —
        </div>
      </div>
      <TabBar />
    </>
  )
}
