import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SmartImg from '../components/SmartImg.jsx'
import { useToast } from '../components/Toast.jsx'
import { restaurants } from '../data/mock.js'
import './Restaurant.css'

export default function Restaurant() {
  const { id } = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const r = restaurants.find(x => x.id === id) || restaurants[0]
  const [imgIdx, setImgIdx] = useState(0)
  const [fav, setFav] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  return (
    <>
      <div className="page-scroll restaurant-page">
        <div className="r-cover">
          <SmartImg src={r.gallery[imgIdx].src} alt={r.name} />
          <div className="r-cover-mask" />
          <div className="r-cover-nav">
            <div className="r-back" onClick={() => nav(-1)}>‹</div>
            <div className="r-cover-actions">
              <span onClick={() => toast('已生成餐厅分享卡片')}>↗</span>
              <span onClick={() => { setFav(f => !f); toast(fav ? '已取消收藏' : '已收藏餐厅') }}>{fav ? '♥' : '♡'}</span>
              <span onClick={() => toast('更多功能开发中')}>···</span>
            </div>
          </div>
          <div className="r-cover-pager">{imgIdx + 1}/{r.gallery.length}</div>
          <div className="r-cover-thumbs">
            {r.gallery.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === imgIdx ? 'on' : ''}`}
                onClick={() => setImgIdx(i)}
              />
            ))}
          </div>
        </div>

        <div className="r-main">
          <div className="r-head">
            <div className="r-head-info">
              <h2 className="r-name">{r.name}<span className="r-badge">{r.tag}</span></h2>
              <div className="r-meta">
                <span className="rating"><span className="star">★</span>{r.rating}</span>
                <span>{r.reviews} 评价</span>
              </div>
            </div>
            <div className="r-quickbtns">
              <div onClick={() => setShowPhone(true)}>
                <span>☎</span><div>电话</div>
              </div>
              <div onClick={() => toast(`已打开地图导航至${r.name}`)}>
                <span>↗</span><div>导航</div>
              </div>
              <div onClick={() => toast('已生成餐厅分享卡片')}>
                <span>≡</span><div>分享</div>
              </div>
              <div onClick={() => { setFav(f => !f); toast(fav ? '已取消收藏' : '已收藏餐厅') }}>
                <span style={{color: fav ? 'var(--c-warn)' : ''}}>{fav ? '♥' : '♡'}</span>
                <div>{fav ? '已收藏' : '收藏'}</div>
              </div>
            </div>
          </div>

          <div className="r-info-line">营业时间 {r.hours}</div>
          <div className="r-info-line">{r.address} · 距您 {r.distance}</div>

          <div className="r-tag-row">
            {r.tags.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>

        <div className="r-section">
          <div className="r-section-title">
            <h3>环境</h3>
            <span onClick={() => toast(`共 ${r.gallery.length} 张环境图`)}>查看全部 ›</span>
          </div>
          <div className="r-env">
            {r.gallery.slice(0, 4).map((g, i) => (
              <div className="env-item" key={i} onClick={() => setImgIdx(i)}>
                <SmartImg src={g.src} alt={g.label} />
                <div className="env-label">{g.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="r-section r-signature">
          <div className="menu-title">
            <span className="en">SIGNATURE DISHES</span>
            <span className="zh">招 牌 菜 单</span>
            <div className="deco" />
          </div>
          <div className="r-dishes-menu">
            {r.dishes.map((d, i) => (
              <div className="dish-menu-item" key={i} onClick={() => toast(`已查看：${d.name}`)}>
                <div className="dish-menu-img">
                  <SmartImg src={d.img} alt={d.name} />
                </div>
                <div className="dish-menu-info">
                  <div className="menu-row">
                    <span className="name">{d.name}</span>
                    <span className="dots" />
                    <span className="price">¥{d.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="r-menu-more" onClick={() => toast('查看完整菜单')}>
            <span>查看完整菜单</span>
            <span className="gold-text">›</span>
          </div>
        </div>

        {r.rooms.length > 0 && (
          <div className="r-section">
            <div className="r-section-title">
              <h3>包间 / 座位图</h3>
              <span onClick={() => nav(`/booking/${r.id}`)}>查看平面图 ›</span>
            </div>
            <div className="r-rooms">
              {r.rooms.map((rm, i) => (
                <div className="room-row" key={i}>
                  <div className="room-img"><SmartImg src={rm.img} alt={rm.name} /></div>
                  <div className="room-info">
                    <div className="room-name">{rm.name}</div>
                    <div className="room-spend">{rm.minSpend}</div>
                  </div>
                  <button className="btn-outline" onClick={() => nav(`/booking/${r.id}`)}>预订</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="r-section">
          <div className="r-section-title">
            <h3>用户评价 <span className="rating-lg"><span className="star">★</span>{r.rating}</span></h3>
            <span onClick={() => toast(`查看全部 ${r.reviews} 条评价`)}>全部 {r.reviews} ›</span>
          </div>
          <div className="r-review-bar">
            {[
              ['口味', r.reviewBreakdown.taste],
              ['环境', r.reviewBreakdown.env],
              ['服务', r.reviewBreakdown.service],
              ['包间', r.reviewBreakdown.room],
            ].map(([k, v]) => (
              <div className="rb-item" key={k}>
                <div className="rb-key">{k}</div>
                <div className="rb-val">{v}%</div>
              </div>
            ))}
          </div>
          <div className="r-review-card">
            <div className="rv-head">
              <span className="rv-avatar">林</span>
              <div>
                <div className="rv-name">林小姐</div>
                <div className="rv-date">2025-05-12 · 包间用餐</div>
              </div>
              <span className="rating" style={{marginLeft:'auto'}}><span className="star">★</span>5.0</span>
            </div>
            <div className="rv-text">环境一流，包间安静，菜品精致，服务体贴。商务宴请非常合适。</div>
          </div>
        </div>

        <div style={{height: 120}} />
      </div>

      <div className="r-footer">
        <div className="r-footer-left">
          <div className="r-foot-deposit">最低定金 <span className="r-foot-price">¥{r.deposit}</span></div>
          <div className="r-foot-slot">最近 {r.nextSlot}</div>
        </div>
        <button className="btn-primary" style={{flex:1, marginLeft: 12}} onClick={() => nav(`/booking/${r.id}`)}>
          立即预订
        </button>
      </div>

      {showPhone && (
        <div className="modal-mask" onClick={() => setShowPhone(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title">联系商家</div>
            <div className="modal-sub">{r.name}</div>
            <div className="modal-phone">{r.phone}</div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setShowPhone(false)}>取消</button>
              <button className="btn-primary" style={{flex:1, marginLeft: 8}} onClick={() => { setShowPhone(false); toast('已发起拨号') }}>立即拨打</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
