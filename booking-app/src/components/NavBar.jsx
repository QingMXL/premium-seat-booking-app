import { useNavigate } from 'react-router-dom'

export default function NavBar({ title, right, transparent, onBack }) {
  const nav = useNavigate()
  const back = () => (onBack ? onBack() : nav(-1))
  const style = transparent ? { background: 'transparent', position: 'absolute', top: 44, left: 0, right: 0, zIndex: 20 } : null
  return (
    <div className="navbar" style={style}>
      <div className="nav-left" onClick={back}>‹</div>
      <div>{title}</div>
      <div className="nav-right">{right || (<><span>···</span><span>○</span></>)}</div>
    </div>
  )
}
