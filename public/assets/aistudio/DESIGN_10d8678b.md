---
name: Synthetic Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#d7d9e8'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#ebedfc'
  surface-container-high: '#e5e7f6'
  surface-container-highest: '#dfe2f1'
  on-surface: '#171b26'
  on-surface-variant: '#484457'
  inverse-surface: '#2c303b'
  inverse-on-surface: '#eef0ff'
  outline: '#797489'
  outline-variant: '#c9c3da'
  surface-tint: '#5e2aff'
  primary: '#4400d2'
  on-primary: '#ffffff'
  primary-container: '#5c24ff'
  on-primary-container: '#d8cfff'
  inverse-primary: '#c9beff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#004f35'
  on-tertiary: '#ffffff'
  tertiary-container: '#006a48'
  on-tertiary-container: '#60eeb1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#c9beff'
  on-primary-fixed: '#1b0062'
  on-primary-fixed-variant: '#4600d8'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#171b26'
  surface-variant: '#dfe2f1'
  canvas-bg: '#F6F8FA'
  surface-card: '#FFFFFF'
  border-subtle: '#E9EBF0'
  border-strong: '#D1D5DB'
  accent-amber: '#F59E0B'
  accent-rose: '#EF4444'
  text-muted: '#64748B'
  dot-grid: '#CBD5E1'
typography:
  display-hero:
    fontFamily: Geist
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: 4rem
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Geist
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Geist
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  body-sm:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-badge:
    fontFamily: Geist
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system establishes an ultra-clean, technical, and frictionless workspace tailored for next-generation automation builders, engineering leads, and data-centric operators. The aesthetic balances developer-grade utility with refined consumer-grade polish—channeling clarity, low cognitive load, and surgical precision.

Rooted in a contemporary minimalist framework with subtle tactile accents, the interface relies on:
- High-contrast typography paired with airy spatial framing.
- Crisp white content containers hovering over an expansive off-white backdrop with an ambient dot matrix.
- Vibrant, focused chromatic accents—predominantly electric violet and indigo—reserved exclusively for active nodes, primary execution triggers, and real-time system states.
- Monospaced metadata tags and micro-status badges that signal computational rigor without visual clutter.

## Colors

The palette leverages a layered hierarchy anchored on neutral clarity and precise semantic signifiers.

### Role Allocations & Hierarchy
- **Canvas & Surface Tiers:** The core canvas utilizes `canvas-bg` (`#F6F8FA`) with an optional ambient dot grid (`#CBD5E1`). Foreground surfaces, workbenches, node blocks, and modal sheets sit on pure white (`#FFFFFF`) to achieve effortless separation through natural tonal contrast rather than heavy boundary lines.
- **Brand & Action (Primary / Secondary):** Primary actions, interactive node ports, and focus rings rely on `#5C24FF` and `#6366F1`. These colors are strictly functional triggers; avoid using them across large non-interactive backgrounds.
- **State & Diagnostics:** Operational health is signaled with high-luminance, low-saturation accents: `#10B981` (active/success), `#F59E0B` (warning/pending), and `#EF4444` (error/failed runs).
- **Text & Contrast:** Neutral black (`#0B0F19`) drives headers and primary body values for crisp legibility, while `text-muted` (`#64748B`) handles metadata, secondary attributes, and labels.

## Typography

The typographic hierarchy utilizes a modern neo-grotesque sans-serif (`Geist`) paired with a functional monospace face (`JetBrains Mono`) for runtime metadata and IDs.

- **Headlines & Display:** Tightly tracked headings with subtle negative letter-spacing (`-0.025em` to `-0.04em`) create dense, deliberate focal anchors typical of sophisticated toolkits.
- **Body & Editorial:** Neutral, open apertures optimized for high-density dashboards, table grids, and node configuration sidebars.
- **Data & Micro-Labels:** Monospace styling is strictly reserved for technical properties: IDs, run execution times, token counts, endpoints, and environment tags.

## Layout & Spacing

The structural layout uses a modular, fluid column system anchored by strict horizontal and vertical 4px base grids.

- **Grid Systems:**
  - **Desktop (1200px+):** 12-column layout, `1.5rem` (24px) gutters, and `2rem` (32px) margins. Workspace viewports can expand to 100% width with a fixed 240px collapsible navigation rail and fixed side panels.
  - **Tablet (768px – 1199px):** 8-column layout, `1rem` (16px) gutters, `1.5rem` (24px) margins.
  - **Mobile (< 768px):** 4-column layout, `0.75rem` (12px) gutters, `1rem` (16px) margins. Workflows reflow from multi-pane canvas layouts into stacked tab views.
- **Dot-Grid Canvas Texture:** Interactive workflow canvas surfaces feature a repeatable SVG dot grid spaced at `20px` intervals, using `#CBD5E1` at 35% opacity to establish grounding without distracting from foreground elements.

## Elevation & Depth

Visual depth is achieved through delicate boundary definition and diffuse ambient light rather than heavy drop shadows.

- **Outlines & Borders:** All elevated cards and overlays rely on a hairline `1px solid #E9EBF0` border to delineate shape. Surfaces never bleed into one another without a border or contrast shift.
- **Ambient Shadow Levels:**
  - **Flat / Canvas (Level 0):** Background canvas (`#F6F8FA`) has no shadow.
  - **Base Cards & Workflow Nodes (Level 1):** `0 1px 3px 0 rgba(11, 15, 25, 0.04), 0 1px 2px -1px rgba(11, 15, 25, 0.02)`.
  - **Floating Toolbars & Context Popovers (Level 2):** `0 4px 6px -1px rgba(11, 15, 25, 0.06), 0 2px 4px -2px rgba(11, 15, 25, 0.04)`.
  - **Modals & Drawers (Level 3):** `0 20px 25px -5px rgba(11, 15, 25, 0.08), 0 8px 10px -6px rgba(11, 15, 25, 0.04)`.
- **Active Node Glow:** Selected canvas blocks or active input focus rings add a subtle dual-layer ring: `box-shadow: 0 0 0 1px #5C24FF, 0 0 0 4px rgba(92, 36, 255, 0.12)`.

## Shapes

The design uses a moderately rounded geometry (`0.5rem` / 8px baseline) that balances human accessibility with structural order.

- **Standard Containers & Cards (`rounded-md`, 8px):** Used for node cards, dashboard analytics blocks, dropdown menus, and tabular surface frames.
- **Elevated Modals & Dialogs (`rounded-lg`, 12px):** Applied to full-screen drawers, setup wizards, and system dialogs.
- **Pills & Micro-Badges (`rounded-full`, 9999px):** Status badges, tag filters, user avatars, step progress capsules, and primary CTA buttons use fully rounded ends to contrast against angular rectangular containers.

## Components

### Buttons & Actions
- **Primary Button:** Background `#5C24FF`, text `#FFFFFF`, rounded pill (`rounded-full`), height `36px` or `40px`, horizontal padding `16px`. Active hover shifts to `#4B1BD4` with subtle micro-scale (`transform: translateY(-0.5px)`).
- **Secondary / Ghost Button:** Background `#FFFFFF`, border `1px solid #E9EBF0`, text `#0B0F19`, rounded-full. Hover state transitions background to `#F6F8FA` with border tint `#D1D5DB`.

### Status Pills & Badges
- Compact capsules (`height: 22px`, `padding: 2px 8px`, `rounded-full`).
- **Success/Running:** Background `rgba(16, 185, 129, 0.1)`, text `#047857`, featuring an animated or static 6px indicator dot `#10B981`.
- **Queued/Warning:** Background `rgba(245, 158, 11, 0.1)`, text `#B45309`.
- **Error/Failed:** Background `rgba(239, 68, 68, 0.1)`, text `#B91C1C`.

### Identifier Chips & Code Snippets
- Displayed using `label-code` in `JetBrains Mono`.
- Background `#F6F8FA`, border `1px solid #E9EBF0`, radius `6px`, padding `2px 6px`. Text color `#0B0F19`.

### Cards & Workflow Nodes
- White containers (`#FFFFFF`), border `1px solid #E9EBF0`, radius `8px` (`rounded-md`).
- Node header features an integrated icon badge, primary title in `headline-sm`, and trailing execution count. Content split with hairline horizontal dividers (`#F1F3F5`).

### Input Fields & Controls
- Height `38px`, background `#FFFFFF`, border `1px solid #E9EBF0`, radius `6px`.
- Placeholder `#94A3B8`. Focus state introduces a crisp border in `#5C24FF` accompanied by a `3px` outer ring in `rgba(92, 36, 255, 0.12)`.

### Selection Controls (Checkboxes & Radios)
- Square with `4px` radius for checkboxes; full circle for radio buttons.
- Inactive state: `#FFFFFF` fill with `1px solid #D1D5DB`.
- Active state: `#5C24FF` fill with a sharp white checkmark or center pip.