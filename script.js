(() => {
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
          // Try the legacy selection method below when clipboard permission is unavailable.
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

  const traceButton = document.querySelector('.trace-button');
  const observationPoints = [...document.querySelectorAll('.observation-point')];
  const observationLinks = [...document.querySelectorAll('.observation-link')];
  const observationStatus = document.querySelector('#observation-status');
  if (traceButton && observationPoints.length && observationLinks.length) {
    traceButton.hidden = false;
    const traceLabel = traceButton.querySelector('.trace-label');
    let sequenceTimer = null;
    let sequenceIndex = 0;
    const clearSequence = () => {
      if (sequenceTimer !== null) window.clearTimeout(sequenceTimer);
      sequenceTimer = null;
    };
    const setObservation = (point, announce = true) => {
      observationPoints.forEach(item => {
        const active = item === point;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      const connectedLinks = new Set(point.dataset.links.split(/\s+/));
      observationLinks.forEach(link => {
        const visible = connectedLinks.has(link.dataset.link);
        link.classList.toggle('is-visible', visible);
        link.style.animationDelay = visible ? `${Number(link.dataset.link) * 70}ms` : '';
      });
      if (announce && observationStatus) observationStatus.textContent = point.getAttribute('aria-label');
    };
    const resetObservations = () => {
      clearSequence();
      observationPoints.forEach(point => {
        point.classList.remove('is-active');
        point.setAttribute('aria-pressed', 'false');
      });
      observationLinks.forEach(link => {
        link.classList.remove('is-visible');
        link.style.animationDelay = '';
      });
      traceButton.setAttribute('aria-pressed', 'false');
      traceLabel.textContent = 'TRACE THE PATTERN';
      if (observationStatus) observationStatus.textContent = 'Observation path reset.';
    };
    const traceNext = () => {
      if (sequenceIndex >= observationPoints.length) {
        sequenceTimer = null;
        traceLabel.textContent = 'RESET OBSERVATIONS';
        return;
      }
      setObservation(observationPoints[sequenceIndex]);
      sequenceIndex += 1;
      sequenceTimer = window.setTimeout(traceNext, 780);
    };
    observationPoints.forEach(point => {
      point.addEventListener('click', () => {
        clearSequence();
        sequenceIndex = 0;
        traceButton.setAttribute('aria-pressed', 'false');
        traceLabel.textContent = 'TRACE THE PATTERN';
        setObservation(point);
      });
      point.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          point.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        }
      });
    });
    traceButton.addEventListener('click', () => {
      if (traceButton.getAttribute('aria-pressed') === 'true') {
        resetObservations();
        return;
      }
      traceButton.setAttribute('aria-pressed', 'true');
      sequenceIndex = 0;
      clearSequence();
      if (reduceMotion) {
        observationPoints.forEach(point => {
          point.classList.remove('is-active');
          point.setAttribute('aria-pressed', 'false');
        });
        observationLinks.forEach(link => link.classList.add('is-visible'));
        traceLabel.textContent = 'RESET OBSERVATIONS';
        if (observationStatus) observationStatus.textContent = 'The observation pattern is visible.';
        return;
      }
      traceNext();
    });
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav-links');
  const navLinks = [...document.querySelectorAll('#nav-links a')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  document.querySelector('#year').textContent = new Date().getFullYear();

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = document.querySelector(`#nav-links a[href="#${entry.target.id}"]`);
          navLinks.forEach(link => link.removeAttribute('aria-current'));
          if (target) target.setAttribute('aria-current', 'location');
        }
      });
    }, {rootMargin: '-25% 0px -65% 0px'});
    sections.forEach(section => activeObserver.observe(section));

    if (!reduceMotion) {
      const revealItems = document.querySelectorAll('.section-heading, .about-body, .project-card, .research-card, .skill-group, .cert-item');
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
