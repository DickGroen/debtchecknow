:root {
  --ink: #0d1117;
  --ink-2: #1c2333;
  --ink-3: #2d3748;
  --muted: #6b7a90;
  --muted-2: #a0aabb;
  --line: #e2e8f0;
  --surface: #f7f9fc;
  --white: #ffffff;
  --red: #c0392b;
  --red-soft: #fdecea;
  --green: #1a7a4a;
  --green-soft: #e8f5ee;
  --amber: #b45309;
  --amber-soft: #fef3c7;
  --accent: #1b3a8c;
  --accent-2: #2e5fac;
  --accent-soft: #ebf1ff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  line-height: 1.65;
  color: var(--ink);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
  cursor: auto;
}

h1, h2, h3, h4 {
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  line-height: 1.2;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
}

.container--wide {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
  padding: 14px 0;
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.logo {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: default;
}

.logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--red);
  display: inline-block;
}

.header-cta {
  background: var(--accent);
  color: var(--white);
  padding: 9px 20px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.88rem;
  transition: background 0.2s;
  cursor: pointer;
  border: none;
}

.header-cta:hover {
  background: var(--ink);
}

/* Hero */
.hero {
  padding: 64px 0 52px;
  border-bottom: 1px solid var(--line);
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--red-soft);
  color: var(--red);
  padding: 5px 14px;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 22px;
}

.hero h1 {
  font-size: clamp(1.8rem, 4.5vw, 2.9rem);
  color: var(--ink);
  max-width: 700px;
  margin: 0 auto 16px;
  line-height: 1.2;
  text-align: center;
}

.hero h1 em {
  font-style: normal;
  color: var(--accent);
}

.hero__sub {
  font-size: 1.05rem;
  color: var(--ink-3);
  max-width: 560px;
  margin: 0 auto 28px;
  line-height: 1.7;
  text-align: center;
}

/* Value strip */
.value-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  margin-bottom: 32px;
  padding: 18px 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: var(--ink-3);
  font-weight: 500;
}

.vi-check {
  color: var(--green);
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* Upload */
.upload-section {
  background: var(--surface);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 36px 32px;
  text-align: center;
  transition: border-color 0.2s, background 0.2s;
  cursor: pointer;
  position: relative;
}

.upload-section:hover,
.upload-section.drag-over {
  border-color: var(--accent-2);
  background: var(--accent-soft);
}

.upload-icon {
  width: 52px;
  height: 52px;
  background: var(--white);
  border: 1.5px solid var(--line);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.upload-label {
  font-weight: 600;
  font-size: 1rem;
  color: var(--ink);
  margin-bottom: 6px;
}

.upload-hint {
  font-size: 0.82rem;
  color: var(--muted);
}

#file-input {
  display: none;
}

/* Teaser */
.teaser {
  display: none;
  background: var(--white);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
}

.teaser.visible {
  display: block;
}

.teaser__header {
  background: var(--ink);
  color: var(--white);
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.teaser__company {
  font-weight: 600;
  font-size: 0.95rem;
}

.teaser__status-label {
  background: var(--green-soft);
  color: var(--green);
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
}

.teaser__body {
  padding: 22px 24px;
}

.teaser__found {
  font-weight: 700;
  font-size: 1rem;
  color: var(--ink);
  margin-bottom: 8px;
}

.teaser__sub {
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 20px;
  line-height: 1.7;
}

.teaser__locked {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.lock-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: var(--ink);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.teaser__locked-text {
  font-size: 0.83rem;
  color: var(--muted);
}

.teaser__locked-text strong {
  color: var(--ink);
  display: block;
  font-size: 0.9rem;
  margin-bottom: 2px;
}

/* CTA */
.cta-wrap {
  margin-top: 20px;
}

.cta-main,
.button {
  display: inline-block;
  width: 100%;
  background: var(--accent);
  color: var(--white);
  padding: 18px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.cta-main:hover,
.button:hover {
  background: var(--ink);
  transform: translateY(-1px);
}

.cta-sub {
  text-align: center;
  margin-top: 10px;
  font-size: 0.78rem;
  color: var(--muted);
}

/* Sections */
.section {
  padding: 68px 0;
  border-bottom: 1px solid var(--line);
}

.section-label {
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-2);
  margin-bottom: 10px;
}

.section h2 {
  font-size: clamp(1.4rem, 2.8vw, 2rem);
  color: var(--ink);
  margin-bottom: 44px;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
}

.step__num {
  font-weight: 700;
  font-size: 2.4rem;
  color: var(--line);
  line-height: 1;
  margin-bottom: 12px;
}

.step__title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--ink);
  margin-bottom: 8px;
}

.step__desc {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.7;
}

/* Report preview */
.report-preview {
  background: var(--white);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
}

.report-preview__header {
  background: var(--ink-2);
  color: var(--white);
  padding: 16px 24px;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.report-row {
  display: grid;
  grid-template-columns: 1fr 100px 80px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--line);
  font-size: 0.85rem;
  align-items: center;
  gap: 12px;
}

.report-row:last-child {
  border-bottom: none;
}

.report-row__label {
  color: var(--ink-3);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge--green {
  background: var(--green-soft);
  color: var(--green);
}

.badge--amber {
  background: var(--amber-soft);
  color: var(--amber);
}

.badge--red {
  background: var(--red-soft);
  color: var(--red);
}

.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.kans {
  font-size: 0.78rem;
  color: var(--muted);
  font-weight: 500;
}

.report-footer {
  background: var(--surface);
  padding: 16px 24px;
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--ink-3);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Reviews */
.reviews {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.review {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 20px 22px;
}

.stars {
  color: #f59e0b;
  font-size: 0.85rem;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.review__text {
  font-size: 0.88rem;
  color: var(--ink-3);
  line-height: 1.65;
  margin-bottom: 12px;
  font-style: italic;
}

.review__author {
  font-size: 0.78rem;
  color: var(--muted);
  font-weight: 500;
}

/* Upsells */
.upsell-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.upsell-card {
  border: 1.5px solid var(--line);
  border-radius: 10px;
  padding: 22px;
}

.upsell-price {
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--accent);
  margin-bottom: 6px;
}

.upsell-title {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--ink);
  margin-bottom: 8px;
}

.upsell-desc {
  font-size: 0.83rem;
  color: var(--muted);
  line-height: 1.6;
}

/* FAQ */
.faq-item {
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}

.faq-q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 4px;
  cursor: pointer;
  gap: 16px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--ink);
}

.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.2s;
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.75;
  padding: 0 4px;
}

.faq-item.open .faq-a {
  max-height: 220px;
  padding-bottom: 20px;
}

/* Disclaimer */
.disclaimer {
  background: var(--surface);
  border-top: 1px solid var(--line);
  padding: 32px 0;
}

.disclaimer p {
  font-size: 0.78rem;
  color: var(--muted-2);
  line-height: 1.8;
}

/* Sticky footer */
.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--ink);
  color: var(--white);
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
}

.sticky-footer.visible {
  transform: translateY(0);
}

.sticky-footer__text {
  font-weight: 600;
  font-size: 0.9rem;
}

.sticky-footer__sub {
  font-size: 0.78rem;
  color: var(--muted-2);
  margin-top: 2px;
}

.sticky-cta {
  background: #fcd34d;
  color: var(--ink);
  padding: 11px 24px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.88rem;
  border: none;
  cursor: pointer;
}

/* Modal */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(13,17,23,0.7);
  backdrop-filter: blur(6px);
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-overlay.visible {
  display: flex;
}

.modal {
  background: var(--white);
  border-radius: 16px;
  max-width: 460px;
  width: 100%;
  overflow: hidden;
}

.modal__header {
  background: var(--ink);
  color: var(--white);
  padding: 28px 32px;
}

.modal__eyebrow {
  font-size: 0.72rem;
  color: #9ca3af;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.modal__title {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 6px;
  line-height: 1.3;
}

.modal__sub {
  font-size: 0.85rem;
  color: var(--muted-2);
  line-height: 1.55;
}

.modal__price {
  font-weight: 700;
  font-size: 1.9rem;
  color: #fcd34d;
  margin-top: 14px;
}

.modal__body {
  padding: 28px 32px;
}

.modal__feature {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 13px;
  font-size: 0.88rem;
  color: var(--ink-3);
  line-height: 1.5;
}

.check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.65rem;
  margin-top: 1px;
}

.modal__disclaimer {
  background: var(--surface);
  border-radius: 8px;
  padding: 12px 16px;
  margin: 20px 0;
  font-size: 0.78rem;
  color: var(--muted);
  line-height: 1.65;
}

.modal__cta {
  display: block;
  width: 100%;
  background: var(--accent);
  color: var(--white);
  padding: 17px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  text-align: center;
}

.modal__security {
  text-align: center;
  margin-top: 10px;
  font-size: 0.75rem;
  color: var(--muted-2);
}

.modal__close {
  display: block;
  text-align: center;
  margin-top: 10px;
  font-size: 0.8rem;
  color: var(--muted);
  cursor: pointer;
}

/* Responsive */
@media (max-width: 600px) {
  .hero {
    padding: 44px 0 36px;
  }

  .section {
    padding: 52px 0;
  }

  .report-row {
    grid-template-columns: 1fr 90px;
  }

  .report-row .kans {
    display: none;
  }

  .hero h1 {
    font-size: 1.7rem;
  }

  .modal__header,
  .modal__body {
    padding: 24px;
  }
}

/* Optie grid — 2 kaarten naast elkaar */
.optie-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

.optie-card {
  border: 1.5px solid var(--line);
  border-radius: 14px;
  padding: 24px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.optie-card--gratis {
  border-color: var(--green);
  background: #f0fdf4;
}

.optie-card--betaald {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.optie-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: fit-content;
}

.optie-badge--gratis {
  background: var(--green-soft);
  color: var(--green);
}

.optie-badge--betaald {
  background: var(--accent-soft);
  color: var(--accent);
}

.optie-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.optie-desc {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.65;
  margin: 0;
}

.optie-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.optie-list li {
  font-size: 0.85rem;
  color: var(--ink-3);
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.optie-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--ink);
  margin: 4px 0;
}

.optie-price span {
  font-size: 0.82rem;
  font-weight: 400;
  color: var(--muted);
}

.optie-input {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.9rem;
  color: var(--ink);
  background: var(--white);
  outline: none;
  cursor: text;
}

.optie-input:focus {
  border-color: var(--accent-2);
  box-shadow: 0 0 0 3px rgba(46, 95, 172, 0.08);
}

.upload-section--small {
  padding: 18px 16px;
}

.optie-btn {
  display: block;
  width: 100%;
  padding: 13px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  text-decoration: none;
  margin-top: auto;
}

.optie-btn--gratis {
  background: var(--green);
  color: var(--white);
  cursor: pointer;
}

.optie-btn--gratis:hover:not(:disabled) {
  background: #155d38;
  cursor: pointer;
}

.optie-btn--gratis:disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
  pointer-events: none;
}

.optie-btn--betaald {
  background: var(--accent);
  color: var(--white);
  cursor: pointer;
}

.optie-btn--betaald:hover {
  background: var(--ink);
}

.optie-security {
  font-size: 0.75rem;
  color: var(--muted);
  text-align: center;
  margin: 0;
}

.optie-status {
  font-size: 0.82rem;
  border-radius: 8px;
  padding: 10px 12px;
  line-height: 1.5;
}

.optie-status--info {
  background: var(--amber-soft);
  color: var(--amber);
}

.optie-status--success {
  background: var(--green-soft);
  color: var(--green);
}

.optie-status--error {
  background: var(--red-soft);
  color: var(--red);
}

@media (max-width: 640px) {
  .optie-grid {
    grid-template-columns: 1fr;
  }
}

/* ── Echte output ── */
.real-output {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
}

.real-output__block {
  padding: 24px 28px;
  border-bottom: 1px solid var(--line);
}

.real-output__block:last-child {
  border-bottom: none;
}

.real-output__block--letter {
  background: var(--surface);
}

.real-output__label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-2);
  margin-bottom: 12px;
}

.real-output__text {
  font-size: 0.9rem;
  color: var(--ink-3);
  line-height: 1.75;
}

.real-output__issues {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.real-issue {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.real-issue__badge {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 700;
  background: var(--green-soft);
  color: var(--green);
  margin-top: 2px;
}

.real-issue__badge--medium {
  background: var(--amber-soft);
  color: var(--amber);
}

.real-issue__title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--ink);
  margin-bottom: 4px;
}

.real-issue__desc {
  font-size: 0.83rem;
  color: var(--muted);
  line-height: 1.7;
}

.real-output__letter {
  position: relative;
  font-size: 0.88rem;
  color: var(--ink-3);
  line-height: 1.8;
}

.real-output__letter p {
  margin-bottom: 10px;
}

.real-output__blur {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, var(--surface) 80%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
}

.real-output__blur span {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted);
  background: var(--white);
  border: 1px solid var(--line);
  padding: 4px 14px;
  border-radius: 100px;
}

/* ── Trust grid ── */
.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}

.trust-item {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 20px 22px;
}

.trust-icon {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.trust-item__title {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--ink);
  margin-bottom: 6px;
}

.trust-item__desc {
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.65;
}

/* ── Risk reversal ── */
.risk-reversal {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--green-soft);
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 14px 18px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--green);
}

.risk-reversal__icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

/* ── Guarantee onder betaal-knop ── */
.optie-guarantee {
  text-align: center;
  font-size: 0.75rem;
  color: var(--green);
  font-weight: 500;
  margin: 0;
}
