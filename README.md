<h1 align="center">🍽 Premium Seat</h1>
<p align="center"><i>面向城市聚餐的餐厅预订小程序 · Fine Dining Reservation</i></p>

<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/lang-简体中文-0E3D33?style=for-the-badge" alt="简体中文"></a>
  <a href="./README.en.md"><img src="https://img.shields.io/badge/lang-English-B8923F?style=for-the-badge" alt="English"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=fff&labelColor=20232A" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=fff" />
  <img src="https://img.shields.io/badge/Router-HashRouter-CA4245?logo=reactrouter&logoColor=fff" />
  <img src="https://img.shields.io/badge/style-Menu_Serif-B8923F" />
</p>

---

## 🌟 项目简介

**Premium Seat** 是一个面向城市聚餐场景的餐厅预订平台原型。围绕"**去哪吃、几点吃、坐哪里、和谁去、是否有保障**"，把发现 → 选座 → 定金支付 → 订单分享 → 复订评价的完整链路在一个手机端 demo 中跑通。

> 这不是一个简单的餐厅列表工具，而是一套围绕**确定性**与**保障感**的预订服务系统：定金锁座、平面图选座、月度取消限额、订单分享协同。

## ✨ 核心功能

| 模块 | 功能 |
|------|------|
| 🏠 **首页** | 城市切换、搜索、Banner **景深主图**、8 个快捷筛选（附近/包间/今晚可订/朋友聚会/...）、热门场景卡片 |
| 🔍 **搜索** | 关键词模糊匹配 + 6 维筛选 + 4 种排序 |
| 🍽 **餐厅详情** | 封面轮播、**菜单风招牌菜**、环境/包间画廊、用户评价、电话/导航/分享/收藏 |
| 📅 **预订流程** | 日期 / 人数 / 区域 / 时段 / **SVG 真实平面图选座**（圆方桌 + 椅子 + 容量联动） |
| 💳 **定金支付** | 50 元起、可抵消费、退款规则透明、支付成功页 |
| 📋 **我的订单** | 待支付 / 待到店 / 已完成 / 已取消 四 Tab 差异化 UI；**仅待支付有红圈角标** |
| 🚫 **取消订单** | **每月限 3 次**（localStorage 持久化、跨月自动重置）+ 退款规则提示 |
| 🔗 **订单分享** | 微信好友 / 朋友圈 / 复制链接 / 保存图片 |
| ⭐ **会员体系** | 金卡会员、积分明细、收藏（店 + 菜）、常用联系人、客服 FAQ |

## 🎨 设计语言

- **配色**：深绿 `#0E3D33` + 古铜金 `#B8923F` + 米黄纸质 `#F2EBDA`
- **字体**：Noto Serif SC（中文衬线）+ Cormorant Garamond（英文衬线）
- **风格**：高级餐厅菜单 —— 金色装饰线、虚线菜单点点、纸质纹理
- **图片**：Unsplash 公开 CDN，按菜名 / 主题匹配

## 📐 技术栈

- **React 18** + React Router 6（HashRouter，**无需后端 fallback**）
- **Vite 5** 构建
- 纯 CSS（CSS Variables 色板）
- **零后端依赖**，纯静态产物，可部署到任意托管

## 🚀 快速开始

```bash
cd booking-app
npm install
npm run dev          # 本地开发（含手机外壳预览）
npm run build        # 构建静态产物到 dist/
npm run preview      # 预览构建产物
```

完整说明请见 [booking-app/README.md](./booking-app/README.md)。

## 📂 仓库结构

```
.
├── README.md                          ← 中文（你正在读）
├── README.en.md                       ← English
└── booking-app/                       ← Demo 代码（React + Vite）
    ├── README.md                      ← 本地开发与部署说明
    ├── package.json
    ├── src/
    │   ├── pages/                     ← 16 个用户端页面
    │   ├── components/
    │   │   ├── FloorPlan.jsx          ← SVG 平面图选座
    │   │   ├── PhoneShell.jsx         ← 桌面端手机外壳
    │   │   ├── SmartImg.jsx           ← 带 loading 的图片
    │   │   └── Toast.jsx              ← 全局轻提示
    │   ├── data/
    │   │   ├── mock.js                ← 餐厅 / 订单 / 用户 mock
    │   │   ├── images.js              ← Unsplash 图片资源
    │   │   └── cancelStore.js         ← 取消订单月度限额
    │   └── styles/global.css
    └── index.html
```

## 📦 部署

构建产物 `dist/` 可部署到任意静态托管：

- **Vercel / Netlify / Cloudflare Pages**：自动识别 Vite 项目；Root Directory 设为 `booking-app`
- **Nginx**：详见 [booking-app/README.md](./booking-app/README.md#nginx)
- **对象存储 OSS / S3**：开静态网站托管即可

## 📄 License

仅供学习与原型演示。

---

<p align="center"><sub>Made with care · 每一餐都值得期待</sub></p>
