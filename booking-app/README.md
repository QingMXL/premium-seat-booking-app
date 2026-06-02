# 臻选好餐厅 · Premium Seat Booking App

> 高端餐厅预订小程序消费者端，React 18 + Vite 5 + Supabase，移动端优先设计。

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ 功能概览

| 模块 | 功能 |
|------|------|
| **首页** | 餐厅推荐列表、快捷筛选（包间 / 今晚可订 / 场景分类）、热门场景入口 |
| **餐厅详情** | 图集轮播、菜品展示、包间选择、口碑评分 |
| **预订流程** | 日期 / 时段选择、SVG 平面图选座、定金确认 |
| **订单管理** | 多状态订单（待支付 / 待到店 / 已完成 / 已取消）、核销二维码 |
| **发现页** | 热门菜品、主题集合、城市排行榜 |
| **个人中心** | 用户资料、积分流水、常用联系人、会员礼遇 |
| **搜索** | 关键词搜索 + 多维度筛选排序 |

---

## 🛠 技术栈

| 层 | 技术 |
|----|------|
| 前端框架 | React 18 + React Router v6 |
| 构建工具 | Vite 5 |
| 后端 / 数据库 | Supabase（PostgreSQL + PostgREST + Auth） |
| 状态管理 | React Context（AppContext 统一数据层） |
| 样式 | 纯 CSS（CSS 变量 + 响应式，无 UI 库） |
| 图片资源 | Unsplash 公开 CDN |

---

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── FloorPlan.jsx    # SVG 平面图选座（三态：可用 / 已订 / 推荐）
│   ├── RestaurantCard   # 餐厅卡片
│   ├── SmartImg         # 图片懒加载 + 占位
│   └── Toast            # 全局轻提示
├── context/
│   └── AppContext.jsx   # 全局数据层（从 Supabase 加载全量数据）
├── data/
│   ├── api.js           # Supabase 数据层 + DB ↔ UI 字段映射
│   ├── mock.js          # 静态 UI 配置（筛选 / 场景 / 时段 / 平面图）
│   └── images.js        # Unsplash 图片 URL 映射
├── lib/
│   └── supabase.js      # Supabase 客户端（从 .env 读取）
├── pages/               # 16 个路由页面
└── styles/
    └── global.css       # 全局样式 + Design Token
```

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone git@github.com:QingMXL/premium-seat-booking-app.git
cd premium-seat-booking-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env`，填入你的 Supabase 项目信息：

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_KEY=<your-supabase-key>
VITE_DEMO_USER_ID=<demo-user-uuid>
```

> **在哪里找这些值？**
> - `VITE_SUPABASE_URL` / `VITE_SUPABASE_KEY`：Supabase 控制台 → Project Settings → API
> - `VITE_DEMO_USER_ID`：Supabase 控制台 → Authentication → Users

### 4. 初始化数据库

在 **Supabase SQL Editor** 中依次执行（位于项目根目录 `supabase-setup/`）：

```
001_schema.sql   # 建表 + 索引 + RLS 策略
002_seed.sql     # 城市 / 餐厅 / 菜品等初始数据
```

然后运行数据加载脚本（填充用户 / 订单等测试数据）：

```bash
node supabase-setup/load_data.mjs
```

### 5. 启动开发服务器

```bash
npm run dev
# → http://localhost:5173
```

---

## 📱 界面预览

应用采用移动端优先设计，模拟 iPhone 形态（390px 宽），奢华暗金风格：

- **主色调**：深绿 `#0E3D33` + 暖金 `#C8A55C`
- **背景**：米黄 `#F4F1EA`
- **动效**：仅使用 `transform` / `opacity`（GPU 合成层，不触发回流）

---

## 🗄 数据库表结构（15 张）

| 表名 | 说明 |
|------|------|
| `cities` | 城市列表（热门标记）|
| `restaurants` | 餐厅主表（评分、设施、口碑分） |
| `restaurant_tags` | 餐厅标签（多对多）|
| `restaurant_gallery` | 餐厅图集 |
| `dishes` | 菜品（热门标记、点赞数）|
| `rooms` | 包间（容量、最低消费）|
| `floor_plan_tables` | 平面图桌位（按餐厅可选启用）|
| `orders` | 订单（状态机：unpaid / pending / done / cancelled）|
| `user_profiles` | 用户资料（关联 Supabase Auth）|
| `contacts` | 常用联系人 |
| `point_history` | 积分流水 |
| `themes` | 发现页主题集合 |
| `theme_restaurants` | 主题 ↔ 餐厅 |
| `rankings` | 榜单 |
| `ranking_restaurants` | 榜单 ↔ 餐厅 |

---

## 🔒 安全说明

- 所有密钥通过 `.env` 注入，`.env` 已加入 `.gitignore`，**不会提交到 Git**
- 生产环境应使用 `anon key` + 完整 RLS 策略（当前开发使用 `service_role`）
- `VITE_DEMO_USER_ID` 仅供演示，接入真实 Supabase Auth 后应移除
- 所有 Supabase RLS 策略：公开表只读，用户私有数据（订单/积分/联系人）仅本人访问

---

## 🗺 路由表

| 路由 | 页面 |
|------|------|
| `/home` | 首页 |
| `/discover` | 发现 |
| `/orders` | 订单列表 |
| `/orders/:id` | 订单详情 |
| `/orders/:id/share` | 分享订单 |
| `/profile` | 个人中心 |
| `/restaurant/:id` | 餐厅详情 |
| `/booking/:id` | 预订流程 |
| `/search` | 搜索 |
| `/favorites` | 收藏 |
| `/points` | 积分 |
| `/contacts` | 联系人 |
| `/city` | 城市选择 |
| `/phone` | 手机号管理 |
| `/help` | 帮助中心 |
| `/payment-result` | 支付结果 |

---

## 📦 构建部署

```bash
npm run build   # 产物输出到 dist/
```

产物为纯静态文件（HashRouter），可直接部署到：
- **Vercel / Netlify**：Framework = Vite，Build = `npm run build`，Output = `dist`
- **Nginx**：`root` 指向 `dist/`，`try_files $uri /index.html`
- **OSS / S3**：上传 `dist/` 目录，开启静态网站托管

---

## 📄 License

MIT © 2026
