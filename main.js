/* ABYSS // depth-log — main.js
   Maps page scroll to "ocean depth" in metres.
*/

(function () {
  'use strict';

  const indicator = document.getElementById('depth-indicator');
  if (!indicator) return;

  const valueEl = indicator.querySelector('.value');
  const MAX_DEPTH = 10994; // Challenger Deep

  let raf = false;

  function update() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const ratio = Math.min(1, Math.max(0, window.scrollY / max));
    const depth = Math.round(ratio * MAX_DEPTH);
    valueEl.textContent = depth.toLocaleString().padStart(4, '0');
    raf = false;
  }

  window.addEventListener('scroll', () => {
    if (!raf) {
      requestAnimationFrame(update);
      raf = true;
    }
  });
  update();

  // Subtle nav fade
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastY && y > 100) {
        topbar.style.transform = 'translateY(-100%)';
      } else {
        topbar.style.transform = 'translateY(0)';
      }
      lastY = y;
    });
    topbar.style.transition = 'transform 0.3s';
  }

})();
