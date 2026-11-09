// ─── Sidebar Renderer ─────────────────────────────────────────────────────────
// Injects the shared sidebar into any page

function renderSidebar(activePage) {
  const navItems = [
    { group: 'Overview', items: [
      { href: '/',            icon: '🏠', label: 'Dashboard',      badge: null },
      { href: '/map',         icon: '🗺️', label: 'Live Flood Map', badge: null },
      { href: '/alerts',      icon: '🚨', label: 'Active Alerts',  badge: '47', badgeClass: '' },
    ]},
    { group: 'Intelligence', items: [
      { href: '/analytics',   icon: '📊', label: 'Analytics',      badge: null },
      { href: '/ai-insights', icon: '🤖', label: 'AI Insights',    badge: 'NEW', badgeClass: 'info' },
    ]},
    { group: 'Response', items: [
      { href: '/resources',   icon: '🛟', label: 'Resources',      badge: null },
      { href: '/report',      icon: '📢', label: 'Report Flood',   badge: null },
    ]},
  ];

  const navHTML = navItems.map(group => `
    <div class="nav-section">
      <div class="nav-section-label">${group.group}</div>
      ${group.items.map(item => `
        <a href="${item.href}" class="nav-link${item.href === activePage ? ' active' : ''}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${item.badge ? `<span class="nav-badge ${item.badgeClass || ''}">${item.badge}</span>` : ''}
        </a>
      `).join('')}
    </div>
  `).join('');

  return `
    <aside class="sidebar">
      <div class="sidebar-bg-pattern"></div>
      <div class="sidebar-logo">
        <div class="logo-icon">🌊</div>
        <div class="logo-text">
          <span class="name">NIRDESH</span>
          <span class="tagline">Flood Intelligence</span>
        </div>
      </div>
      <div class="sidebar-status">
        <div class="status-pill">
          <div class="status-dot"></div>
          All Systems Operational
        </div>
      </div>
      <nav class="sidebar-nav">${navHTML}</nav>
      <div class="sidebar-footer">
        <div class="update-info">
          Last updated: <span id="sidebar-clock">—</span><br>
          Data sources: <span>6 active</span>
        </div>
      </div>
    </aside>
  `;
}

// Auto-inject sidebar
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('sidebar-placeholder');
  if (placeholder) {
    const activePage = placeholder.dataset.active || window.location.pathname;
    placeholder.outerHTML = renderSidebar(activePage);
  }

  // Update sidebar clock every second
  function updateSidebarClock() {
    const el = document.getElementById('sidebar-clock');
    if (!el) return;
    el.textContent = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  setInterval(updateSidebarClock, 1000);
  updateSidebarClock();
});
