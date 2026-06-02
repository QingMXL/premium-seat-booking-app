import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { useToast } from '../components/Toast.jsx'
import { useApp } from '../context/AppContext.jsx'
import './Discover.css'

const tabs = [
  { key: 'rec',   label: '推荐' },
  { key: 'signature', label: '招牌菜' },
  { key: 'rank',  label: '榜单' },
  { key: 'theme', label: '主题' },
]

export default function Discover() {
  const nav = useNavigate()
  const toast = useToast()
  const [tab, setTab] = useState('rec')
  const { trendingDishes, themes, ranks, restaurants } = useApp()

  return (
    <>
      <div className="disc-navbar">发现美食</div>
      <div className="disc-tabs">
        {tabs.map(t => (
          <span
            key={t.key}
            className={`disc-tab ${tab === t.key ? 'on' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="page-scroll disc-scroll">
        {tab === 'rec' && (
          <div className="disc-grid">
            {trendingDishes.map(d => (
              <div className="disc-card" key={d.id} onClick={() => nav(`/restaurant/${d.rid}`)}>
                <div className="disc-card-img">
                  <SmartImg src={d.img} alt={d.name} />
                  <span className="disc-tag-floating">{d.tag}</span>
                </div>
                <div className="disc-card-body">
                  <div className="disc-name">{d.name}</div>
                  <div className="disc-meta">
                    <span className="disc-rest">{d.restaurant}</span>
                    <span className="disc-price">¥{d.price}</span>
                  </div>
                  <div className="disc-bottom">
                    <span className="disc-fav" onClick={(e) => { e.stopPropagation(); toast('已收藏菜品') }}>♡ {d.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'signature' && (
          <div className="signature-list">
            {restaurants.filter(r => r.dishes && r.dishes.length > 0).map(r => (
              <div className="sig-block" key={r.id}>
                <div className="sig-header" onClick={() => nav(`/restaurant/${r.id}`)}>
                  <div className="sig-r-img"><SmartImg src={r.cover} alt={r.name} /></div>
                  <div className="sig-r-info">
                    <div className="sig-r-name">{r.name}</div>
                    <div className="sig-r-meta">{r.cuisine} · {r.district}</div>
                  </div>
                  <span className="sig-more">查看 ›</span>
                </div>
                <div className="sig-dishes">
                  {r.dishes.map((d, i) => (
                    <div className="sig-dish" key={i} onClick={() => toast(`查看：${d.name}`)}>
                      <div className="sig-dish-img"><SmartImg src={d.img} alt={d.name} /></div>
                      <div className="sig-dish-name">{d.name}</div>
                      <div className="sig-dish-price">¥{d.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'rank' && (
          <div className="rank-list">
            {ranks.map(rk => (
              <div className="rank-card" key={rk.id}>
                <div className="rank-banner">
                  <SmartImg src={rk.cover} alt={rk.title} />
                  <div className="rank-banner-mask">
                    <div className="rank-title">{rk.title}</div>
                    <div className="rank-desc">{rk.desc}</div>
                  </div>
                </div>
                <div className="rank-restaurants">
                  {rk.list.slice(0, 5).map((rid, i) => {
                    const rr = restaurants.find(x => x.id === rid)
                    if (!rr) return null
                    return (
                      <div className="rank-row" key={rid} onClick={() => nav(`/restaurant/${rid}`)}>
                        <span className={`rank-no rank-${i+1}`}>{i + 1}</span>
                        <div className="rank-img"><SmartImg src={rr.cover} alt={rr.name} /></div>
                        <div className="rank-info">
                          <div className="rank-name">{rr.name}</div>
                          <div className="rank-meta">
                            <span className="rating"><span className="star">★</span>{rr.rating}</span>
                            <span>·</span>
                            <span>¥{rr.price}/人</span>
                            <span>·</span>
                            <span>{rr.cuisine}</span>
                          </div>
                        </div>
                        <button className="btn-outline" onClick={(e) => { e.stopPropagation(); nav(`/booking/${rid}`) }}>
                          预订
                        </button>
                      </div>
                    )
                  })}
                </div>
                <div className="rank-more" onClick={() => toast(`查看完整 ${rk.title}`)}>查看完整榜单 ›</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'theme' && (
          <div className="theme-grid">
            {themes.map(t => (
              <div className="theme-card" key={t.id} onClick={() => toast(`进入主题：${t.name}`)}>
                <div className="theme-cover">
                  <SmartImg src={t.cover} alt={t.name} />
                  <div className="theme-mask">
                    <div className="theme-name">{t.name}</div>
                    <div className="theme-desc">{t.desc}</div>
                    <div className="theme-count">{t.count} 家餐厅 ›</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{height: 28, textAlign: 'center', color: 'var(--c-text-4)', fontSize: 12, padding: '14px 0'}}>
          — 已经到底了 —
        </div>
      </div>
      <TabBar />
    </>
  )
}
