<template>
  <div>
    <NuxtRouteAnnouncer />
    <main class="min-h-screen bg-[var(--page)] text-[var(--ink)] transition-colors duration-300">
      <AppHeader />
      <NuxtPage />
    </main>
  </div>
</template>

<style>
:root {
  --page: #f4f7ff;
  --panel: rgba(255, 255, 255, 0.97);
  --panel-soft: rgba(218, 232, 255, 0.6);
  --ink: #030c22;
  --muted: #5c6e98;
  --line: rgba(20, 72, 240, 0.11);
  --track: rgba(20, 72, 240, 0.08);
  --accent: #1a5eff;
  --accent-soft: rgba(26, 94, 255, 0.11);
  --accent-glow: rgba(26, 94, 255, 0.26);
  --live: #ff4020;
  --live-soft: rgba(255, 64, 32, 0.11);
}

.dark {
  --page: #03060d;
  --panel: rgba(6, 11, 26, 0.97);
  --panel-soft: rgba(12, 22, 52, 0.82);
  --ink: #e5eeff;
  --muted: #7d93c5;
  --line: rgba(80, 135, 255, 0.17);
  --track: rgba(255, 255, 255, 0.06);
  --accent: #2d6cff;
  --accent-soft: rgba(45, 108, 255, 0.15);
  --accent-glow: rgba(45, 108, 255, 0.32);
  --live: #ff5c3a;
  --live-soft: rgba(255, 92, 58, 0.14);
}

body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

/* Layout */
.page-shell {
  margin-inline: auto;
  max-width: 80rem;
  padding: 2.5rem 1.25rem 5rem;
}

@media (min-width: 640px) { .page-shell { padding-inline: 2rem; } }
@media (min-width: 1024px) { .page-shell { padding-inline: 2.5rem; } }

/* Navigation */
.nav-link {
  border-radius: 0.6rem;
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 0.85rem;
  transition: 140ms ease;
  letter-spacing: -0.01em;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: var(--panel);
  color: var(--ink);
}

/* Icon buttons */
.icon-button {
  align-items: center;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 0.75rem;
  color: var(--ink);
  display: inline-flex;
  height: 2.6rem;
  justify-content: center;
  width: 2.6rem;
  transition: 140ms ease;
}

.icon-button.small {
  border-radius: 0.6rem;
  height: 2.2rem;
  width: 2.2rem;
}

.icon-button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Buttons */
.wallet-button,
.primary-button,
.secondary-button,
.danger-link {
  align-items: center;
  border-radius: 0.75rem;
  display: inline-flex;
  font-weight: 700;
  gap: 0.45rem;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 1.1rem;
  letter-spacing: -0.01em;
  transition: 140ms ease;
  white-space: nowrap;
}

.wallet-button,
.primary-button {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 20px var(--accent-glow);
}

.wallet-button:hover,
.primary-button:hover {
  filter: brightness(1.1);
  box-shadow: 0 8px 28px var(--accent-glow);
}

.secondary-button {
  background: var(--panel);
  border: 1px solid var(--line);
  color: var(--ink);
  box-shadow: none;
}

.secondary-button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.primary-button:disabled,
.secondary-button:disabled,
.wallet-button:disabled {
  cursor: not-allowed;
  opacity: 0.42;
  filter: none !important;
  box-shadow: none;
}

/* Cards */
.panel,
.product-card,
.metric {
  background: var(--panel);
  border: 1px solid var(--line);
}

.panel {
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 2px 20px rgba(0, 8, 50, 0.05);
}

.dark .panel {
  box-shadow: 0 2px 20px rgba(0, 0, 20, 0.45);
}

.product-card {
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 8, 50, 0.05);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 8, 50, 0.1);
}

.dark .product-card:hover {
  box-shadow: 0 12px 36px rgba(0, 0, 30, 0.6);
}

.metric {
  border-radius: 0.9rem;
  padding: 0.9rem 1rem;
}

/* Labels */
.metric dt,
.eyebrow {
  color: var(--accent);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.metric dd {
  font-size: clamp(1.1rem, 2.6vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0.2rem 0 0;
  font-variant-numeric: tabular-nums;
}

/* Tags */
.tag {
  border-radius: 0.35rem;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.28rem 0.55rem;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
}

.tag-live {
  border-radius: 0.35rem;
  background: var(--live-soft);
  color: var(--live);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.28rem 0.55rem;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  animation: live-pulse 1.6s ease-in-out infinite;
}

@keyframes live-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.7); }
}

/* Form elements */
.form-field {
  display: grid;
  gap: 0.45rem;
}

.form-field span {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.input,
.textarea,
.select {
  background: var(--panel-soft);
  border: 1px solid var(--line);
  border-radius: 0.75rem;
  color: var(--ink);
  min-height: 2.75rem;
  min-width: 0;
  padding: 0 0.9rem;
  transition: 140ms ease;
}

.textarea {
  min-height: 8rem;
  padding-block: 0.85rem;
  resize: vertical;
}

.input:focus,
.textarea:focus,
.select:focus {
  border-color: var(--accent);
  outline: 3px solid var(--accent-soft);
}

/* Chain badge */
.chain-badge {
  border-radius: 0.45rem;
  background: rgba(59, 130, 246, 0.09);
  color: #2563eb;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.6rem;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
}

.chain-badge.is-live {
  background: var(--accent-soft);
  color: var(--accent);
}

.dark .chain-badge {
  color: #93c5fd;
}

.dark .chain-badge.is-live {
  color: var(--accent);
}

/* Tabular number utility */
.tabular {
  font-variant-numeric: tabular-nums;
}
</style>
