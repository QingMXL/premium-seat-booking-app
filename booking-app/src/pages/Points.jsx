import NavBar from '../components/NavBar.jsx'
import { useApp } from '../context/AppContext.jsx'
import './Points.css'

export default function Points() {
  const { user, pointHistory } = useApp()
  return (
    <>
      <NavBar title="我的积分" right={<span style={{fontSize:12, color:'var(--c-primary)'}}>积分规则</span>} />
      <div className="page-scroll pts-scroll">
        <div className="pts-hero">
          <div className="pts-num">{user.points}</div>
          <div className="pts-lb">当前可用积分</div>
          <div className="pts-actions">
            <button className="btn-primary gold">兑换权益</button>
            <button className="btn-outline" style={{color:'#fff', borderColor:'rgba(255,255,255,0.5)'}}>赚积分</button>
          </div>
        </div>

        <div className="section-title"><h3>赚积分</h3></div>
        <div className="pts-earn">
          {[
            ['完成预订', '+50'],
            ['到店核销', '+120'],
            ['评价餐厅', '+30'],
            ['分享好友', '+20'],
            ['邀请首单', '+300'],
            ['收藏餐厅', '+5'],
          ].map(([k, v]) => (
            <div className="earn-item" key={k}>
              <div className="earn-key">{k}</div>
              <div className="earn-val">{v}</div>
            </div>
          ))}
        </div>

        <div className="section-title"><h3>积分明细</h3></div>
        <div className="pts-list">
          {pointHistory.map(h => (
            <div className="pts-row" key={h.id}>
              <div>
                <div className="pts-row-title">{h.title}</div>
                <div className="pts-row-date">{h.date}</div>
              </div>
              <div className={`pts-row-val ${h.pts > 0 ? 'plus' : 'minus'}`}>
                {h.pts > 0 ? '+' : ''}{h.pts}
              </div>
            </div>
          ))}
        </div>

        <div style={{height: 28}} />
      </div>
    </>
  )
}
