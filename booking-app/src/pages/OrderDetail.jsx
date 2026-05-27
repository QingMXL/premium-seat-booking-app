import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { useToast } from '../components/Toast.jsx'
import { orders } from '../data/mock.js'
import { cancelLimit, getRemaining, isCancelledLocally, tryCancel } from '../data/cancelStore.js'
import './OrderDetail.css'

export default function OrderDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const loc = useLocation()
  const toast = useToast()
  const o = orders.find(x => x.id === id) || orders[0]

  const [showCancel, setShowCancel] = useState(false)
  // 本地"已取消"状态：mock 数据本身不可变，所以用 local 标记呈现
  const [locallyCancelled, setLocallyCancelled] = useState(isCancelledLocally(o.id))
  const [remaining, setRemaining] = useState(getRemaining())

  // 返回按钮：从支付页跳来的，应回首页；否则正常 -1
  const onBack = () => {
    if (loc.state?.from === 'payment') nav('/home', { replace: true })
    else nav(-1)
  }

  const handleCancel = () => {
    const res = tryCancel(o.id)
    if (!res.ok) {
      setShowCancel(false)
      toast(res.reason)
      return
    }
    setLocallyCancelled(true)
    setRemaining(res.remaining)
    setShowCancel(false)
    toast(`已取消订单 · 本月还可取消 ${res.remaining} 次`)
  }

  // 渲染状态依据：如果本地已标记取消，覆盖原状态显示
  const displayStatus = locallyCancelled ? 'cancelled' : o.status
  const displayStatusText = locallyCancelled ? '已取消' : o.statusText

  return (
    <>
      <NavBar title="订单详情" onBack={onBack} />
      <div className="page-scroll od-scroll">
        <div className={`od-status od-status-${displayStatus}`}>
          <div className="od-status-row">
            <div className="od-status-tag">{displayStatusText}</div>
            {displayStatus === 'pending' && o.countdown && (
              <div className="od-countdown">距用餐 <b>{o.countdown}</b></div>
            )}
            {displayStatus === 'unpaid' && o.countdown && (
              <div className="od-countdown">支付剩余 <b>{o.countdown}</b></div>
            )}
            {locallyCancelled && (
              <div className="od-countdown">退款 1-3 个工作日到账</div>
            )}
          </div>
        </div>

        <div className="od-r-card" onClick={() => nav(`/restaurant/${o.restaurantId}`)}>
          <div className="od-r-img"><SmartImg src={o.cover} alt={o.restaurant} /></div>
          <div className="od-r-info">
            <div className="od-r-name r-name-serif">{o.restaurant}<span className="r-badge">{o.rTag}</span></div>
            <div className="od-r-meta">{o.area} · {o.table}</div>
          </div>
          <span className="od-r-arrow">›</span>
        </div>

        <div className="od-card">
          <div className="od-row"><span>日期</span><b>{o.date}</b></div>
          <div className="od-row"><span>时间</span><b>{o.time}</b></div>
          <div className="od-row"><span>人数</span><b>{o.party} 人</b></div>
          <div className="od-row"><span>区域 / 桌位</span><b>{o.area} · {o.table}</b></div>
          <div className="od-row"><span>联系人</span><b>Flora · 188 8888 8888</b></div>
        </div>

        <div className="od-card">
          <div className="od-row"><span>定金</span><b className="od-warn">¥ {o.deposit}</b></div>
          <div className="od-row">
            <span>支付状态</span>
            <b>{displayStatus === 'unpaid' ? '待支付' : '已支付'}</b>
          </div>
          {o.consumed && <div className="od-row"><span>实际消费</span><b className="od-warn">¥ {o.consumed}</b></div>}
          {o.refundStatus && <div className="od-row"><span>退款</span><b style={{color:'var(--c-primary)'}}>{o.refundStatus}</b></div>}
          {locallyCancelled && (
            <div className="od-row"><span>退款</span><b style={{color:'var(--c-primary)'}}>退款 ¥{o.deposit} 处理中</b></div>
          )}
          <div className="od-row"><span>抵扣规则</span><b>可抵到店消费</b></div>
          <div className="od-row"><span>取消规则</span><b>用餐前 2h 可全额退</b></div>
        </div>

        {displayStatus === 'pending' && (
          <div className="od-qr-card">
            <div className="qr-mock big">
              <div className="qr-dot tl" /><div className="qr-dot tr" /><div className="qr-dot bl" />
            </div>
            <div className="od-qr-text">到店核销码 · 出示给服务员</div>
            <div className="od-qr-num">No. {o.id.toUpperCase()}</div>
          </div>
        )}

        {displayStatus === 'unpaid' && (
          <button className="btn-primary" style={{margin: '14px 14px 0', height: 48, width: 'calc(100% - 28px)'}} onClick={() => nav('/payment-result', { state: { deposit: o.deposit }})}>
            立即支付 ¥ {o.deposit}
          </button>
        )}

        {displayStatus === 'done' && !o.reviewed && (
          <button className="btn-primary gold" style={{margin: '14px 14px 0', height: 48, width: 'calc(100% - 28px)'}} onClick={() => toast('打开评价表单 +30 积分')}>
            ★ 评价订单 · 赚 30 积分
          </button>
        )}

        <div style={{height: 120}} />
      </div>

      <div className="od-footer">
        {displayStatus === 'pending' && (
          <>
            <button className="btn-outline" onClick={() => nav(`/orders/${o.id}/share`)}>分享好友</button>
            <button className="btn-outline" onClick={() => toast('已通知商家')}>联系商家</button>
            <button className="btn-outline" onClick={() => toast(`已导航至 ${o.restaurant}`)}>导航</button>
            <button className="btn-primary" style={{flex:1}} onClick={() => setShowCancel(true)}>申请取消</button>
          </>
        )}
        {displayStatus === 'unpaid' && (
          <>
            <button className="btn-outline" onClick={() => setShowCancel(true)}>取消订单</button>
            <button className="btn-primary" style={{flex:1}} onClick={() => nav('/payment-result', { state: { deposit: o.deposit }})}>立即支付 ¥{o.deposit}</button>
          </>
        )}
        {displayStatus === 'done' && (
          <>
            <button className="btn-outline" onClick={() => toast('已发起开票')}>开发票</button>
            <button className="btn-outline" onClick={() => nav(`/booking/${o.restaurantId}`)}>一键复订</button>
            <button className="btn-primary" style={{flex:1}} onClick={() => toast('打开评价表单')}>
              {o.reviewed ? '查看评价' : '去评价'}
            </button>
          </>
        )}
        {displayStatus === 'cancelled' && (
          <>
            <button className="btn-outline" onClick={() => toast('已联系客服')}>联系客服</button>
            <button className="btn-primary" style={{flex:1}} onClick={() => nav(`/booking/${o.restaurantId}`)}>重新预订</button>
          </>
        )}
      </div>

      {showCancel && (
        <div className="modal-mask" onClick={() => setShowCancel(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title">确认取消订单？</div>
            <div className="modal-sub">{o.restaurant} · {o.date} {o.time}</div>

            <div className="cancel-policy">
              <div className="cp-row">
                <span className="cp-dot" />
                <span>距用餐时间 &gt; 2 小时，定金 <b className="od-warn">¥{o.deposit}</b> 原路退还</span>
              </div>
              <div className="cp-row">
                <span className="cp-dot" />
                <span>每位用户每月最多取消 <b>{cancelLimit}</b> 次预订</span>
              </div>
              <div className="cp-row">
                <span className="cp-dot" />
                <span>本月剩余可取消次数：<b className={remaining === 0 ? 'od-warn' : ''}>{remaining} 次</b></span>
              </div>
            </div>

            <div className="modal-actions" style={{marginTop: 6}}>
              <button className="btn-outline" onClick={() => setShowCancel(false)}>再想想</button>
              <button
                className="btn-primary"
                style={{flex:1, marginLeft: 8, opacity: remaining === 0 ? 0.5 : 1}}
                disabled={remaining === 0}
                onClick={handleCancel}
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
