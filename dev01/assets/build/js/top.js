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

// PARALLAX
function initParallax() {
  document.querySelectorAll('.parallax-section').forEach(section => {
    if (section.closest('.sense_section--0')) return;

    const media = section.querySelector('.parallax-img img, .parallax-img video');
    if (!media) return;

    gsap.set(media, { scale: 1.8, yPercent: -40, force3D: true });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
    tl.to(media, { scale: 1.0, yPercent: 0, ease: 'none', duration: 1, force3D: true })
      .to(media, { scale: 1.8, yPercent: 40, ease: 'none', duration: 1, force3D: true });
  });

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
      }, 800);
    }, 2800);
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
    gsap.to(section, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      onComplete: () => {
        initParallax();
        ScrollTrigger.refresh();
      }
    });

    const chars = Array.from(ttlEn.querySelectorAll('.char'));
    gsap.set(chars, { opacity: 1, filter: 'none', y: 0 });

    const isMobile = window.innerWidth <= 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      }
    });

    if (isMobile) {
      gsap.set(video, { width: '100vw', height: '50vh' });
      tl.to(video, {
        height: '100vh',
        ease: 'none',
        duration: 1,
      }, 0);
    } else {
      tl.to(video, {
        width: '100vw',
        height: '100vh',
        ease: 'none',
        duration: 1,
      }, 0);
    }

    tl.to(chars, {
      opacity: 0,
      filter: 'blur(6px)',
      y: -20,
      ease: 'power2.in',
      stagger: { each: 0.03, from: 'start' },
      duration: 0.5,
    }, 0)
    .to(ttlJp, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'power3.out',
    }, 0.7);
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