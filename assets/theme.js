/* Theme toggle. The initial theme is set by the inline script in <head> (no flash). */
(function () {
  var root = document.documentElement, KEY = 'cu-theme';
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var btn = document.querySelector('[data-theme-toggle]');
  var metaTheme = document.querySelector('meta[name="theme-color"][data-dynamic]');
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function apply(t) {
    root.setAttribute('data-theme', t);
    if (metaTheme) metaTheme.setAttribute('content', t === 'dark' ? '#101113' : '#F5F2EC');
    if (btn) {
      var next = t === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('title', 'Switch to ' + next + ' theme');
    }
  }
  apply(root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light'));
  if (btn) btn.addEventListener('click', function () {
    var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
  });
  var onSystem = function (e) { if (!stored()) apply(e.matches ? 'dark' : 'light'); };
  if (mq.addEventListener) mq.addEventListener('change', onSystem); else if (mq.addListener) mq.addListener(onSystem);
  // Enable colour transitions only after first paint, so loading never animates.
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('theme-ready'); }); });
  // Hairline under the sticky header once the page scrolls.
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () { head.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
