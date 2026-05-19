# Design Brief

## Direction

Frost & Bear Designs — Premium design studio with ice-dark luxury aesthetic, frost-blue accents, and refined minimalism.

## Tone

Refined, icy cool minimalism executing a premium/luxury brand with conviction. Cold color temperature, strategic depth, commanding confidence.

## Differentiation

Frost-blue accent glows subtly on hover; layered card-based depth through borders and elevated surfaces; cursive signature integration and gallery imagery floating on dark containers.

## Color Palette

| Token | OKLCH | Role |
| --- | --- | --- |
| background | 0.11 0.008 240 | Core dark navy |
| foreground | 0.96 0.005 240 | Near-white cool text |
| card | 0.16 0.012 240 | Elevated surface tier |
| primary | 0.72 0.18 225 | Icy frost-blue accent |
| accent | 0.68 0.16 200 | Cyan highlight complement |
| secondary | 0.22 0.01 240 | Muted darker tier |
| muted | 0.22 0.01 240 | Secondary surface |
| destructive | 0.60 0.20 15 | Red warning/delete |
| border | 0.26 0.01 240 | Subtle dividers |
| input | 0.26 0.01 240 | Form field base |

## Typography

- Display: Space Grotesk — geometric, tech-forward headings and hero sections
- Body: DM Sans — clean, readable, professional service descriptions and labels
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-4xl font-semibold`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base text-foreground/90`

## Elevation & Depth

Four-tier surface hierarchy: background (darkest) → secondary → card (raised) → elevated (lightest). Soft, cool-tinted shadows. No harsh blacks, maintained visual continuity through hue.

## Structural Zones

| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header | card (0.16) | frost-primary bottom | Navigation + logo, elevated base |
| Content sections | background / card alternate | — | Breathing space, card-based grid |
| Service cards | card with thin border | border (0.26) | Pricing USD+Robux dual display |
| Gallery | card clusters | subtle | Dark containers, image float |
| Footer | secondary/muted | border top | Legal links, muted text |

## Spacing & Rhythm

Spacious default (6px radius, 2rem section gaps). Consistent 1rem card padding, alternating card/background sections, micro-spacing 0.5rem for icon+text grouping.

## Component Patterns

- Buttons: frost-blue primary with subtle glow hover, dark secondary outline, full-width on mobile
- Cards: thin border, rounded 6px, dark background with raised hover state
- Badges: muted background + foreground text, compact rounded
- Forms: dark input with frost-blue focus ring, label uppercase small

## Motion

- Entrance: Fade-in 0.3s ease-out on scroll
- Hover: Subtle glow on primary buttons (shadow brightens), card lift 2px
- Decorative: None (anti-animation, premium constraint)

## Constraints

- No full-page gradients or busy patterns
- Frost-blue used sparingly for focus, CTAs, active states only
- All imagery floats on card backgrounds, never full-bleed
- Typography maintained strict hierarchy: size + weight, never rely on color alone

## Signature Detail

Cursive signature input area in contract creator converts typed text to flowing script rendering, cementing the premium bespoke positioning.
