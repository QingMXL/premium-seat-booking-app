import { useLocation, useNavigate } from 'react-router-dom'
import './PaymentResult.css'

export default function PaymentResult() {
  const nav = useNavigate()
  const { state } = useLocation()
  const deposit = state?.deposit ?? 50

  // 跳转订单详情时标记 from: 'payment'，让订单详情返回时回首页（而不是回到支付成功页）
  const goOrder = () => nav('/orders/o1001', { replace: true, state: { from: 'payment' } })
  const goShare = () => nav('/orders/o1001/share', { replace: true, state: { from: 'payment' } })
  const goHome  = () => nav('/home', { replace: true })

  return (
    <div className="pay-result">
      <div className="pay-en">PAYMENT CONFIRMED</div>
      <div className="pay-success-icon">✓</div>
      <div className="pay-title r-name-serif">支付成功</div>
      <div className="pay-deposit">¥{deposit} <span>定金</span></div>

      <div className="pay-card">
        <div className="pay-row">
          <span>预订状态</span>
          <b>待商家确认</b>
        </div>
        <div className="pay-row">
          <span>座位保留</span>
          <b>15 分钟</b>
        </div>
        <div className="pay-row">
          <span>抵扣规则</span>
          <b>到店可抵 ¥{deposit}</b>
        </div>
      </div>

      <div className="pay-actions">
        <button className="btn-outline" onClick={goOrder}>查看订单</button>
        <button className="btn-primary" style={{flex:1}} onClick={goShare}>分享好友</button>
      </div>

      <div className="pay-back" onClick={goHome}>返回首页</div>
    </div>
  )
}
