# 臻选 · 餐厅预订 Demo

基于 React + Vite + React Router 的手机端餐厅预订小程序原型，按 PRD v0.1 实现 MVP 全量用户端。

## 本地开发

```bash
cd booking-app
npm install
npm run dev          # 开发模式，自带热更新
npm run build        # 生产构建，产物在 dist/
npm run preview      # 预览构建产物
```

dev 模式默认监听 `0.0.0.0:5173`（或自动后移），同一 Wi-Fi 的手机可直接访问 `http://<电脑IP>:5173/`。

## 部署上线

构建产物完全静态（`dist/` 目录），路由用 `HashRouter`（URL 形如 `https://你的域名/#/home`），**不需要后端转发**，扔到任何静态托管都能跑：

### Vercel / Netlify / Cloudflare Pages
1. 把整个 `booking-app/` 推到 Git
2. 平台选择 framework = Vite，build command `npm run build`，output dir `dist`
3. 直接绑定域名

### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/booking-app/dist;
    index index.html;
    location / { try_files $uri /index.html; }
    # 静态资源缓存
    location /assets/ { expires 30d; }
}
```

### 直接上传到对象存储
- 阿里云 OSS / 腾讯云 COS / AWS S3：把 `dist/` 整个目录上传，开静态网站托管
- 设置默认文档 `index.html`，错误文档也指向 `index.html`

## 项目结构

```
booking-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx            # 入口 + Router + Toast
│   ├── App.jsx             # 路由表
│   ├── components/
│   │   ├── PhoneShell.jsx  # 桌面端的手机外壳
│   │   ├── NavBar.jsx
│   │   ├── TabBar.jsx
│   │   ├── RestaurantCard.jsx
│   │   ├── FloorPlan.jsx   # SVG 餐厅平面图
│   │   ├── SmartImg.jsx    # 带 loading 的图片组件
│   │   └── Toast.jsx       # 全局 Toast 反馈
│   ├── pages/              # 用户端 16 个页面
│   ├── data/
│   │   ├── mock.js         # 餐厅 / 订单 / 用户 mock
│   │   └── images.js       # Unsplash 图片 URL 映射
│   └── styles/global.css
└── dist/                   # 构建产物（npm run build 生成）
```

## 路由表

| 路由 | 页面 |
|------|------|
| `/home` | 首页 · 推荐餐厅 + 热门场景 + 快捷筛选 |
| `/discover` | 发现 · 推荐 / 招牌菜 / 榜单 / 主题 |
| `/orders` | 我的订单 · 待支付 / 待到店 / 已完成 / 已取消 |
| `/orders/:id` | 订单详情 |
| `/orders/:id/share` | 订单分享卡片 |
| `/profile` | 我的 |
| `/favorites` | 我的收藏（店 / 菜） |
| `/points` | 我的积分 |
| `/contacts` | 常用联系人 |
| `/phone` | 手机号管理 |
| `/help` | 客服与 FAQ |
| `/city` | 城市选择 |
| `/search` | 搜索结果 |
| `/restaurant/:id` | 餐厅详情 |
| `/booking/:id` | 预订流程（含 SVG 平面图选座） |
| `/payment-result` | 支付成功 |

## 图片资源

所有图片来自 **Unsplash 公开 CDN**，集中维护在 `src/data/images.js`。
- 优点：免本地资源、立即生效、自带响应式（URL 带 `?w=` 参数）
- 替换为自有图：把图放到 `public/images/your.jpg`，修改 `images.js` 把 URL 改成 `/images/your.jpg`

## 设计风格

- 主色：深绿 `#0E3D33`
- 强调：金 `#C8A55C`
- 背景：米黄 `#F4F1EA`
- 桌面端套手机外壳预览；移动端自动全屏 viewport
- HashRouter（无需后端 fallback）

## 完成清单

**对照 PRD MVP 用户端：**
- [x] 城市与区域选择
- [x] 餐厅列表（首页快捷筛选 + 排序）
- [x] 餐厅详情（环境/招牌菜/包间/评价）
- [x] 日期 / 人数 / 时间段 / 区域选择
- [x] 大厅 / 包间选择
- [x] SVG 平面图选座（含已订、已选、推荐三态）
- [x] 50 元定金支付（含支付结果页）
- [x] 订单生成与列表
- [x] 订单详情与状态机
- [x] 收藏餐厅 / 收藏菜品
- [x] 分享餐厅 / 分享订单
- [x] 手机号管理
- [x] 客服与 FAQ
- [x] 积分与会员体系（基础）

**待二期：**
- [ ] 真实订单状态机后端
- [ ] 支付 SDK 接入
- [ ] 商家端 + 平台管理端
