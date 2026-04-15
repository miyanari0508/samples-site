gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const select = e => document.querySelector(e);
const stage = select('.stage');

// LENIS
const lenis = new Lenis({ 
  lerp: 0.1,
  smoothTouch: 0.1,
  syncTouch: true  
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// FIX iOS VIEWPORT HEIGHT 
const setVh = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
};

setVh();
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);

// PARALLAX
function initParallax() {
  document.querySelectorAll('.parallax-section').forEach(section => {
    if (section.closest('.sense_section--0')) return;
    if (section.classList.contains('parallax-section--1')) return;

    const media = section.querySelector('.parallax-img img, .parallax-img video');
    if (!media) return;

    const SCALE_START    = 1.2;
    const PARALLAX_SHIFT = 50;
    const logoWrap = section.classList.contains('parallax-section--2')
      ? section.querySelector('.parallax-logo-wrap')
      : null;

    const getShiftPx  = () => media.offsetHeight * (PARALLAX_SHIFT / 100);
    const syncWrapHeight = () => {
      if (logoWrap) logoWrap.style.height = media.offsetHeight + 'px';
    };
    syncWrapHeight();

    gsap.set(media,    { scale: SCALE_START, yPercent: -PARALLAX_SHIFT, force3D: true });
    if (logoWrap) gsap.set(logoWrap, { y: -getShiftPx(), force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    tl.to(media, {
      scale: 1.0,
      yPercent: PARALLAX_SHIFT,
      ease: 'none',
      force3D: true,
    }, 0);

    if (logoWrap) {
      tl.to(logoWrap, {
        y: () => getShiftPx(),
        ease: 'none',
        force3D: true,
      }, 0);
    }

    ScrollTrigger.addEventListener('refreshInit', () => {
      syncWrapHeight();
      gsap.set(media, { scale: SCALE_START, yPercent: -PARALLAX_SHIFT });
      if (logoWrap) gsap.set(logoWrap, { y: -getShiftPx() });
    });
  });

window.addEventListener('load', () => ScrollTrigger.refresh());
  document.querySelectorAll('.sense_section .img img').forEach(img => {
    if (img.closest('.sense_section--0')) return;

    gsap.fromTo(img,
      { yPercent: -5 },
      {
        yPercent: 5,
        force3D: true,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });
}
window.onload = () => {
  if (stage) gsap.set(stage, { autoAlpha: 1 });
  initGradientModes();
  if (window.setupGradientElements) window.setupGradientElements();
  ScrollTrigger.refresh();
};

// LOADING ANIMATION
window.addEventListener('DOMContentLoaded', function initLoading() {
  const wrapper = document.getElementById('smooth-wrapper');
  const loadingContent = document.getElementById('loadingContent');
  const divider = document.querySelector('.line-divider');

  wrapper.style.opacity = '0';
  wrapper.style.transition = 'opacity 1s ease 0.2s';

  function wrapChars(el) {
    Array.from(el.children).forEach(child => {
      if (child === divider) return; 
      const text = child.textContent;
      child.textContent = '';
      text.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch === ' ' ? '\u00a0' : ch;
        child.appendChild(span);
      });
    });
  }

  function revealFromCenter(el, startDelay, stepMs) {
    const chars = Array.from(el.querySelectorAll('.char'));
    const center = (chars.length - 1) / 2;
    chars.forEach((c, i) => {
      const dist = Math.abs(i - center);
      setTimeout(() => c.classList.add('visible'), startDelay + dist * stepMs);
    });
  }

  wrapChars(loadingContent);

  loadingContent.style.visibility = 'visible';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => loadingContent.style.transform = 'scale(1)');
  });

  requestAnimationFrame(() => {
    Array.from(loadingContent.children).forEach(child => {
      if (child === divider) {
        setTimeout(() => divider.classList.add('visible'), 300);
      } else {
        revealFromCenter(child, 300, 55);
      }
    });

    setTimeout(() => {
  changeMode('top');
  loadingContent.classList.add('fade-out');
  setTimeout(() => {
    wrapper.style.opacity = '1';
    document.getElementById('loading-screen').style.display = 'none';
    if (window.revealScene0) window.revealScene0();
    initComTtlWave();
    initInviewAnimations();
    initCustomScrollbar();
  }, 1200);
}, 3800);
  });
});

// Section Sense 0
function initScene0() {
  const section = document.querySelector('.sense_section--0');
  if (!section) return;

  const ttlEn = section.querySelector('.main-ttlEn');
  const ttlJp = section.querySelector('.main-ttlJp');
  const video = section.querySelector('.main-video');

  if (!ttlEn || !ttlJp || !video) return;

  const text = ttlEn.textContent;
  ttlEn.textContent = '';
  text.split('').forEach(ch => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch === ' ' ? '\u00a0' : ch;
    ttlEn.appendChild(span);
  });

  gsap.set(section, { opacity: 0 });
  gsap.set(ttlJp, { opacity: 0, y: 16, filter: 'blur(6px)' });

  window.revealScene0 = function () {
    gsap.set(video, { width: '100vw', height: '100vh' });

    gsap.to(section, {
      opacity: 1,
      duration: 1.4,
      ease: 'power2.out',
      onComplete: () => {
        initParallax();
        ScrollTrigger.refresh();
      }
    });

    const chars = Array.from(ttlEn.querySelectorAll('.char'));
    gsap.set(ttlEn, { opacity: 0, y: 16, filter: 'blur(6px)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      }
    });

    tl.to(ttlEn, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'power3.out',
    }, 0)
    .to(ttlJp, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'power3.out',
    }, 0)
    .to(chars, {
      opacity: 0,
      filter: 'blur(6px)',
      y: -20,
      ease: 'power2.in',
      stagger: { each: 0.03, from: 'start' },
      duration: 0.35,
    }, 0.45);
  };
}

initScene0();

// Video
document.querySelectorAll('.video-thumb').forEach(item => {
  const video = item.querySelector('video');
  item.addEventListener('click', () => {
    document.querySelectorAll('.video-thumb video').forEach(v => {
      if (v !== video) {
        v.pause();
        v.closest('.video-thumb').classList.remove('is-playing');
      }
    });

    if (video.paused) {
      video.style.opacity = 1;
      video.play();
      item.classList.add('is-playing');
    } else {
      video.pause();
      item.classList.remove('is-playing');
    }
  });
});

function initGradientModes() {
  document.querySelectorAll('[data-gradient-mode]').forEach(el => {
    const enterMode = el.dataset.gradientMode;
    const leaveMode = el.dataset.gradientModeLeave || 'top';

    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',  
      end: 'bottom top',
      onEnter:     () => changeMode(enterMode),
      onEnterBack: () => changeMode(enterMode),
      onLeave:     () => changeMode(leaveMode),
      onLeaveBack: () => changeMode(leaveMode),
    });
  });
}

// COM-TTL WAVE REVEAL ON SCROLL
function initComTtlWave() {
  document.querySelectorAll('.com-ttl').forEach(ttl => {
    const childNodes = Array.from(ttl.childNodes);
    ttl.innerHTML = '';

    const charSpans = [];

    childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.replace(/[\r\n\t]/g, '').replace(/ +/g, ' ').trim();
        if (!text) return; 

        text.split('').forEach(ch => {
          const span = document.createElement('span');
          span.className = 'com-ttl__char';
          span.style.cssText = 'display: inline-block;'; 
          span.textContent = ch === ' ' ? '\u00a0' : ch;
          ttl.appendChild(span);
          charSpans.push(span);
        });
      } else if (node.nodeName === 'BR') {
        ttl.appendChild(node.cloneNode(false));
      } else {
        ttl.appendChild(node.cloneNode(true));
      }
    });

    if (charSpans.length === 0) return;

    charSpans.forEach(span => {
      span.style.opacity = '0';
      span.style.transform = 'translateY(24px)';
      span.style.filter = 'blur(4px)';
      span.style.transition = 'none';
    });

    ScrollTrigger.create({
      trigger: ttl,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(charSpans, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
          stagger: {
            each: 0.045,
            from: 'start'
          },
          clearProps: 'filter'
        });
      }
    });
  });
}


// Scroll Hint
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-scrollable').forEach(el => {
    const parent = el.parentElement;
    if (parent) parent.setAttribute('data-lenis-prevent', '');
  });

  new ScrollHint('.js-scrollable', {
    scrollHintIconAppendClass: 'scroll-hint-icon-white',
    applyToParents: true,
    i18n: {
      scrollable: 'スクロールできます'
    }
  });
});


// ANIMATION 
function initInviewAnimations() {
  ['m_left', 'm_right', 'm_op', 'm_down', 'm_scale', 'm_up', 'm_fade'].forEach(cls => {
    document.querySelectorAll('.' + cls).forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => el.classList.add(cls + '_on')
      });
    });
  });
}

// SCROLLBAR
function initCustomScrollbar() {
  const SECTION_SELECTORS = [
    '#sense_section-1',
    '#sense_section-2',
    '#sense_section-3',
    '#sense_section-4',
    '#sense_section-5',
    '#sense_section-6',
    '#sense_section-7',
    '#sense_section-8',
    '#sense_section-9',
    '#sense_section-10',
  ];

  const sections = SECTION_SELECTORS
    .map(s => document.querySelector(s))
    .filter(Boolean);

  if (!sections.length) return;

  const lightBgSections = [document.querySelector('#sense_section-5'),document.querySelector('#sense_section-6')].filter(Boolean);

  const wrapper = document.createElement('div');
  wrapper.id = 'custom-scrollbar';

  const itemHTML = `
    <div class="csb_marker">
      <div class="csb_dot"></div>
      <svg class="csb_diamond" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
        <circle class="csb_diamond-path" cx="6.5" cy="6.5" r="5"/>
      </svg>
    </div>
    <div class="csb_line-bottom">
      <div class="csb_line-fill"></div>
    </div>
  `;

  sections.forEach((_, i) => {
    const item = document.createElement('div');
    item.className = 'csb_item';
    item.dataset.index = i;
    item.innerHTML = itemHTML;
    wrapper.appendChild(item);
  });

  const endDot = document.createElement('div');
  endDot.className = 'csb_item csb_item--end';
  endDot.innerHTML = `<div class="csb_marker"><div class="csb_dot"></div></div>`;
  wrapper.appendChild(endDot);

  document.body.appendChild(wrapper);

  const items = wrapper.querySelectorAll('.csb_item:not(.csb_item--end)');

  lenis.on('scroll', updateScrollbar);
  updateScrollbar();

  function updateScrollbar() {
    const triggerMid = window.innerHeight * 0.5;
    const firstRect  = sections[0].getBoundingClientRect();
    const lastRect   = sections[sections.length - 1].getBoundingClientRect();
    const lastMid = lastRect.top + (lastRect.height * 0.5);
    const barVisible = firstRect.top <= triggerMid && lastRect.bottom > triggerMid;
    wrapper.classList.toggle('is-visible', barVisible);

    let isLight = false;
    
    lightBgSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= triggerMid && rect.bottom > triggerMid) {
        isLight = true;
      }
    });
    
    wrapper.classList.toggle('is-dark', isLight);

    let activeIndex     = -1;
    let lastPassedIndex = -1;

    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= triggerMid && rect.bottom > triggerMid) activeIndex = i;
      if (rect.bottom < triggerMid) lastPassedIndex = i;
    });

    const freezeIndex = activeIndex !== -1 ? activeIndex : lastPassedIndex;

    sections.forEach((sec, i) => {
      const rect    = sec.getBoundingClientRect();
      const item    = items[i];
      const fill    = item.querySelector('.csb_line-fill');

      const isActive = i === activeIndex;
      const isFreeze = i === freezeIndex && activeIndex === -1;

      if (isActive) {
        item.classList.add('is-active');
        const ratio = Math.min(Math.max((triggerMid - rect.top) / (rect.bottom - rect.top), 0), 1);
        fill.style.transform = `scaleY(${ratio})`;
        fill.style.opacity   = '1';

      } else if (isFreeze) {
        item.classList.add('is-active');
        fill.style.transform = 'scaleY(1)';
        fill.style.opacity   = '1';

      } else {
        item.classList.remove('is-active');
        fill.style.transform = 'scaleY(0)';
        fill.style.opacity   = '0';
      }
    });
  }
}