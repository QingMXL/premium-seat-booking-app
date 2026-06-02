import NavBar from '../components/NavBar.jsx'
import { useApp } from '../context/AppContext.jsx'
import './Phone.css'

export default function Phone() {
  const { user } = useApp()
  return (
    <>
      <NavBar title="手机号管理" />
      <div className="page-scroll phone-scroll">
        <div className="phone-card">
          <div className="phone-row">
            <span>主手机号</span>
            <b>{user.phone}</b>
          </div>
          <div className="phone-row">
            <span>用于预订接收</span>
            <span style={{color:'var(--c-primary)', fontSize:12}}>已绑定 ›</span>
          </div>
          <div className="phone-row">
            <span>微信授权号</span>
            <b>未绑定</b>
          </div>
        </div>
        <button className="btn-primary" style={{margin:'18px 14px 0', width:'calc(100% - 28px)'}}>
          更换手机号
        </button>
        <div className="phone-tip">
          预订订单的通知短信、商家联系等都会发到这个手机号，请确保手机号有效。
        </div>
      </div>
    </>
  )
}
