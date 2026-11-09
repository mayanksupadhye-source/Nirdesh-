// ─── NIRDESH Global JS ────────────────────────────────────────────────────────
// Shared utilities, nav active state, clock, toast system

const API_BASE = window.location.origin;

// ── Live Clock ─────────────────────────────────────────────────────────────────
function updateClock() {
  const el = document.getElementById('live-clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }) + ' IST';
}
setInterval(updateClock, 1000);
updateClock();

// ── Active Nav ─────────────────────────────────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;
  const path = window.location.pathname;
  const isRoot = path === '/' || path === '/index.html';
  if ((href === '/' || href === '/index.html') && isRoot) link.classList.add('active');
  else if (href !== '/' && href !== '/index.html' && path.startsWith(href)) link.classList.add('active');
});

// ── Toast System ───────────────────────────────────────────────────────────────
let toastContainer = null;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function showToast({ title, message, type = 'info', duration = 5000, icon }) {
  const icons = { critical: '🚨', high: '⚠️', info: 'ℹ️', success: '✅', warning: '⚠️' };
  const container = getToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icon || icons[type] || '📢'}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button onclick="this.closest('.toast').remove()" style="background:none;border:none;cursor:pointer;color:var(--gray-400);font-size:16px;padding:0 0 0 8px;">✕</button>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slide-in-right 250ms reverse forwards';
    setTimeout(() => toast.remove(), 250);
  }, duration);
  return toast;
}

// ── API Helpers ─────────────────────────────────────────────────────────────────
async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`API error for ${endpoint}:`, err);
    return null;
  }
}

async function postAPI(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error(`POST error for ${endpoint}:`, err);
    return null;
  }
}

// ── Number Formatting ──────────────────────────────────────────────────────────
function fmtNum(n) {
  if (n >= 100000) return (n / 100000).toFixed(1) + 'L';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
}

// ── Severity color mapping ─────────────────────────────────────────────────────
const severityColor = {
  critical: '#D32F2F',
  high:     '#F57C00',
  moderate: '#F9A825',
  low:      '#388E3C',
};

// ── Mobile sidebar toggle ──────────────────────────────────────────────────────
const sidebarEl = document.querySelector('.sidebar');
const menuBtn = document.getElementById('menu-toggle');
if (menuBtn && sidebarEl) {
  menuBtn.addEventListener('click', () => {
    sidebarEl.classList.toggle('mobile-open');
  });
  document.addEventListener('click', (e) => {
    if (!sidebarEl.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebarEl.classList.remove('mobile-open');
    }
  });
}

// ── Animate counter on page load ───────────────────────────────────────────────
function animateCounter(el, target, duration = 1200) {
  const start = 0;
  const startTime = performance.now();
  const isDecimal = target % 1 !== 0;

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = start + (target - start) * eased;
    el.textContent = isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Initialize counters
document.querySelectorAll('[data-counter]').forEach(el => {
  const target = parseFloat(el.dataset.counter);
  animateCounter(el, target);
});

// ── Show periodic live alerts ──────────────────────────────────────────────────
const liveAlerts = [
  { title: '🚨 New Flood Alert', message: 'Critical waterlogging detected on Karve Road, Pune', type: 'critical' },
  { title: '⚠️ Drain Warning', message: 'Hindmata Junction drain at 98% capacity — Mumbai', type: 'high' },
  { title: '📡 AI Detection', message: 'CV model detected standing water on LBS Marg', type: 'info' },
  { title: '✅ Route Cleared', message: 'Flooding resolved on NH-48 near Navi Mumbai', type: 'success' },
  { title: '🌧️ Rainfall Alert', message: 'IMD forecasts heavy rainfall in next 3 hours for coastal areas', type: 'high' },
];

let alertIdx = 0;
function triggerLiveAlert() {
  const alert = liveAlerts[alertIdx % liveAlerts.length];
  showToast({ ...alert, duration: 5000 });
  alertIdx++;
}

// Show first alert after 3 seconds, then every 20 seconds
setTimeout(() => {
  triggerLiveAlert();
  setInterval(triggerLiveAlert, 20000);
}, 3000);

// ── Chart.js default config ─────────────────────────────────────────────────────
if (typeof Chart !== 'undefined') {
  Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  Chart.defaults.color = '#6B7280';
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.animation.duration = 800;
  Chart.defaults.animation.easing = 'easeOutCubic';
}

// Expose helpers globally
window.NIRDESH = { showToast, fetchAPI, postAPI, fmtNum, severityColor, animateCounter };
