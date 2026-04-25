
// ── Teaser flow ───────────────────────────────────────────────────────────────

async function handleFile(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  if (file.size > 8 * 1024 * 1024) {
    showTeaserError('File too large. Maximum 8 MB.');
    return;
  }

  const teaser = document.getElementById('teaser');
  const teaserCompany = document.getElementById('teaser-company');
  const teaserFound = document.getElementById('teaser-found');
  const teaserSub = document.getElementById('teaser-sub');
  const teaserLocked = document.getElementById('teaser-locked-text');
  const modalCopy = document.getElementById('modal-dynamic-copy');

  teaser.style.display = 'block';
  teaser.classList.remove('teaser--visible');
  teaserCompany.textContent = 'Analysing...';
  teaserFound.textContent = 'Just a moment...';
  teaserSub.textContent = 'Your letter is being analysed.';
  setTimeout(() => teaser.classList.add('teaser--visible'), 10);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${WORKER_URL}/analyze`, { method: 'POST', body: formData });
    const data = await res.json();

    if (!data.ok) throw new Error(data.error || 'Analysis failed');

    const sender = data.sender || null;
    const senderType = data.sender_type || null;
    const claimAmount = data.claim_amount || null;
    const risk = data.risk || 'medium';

    if (claimAmount) {
      teaserCompany.textContent = `We found potential issues — you may not have to pay £${claimAmount}`;
    } else {
      teaserCompany.textContent = sender ? `We found potential issues with the ${sender} letter` : 'We found potential issues — you may not have to pay this';
    }

    teaserFound.textContent = 'Initial finding:';

    const riskMessages = {
      high: '🔴 Strong grounds to challenge — there appear to be legal issues with this letter.',
      medium: '🟠 Potential grounds to challenge — a full check will give you certainty.',
      low: '🟡 Limited grounds — but a check may reveal surprises.'
    };
    teaserSub.textContent = riskMessages[risk] || 'Click below for your full analysis.';

    if (teaserLocked) {
      const amountText = claimAmount ? `£${claimAmount}` : 'this debt';
      teaserLocked.innerHTML = `<strong>Full analysis after payment</strong>
        We'll check all grounds to challenge ${amountText} and prepare a ready-to-send dispute letter &mdash; within 24 hours, before you decide to pay.`;
    }

    if (modalCopy) {
      if (claimAmount && sender) {
        modalCopy.textContent = `We've identified a potential issue with the £${claimAmount} claim from ${sender}. Full assessment follows after payment.`;
      } else if (sender) {
        modalCopy.textContent = `We've identified a letter from ${sender}. Full assessment follows after payment.`;
      } else {
        modalCopy.textContent = 'We\'ve found initial indicators of a challengeable debt. Full assessment follows after payment.';
      }
    }

  } catch (err) {
    teaserCompany.textContent = 'Letter recognised';
    teaserFound.textContent = 'Ready to analyse:';
    teaserSub.textContent = 'Click below to request your full analysis and dispute letter.';
    console.warn('Triage error:', err.message);
  }

  teaser.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showTeaserError(msg) {
  const teaser = document.getElementById('teaser');
  if (teaser) {
    teaser.style.display = 'block';
    const sub = document.getElementById('teaser-sub');
    if (sub) sub.textContent = msg;
  }
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function openModal() {
  const modal = document.getElementById('modal');
  if (modal) { modal.classList.add('modal--open'); document.body.style.overflow = 'hidden'; }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) { modal.classList.remove('modal--open'); document.body.style.overflow = ''; }
}

function closeModalOutside(event) {
  if (event.target === document.getElementById('modal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── FAQ accordion ─────────────────────────────────────────────────────────────

function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const chevron = item.querySelector('.faq-chevron');
  const isOpen = item.classList.contains('faq-item--open');

  document.querySelectorAll('.faq-item--open').forEach(openItem => {
    openItem.classList.remove('faq-item--open');
    const a = openItem.querySelector('.faq-a');
    const c = openItem.querySelector('.faq-chevron');
    if (a) a.style.maxHeight = null;
    if (c) c.style.transform = '';
  });

  if (!isOpen) {
    item.classList.add('faq-item--open');
    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

// ── Sticky footer ─────────────────────────────────────────────────────────────

(function initStickyFooter() {
  const stickyFooter = document.getElementById('sticky-footer');
  if (!stickyFooter) return;
  let ticking = false;

  function updateSticky() {
    const scrollY = window.scrollY;
    const nearBottom = scrollY + window.innerHeight > document.documentElement.scrollHeight - 200;
    if (scrollY > 400 && !nearBottom) {
      stickyFooter.classList.add('sticky-footer--visible');
    } else {
      stickyFooter.classList.remove('sticky-footer--visible');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateSticky); ticking = true; }
  }, { passive: true });
})();
