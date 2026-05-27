import { useNavigate } from 'react-router-dom'
import SmartImg from './SmartImg.jsx'
import './RestaurantCard.css'

export default function RestaurantCard({ r }) {
  const nav = useNavigate()
  return (
    <div className="rcard" onClick={() => nav(`/restaurant/${r.id}`)}>
      <div className="rcard-img">
        <SmartImg src={r.cover} alt={r.name} />
        {r.tag && <span className="rcard-badge">{r.tag}</span>}
      </div>
      <div className="rcard-body">
        <div className="rcard-row1">
          <h4 className="rcard-name">{r.name}</h4>
          <span className="rating">
            <span className="star">★</span>{r.rating}
          </span>
        </div>
        <div className="rcard-row2">
          <span>{r.cuisine}</span>
          <span className="dot">·</span>
          <span>¥{r.price}/人</span>
          <span className="dot">·</span>
          <span>{r.reviews}评价</span>
        </div>
        <div className="rcard-row3">
          <span>{r.district}</span>
          <span className="rcard-dist">{r.distance}</span>
        </div>
        <div className="rcard-row4">
          <div className="rcard-tags">
            {r.hasRoom && <span className="tag green">包间</span>}
            <span className="tag green">可订{r.nextSlot}</span>
            {r.hasParking && <span className="tag green">可停车</span>}
          </div>
          <button
            className="btn-outline solid"
            onClick={(e) => { e.stopPropagation(); nav(`/booking/${r.id}`) }}
          >
            预订
          </button>
        </div>
      </div>
    </div>
  )
}
