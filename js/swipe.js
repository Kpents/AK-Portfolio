const overlay = document.getElementById('overlay');
    const links = document.querySelectorAll('nav a[data-target]');
    let current = 'home';
    let isAnimating = false;

    // helper to wait for transitionend (fallback timeout)
    function waitForTransition(el, timeout = 1000) {
      return new Promise(resolve => {
        let done = false;
        function handler(e) {
          if (e.target !== el || e.propertyName !== 'transform') return;
          done = true;
          el.removeEventListener('transitionend', handler);
          resolve();
        }
        el.addEventListener('transitionend', handler);
        // fallback
        setTimeout(() => {
          if (!done) {
            el.removeEventListener('transitionend', handler);
            resolve();
          }
        }, timeout);
      });
    }

    async function navigateTo(targetId) {
      if (isAnimating) return;          
      if (targetId === current) return; 

      isAnimating = true;

      // ensure overlay starts off-screen left and has no class
      overlay.classList.remove('in','out');
      void overlay.offsetWidth;

      // start swipe-in
      overlay.classList.add('in');
      await waitForTransition(overlay); 

      // switch active section while overlay covers the page
      document.getElementById(current).classList.remove('active');
      document.getElementById(current).classList.add('inactive');
      const nextSection = document.getElementById(targetId);
      nextSection.classList.remove('inactive');
      nextSection.classList.add('active');
      current = targetId;

      // start swipe-out (overlay goes to right)
      overlay.classList.remove('in');
      // force reflow (not always necessary, but makes transitions consistent)
      void overlay.offsetWidth;
      overlay.classList.add('out');
      await waitForTransition(overlay); 
      overlay.classList.remove('out');
      

      // allow new transitions
      isAnimating = false;
    }

    // attach listeners to nav links
    links.forEach(a => {
      a.addEventListener('click', (e) => {
        const t = e.currentTarget.getAttribute('data-target');
        navigateTo(t);
      });
    });

    // optional: keyboard navigation (left/right) for demo
    document.addEventListener('keydown', e => {
      const order = ['home','about','projects','contact'];
      const idx = order.indexOf(current);
      if (e.key === 'ArrowRight') {
        const next = order[(idx+1)%order.length];
        navigateTo(next);
      } else if (e.key === 'ArrowLeft') {
        const prev = order[(idx-1+order.length)%order.length];
        navigateTo(prev);
      }
    });