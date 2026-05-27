import NavBar from '../components/NavBar.jsx'
import './Help.css'

const faqs = [
  { q: '什么是定金？如何抵扣？', a: '定金用于锁定座位与时段；到店消费后，定金会自动抵扣同等金额的账单。' },
  { q: '我可以取消订单吗？', a: '用餐前 2 小时之前可全额退还定金；超过该时间将不予退还，请谅解。' },
  { q: '迟到了怎么办？', a: '商家承诺保留座位 15 分钟；可在订单详情中点击"我会迟到"通知商家。' },
  { q: '订单可以转给朋友吗？', a: '可以使用"分享好友"按钮将订单分享给同行好友查看；目前不支持转让发起人。' },
  { q: '商家原因取消怎么办？', a: '商家原因取消的订单将原路退还定金，并补偿优惠券或积分。' },
  { q: '怎么开发票？', a: '到店核销后 30 天内可在订单详情中申请电子发票。' },
]

export default function Help() {
  return (
    <>
      <NavBar title="客服与帮助" />
      <div className="page-scroll help-scroll">
        <div className="help-banner">
          <div>
            <div className="hb-title">在线客服</div>
            <div className="hb-sub">9:00-22:00 · 高峰排队</div>
          </div>
          <button className="btn-primary" style={{height: 36, padding: '0 16px'}}>立即咨询</button>
        </div>

        <div className="section-title"><h3>常见问题</h3></div>
        <div className="help-list">
          {faqs.map((f, i) => (
            <details className="faq" key={i}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>

        <div className="help-foot">
          <div>客服电话：400-888-8888</div>
          <div>合作邮箱：partner@zhenxuan.com</div>
        </div>
      </div>
    </>
  )
}
