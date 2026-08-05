# STIAMOND BLUEPRINT v2.0

## Volume 7 — Design System

**Version :** 1.0
**Statut :** Référentiel

---

# 1. Identité visuelle

## 1.1 Positionnement

**Premium technology + intelligent systems**

## 1.2 Inspirations

| Marque | Ce qu'on retient |
|--------|-------------------|
| **Stripe** | Simplicité du layout, gradients subtils |
| **Vercel** | Élégance technique, dark mode natif, Geist |
| **Linear** | Micro-interactions, densité maîtrisée |
| **OpenAI** | Minimalisme, palette monochrome + accent |
| **Cloudflare** | Infrastructure visible, transparence |

## 1.3 Principes

1. **Content-first** — le design sert le contenu
2. **Dark-first** — dark mode = référence, light = adaptation
3. **Motion with purpose** — chaque animation transmet de l'information
4. **Density over whitespace abuse** — espace intelligent, pas excessif
5. **Consistency over creativity** — réutiliser > recréer
6. **Accessibility is not optional** — WCAG 2.1 AA minimum

---

# 2. Palette de couleurs

## 2.1 Tokens sémantiques

### Surfaces

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `#FFFFFF` | `#020617` | Fond de page |
| `--surface-1` | `#F8FAFC` | `#0A0F1E` | Cartes, sections alternées |
| `--surface-2` | `#F1F5F9` | `#111827` | Inputs, dropdowns, hover |
| `--surface-3` | `#E2E8F0` | `#1E293B` | Modals, popovers |
| `--overlay` | `rgba(2,6,23,0.6)` | `rgba(0,0,0,0.8)` | Backdrop |

### Texte

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--text-primary` | `#020617` | `#F8FAFC` | Titres, texte principal |
| `--text-secondary` | `#475569` | `#94A3B8` | Sous-titres |
| `--text-muted` | `#94A3B8` | `#64748B` | Labels, métadonnées |
| `--text-disabled` | `#CBD5E1` | `#334155` | États désactivés |
| `--text-inverse` | `#F8FAFC` | `#020617` | Texte sur accent |

### Bordures

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--border-subtle` | `#F1F5F9` | `#1E293B` | Dividers |
| `--border-default` | `#E2E8F0` | `#334155` | Cards, inputs |
| `--border-strong` | `#CBD5E1` | `#475569` | Hover, focus |
| `--border-focus` | `#2563EB` | `#3B82F6` | Focus actif |

### Accents

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--accent-primary` | `#2563EB` | `#3B82F6` | CTAs, liens |
| `--accent-primary-hover` | `#1D4ED8` | `#60A5FA` | Hover |
| `--accent-primary-active` | `#1E40AF` | `#2563EB` | Pressed |
| `--accent-ai` | `#8B5CF6` | `#A78BFA` | Accent IA |
| `--accent-ai-hover` | `#7C3AED` | `#C4B5FD` | Hover IA |
| `--accent-ai-glow` | `rgba(139,92,246,0.15)` | `rgba(167,139,250,0.2)` | Glow IA |

### Statut

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--success` | `#10B981` | `#34D399` | Succès |
| `--success-bg` | `#ECFDF5` | `rgba(16,185,129,0.1)` | Fond succès |
| `--warning` | `#F59E0B` | `#FBBF24` | Avertissement |
| `--warning-bg` | `#FFFBEB` | `rgba(245,158,11,0.1)` | Fond warning |
| `--error` | `#EF4444` | `#F87171` | Erreur |
| `--error-bg` | `#FEF2F2` | `rgba(239,68,68,0.1)` | Fond erreur |

## 2.2 Gradients

| Nom | Valeur | Usage |
|-----|--------|-------|
| `--gradient-ai` | `linear-gradient(135deg, #2563EB, #8B5CF6)` | Badges IA, boutons |
| `--gradient-hero` | `radial-gradient(ellipse at top, rgba(37,99,235,0.15), transparent 50%)` | Hero bg |
| `--gradient-glow` | `radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)` | Glow |
| `--gradient-text` | `linear-gradient(135deg, #3B82F6, #A78BFA)` | Texte gradient |
| `--gradient-border` | `linear-gradient(135deg, rgba(37,99,235,0.5), rgba(139,92,246,0.5))` | Border gradient |

---

# 3. Typographie

## 3.1 Familles

| Rôle | Police | Variable |
|------|--------|----------|
| **Interface** | Geist Sans | `--font-sans` |
| **Code** | JetBrains Mono | `--font-mono` |

## 3.2 Échelle typographique (base 16px, ratio 1.250)

| Token | Taille | Line-height | Weight | Usage |
|-------|--------|-------------|--------|-------|
| `--text-display` | 56px | 1.1 | 700 | Hero H1 |
| `--text-h1` | 44px | 1.15 | 700 | Page H1 |
| `--text-h2` | 36px | 1.2 | 700 | Section H2 |
| `--text-h3` | 28px | 1.25 | 600 | H3 |
| `--text-h4` | 22px | 1.3 | 600 | Card titles |
| `--text-h5` | 18px | 1.4 | 600 | Small headings |
| `--text-body-lg` | 18px | 1.6 | 400 | Lead paragraphs |
| `--text-body` | 16px | 1.6 | 400 | Body text |
| `--text-body-sm` | 14px | 1.5 | 400 | Secondary text |
| `--text-caption` | 12px | 1.4 | 500 | Captions, labels |
| `--text-overline` | 12px | 1.4 | 600 | Eyebrows |

### Responsive

| Token | Mobile | Desktop |
|-------|--------|---------|
| `--text-display` | 32px | 56px |
| `--text-h1` | 28px | 44px |
| `--text-h2` | 24px | 36px |
| `--text-h3` | 20px | 28px |

## 3.3 Lettre-spacing

| Token | Valeur | Usage |
|-------|--------|-------|
| `--tracking-tight` | -0.02em | Display, H1 |
| `--tracking-normal` | 0 | Body |
| `--tracking-wide` | 0.025em | H4, H5 |
| `--tracking-wider` | 0.05em | Overlines |
| `--tracking-widest` | 0.1em | Uppercase labels |

---

# 4. Espacements (système 4px)

| Token | Valeur | Usage |
|-------|--------|-------|
| `--space-1` | 4px | Inline gaps |
| `--space-2` | 8px | Tight padding |
| `--space-3` | 12px | Input padding |
| `--space-4` | 16px | Default gap |
| `--space-6` | 24px | Section internal |
| `--space-8` | 32px | Card padding |
| `--space-10` | 40px | Section padding (mobile) |
| `--space-12` | 48px | Section padding (tablet) |
| `--space-16` | 64px | Section padding (desktop) |
| `--space-20` | 80px | Large section |
| `--space-24` | 96px | Hero, footer |
| `--space-32` | 128px | Max section |

## Container

| Token | Valeur |
|-------|--------|
| `--container-sm` | 640px |
| `--container-md` | 768px |
| `--container-lg` | 1024px |
| `--container-xl` | 1280px |
| `--container-2xl` | 1536px |
| `--container-gutter` | 24px mobile / 32px tablet / 48px desktop |

---

# 5. Border radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `--radius-sm` | 4px | Badges, tags |
| `--radius-md` | 8px | Inputs, buttons |
| `--radius-lg` | 12px | Cards, modals |
| `--radius-xl` | 16px | Large cards |
| `--radius-2xl` | 24px | Feature cards |
| `--radius-full` | 9999px | Pills, avatars |

---

# 6. Shadows

| Token | Light | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(2,6,23,0.05)` | Subtle elevation |
| `--shadow-sm` | `0 1px 3px rgba(2,6,23,0.1)` | Cards default |
| `--shadow-md` | `0 4px 6px -1px rgba(2,6,23,0.1)` | Cards hover |
| `--shadow-lg` | `0 10px 15px -3px rgba(2,6,23,0.1)` | Modals |
| `--shadow-xl` | `0 20px 25px -5px rgba(2,6,23,0.1)` | Floating |

### Glow effects

| Token | Valeur | Usage |
|-------|--------|-------|
| `--glow-ai-sm` | `0 0 20px rgba(139,92,246,0.15)` | Hover IA |
| `--glow-ai-md` | `0 0 40px rgba(139,92,246,0.2)` | Cards IA |
| `--glow-ai-lg` | `0 0 80px rgba(139,92,246,0.25)` | Hero, CTA |

---

# 7. Z-index

| Token | Valeur | Usage |
|-------|--------|-------|
| `--z-base` | 0 | Contenu normal |
| `--z-dropdown` | 10 | Dropdowns |
| `--z-sticky` | 20 | Headers sticky |
| `--z-drawer` | 30 | Drawers |
| `--z-modal` | 40 | Modals |
| `--z-popover` | 50 | Popovers, tooltips |
| `--z-toast` | 60 | Toasts |

---

# 8. Grid & Breakpoints

| Breakpoint | Min-width | Colonnes | Gutter |
|------------|-----------|----------|--------|
| Mobile | 0 | 4 | 16px |
| `sm` | 640px | 4 | 16px |
| `md` | 768px | 8 | 24px |
| `lg` | 1024px | 12 | 32px |
| `xl` | 1280px | 12 | 32px |
| `2xl` | 1536px | 12 | 32px |

---

# 9. Animations

## 9.1 Durées

| Token | Valeur | Usage |
|-------|--------|-------|
| `--duration-fast` | 150ms | Hover, focus |
| `--duration-normal` | 300ms | Transitions standard |
| `--duration-slow` | 500ms | Page transitions |
| `--duration-slower` | 700ms | Hero, scroll reveals |

## 9.2 Easing

| Token | Valeur | Usage |
|-------|--------|-------|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Général |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entrées |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Sorties |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Springs |
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Scroll reveals |

## 9.3 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 10. Iconographie

**Lucide Icons** — cohérent avec shadcn/ui.

| Token | Taille | Usage |
|-------|--------|-------|
| `--icon-xs` | 14px | Inline, badges |
| `--icon-sm` | 16px | Buttons, inputs |
| `--icon-md` | 20px | Cards, features |
| `--icon-lg` | 24px | Hero, sections |
| `--icon-xl` | 32px | Feature highlights |

Stroke width : **1.5px** (style premium/fin)

---

# 11. Composants — Spécifications

## 11.1 Boutons

### Variantes

| Variante | Background | Text | Usage |
|----------|-----------|------|-------|
| `primary` | `--accent-primary` | `--text-inverse` | CTA principal |
| `secondary` | `--surface-2` | `--text-primary` | CTA secondaire |
| `outline` | transparent | `--text-primary` | CTA tertiaire |
| `ghost` | transparent | `--text-secondary` | Actions discrètes |
| `ai` | `--gradient-ai` | `#FFFFFF` | CTA IA |
| `danger` | `--error` | `#FFFFFF` | Destructif |

### Tailles

| Taille | Padding | Font | Height |
|--------|---------|------|--------|
| `sm` | 8px 14px | 14px | 32px |
| `md` | 10px 18px | 14px | 38px |
| `lg` | 12px 24px | 16px | 44px |
| `xl` | 16px 32px | 18px | 52px |

### États

- **Hover** : `--accent-primary-hover` + `translateY(-1px)` + `--shadow-sm`
- **Focus** : `outline: 2px solid --accent-primary; outline-offset: 2px`
- **Disabled** : `opacity: 0.5; cursor: not-allowed`
- **Loading** : spinner remplace l'icône

## 11.2 Cards

```
Background: --surface-1
Border: 1px solid --border-default
Radius: --radius-lg (12px)
Padding: --space-6 ou --space-8
Shadow: --shadow-sm
Hover: --shadow-md + translateY(-2px) + border-color: --border-strong
```

### Card glow IA

Ajouter `--glow-ai-md` au hover → `--glow-ai-lg` + `translateY(-4px)`

### Card gradient border

```css
border: 1px solid transparent;
&::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: var(--gradient-border);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

## 11.3 Inputs

```
Background: --surface-1 (light) / --surface-2 (dark)
Border: 1px solid --border-default
Radius: --radius-md
Padding: 10px 14px
Font: --text-body (16px)
Height: 40px (md)
Focus: border-color: --border-focus + ring 3px rgba(37,99,235,0.12)
Error: border-color: --error + ring 3px rgba(239,68,68,0.12)
```

## 11.4 Badges

| Variante | Background | Text |
|----------|-----------|------|
| `default` | `--surface-2` | `--text-secondary` |
| `primary` | `rgba(37,99,235,0.1)` | `--accent-primary` |
| `ai` | `rgba(139,92,246,0.1)` | `--accent-ai` |
| `success` | `--success-bg` | `--success` |
| `warning` | `--warning-bg` | `--warning` |
| `error` | `--error-bg` | `--error` |

```
Radius: --radius-full
Padding: 4px 10px
Font: 12px, 500
```

## 11.5 Navigation — Mega Menu

```
Panel: full-width, --surface-3 + backdrop-blur(12px)
Border: 1px solid --border-default
Shadow: --shadow-lg
Radius: --radius-lg
Layout: 3 colonnes (links, links, CTA)
Animation entrée: fade-in + slide-down 8px, 200ms, --ease-out
```

## 11.6 Hero

```
Background: --gradient-hero
Eyebrow → H1 (gradient text) → Sous-titre → CTAs → Visual
Animation: fade-in-up stagger 100ms, --ease-expo
```

## 11.7 Sections

```
Padding vertical: 64px desktop / 40px mobile
Max-width: 1280px
Padding horizontal: container-gutter
Sections alternées: --background / --surface-1
```

## 11.8 Footer

```
Background: --surface-1 (light) / --background (dark)
Border-top: 1px solid --border-default
Padding: 80px top, 48px bottom
Layout: Brand + 4 colonnes + newsletter bar + copyright
```

## 11.9 Pricing cards

3 colonnes. Carte du milieu : `--gradient-border` + `scale(1.02)` + `--glow-blue-sm`.

## 11.10 Tables

```
Header: --surface-2, uppercase, --tracking-wider
Rows: border-bottom 1px --border-subtle
Hover: --surface-1
Padding: 12px 16px
```

## 11.11 Accordions

```
Trigger: 16px, 600, border-bottom 1px --border-subtle
Icon: ChevronDown rotates 180deg
Animation: grid-template-rows 0fr → 1fr
```

## 11.12 Tabs

```
Tab list: border-bottom 1px --border-default
Active: --text-primary, border-bottom 2px --accent-primary
Content: fade-in 200ms
```

## 11.13 Charts

Librairie : **Recharts**. Grid `--border-subtle`, series `--accent-primary` + `--accent-ai`.

---

# 12. Dark mode

## Stratégie

- **Dark-first** : dark = référence
- Toggle dans la nav, persisté `localStorage`
- System preference détecté au premier visit
- **No flash** : script inline dans `<head>`

### Script anti-flash

```html
<script>
  (function() {
    const theme = localStorage.getItem('stiamond-theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && system)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

## Implémentation

CSS variables sur `:root` (light) + `.dark` (dark override). Tailwind `darkMode: 'class'`.

---

# 13. Accessibilité

## Standards

WCAG 2.1 AA minimum. AAA sur pages critiques (contact, pricing, portail).

## Contrastes

| Élément | Minimum | Cible |
|---------|---------|-------|
| Texte normal | 4.5:1 | 7:1 |
| Texte large | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |

## Focus

- `outline: 2px solid --accent-primary; outline-offset: 2px`
- Jamais supprimé sans remplacement
- `:focus-visible` uniquement

## Navigation clavier

- Ordre logique de tabulation
- Skip links
- Focus trap dans modals/drawers
- `Escape` ferme modals/drawers

---

# 14. Logo & Brand marks

À définir par un designer. Spécifications techniques :

| Format | Taille | Usage |
|--------|--------|-------|
| Favicon | 16-48px | Navigateur |
| App icon | 180-512px | PWA, mobile |
| Logo horizontal | 28px (nav), 40px (footer) | Header, footer |
| OG image | 1200x630 | Social sharing |

Variantes : full color (light/dark), monochrome, monochrome inverse.

Safe zone : hauteur × 0.5. Taille minimum : 100px large (horizontal), 24px (mark).

---

# 15. Code blocks

```
Background: --surface-1 (light) / --surface-2 (dark)
Border: 1px solid --border-default
Radius: --radius-lg
Font: JetBrains Mono, 14px
```

Syntax highlighting : **Shiki** (thèmes `github-light` / `github-dark`).

Copy button : top-right, icon Copy → Check, `--surface-2` bg.

---

# 16. Loading & Skeletons

```
Background: linear-gradient(90deg, --surface-1 25%, --surface-2 50%, --surface-1 75%)
Background-size: 200% 100%
Animation: shimmer 1.5s infinite
```

Page transition : top loading bar (`--accent-primary`).
