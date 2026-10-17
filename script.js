// 1. Sugar-sprinkle starfield background (twinkles and drifts with your pointer)
const c = document.getElementById('stars'), x = c.getContext('2d');
let stars = [], mx = 0, my = 0;
function resize() {
  c.width = innerWidth; c.height = innerHeight;
  stars = Array.from({ length: Math.min(220, innerWidth / 4) }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    r: Math.random() * 1.4 + .2, p: Math.random() * 6.28, z: Math.random(), c: ['#fff', '#ffd1dc', '#ffe9a8', '#c9f2e6'][Math.floor(Math.random() * 4)]
  }));
}
addEventListener('resize', resize); resize();
addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
function draw(t) {
  x.clearRect(0, 0, c.width, c.height);
  for (const s of stars) {
    x.globalAlpha = .3 + .7 * (.5 + .5 * Math.sin(t / 700 + s.p));
    x.fillStyle = s.c; x.beginPath();
    x.arc((s.x - mx * 30 * s.z + c.width) % c.width, (s.y - my * 30 * s.z + c.height) % c.height, s.r, 0, 6.28);
    x.fill();
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

// 2. Solar system menu: click a planet to fly to that section
const cap = document.getElementById('cap'), hint = cap.textContent;
document.querySelectorAll('.planet').forEach(b => {
  const show = () => cap.textContent = b.dataset.l, hide = () => cap.textContent = hint;
  b.addEventListener('mouseenter', show); b.addEventListener('focus', show);
  b.addEventListener('mouseleave', hide); b.addEventListener('blur', hide);
  b.addEventListener('click', () => document.querySelector(b.dataset.t).scrollIntoView({ behavior: 'smooth' }));
});

// 3. Weight on other worlds (gravity relative to Earth)
const g = { Mercury: .38, Venus: .91, Moon: .166, Mars: .38, Jupiter: 2.53, Saturn: 1.07, Uranus: .89, Neptune: 1.14 };
const kg = document.getElementById('kg'), out = document.getElementById('w');
function update() {
  const m = parseFloat(kg.value) || 0;
  out.innerHTML = Object.entries(g).map(([p, v]) => `<li>${p}: <b>${(m * v).toFixed(1)}</b> kg</li>`).join('');
}
kg.addEventListener('input', update); update();

// 4. Quick copy email to clipboard
const copyBtn = document.getElementById('copy-email-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = 'gargdev738@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const input = document.createElement('input');
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    const orig = copyBtn.textContent;
    copyBtn.textContent = '✓ Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = orig;
      copyBtn.classList.remove('copied');
    }, 2000);
  });
}

