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
  --panel: rgba(255, 255, 255, 0.88);
  --panel-soft: rgba(226, 234, 255, 0.78);
  --ink: #071936;
  --muted: #61708d;
  --line: rgba(0, 82, 255, 0.16);
  --track: rgba(0, 82, 255, 0.1);
}

.dark {
  --page: #061229;
  --panel: rgba(12, 27, 58, 0.86);
  --panel-soft: rgba(18, 43, 92, 0.72);
  --ink: #f2f7ff;
  --muted: #a8b7d8;
  --line: rgba(140, 177, 255, 0.18);
  --track: rgba(242, 247, 255, 0.12);
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

.page-shell {
  margin-inline: auto;
  max-width: 80rem;
  padding: 2rem 1.25rem 4rem;
}

@media (min-width: 640px) {
  .page-shell {
    padding-inline: 2rem;
  }
}

@media (min-width: 1024px) {
  .page-shell {
    padding-inline: 2.5rem;
  }
}

.nav-link {
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 650;
  padding: 0.65rem 1rem;
  transition: 180ms ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: var(--panel);
  color: var(--ink);
}

.icon-button {
  align-items: center;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 1rem;
  color: var(--ink);
  display: inline-flex;
  height: 2.75rem;
  justify-content: center;
  width: 2.75rem;
}

.icon-button.small {
  border-radius: 0.85rem;
  height: 2.35rem;
  width: 2.35rem;
}

.wallet-button,
.primary-button,
.secondary-button,
.danger-link {
  align-items: center;
  border-radius: 1rem;
  display: inline-flex;
  font-weight: 750;
  gap: 0.55rem;
  justify-content: center;
  min-height: 3rem;
  padding: 0 1rem;
}

.wallet-button,
.primary-button {
  background: #0052ff;
  color: white;
  box-shadow: 0 18px 35px rgba(0, 82, 255, 0.24);
}

.secondary-button {
  background: var(--panel);
  border: 1px solid var(--line);
  color: var(--ink);
  box-shadow: 0 10px 30px rgba(0, 82, 255, 0.08);
}

.primary-button:disabled,
.secondary-button:disabled,
.wallet-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.panel,
.product-card,
.metric {
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: 0 18px 50px rgba(0, 24, 80, 0.08);
}

.panel {
  border-radius: 1.5rem;
  padding: 1.25rem;
}

.product-card {
  border-radius: 1.4rem;
  overflow: hidden;
}

.metric {
  border-radius: 1.15rem;
  padding: 1rem;
}

.metric dt,
.eyebrow {
  color: #0052ff;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
}

.dark .metric dt,
.dark .eyebrow {
  color: #8cb1ff;
}

.metric dd {
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 750;
  margin: 0.2rem 0 0;
}

.tag {
  border-radius: 999px;
  background: rgba(0, 82, 255, 0.12);
  color: #0052ff;
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.35rem 0.65rem;
}

.dark .tag {
  color: #8cb1ff;
}

.form-field {
  display: grid;
  gap: 0.45rem;
}

.form-field span {
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 700;
}

.input,
.textarea,
.select {
  background: var(--panel-soft);
  border: 1px solid var(--line);
  border-radius: 1rem;
  color: var(--ink);
  min-height: 3rem;
  min-width: 0;
  padding: 0 1rem;
}

.textarea {
  min-height: 8rem;
  padding-block: 0.9rem;
  resize: vertical;
}

.input:focus,
.textarea:focus,
.select:focus {
  border-color: #0052ff;
  outline: 3px solid rgba(0, 82, 255, 0.16);
}

.chain-badge {
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.45rem 0.7rem;
}

.chain-badge.is-live {
  background: rgba(0, 82, 255, 0.14);
  color: #0052ff;
}

.dark .chain-badge {
  color: #93c5fd;
}

.dark .chain-badge.is-live {
  color: #8cb1ff;
}
</style>
