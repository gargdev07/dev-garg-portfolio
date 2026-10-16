(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lookToggle = document.querySelector('.look-toggle');
  const lookMessage = document.querySelector('#look-closer-message');
  if (lookToggle && lookMessage) {
    lookMessage.hidden = true;
    lookToggle.hidden = false;
    lookToggle.addEventListener('click', () => {
      const expanded = lookToggle.getAttribute('aria-expanded') !== 'true';
      lookToggle.setAttribute('aria-expanded', String(expanded));
      lookMessage.hidden = !expanded;
      lookToggle.querySelector('.look-toggle-icon').textContent = expanded ? '−' : '+';
    });
  }

  const canvas = document.querySelector('.hero-canvas');
  const canvasNodes = [...document.querySelectorAll('.canvas-node')];
  const canvasNote = document.querySelector('.canvas-current-note');
  const canvasNotes = {
    systems: 'Organize many listings<br>into a relational model.',
    patterns: 'Compare a long history<br>with a forecast.',
    probability: 'Follow states as a<br>match changes.',
    verification: 'Give evidence a<br>clearer record.'
  };
  if (canvas && canvasNodes.length) {
    const activateNode = node => {
      canvas.dataset.active = node.dataset.interest;
      if (canvasNote) canvasNote.innerHTML = canvasNotes[node.dataset.interest];
    };
    const clearNode = node => {
      if (document.activeElement !== node) {
        canvas.removeAttribute('data-active');
        if (canvasNote) canvasNote.innerHTML = 'Select a point<br>to follow a question.';
      }
    };
    canvasNodes.forEach(node => {
      node.addEventListener('pointerenter', () => activateNode(node));
      node.addEventListener('pointerdown', () => activateNode(node));
      node.addEventListener('pointerleave', () => clearNode(node));
      node.addEventListener('focus', () => activateNode(node));
      node.addEventListener('blur', () => clearNode(node));
    });
    if ('IntersectionObserver' in window) {
      const canvasObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => canvas.classList.toggle('is-in-view', entry.isIntersecting));
      }, {rootMargin: '80px'});
      canvasObserver.observe(canvas);
    }
  }

  const sideQuestTrigger = document.querySelector('[data-side-quest-trigger]');
  const sideQuestReturn = document.querySelector('[data-side-quest-return]');
  if (sideQuestTrigger) {
    sideQuestTrigger.addEventListener('click', () => {
      document.documentElement.classList.add('side-quest-mode');
    });
  }
  if (sideQuestReturn) {
    sideQuestReturn.addEventListener('click', () => {
      document.documentElement.classList.remove('side-quest-mode');
    });
  }

  const emailAddress = 'gargdev738@gmail.com';
  const copyEmailButton = document.querySelector('.copy-email');
  const copyStatus = document.querySelector('#copy-status');
  if (copyEmailButton && copyStatus) {
    copyEmailButton.hidden = false;
    copyEmailButton.addEventListener('click', async () => {
      let copied = false;
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
          await navigator.clipboard.writeText(emailAddress);
          copied = true;
        } catch (_) {
          // Fall through to the selection-based copy when browser permission is unavailable.
        }
      }
      if (!copied && typeof document.execCommand === 'function') {
        let selectionField;
        try {
          selectionField = document.createElement('textarea');
          selectionField.value = emailAddress;
          selectionField.setAttribute('readonly', '');
          selectionField.setAttribute('aria-hidden', 'true');
          selectionField.style.position = 'fixed';
          selectionField.style.opacity = '0';
          selectionField.style.pointerEvents = 'none';
          document.body.appendChild(selectionField);
          selectionField.select();
          copied = document.execCommand('copy');
        } catch (_) {
          copied = false;
        } finally {
          if (selectionField) selectionField.remove();
          copyEmailButton.focus({preventScroll: true});
        }
      }
      copyStatus.textContent = copied
        ? 'Email copied.'
        : 'Copy wasn’t available. Select the email address above to copy it.';
    });
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav-links');
  const navLinks = [...document.querySelectorAll('#nav-links a')];
  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      nav.classList.remove('is-open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      nav.classList.toggle('is-open', open);
    });
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener('click', event => {
      if (nav.classList.contains('is-open') && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = document.querySelector('#nav-links a[href="#' + entry.target.id + '"]');
          navLinks.forEach(link => link.removeAttribute('aria-current'));
          if (target) target.setAttribute('aria-current', 'location');
        }
      });
    }, {rootMargin: '-25% 0px -65% 0px'});
    sections.forEach(section => activeObserver.observe(section));

    if (!reduceMotion) {
      const revealItems = document.querySelectorAll('.section-heading, .about-body, .case-study, .interest-card, .research-card, .skill-group, .cert-item');
      document.body.classList.add('js-ready');
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {threshold: 0.08});
      revealItems.forEach(item => {
        item.classList.add('reveal');
        revealObserver.observe(item);
      });
    }
  }
})();
