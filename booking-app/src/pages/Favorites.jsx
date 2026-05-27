import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { useToast } from '../components/Toast.jsx'
import { restaurants, trendingDishes } from '../data/mock.js'
import './Favorites.css'

export default function Favorites() {
  const [tab, setTab] = useState('store')
  const nav = useNavigate()
  const toast = useToast()
  return (
    <>
      <NavBar title="我的收藏" />
      <div className="fav-tabs">
        <span className={`fav-tab ${tab === 'store' ? 'on' : ''}`} onClick={() => setTab('store')}>
          我收藏的店 <span className="fav-count">{restaurants.length}</span>
        </span>
        <span className={`fav-tab ${tab === 'dish' ? 'on' : ''}`} onClick={() => setTab('dish')}>
          我收藏的菜 <span className="fav-count">{trendingDishes.length}</span>
        </span>
      </div>
      <div className="page-scroll fav-scroll">
        {tab === 'store'
          ? restaurants.map(r => <RestaurantCard r={r} key={r.id} />)
          : (
            <div className="fav-dishes">
              {trendingDishes.map(d => (
                <div className="fav-dish" key={d.id} onClick={() => nav(`/restaurant/${d.rid}`)}>
                  <div className="fav-d-img"><SmartImg src={d.img} alt={d.name} /></div>
                  <div className="fav-d-info">
                    <div className="fav-d-name">{d.name}</div>
                    <div className="fav-d-rest">{d.restaurant}</div>
                    <div className="fav-d-price">¥{d.price}</div>
                  </div>
                  <span
                    className="fav-d-heart"
                    onClick={(e) => { e.stopPropagation(); toast('已取消收藏') }}
                  >♥</span>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </>
  )
}
