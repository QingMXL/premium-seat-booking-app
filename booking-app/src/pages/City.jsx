import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import { useApp } from '../context/AppContext.jsx'
import './City.css'

export default function City() {
  const nav = useNavigate()
  const { cities } = useApp()
  return (
    <>
      <NavBar title="选择城市" />
      <div className="page-scroll city-scroll">
        <div className="city-current">
          <span className="city-current-label">当前定位</span>
          <span className="city-current-name">上海</span>
          <span className="city-current-tip">点击切换 ›</span>
        </div>

        <div className="city-section-title">热门城市</div>
        <div className="city-grid">
          {cities.filter(c => c.hot).map(c => (
            <div className="city-chip" key={c.name} onClick={() => nav(-1)}>{c.name}</div>
          ))}
        </div>

        <div className="city-section-title">全部城市</div>
        <div className="city-grid">
          {cities.map(c => (
            <div className="city-chip" key={c.name} onClick={() => nav(-1)}>{c.name}</div>
          ))}
        </div>
      </div>
    </>
  )
}
