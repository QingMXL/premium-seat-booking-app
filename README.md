# Premium Seat · 餐厅预订小程序

> 面向城市聚餐场景的餐厅预订平台原型 —— 帮助用户完成日期、人数、时间段、用餐区域、具体座位或包间的预订，含 50 元定金、订单分享、收藏、积分与会员体系。

## 📂 仓库结构

```
.
├── README.md                                  ← 你正在读这个
├── 餐厅预订小程序 Prd V0 1.pdf                 ← 产品需求文档（PRD v0.1）
├── ChatGPT Image ... (1~6).png                ← 6 张原始 UI 设计参考图
└── booking-app/                               ← Demo 代码（React + Vite）
    ├── README.md                              ← 本地开发与部署说明
    ├── package.json
    ├── src/
    │   ├── pages/                             ← 16 个用户端页面
    │   ├── components/
    │   │   └── FloorPlan.jsx                  ← SVG 平面图选座
    │   ├── data/
    │   │   ├── mock.js                        ← 餐厅 / 订单 / 用户 mock
    │   │   ├── images.js                      ← Unsplash 图片资源
    │   │   └── cancelStore.js                 ← 取消订单月度限额
    │   └── styles/global.css
    └── index.html
```

## 🚀 快速开始

```bash
cd booking-app
npm install
npm run dev          # 本地开发（含手机外壳预览）
npm run build        # 构建静态产物到 dist/
```

完整说明请见 [booking-app/README.md](./booking-app/README.md)。

## ✨ 已实现

| 模块 | 功能 |
|------|------|
| 🏠 首页 | 城市切换、搜索、Banner 景深主图、8 个快捷筛选（附近/包间/今晚可订/朋友聚会/...）、热门场景 |
| 🔍 搜索 | 关键词 + 6 维筛选 + 4 种排序 |
| 🍽 餐厅详情 | 封面轮播、菜单风招牌菜、环境/包间图、用户评价、衬线品牌名 |
| 📅 预订 | 日期 / 人数 / 区域 / 时段 / **SVG 真实平面图选座**（圆方桌、椅子、容量联动） |
| 💳 支付 | 50 元定金、支付结果页 |
| 📋 订单 | 待支付 / 待到店 / 已完成 / 已取消 四 Tab 差异化；**仅待支付有红圈角标** |
| 🔁 取消 | **每月限 3 次**（localStorage 持久化、跨月自动重置）+ 退款规则提示 |
| 🔗 分享 | 订单分享卡片（微信/朋友圈/复制链接/保存图） |
| ⭐ 我的 | 会员卡、积分、收藏（店 + 菜）、联系人、客服 |

## 🎨 设计语言

- **配色**：深绿 `#0E3D33` + 古铜金 `#B8923F` + 米黄纸质 `#F2EBDA`
- **字体**：Noto Serif SC（中文衬线）+ Cormorant Garamond（英文衬线）
- **风格**：高级餐厅菜单（金色装饰线、价格点点对齐、纸质纹理）
- **图片**：Unsplash 公开 CDN（按菜名 / 主题匹配）

## 📐 技术栈

- React 18 + React Router 6 (HashRouter，无需后端 fallback)
- Vite 5
- 纯 CSS（含 CSS Variables 色板）
- 无后端依赖，纯静态可部署

## 📦 部署

构建产物 `dist/` 可部署到任何静态托管：

- **Vercel / Netlify / Cloudflare Pages**：自动识别 Vite 项目
- **Nginx**：见 [booking-app/README.md](./booking-app/README.md#nginx)
- **对象存储 OSS / S3**：开静态网站托管即可

## 📄 License

仅供学习与原型演示。
