import { useState } from 'react'

// 带 loading 占位和错误回退的图片组件
// 避免 Unsplash 加载慢/失败导致空白
export default function SmartImg({ src, alt, className, style, ratio }) {
  const [loaded, setLoaded] = useState(false)
  const [err, setErr] = useState(false)

  return (
    <div
      className={`smart-img ${loaded ? 'loaded' : ''} ${className || ''}`}
      style={{
        ...(ratio ? { aspectRatio: ratio } : {}),
        ...style,
      }}
    >
      {!err && (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErr(true)}
        />
      )}
      {err && <div className="smart-img-fallback">·</div>}
    </div>
  )
}
