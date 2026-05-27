// 餐厅平面图（SVG）—— 包间区、大厅、吧台、入口、桌位（圆/方）
// 三态：可选 / 已选 / 已订
import './FloorPlan.css'

const SEAT_OFFSETS = {
  // 圆桌椅子
  round: [
    [0, -1.45], [1.03, -1.03], [1.45, 0], [1.03, 1.03],
    [0, 1.45], [-1.03, 1.03], [-1.45, 0], [-1.03, -1.03],
  ],
  // 方桌椅子（上下左右）
  square: [
    [-0.6, -1.2], [0.6, -1.2],
    [-0.6, 1.2], [0.6, 1.2],
    [-1.2, 0], [1.2, 0],
  ],
}

function sizeFor(cap) {
  // 桌子半径 / 半边长
  if (cap <= 2) return 12
  if (cap <= 4) return 16
  if (cap <= 6) return 20
  return 24
}

function Table({ t, picked, booked, undersized, onPick }) {
  const r = sizeFor(t.cap)
  const seats = t.shape === 'round'
    ? SEAT_OFFSETS.round.slice(0, t.cap)
    : SEAT_OFFSETS.square.slice(0, t.cap)
  const disabled = booked || undersized
  const cls = `fp-table ${t.shape}` +
    (picked ? ' picked' : '') +
    (booked ? ' booked' : '') +
    (undersized ? ' undersized' : '')

  return (
    <g
      transform={`translate(${t.x},${t.y})`}
      className={cls}
      onClick={disabled ? undefined : () => onPick(t.id)}
    >
      {/* 椅子 */}
      {seats.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={dx * r}
          cy={dy * r}
          r={r * 0.32}
          className="fp-chair"
        />
      ))}

      {/* 桌子 */}
      {t.shape === 'round' ? (
        <circle r={r} className="fp-top" />
      ) : (
        <rect x={-r * 0.95} y={-r * 0.75} width={r * 1.9} height={r * 1.5} rx={3} className="fp-top" />
      )}

      {/* 桌号文字 */}
      <text className="fp-num" textAnchor="middle" dominantBaseline="central">{t.id}</text>
      {t.label && (
        <text className="fp-label" y={r + 12} textAnchor="middle">{t.label}</text>
      )}
    </g>
  )
}

export default function FloorPlan({ layout, picked, onPick, minCap = 1 }) {
  return (
    <svg
      className="floorplan-svg"
      viewBox="0 0 360 470"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="fp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#EEE8D8" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* 背景 */}
      <rect x="10" y="10" width="340" height="440" rx="14" fill="url(#fp-grid)" stroke="#D4CCB4" strokeWidth="1.5" />

      {/* 隔断（包间分区） */}
      {layout.partitions.map((p, i) => (
        <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
              stroke="#A89A75" strokeWidth="2" strokeDasharray="2 4" />
      ))}

      {/* 区域文字 */}
      {layout.labels.map((l, i) => (
        <text key={i} x={l.x} y={l.y} className="fp-zone-label" textAnchor="middle">{l.text}</text>
      ))}

      {/* 吧台 */}
      {layout.bar.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill="#3A4E48" />
          <text x={b.x + b.w/2} y={b.y + b.h/2 + 4} className="fp-zone-text" textAnchor="middle">吧台</text>
        </g>
      ))}

      {/* 门 */}
      {layout.doors.map((d, i) => (
        <g key={i}>
          <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="var(--c-bg)" stroke="var(--c-primary)" strokeWidth="2" />
          <path d={`M ${d.x} ${d.y + d.h} A ${d.w} ${d.w} 0 0 1 ${d.x + d.w} ${d.y}`} fill="none" stroke="#A89A75" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      ))}

      {/* 桌位 */}
      {layout.tables.map(t => (
        <Table
          key={t.id}
          t={t}
          picked={picked === t.id}
          booked={layout.booked.includes(t.id)}
          undersized={t.cap < minCap}
          onPick={onPick}
        />
      ))}

      {/* 推荐标记 —— 仅在推荐桌满足容量且未被占用、未选中时显示 */}
      {layout.recommended && picked !== layout.recommended && !layout.booked.includes(layout.recommended) && (() => {
        const rec = layout.tables.find(t => t.id === layout.recommended)
        if (!rec || rec.cap < minCap) return null
        return (
          <g transform={`translate(${rec.x}, ${rec.y - sizeFor(rec.cap) - 16})`}>
            <rect x="-22" y="-9" width="44" height="14" rx="7" fill="#C8A55C" />
            <text x="0" y="1" className="fp-recommend" textAnchor="middle" dominantBaseline="central">推荐</text>
          </g>
        )
      })()}
    </svg>
  )
}
