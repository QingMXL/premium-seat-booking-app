import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import TabBar from '../components/TabBar.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { useToast } from '../components/Toast.jsx'
import { orders } from '../data/mock.js'
import './Orders.css'

const tabs = [
  { key: 'unpaid',    label: '待支付' },
  { key: 'pending',   label: '待到店' },
  { key: 'done',      label: '已完成' },
  { key: 'cancelled', label: '已取消' },
]

export default function Orders() {
  const [tab, setTab] = useState('pending')
  const nav = useNavigate()
  const toast = useToast()

  const list = useMemo(() => orders.filter(o => o.status === tab), [tab])

  // 各 Tab 的统计角标
  const counts = useMemo(() => {
    const m = { unpaid: 0, pending: 0, done: 0, cancelled: 0 }
    orders.forEach(o => { m[o.status] = (m[o.status] || 0) + 1 })
    return m
  }, [])

  return (
    <>
      <NavBar title="我的订单" />
      <div className="orders-tabs">
        {tabs.map(t => (
          <span
            key={t.key}
            className={`o-tab ${tab === t.key ? 'on' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {/* 仅在「待支付」且有数据时显示红圈数字（提醒立即处理） */}
            {t.key === 'unpaid' && counts.unpaid > 0 && (
              <span className="o-badge-red">{counts.unpaid}</span>
            )}
          </span>
        ))}
      </div>

      <div className="page-scroll orders-list">
        {list.length === 0 && (
          <div className="empty">
            <div className="empty-icon">☷</div>
            <div className="empty-text">
              {tab === 'unpaid' && '暂无待支付订单'}
              {tab === 'pending' && '暂无待到店订单'}
              {tab === 'done' && '暂无已完成订单'}
              {tab === 'cancelled' && '暂无已取消订单'}
            </div>
            <button className="btn-outline" onClick={() => nav('/home')}>去预订餐厅</button>
          </div>
        )}

        {list.map(o => (
          <div className="order-card" key={o.id} onClick={() => nav(`/orders/${o.id}`)}>
            <div className="order-head">
              <div className="order-img">
                <SmartImg src={o.cover} alt={o.restaurant} />
              </div>
              <div className="order-info">
                <div className="order-name">
                  {o.restaurant}
                  {o.rTag && <span className="r-badge">{o.rTag}</span>}
                </div>
                <div className="order-meta">
                  <span>{o.date}</span>
                  <span className="dot">·</span>
                  <span>{o.time}</span>
                  <span className="dot">·</span>
                  <span>{o.party}人</span>
                </div>
                <div className="order-meta">
                  <span>{o.area} · {o.table}</span>
                </div>
              </div>
              <div className="order-status">
                <span className={`status-tag ${o.status}`}>{o.statusText}</span>
              </div>
            </div>

            {/* 待支付：倒计时 + 立即支付 */}
            {o.status === 'unpaid' && (
              <>
                <div className="unpaid-bar">
                  <div className="unpaid-info">
                    <div>应付定金 <b>¥ {o.deposit}</b></div>
                    <div className="unpaid-expire">{o.payExpire || '15 分钟内未支付将自动取消'}</div>
                  </div>
                  <div className="unpaid-time">
                    <div className="unpaid-time-label">剩余</div>
                    <div className="unpaid-time-val">{o.countdown}</div>
                  </div>
                </div>
                <div className="order-actions">
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); nav(`/orders/${o.id}`) }}>取消订单</button>
                  <button className="btn-primary" style={{flex:1, height: 36, fontSize: 14}} onClick={(e) => { e.stopPropagation(); nav('/payment-result', { state: { deposit: o.deposit } }) }}>
                    立即支付 ¥ {o.deposit}
                  </button>
                </div>
              </>
            )}

            {/* 待到店：核销二维码 + 倒计时 */}
            {o.status === 'pending' && (
              <>
                <div className="order-qr">
                  <div className="qr-info">
                    <div className="qr-deposit">已支付定金 <b>¥ {o.deposit}</b></div>
                    <div className="qr-tip">可抵扣到店消费</div>
                  </div>
                  <div className="qr-box">
                    <div className="qr-mock">
                      <div className="qr-dot tl" /><div className="qr-dot tr" /><div className="qr-dot bl" />
                    </div>
                    <div className="qr-text">到店出示核销</div>
                  </div>
                </div>
                {o.countdown && (
                  <div className="order-countdown">
                    距用餐时间：<b>{o.countdown}</b>
                  </div>
                )}
                <div className="order-actions">
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); nav(`/orders/${o.id}`) }}>查看详情</button>
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); nav(`/orders/${o.id}/share`) }}>分享好友</button>
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); toast('已通知商家') }}>联系商家</button>
                </div>
              </>
            )}

            {/* 已完成：消费记录 + 评价 */}
            {o.status === 'done' && (
              <>
                <div className="order-bot">
                  <div className="bot-info">
                    <span>实际消费金额</span>
                    <b className="bot-price">¥ {o.consumed}</b>
                  </div>
                  {o.reviewed
                    ? <span className="tag green">已评价</span>
                    : <button className="btn-outline solid" onClick={(e) => { e.stopPropagation(); toast('打开评价表单') }}>
                        去评价 +30 积分
                      </button>}
                </div>
                <div className="order-actions">
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); nav(`/booking/${o.restaurantId}`) }}>一键复订</button>
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); toast('已申请开发票') }}>开发票</button>
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); nav(`/orders/${o.id}`) }}>查看详情</button>
                </div>
              </>
            )}

            {/* 已取消：取消原因 + 退款进度 */}
            {o.status === 'cancelled' && (
              <>
                <div className="cancel-bar">
                  <div className="cancel-row">
                    <span className="cancel-label">取消原因</span>
                    <span className="cancel-val">{o.cancelReason}</span>
                  </div>
                  <div className="cancel-row">
                    <span className="cancel-label">退款进度</span>
                    <span className="cancel-val success">{o.refundStatus}</span>
                  </div>
                </div>
                <div className="order-actions">
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); nav(`/booking/${o.restaurantId}`) }}>重新预订</button>
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); toast('已联系客服') }}>联系客服</button>
                </div>
              </>
            )}
          </div>
        ))}

        {list.length > 0 && (
          <div style={{height: 28, textAlign: 'center', color: 'var(--c-text-4)', fontSize: 12, padding: '10px 0'}}>
            订单仅保留 1 年 · 可联系客服补开发票
          </div>
        )}
      </div>

      <TabBar />
    </>
  )
}
