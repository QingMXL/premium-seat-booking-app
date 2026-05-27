import { useMemo, useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import { useToast } from '../components/Toast.jsx'
import { restaurants } from '../data/mock.js'
import './Search.css'

const filters = [
  { key: 'area',  label: '区域' },
  { key: 'party', label: '人数' },
  { key: 'date',  label: '日期' },
  { key: 'slot',  label: '时段' },
  { key: 'price', label: '人均' },
  { key: 'book',  label: '可订' },
]
const sorts = [
  { key: 'smart',     label: '智能推荐' },
  { key: 'distance',  label: '距离最近' },
  { key: 'rating',    label: '评分最高' },
  { key: 'priceAsc',  label: '人均从低到高' },
  { key: 'priceDesc', label: '人均从高到低' },
]

export default function Search() {
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState('smart')
  const toast = useToast()

  const list = useMemo(() => {
    let arr = restaurants
    if (keyword.trim()) {
      const k = keyword.trim().toLowerCase()
      arr = arr.filter(r =>
        r.name.toLowerCase().includes(k) ||
        r.cuisine.toLowerCase().includes(k) ||
        r.district.toLowerCase().includes(k) ||
        r.tags.some(t => t.toLowerCase().includes(k))
      )
    }
    const cp = [...arr]
    if (sort === 'distance')  cp.sort((a,b) => a.distanceVal - b.distanceVal)
    if (sort === 'rating')    cp.sort((a,b) => b.rating - a.rating)
    if (sort === 'priceAsc')  cp.sort((a,b) => a.price - b.price)
    if (sort === 'priceDesc') cp.sort((a,b) => b.price - a.price)
    return cp
  }, [keyword, sort])

  return (
    <>
      <NavBar title="搜索结果" />
      <div className="search-toolbar">
        <div className="search-input">
          <span>⌕</span>
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="餐厅 / 菜系 / 商圈 / 关键词"
          />
          {keyword && <span className="clear-btn" onClick={() => setKeyword('')}>×</span>}
        </div>
      </div>

      <div className="filter-row">
        {filters.map(f => (
          <div className="filter-item" key={f.key} onClick={() => toast(`展开「${f.label}」筛选`)}>
            {f.label}<span className="caret">▾</span>
          </div>
        ))}
      </div>

      <div className="sort-row">
        {sorts.slice(0, 4).map(s => (
          <span
            key={s.key}
            className={`sort-tab ${sort === s.key ? 'active' : ''}`}
            onClick={() => setSort(s.key)}
          >
            {s.label}
          </span>
        ))}
        <span className="sort-more" onClick={() => toast('展开高级筛选')}>筛选 ⇅</span>
      </div>

      <div className="page-scroll search-list">
        {list.length === 0
          ? (
            <div className="empty">
              <div className="empty-icon">⌕</div>
              <div className="empty-text">没有匹配「{keyword}」的餐厅</div>
              <button className="btn-outline" onClick={() => setKeyword('')}>清除搜索</button>
            </div>
          )
          : list.map(r => <RestaurantCard r={r} key={r.id} />)
        }
        {list.length > 0 && (
          <div style={{height: 28, textAlign: 'center', color: 'var(--c-text-4)', fontSize: 12, padding: '10px 0'}}>
            — 已经到底了 —
          </div>
        )}
      </div>
    </>
  )
}
