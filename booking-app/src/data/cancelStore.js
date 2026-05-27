// 取消订单次数管理 —— 每人每月最多 3 次
// 持久化到 localStorage，跨刷新生效
const LIMIT = 3
const KEY = 'booking_cancel_log_v1'
const monthKey = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { month: monthKey(), count: 0, ids: [] }
    const obj = JSON.parse(raw)
    // 跨月自动重置
    if (obj.month !== monthKey()) return { month: monthKey(), count: 0, ids: [] }
    return obj
  } catch {
    return { month: monthKey(), count: 0, ids: [] }
  }
}

function write(obj) {
  try { localStorage.setItem(KEY, JSON.stringify(obj)) } catch {}
}

export const cancelLimit = LIMIT

// 本月已取消次数
export function getCancelCount() {
  return read().count
}

// 本月剩余可取消次数
export function getRemaining() {
  return Math.max(0, LIMIT - read().count)
}

// 该订单是否已被本地标记为已取消
export function isCancelledLocally(orderId) {
  return read().ids.includes(orderId)
}

// 尝试取消订单 —— 返回 { ok, remaining, reason }
export function tryCancel(orderId) {
  const cur = read()
  if (cur.ids.includes(orderId)) {
    return { ok: true, remaining: LIMIT - cur.count, alreadyCancelled: true }
  }
  if (cur.count >= LIMIT) {
    return { ok: false, remaining: 0, reason: `本月取消已用完（${LIMIT} 次），请联系客服处理` }
  }
  const next = { month: monthKey(), count: cur.count + 1, ids: [...cur.ids, orderId] }
  write(next)
  return { ok: true, remaining: LIMIT - next.count }
}
