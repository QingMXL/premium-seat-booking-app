import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { useToast } from '../components/Toast.jsx'
import { orders } from '../data/mock.js'
import './ShareOrder.css'

export default function ShareOrder() {
  const { id } = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const o = orders.find(x => x.id === id) || orders[0]

  return (
    <>
      <NavBar title="分享订单给好友" />
      <div className="page-scroll so-scroll">
        <div className="so-card">
          <div className="so-card-head">
            <div className="so-head-title">Flora 邀你共聚晚餐</div>
            <div className="so-head-sub">点击下方查看详情或加入饭局</div>
          </div>
          <div className="so-card-img"><SmartImg src={o.cover} alt={o.restaurant} /></div>
          <div className="so-info">
            <div className="so-name">{o.restaurant}</div>
            <div className="so-row"><span>用餐时间</span><b>{o.date} · {o.time}</b></div>
            <div className="so-row"><span>用餐人数</span><b>{o.party} 人</b></div>
            <div className="so-row"><span>区域 / 桌位</span><b>{o.area} · {o.table}</b></div>
            <div className="so-row"><span>发起人</span><b>Flora</b></div>
          </div>
          <div className="so-actions-in">
            <button className="btn-outline solid" style={{flex:1}} onClick={() => nav(`/orders/${o.id}`)}>查看详情</button>
            <button className="btn-outline solid" style={{flex:1}} onClick={() => toast(`已导航至 ${o.restaurant}`)}>导航前往</button>
          </div>
        </div>

        <div className="so-channels">
          <div className="ch-row">
            <div className="ch" onClick={() => toast('已分享给微信好友')}><div className="ch-icon wx">微</div><div>微信好友</div></div>
            <div className="ch" onClick={() => toast('已分享至朋友圈')}><div className="ch-icon mo">圈</div><div>朋友圈</div></div>
            <div className="ch" onClick={() => toast('链接已复制')}><div className="ch-icon copy">链</div><div>复制链接</div></div>
            <div className="ch" onClick={() => toast('已保存到相册')}><div className="ch-icon save">↓</div><div>保存图片</div></div>
          </div>
        </div>

        <div style={{textAlign:'center', padding: '14px 0', fontSize: 12, color: 'var(--c-text-3)'}} onClick={() => nav(-1)}>
          取消
        </div>
      </div>
    </>
  )
}
