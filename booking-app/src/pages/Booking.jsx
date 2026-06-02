import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import FloorPlan from '../components/FloorPlan.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { useToast } from '../components/Toast.jsx'
import {
  areas, partySizes,
  slotsLunch, slotsDinner, slotStatus, nextDays,
  floorPlanLayout,
} from '../data/mock.js'
import { useApp } from '../context/AppContext.jsx'
import './Booking.css'

export default function Booking() {
  const { id } = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const { restaurants } = useApp()
  const r = restaurants.find(x => x.id === id) || restaurants[0] || {}
  const days = useMemo(() => nextDays(7), [])

  const [dateIdx, setDateIdx] = useState(0)
  const [party, setParty]   = useState(4)
  const [area, setArea]     = useState('包间')
  const [slot, setSlot]     = useState('19:30')
  const [table, setTable]   = useState(floorPlanLayout.recommended)

  const deposit = r.deposit || 50
  const pickedTable = floorPlanLayout.tables.find(t => t.id === table)
  // 当前已选桌容量不足时，自动清空选择，避免提交不合理订单
  useEffect(() => {
    if (pickedTable && pickedTable.cap < party) {
      setTable(null)
      toast(`已自动取消「${pickedTable.id}」选择 · 该桌仅容 ${pickedTable.cap} 人`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [party])

  const canSubmit = !!slot && !!table

  const renderSlot = (s) => {
    const st = slot === s ? 'selected' : (slotStatus[s] || 'open')
    const label = {
      few: '少量', full: '已满', selected: '已选', open: '可订',
    }[st]
    return (
      <div
        key={s}
        className={`slot ${st}`}
        onClick={() => {
          if (st === 'full') { toast('该时段已约满'); return }
          setSlot(s)
        }}
      >
        <div className="slot-time">{s}</div>
        <div className="slot-state">{label}</div>
      </div>
    )
  }

  const handlePickTable = (id) => {
    const t = floorPlanLayout.tables.find(x => x.id === id)
    if (!t) return
    if (t.cap < party) {
      toast(`该桌仅容 ${t.cap} 人，无法容纳 ${party} 人`)
      return
    }
    setTable(id)
    toast(`已选桌位：${t.id} · ${t.cap} 人${t.shape === 'round' ? '圆' : '方'}桌`)
  }

  const submit = () => {
    if (!canSubmit) { toast('请选择时段与桌位'); return }
    nav('/payment-result', { state: { rId: r.id, party, area, slot, table, deposit, dateIdx } })
  }

  return (
    <>
      <NavBar title="预订餐厅" right={<span style={{fontSize:12, color:'var(--c-primary)'}} onClick={() => nav('/orders')}>支付记录</span>} />

      <div className="page-scroll booking-scroll">
        {/* 餐厅卡片 */}
        <div className="bk-step-title">选择餐厅</div>
        <div className="bk-restaurant">
          <div className="bk-r-cover">
            <SmartImg src={r.cover} alt={r.name} />
          </div>
          <div className="bk-r-info">
            <div className="bk-r-name">{r.name}<span className="r-badge">{r.tag}</span></div>
            <div className="bk-r-meta">
              {r.district} · {days[dateIdx].label} {days[dateIdx].m}.{days[dateIdx].d} · {party} 人 · {area}
            </div>
          </div>
          <span className="bk-r-change" onClick={() => nav('/search')}>更换 ›</span>
        </div>

        {/* 日期 */}
        <div className="bk-step-title">
          选择日期
          <span className="bk-step-extra" onClick={() => toast('展开 30 天日历视图')}>日历 ▾</span>
        </div>
        <div className="bk-dates">
          {days.map((d, i) => (
            <div
              key={d.key}
              className={`bk-date ${dateIdx === i ? 'on' : ''}`}
              onClick={() => setDateIdx(i)}
            >
              <div className="bk-d-label">{d.label}</div>
              <div className="bk-d-md">{d.m}.{d.d}</div>
              {i === 1 && <div className="bk-d-tip">特惠</div>}
            </div>
          ))}
        </div>

        {/* 人数 */}
        <div className="bk-step-title">选择人数</div>
        <div className="bk-cells">
          {partySizes.map(p => (
            <div
              key={p}
              className={`bk-cell ${party === p ? 'on' : ''}`}
              onClick={() => setParty(p)}
            >
              {p} 人
            </div>
          ))}
          <div className="bk-cell" onClick={() => toast('10 人以上请联系商家')}>10 人以上</div>
        </div>

        {/* 区域 */}
        <div className="bk-step-title">选择区域</div>
        <div className="bk-cells">
          {areas.map(a => (
            <div
              key={a}
              className={`bk-cell ${area === a ? 'on' : ''}`}
              onClick={() => setArea(a)}
            >
              {a}
            </div>
          ))}
        </div>

        {/* 时段 */}
        <div className="bk-step-title">
          选择用餐时间
          <span className="bk-step-extra" onClick={() => toast('时段状态实时更新；满座可加候补')}>说明 ⓘ</span>
        </div>
        <div className="bk-slot-group">
          <div className="bk-slot-label">午餐</div>
          <div className="bk-slot-row">{slotsLunch.map(renderSlot)}</div>
        </div>
        <div className="bk-slot-group">
          <div className="bk-slot-label">晚餐</div>
          <div className="bk-slot-row">{slotsDinner.map(renderSlot)}</div>
        </div>

        {/* 座位平面图 */}
        <div className="bk-step-title">
          <span>
            {table
              ? <>已选桌位 <b>{table}</b>{pickedTable && ` · ${pickedTable.cap} 人${pickedTable.shape === 'round' ? '圆' : '方'}桌`}</>
              : <>请选择桌位（需可容纳 {party} 人）</>
            }
          </span>
          <span className="bk-step-extra" onClick={() => toast('点击桌位即可切换；浅色为容量不足')}>全屏 ⛶</span>
        </div>

        <div className="bk-floor-wrap">
          <FloorPlan
            layout={floorPlanLayout}
            picked={table}
            minCap={party}
            onPick={handlePickTable}
          />
          <div className="fp-legend">
            <span><i className="dot open" /> 可选</span>
            <span><i className="dot picked" /> 已选</span>
            <span><i className="dot booked" /> 已订</span>
            <span><i className="dot reco" /> 推荐</span>
            <span><i className="dot under" /> 容量不足</span>
          </div>
        </div>

        {/* 定金提示 */}
        <div className="bk-deposit-info">
          <div>
            <div className="bk-deposit-title">
              定金 <b>¥{deposit}</b>
              <span className="bk-deposit-tag">可抵消费</span>
            </div>
            <div className="bk-deposit-rule">含保留座位 15 分钟、可抵扣到店消费；用户原因取消不退</div>
          </div>
          <span className="bk-rule-link" onClick={() => toast('展开完整退款规则')}>规则 ›</span>
        </div>

        <div style={{height: 100}} />
      </div>

      <div className="bk-footer">
        <div>
          <div className="bk-foot-label">应付定金</div>
          <div className="bk-foot-price">¥ {deposit}</div>
        </div>
        <button
          className="btn-primary"
          style={{flex: 1, marginLeft: 12}}
          disabled={!canSubmit}
          onClick={submit}
        >
          确认并支付定金
        </button>
      </div>
    </>
  )
}
