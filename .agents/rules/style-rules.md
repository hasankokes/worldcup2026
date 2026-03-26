---
trigger: always_on
---

# WC2026 Design System v1.0

---

## Platform

- Target: Mobile first — React Native / Expo
- Screen width reference: 390px (iPhone 14 base)
- Safe areas: Respect top notch + bottom home indicator
- Web: Responsive full-width layout
    Mobile web (< 768px): same as native, 16px horizontal padding
    Tablet (768px–1279px): 2-column layout, max-width 900px centered
    Desktop (1280px+): full-width, side navigation replaces bottom tab bar, content max-width 1200px

---

## Color Palette

```
Background:       #0F172A   ← Ana ekran arkaplanı (dark navy)
Surface:          #1E293B   ← Kart, bottom sheet, modal arkaplanı
Surface raised:   #263548   ← Elevated card, dropdown
Border:           #334155   ← Separator, input border
Border subtle:    #1E293B   ← Çok hafif ayraç

Text primary:     #F1F5F9   ← Ana metin
Text secondary:   #94A3B8   ← İkincil metin, label, hint
Text disabled:    #475569   ← Disabled state metni

Primary:          #10B981   ← Ana aksiyon butonu, aktif tab, highlight (emerald)
Primary dim:      #064E3B   ← Primary buton hover/pressed bg
Primary text:     #FFFFFF   ← Primary buton üstündeki metin

Accent amber:     #F59E0B   ← Puan, skor, kazanma göstergesi
Accent amber dim: #78350F   ← Amber background

Live red:         #EF4444   ← LIVE badge, hata, kritik durum
Live red dim:     #7F1D1D   ← Kırmızı background

Success:          #22C55E   ← Doğru tahmin, tamamlandı
Warning:          #F59E0B   ← Uyarı (amber ile aynı)
Disabled bg:      #1E293B   ← Disabled buton arkaplanı
```

---

## Typography

```
Font family: System default
  iOS:     SF Pro Display / SF Pro Text
  Android: Roboto
  Web:     Inter (fallback: system-ui)

Scale:
  Display:   28px  Bold (700)    ← Büyük başlık, puan gösterimi
  Heading 1: 22px  SemiBold (600) ← Sayfa başlığı
  Heading 2: 18px  SemiBold (600) ← Bölüm başlığı
  Body:      15px  Regular (400) ← Normal metin
  Body sm:   13px  Regular (400) ← İkincil metin, açıklama
  Caption:   11px  Medium (500)  ← Etiket, badge, pill
  Mono:      13px  Mono          ← Skor, sayısal değer

Line height: 1.4 genel, 1.2 başlıklar için
Letter spacing: -0.3px Display ve Heading için
```

---

## Spacing & Layout

```
Base unit: 4px

xs:   4px
sm:   8px
md:   12px
lg:   16px
xl:   24px
2xl:  32px
3xl:  48px

Screen horizontal padding: 16px (her sayfada sol-sağ)
Card internal padding: 16px
Section gap (cards arası): 12px
Bottom tab bar height: 64px + safe area
Top bar height: 52px + safe area
```

---

## Border Radius

```
Button:       8px
Card:         12px
Input:        10px
Bottom sheet: 20px top corners only
Pill / Badge: 999px (tam yuvarlak)
Avatar:       999px
Modal:        16px
```

---

## Components

### Bottom Tab Bar
```
5 tabs: Home · Squad · Tips · Bracket · Leaderboard
Active tab: Primary (#10B981) icon + label
Inactive tab: Text secondary (#94A3B8)
Background: Surface (#1E293B) with top border Border (#334155)
Icon size: 24px
Label size: 10px Caption
```

### Top Bar
```
Height: 52px
Background: transparent (content scrolls behind)
Title: Heading 1, centered
Left: Back arrow or logo
Right: Action icon (share, settings, etc.)
```

### Primary Button
```
Height: 52px
Border radius: 8px
Background: Primary (#10B981)
Text: White, 16px SemiBold
Disabled: bg #1E293B, text #475569
Full width by default
```

### Secondary Button / Ghost
```
Height: 52px
Border: 1px solid Border (#334155)
Background: transparent
Text: Text primary, 16px Medium
```

### Card
```
Background: Surface (#1E293B)
Border radius: 12px
Padding: 16px
Shadow: none (dark theme, use border instead)
Border: optional 1px Border (#334155)
```

### Input Field
```
Height: 48px
Background: Surface raised (#263548)
Border: 1px Border (#334155)
Border radius: 10px
Padding: 0 14px
Text: Text primary, 15px
Placeholder: Text secondary
Focus border: Primary (#10B981)
```

### Badge / Pill
```
LIVE:       bg #7F1D1D, text #EF4444, 11px Bold, 999px radius
Points:     bg #78350F, text #F59E0B, 11px Bold
Correct:    bg #14532D, text #22C55E, 11px Bold
Wrong:      bg #7F1D1D, text #EF4444, 11px Bold
Locked:     bg #1E3A5F, text #60A5FA, 11px Bold
Neutral:    bg #1E293B, text #94A3B8, 11px Bold
```

### Bottom Sheet (Auth Gate & others)
```
Background: Surface (#1E293B)
Border radius: 20px top corners
Handle: 4px × 36px, #334155, centered, 8px from top
Overlay: #000000 at 60% opacity
Max height: 75% screen
```

### Match Card
```
Background: Surface (#1E293B)
Border radius: 12px
Padding: 16px
Layout: [Home team] [Score/Time] [Away team] horizontal
Team name: 13px Body sm
Score: 22px Display, Accent amber (#F59E0B) if live
Time: 13px, Text secondary
Stage label: 11px Caption, Text secondary
```

---

## Iconography

```
Library: Use Phosphor Icons or Lucide (both available in Expo)
Size: 24px standard, 20px in tab bar, 16px inline
Color: inherits text color context
Stroke weight: 1.5px (regular) / 2px (emphasized)
```

---

## Motion & Animation

```
Sheet open/close: 300ms ease-out
Tab switch: instant (no animation)
Button press: scale(0.97) 100ms
Skeleton loader: opacity 0.4 → 0.8 → 0.4, 1.2s loop
Toast appear: slide up 200ms ease-out, auto-dismiss 3s
LIVE badge pulse: opacity 1 → 0.5 → 1, 1.5s loop
```

---

## Auth Rules (Progressive Auth / Soft Gate)

```
NO login screen on app launch.

Public (no auth):
  - Home screen (live scores, fixtures)
  - Leaderboard (view only)
  - Any user's public profile
  - Match schedule & results

Auth gate triggers (bottom sheet):
  - Saving fantasy squad
  - Submitting a prediction
  - Making bracket picks
  - Generating invite link

Gate behavior:
  - Opens as bottom sheet, NOT full-page redirect
  - Background content stays visible (dimmed)
  - Headline changes based on trigger action
  - On success: user returns to same screen, completes action
```

---

## Dark Mode

```
This design system is dark-first. There is no light mode in v1.
All screens use #0F172A as base background.
```

---

## Do / Don't

```
DO:
  ✓ Use system fonts
  ✓ Dark navy backgrounds exclusively
  ✓ Emerald green for all primary actions
  ✓ Amber for all score/points displays
  ✓ Bottom sheets instead of full-page modals where possible
  ✓ Skeleton loaders for async content
  ✓ 16px horizontal screen padding on all pages

DON'T:
  ✗ White or light backgrounds
  ✗ More than 2 accent colors per screen
  ✗ Login screen on app launch
  ✗ Centered text in list items
  ✗ Drop shadows (use borders on dark theme)
  ✗ More than 5 bottom tab items
```
