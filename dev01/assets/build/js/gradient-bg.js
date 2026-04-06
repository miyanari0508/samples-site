const vertexShader = `
  #define PI 3.1415926535897932384626433832795
  varying float zDepth;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uRippleFreq;
  uniform float uRippleAmp;
  uniform float uRippleIntensity;
  uniform float uRippleDamping;
 
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;
 
const fragmentShader = `
  #define PI 3.1415926535897932384626433832795
 
  varying float zDepth;
  varying vec2 vUv;
  uniform vec2  uCenter1;
  uniform vec2  uCenter2;
  uniform vec2  uResolution;
  uniform vec3  uColor0;
  uniform vec3  uColor1;
  uniform vec3  uColor2;
  uniform vec3  uColor3;
  uniform float uFade;
  uniform float uTime;
  uniform float uScale;
  uniform float uRippleFreq;
  uniform float uRippleAmp;
  uniform float uRippleIntensity;
  uniform float uRippleDamping;
  uniform float uWaterRadius;
  uniform float uWaterThickness;
 
  float ring(vec2 uv, vec2 center, float radius, float thickness) {
    float dist  = length(uv - center);
    float inner = radius - thickness * 0.5;
    float outer = radius + thickness * 0.5;
    return smoothstep(inner, radius, dist) * (1.0 - smoothstep(radius, outer, dist));
  }
 
  float easeInOutCubic(float t) {
    return t < 0.5
      ? 4.0 * t * t * t
      : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }
 
  void main() {
    float aspect  = uResolution.y / uResolution.x;
    vec2  uv      = vUv;
    vec2  center1 = uCenter1;
    vec2  center2 = uCenter2;
    center1.y    *= aspect;
    center2.y    *= aspect;
    uv.y         *= aspect;
 
    vec2  offset = uv - center1;
    float radius = length(offset);
 
    float freq       = uRippleFreq / uScale;
    float amp        = uRippleAmp  / uScale;
    float wRadius    = uWaterRadius    * uScale;
    float wThickness = uWaterThickness * uScale;
 
    float ripple          = sin(radius * PI * 2.0 * freq - uTime) * amp * uScale;
    vec2  dir             = atan(offset);
    float distortedRipple = length(dir) * ripple;
 
    float maxDist = length(vec2(1.0, 1.0 * aspect)) * 0.5;
    float dist    = distance(uv, center1);
    float d       = dist / maxDist;
 
    // ── Radial gradient: bright center highlight → mid green → deep green ──
    vec3 gradColor = uColor0;
    gradColor = mix(gradColor, uColor1, smoothstep(0.0,  0.3,  d));
    gradColor = mix(gradColor, uColor2, smoothstep(0.2,  1.0,  d));
    gradColor = mix(gradColor, uColor2, smoothstep(0.3,  1.0,  d));
    gradColor = mix(gradColor, uColor2, smoothstep(0.33, 1.0,  d));
 
    // ── Horizontal teal shift: green dominates ~88%, teal only far right edge ──
    // Sampled from bg-gradient.png: teal (blue>green) only appears after x=88-90%
    // x=70% still green (#138e72), x=90% starts teal (#139094)
    float tealBlend = smoothstep(0.72, 1.0, vUv.x);
    gradColor = mix(gradColor, uColor3, tealBlend * 0.9);
 
    // Also blend a mid-teal transition zone (x 55-85%) for the cyan-green shift
    // visible in image around x=60-80%: green slowly picks up cyan hue
    vec3  midTeal      = mix(uColor1, uColor3, 0.45); // intermediate cyan-green
    float midTealBlend = smoothstep(0.50, 0.78, vUv.x);
    gradColor = mix(gradColor, midTeal, midTealBlend * 0.45);
 
    // ── Water ring ──
    vec3  waterColor  = uColor3;
    float ripple_ring = ring(uv, center2, wRadius, wThickness);
 
    vec3 finalColor = gradColor;
    finalColor = mix(finalColor, waterColor + distortedRipple * 0.1, ripple_ring);
    finalColor += smoothstep(0.0, 1.0, max(0.0, ripple)) * uRippleIntensity;
    finalColor  = mix(finalColor, uColor2, uFade);
 
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
 
// THREE.JS SETUP 
const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);
 
const scene    = new THREE.Scene();
const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const geometry = new THREE.PlaneGeometry(2, 2);
 
// COLORS — pixel-sampled from bg-gradient.png
function mkCol(hex) {
  const n = parseInt(hex, 16);
  return new THREE.Color(((n>>16)&255)/255, ((n>>8)&255)/255, (n&255)/255);
}
 
const uniforms = {
  uRippleFreq:      { value: 1.2 },
  uRippleAmp:       { value: 0.8 },
  uRippleIntensity: { value: 0.1 },
  uRippleDamping:   { value: 1   },
  uScale:           { value: 1   },
  uCenter1:         { value: new THREE.Vector2(0.5, 0.5) },
  uCenter2:         { value: new THREE.Vector2(0.5, 0.5) },
  uWaterRadius:     { value: 0.8 },
  uWaterThickness:  { value: 0.8 },
  uFade:            { value: 0   },
  uColor0:          { value: mkCol('6fa38c') },
  uColor1:          { value: mkCol('267a3f') },
  uColor2:          { value: mkCol('1c6f3b') },
  uColor3:          { value: mkCol('138f97') },
  uResolution:      { value: new THREE.Vector2(1, 1) },
  uTime:            { value: 0 }
};
 
const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  transparent: true,
  wireframe:   false
});
 
scene.add(new THREE.Mesh(geometry, material));
 
const clock = new THREE.Clock();
 
// PROPS 
const props1 = { x: 0.5, y: 0.5, _x: 0.5, _y: 0.5 };
const props2 = { x: 0.5, y: 0.5, _x: 0.5, _y: 0.5,radius: 0.7, thickness: 0.8 };
 
// MODE CONFIG — exact from source ir object
const isMobile = window.innerWidth < 768;
 
const ir = {
  normal: {
    duration: 3, ease: "power3.inOut",
    props1: { x: 0.2, y: 1    },
    props2: { x: 0,   y: 1,    radius: isMobile ? 0.7 : 0.9, thickness: 0.8  }
  },
  footer: {
    duration: 3, ease: "power3.inOut",
    props1: { x: 0.2, y: 0.5  },
    props2: { x: 0,   y: 1,    radius: isMobile ? 0.7 : 0.9, thickness: 0.8  }
  },
  navi: {
    duration: 3, ease: "power3.inOut",
    props1: { x: 0.2, y: 1    },
    props2: { x: 0,   y: 1,    radius: isMobile ? 0.7 : 0.9, thickness: 0.8  }
  },
  intro: {
    duration: 2, ease: "power2.inOut",
    props1: { x: 0.5, y: 0.5  },
    props2: { x: 0.5, y: 0.5,  radius: 0.6,               thickness: 0.8  }
  },
  top: {
    duration: 3, ease: "power2.inOut",
    props1: { x: 0.2, y: 1    },
    props2: { x: 0,   y: 1.15, radius: isMobile ? 0.45 : 0.6, thickness: 0.45 }
  }
};
 
// changeMode — mirrors Alpine gradientBg changeMode()
let currentMode = 'intro';
 
function changeMode(modeName) {
  const cfg = ir[modeName];
  if (!cfg) return;
 
  if (modeName === 'navi') doWave();
 
  const isIntroToTop = (currentMode === 'intro' && modeName === 'top');
 
  if (isIntroToTop) {
    gsap.to(uniforms.uFade,      { value: 1,   duration: 2,   ease: "power1.inOut" });
    gsap.to(uniforms.uRippleAmp, { value: 0,   duration: 1.5, ease: "power1.inOut" });
  }
 
  gsap.to(props1, {
    ...cfg.props1,
    duration:  isIntroToTop ? 1.5 : cfg.duration,
    delay:     isIntroToTop ? 1   : 0,
    ease:      cfg.ease,
    overwrite: true
  });
 
  gsap.to(props2, {
    ...cfg.props2,
    duration:  isIntroToTop ? 1.5 : cfg.duration,
    delay:     isIntroToTop ? 1   : 0,
    ease:      cfg.ease,
    overwrite: true,
    onComplete: () => {
      if (isIntroToTop) {
        gsap.to(uniforms.uFade,      { value: 0,   duration: 2,   ease: "power1.out"   });
        gsap.to(uniforms.uRippleAmp, { value: 0.8, duration: 0.8, ease: "power1.inOut" });
      }
    }
  });
 
  currentMode = modeName;
}
 
// wave — exact gsap proxy tween from source
function doWave() {
  const proxy = { step: 0, old: 0 };
  gsap.to(proxy, {
    step: 1,
    duration: 2,
    ease: "sine.inOut",
    onUpdate: () => {
      const delta = proxy.step - proxy.old;
      uniforms.uTime.value += delta * 5;
      proxy.old = proxy.step;
    }
  });
}
 
// resize 
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  uniforms.uResolution.value.set(w / 100, h / 100);
  let scale = (1440 - w) / (w - 375);
  scale = Math.max(0, Math.min(1, scale)) * 2 + 1;
  uniforms.uScale.value = scale;
}
 
window.addEventListener('resize', resize);
 
// animate 
function animate() {
  requestAnimationFrame(animate);
 
  uniforms.uTime.value += clock.getDelta();
 
  props1._x += (props1.x - props1._x) * 0.1;
  props1._y += (props1.y - props1._y) * 0.1;
  props2._x += (props2.x - props2._x) * 0.1;
  props2._y += (props2.y - props2._y) * 0.1;
 
  uniforms.uCenter1.value.set(props1._x, props1._y);
  uniforms.uCenter2.value.set(props2._x, props2._y);
  uniforms.uWaterRadius.value    = props2.radius;
  uniforms.uWaterThickness.value = props2.thickness;
 
  renderer.render(scene, camera);
}
 
// INIT 
resize();
 
const isHome = (location.pathname === '/' || location.pathname === '/en/');
const initialMode = isHome ? 'intro' : 'normal';
 
Object.assign(props1, ir[initialMode].props1);
Object.assign(props2, ir[initialMode].props2);
props1._x = props1.x; props1._y = props1.y;
props2._x = props2.x; props2._y = props2.y;
currentMode = initialMode;
 
animate();
 
window.changeMode  = changeMode;
window.triggerWave = doWave;