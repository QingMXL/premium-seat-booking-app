import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { useToast } from '../components/Toast.jsx'
import { useApp } from '../context/AppContext.jsx'
import { IMG } from '../data/images.js'
import './Profile.css'

export default function Profile() {
  const nav = useNavigate()
  const toast = useToast()
  const { user, orders, coupons } = useApp()

  const entries = [
    { key: 'orders',    label: '我的预订', icon: '☷', to: '/orders' },
    { key: 'favs',      label: '我的收藏', icon: '♥', to: '/favorites' },
    { key: 'points',    label: '我的积分', icon: '✦', to: '/points' },
    { key: 'contacts',  label: '常用联系人', icon: '☺', to: '/contacts' },
    { key: 'service',   label: '客服帮助', icon: '☎', to: '/help' },
  ]

  const recent = orders.filter(o => o.status === 'pending' || o.status === 'done').slice(0, 2)

  return (
    <>
      <div className="profile-page">
        <div className="profile-navbar">
          我的
          <span className="profile-set" onClick={() => nav('/phone')}>设置 ⚙</span>
        </div>

        <div className="page-scroll profile-scroll">
          <div className="profile-hero">
            <div className="hero-bg">
              <SmartImg src={IMG.banner.shanghai_night} alt="bg" />
            </div>
            <div className="hero-content">
              <div className="hero-row">
                <div className="hero-avatar">
                  <SmartImg src={user.avatar} alt="avatar" />
                </div>
                <div className="hero-name-wrap">
                  <div className="hero-name">{user.name}</div>
                  <div className="hero-level">
                    <span className="lv-tag">★ {user.level}</span>
                  </div>
                </div>
                <div className="hero-points" onClick={() => nav('/points')}>
                  <div className="hero-pts-num">{user.points}</div>
                  <div className="hero-pts-lb">积分明细 ›</div>
                </div>
              </div>
            </div>
          </div>

          <div className="entries">
            {entries.map(e => (
              <div className="entry" key={e.key} onClick={() => nav(e.to)}>
                <div className="entry-icon">{e.icon}</div>
                <div className="entry-label">{e.label}</div>
              </div>
            ))}
          </div>

          <div className="section-title">
            <h3>最近预订</h3>
            <span className="more" onClick={() => nav('/orders')}>查看全部 ›</span>
          </div>
          <div className="recent">
            {recent.map(o => (
              <div className="rec-item" key={o.id} onClick={() => nav(`/orders/${o.id}`)}>
                <div className="rec-img"><SmartImg src={o.cover} alt={o.restaurant} /></div>
                <div className="rec-info">
                  <div className="rec-name">{o.restaurant}<span className="r-badge">{o.rTag}</span></div>
                  <div className="rec-meta">{o.date} · {o.time} · {o.party} 人</div>
                </div>
                <button
                  className="btn-outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (o.status === 'pending') nav(`/orders/${o.id}`)
                    else nav(`/booking/${o.restaurantId}`)
                  }}
                >
                  {o.status === 'pending' ? '预订详情' : '一键复订'}
                </button>
              </div>
            ))}
          </div>

          <div className="section-title">
            <h3>会员专享礼遇</h3>
            <span className="more" onClick={() => toast('查看完整礼遇墙')}>查看礼遇墙 ›</span>
          </div>
          <div className="coupons">
            {coupons.map(c => (
              <div className="coupon" key={c.id}>
                <div className="coupon-val">
                  {c.value > 0 ? <>¥<b>{c.value}</b></> : <b style={{fontSize: 14}}>{c.special}</b>}
                </div>
                <div className="coupon-title">{c.title}</div>
                <div className="coupon-desc">{c.desc}</div>
                <button className="coupon-btn" onClick={() => toast(`已使用：${c.title}`)}>去使用</button>
              </div>
            ))}
          </div>

          <div className="member-banner" onClick={() => toast('查看完整会员权益')}>
            <div>
              <div className="mb-title">★ 金卡会员专享礼遇</div>
              <div className="mb-sub">优先预订 · 专属客服 · 生日礼遇</div>
            </div>
            <div className="mb-cta">
              <div>升级权益</div>
              <div className="mb-tip">了解更多 ›</div>
            </div>
          </div>

          <div style={{height: 28}} />
        </div>

        <TabBar />
      </div>
    </>
  )
}
