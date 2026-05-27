<h1 align="center">🍽 Premium Seat</h1>
<p align="center"><i>A modern restaurant reservation app for city dining</i></p>

<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/lang-简体中文-B8923F?style=for-the-badge" alt="简体中文"></a>
  <a href="./README.en.md"><img src="https://img.shields.io/badge/lang-English-0E3D33?style=for-the-badge" alt="English"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=fff&labelColor=20232A" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=fff" />
  <img src="https://img.shields.io/badge/Router-HashRouter-CA4245?logo=reactrouter&logoColor=fff" />
  <img src="https://img.shields.io/badge/style-Menu_Serif-B8923F" />
</p>

---

## 🌟 About

**Premium Seat** is a mobile-web prototype for restaurant reservations in city dining scenes. Built around the questions *"where to eat, when, which seat, with whom, and is it guaranteed?"*, it covers the full journey — **discover → pick a seat → pay a deposit → share with friends → re-book and review** — in a single phone-shaped demo.

> Not a restaurant directory. A reservation system designed for **certainty** and **assurance** — deposit-locked seats, real floor-plan seat selection, monthly cancellation quota, and shareable orders.

## ✨ Features

| Module | Highlights |
|--------|-----------|
| 🏠 **Home** | City picker, search, **depth-of-field hero banner**, 8 quick filters (nearby / private room / tonight / friends / business / ...), trending occasions |
| 🔍 **Search** | Keyword fuzzy match, 6 filter dimensions, 4 sort orders |
| 🍽 **Restaurant detail** | Cover gallery, **menu-style signature dishes**, ambience & private-room photos, ratings, phone / map / share / favorite |
| 📅 **Reservation flow** | Date / party size / area / time slot / **SVG floor plan seat picker** (round + square tables, chairs, capacity-aware) |
| 💳 **Deposit payment** | From ¥50, deducted on-site, transparent refund policy, success page |
| 📋 **My orders** | 4 tabs with distinct layouts — Unpaid / Pending / Completed / Cancelled; **only "Unpaid" shows a red badge** |
| 🚫 **Cancel order** | **3 cancellations per month** (localStorage-persisted, auto-resets) with policy preview |
| 🔗 **Share order** | WeChat / Moments / copy link / save image |
| ⭐ **Membership** | Gold member, points history, favorites (shops + dishes), saved contacts, support FAQ |

## 🎨 Design language

- **Palette**: deep green `#0E3D33` + antique gold `#B8923F` + paper beige `#F2EBDA`
- **Type**: Noto Serif SC (CJK serif) + Cormorant Garamond (Latin serif)
- **Style**: fine-dining menu — gold rules, dotted price leaders, paper texture
- **Imagery**: Unsplash public CDN, hand-picked per dish / theme

## 📐 Tech stack

- **React 18** + React Router 6 (HashRouter — **no server-side fallback needed**)
- **Vite 5** bundler
- Pure CSS with CSS Variables (no UI framework)
- **Zero backend dependency** — fully static output, deploy anywhere

## 🚀 Quick start

```bash
cd booking-app
npm install
npm run dev          # local dev (with phone-frame preview on desktop)
npm run build        # static build → dist/
npm run preview      # preview the build
```

See [booking-app/README.md](./booking-app/README.md) for full details.

## 📂 Repo layout

```
.
├── README.md                          ← 简体中文
├── README.en.md                       ← English (you are here)
└── booking-app/                       ← Demo source (React + Vite)
    ├── README.md                      ← Local dev & deploy guide
    ├── package.json
    ├── src/
    │   ├── pages/                     ← 16 user-facing pages
    │   ├── components/
    │   │   ├── FloorPlan.jsx          ← SVG floor-plan seat picker
    │   │   ├── PhoneShell.jsx         ← Desktop phone-frame wrapper
    │   │   ├── SmartImg.jsx           ← Image with loading state
    │   │   └── Toast.jsx              ← Global lightweight toast
    │   ├── data/
    │   │   ├── mock.js                ← Restaurant / order / user mocks
    │   │   ├── images.js              ← Unsplash image map
    │   │   └── cancelStore.js         ← Monthly cancel quota
    │   └── styles/global.css
    └── index.html
```

## 📦 Deploy

The `dist/` build is fully static — drop it anywhere:

- **Vercel / Netlify / Cloudflare Pages**: auto-detected as a Vite project; set **Root Directory** to `booking-app`
- **Nginx**: see [booking-app/README.md](./booking-app/README.md#nginx)
- **Object storage (OSS / S3)**: enable static website hosting

## 📄 License

For learning and prototype demo purposes.

---

<p align="center"><sub>Made with care · every meal worth waiting for</sub></p>
