import NavBar from '../components/NavBar.jsx'
import { useApp } from '../context/AppContext.jsx'
import './Contacts.css'

export default function Contacts() {
  const { contacts } = useApp()
  return (
    <>
      <NavBar title="常用联系人" right={<span style={{fontSize:13, color:'var(--c-primary)'}}>+ 添加</span>} />
      <div className="page-scroll ct-scroll">
        <div className="ct-card">
          {contacts.map(c => (
            <div className="ct-row" key={c.id}>
              <div className="ct-avatar">{c.name[0]}</div>
              <div className="ct-info">
                <div className="ct-name">
                  {c.name}
                  {c.tag && <span className="ct-tag">{c.tag}</span>}
                </div>
                <div className="ct-phone">{c.phone}</div>
              </div>
              <span className="ct-action">编辑</span>
            </div>
          ))}
        </div>
        <div className="ct-tip">
          常用联系人用于"为他人预订"或"团队聚餐"场景，平台不会用于其他用途。
        </div>
      </div>
    </>
  )
}
