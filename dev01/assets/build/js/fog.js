const fogShader = `
    precision mediump float;
    uniform vec2      resolution;
    uniform float     time;
    uniform vec2      speed;
    uniform float     shift;

    uniform float     _speed;
    uniform float     _range1;
    uniform float     _range2;
    uniform float     _range3;
    uniform float     _range4;
    uniform float     _range5;
    uniform float     _range6;
    uniform float     _range7;
    uniform float     _range8;
    uniform float     _range9;
    uniform float     _range10;
    uniform float     _range11;
    uniform float     _range12;
    uniform float     _range13;
    uniform float     _range14;

    uniform float     _range96;
    uniform float     _range97;

    float rand(vec2 _n) {
      return fract(cos(dot(_n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float noise(vec2 _n) {
      const vec2 d = vec2(0.0, 1.0);
      vec2 b = floor(_n), f = smoothstep(vec2(0.0), vec2(1.0), fract(_n));
      return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
    }

    float fbm(vec2 _n) {
      float total = 0.0, amplitude = 1.0;
      for (int i = 0; i < 4; i++) {
        total += noise(_n) * amplitude;
        _n += _n;
        amplitude *= 0.5;
      }
      return total;
    }
    void main() {

      vec3 c1 = vec3(_range1);
      vec3 c2 = vec3(_range2);

      vec2 p = gl_FragCoord.xy * 7. / resolution.xy * _range10;
      p.x *= 0.35;
      p.y *= _range9;
      float q = fbm(p - time * 0.1);
      vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));
      vec3 c = mix(c1, c2, fbm(p + r)) + mix(c2, c2, r.x) - mix(c1, c2, r.y);
      float ny = gl_FragCoord.y / resolution.y;
      float a = _range7 + (c.r * cos(shift * gl_FragCoord.y / resolution.y) * _range8);
      gl_FragColor.rgb  = vec3(pow(c.r, _range3) * (1.0 - ny - _range4));
      gl_FragColor.rgb += vec3(smoothstep(0.36, -0., gl_FragCoord.y / resolution.y));
      gl_FragColor.a    = a * _range12 * (1.0 - smoothstep(0.0, 1.0, gl_FragCoord.y / resolution.y - _range6));
    }
`;

class FogEffect {
  constructor(container, width = 500, height = 350) {
    this.container = container;
    this.width = width;
    this.height = height;

    const ua = navigator.userAgent;
    this.isMobile = (ua.indexOf('iPhone') > 0 ||
      ua.indexOf('iPod') > 0 ||
      (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) ||
      ua.indexOf('iPad') > 0);

    this.renderer = null;
    this.stage = null;
    this.smokeShader = null;
    this.shaderSprite = null;
    this.graphics = null;
    this.loop = null;
    this.count = 50;
    this.frame = 0;

    this.shaderCode = fogShader;

    this.uniforms = {
      resolution: { type: 'v2', value: { x: this.width, y: this.height } },
      shift: { type: '1f', value: 1.6 },
      time: { type: '1f', value: 0 },
      speed: { type: 'v2', value: { x: 0.2, y: 0.3 } },
      _speed: { type: '1f', value: 0.009 },
      _range1: { type: '1f', value: 0.4 },
      _range2: { type: '1f', value: 3.0 },
      _range3: { type: '1f', value: 0.0 },
      _range4: { type: '1f', value: 0 },
      _range5: { type: '1f', value: 0.0 },
      _range6: { type: '1f', value: -0.4 },
      _range7: { type: '1f', value: 0 },
      _range8: { type: '1f', value: -1.45 },
      _range9: { type: '1f', value: 1 },
      _range10: { type: '1f', value: 1 },
      _range11: { type: '1f', value: 0.73 },
      _range12: { type: '1f', value: -0.8 },
      _range13: { type: '1f', value: 0.01 },
      _range14: { type: '1f', value: 1 },
      _range96: { type: '1f', value: 0 },
      _range97: { type: '1f', value: 0 }
    };

    this.onResize = this.onResize.bind(this);
  }

  init() {
    if (!this.isMobile) {
      this.renderer = new PIXI.autoDetectRenderer(this.width, this.height, { transparent: true, resolution: 1 });
      this.renderer.backgroundColor = 0x000000;
      this.renderer.autoResize = true;
     this.container.appendChild(this.renderer.view);

      this.stage = new PIXI.Container();

      this.smokeShader = new PIXI.AbstractFilter('', this.shaderCode, this.uniforms);

      this.shaderSprite = PIXI.Sprite.fromImage('');
      this.shaderSprite.width = this.width;
      this.shaderSprite.height = this.height;
      this.shaderSprite.filters = [this.smokeShader];
      this.stage.addChild(this.shaderSprite);

      this.graphics = new PIXI.Graphics();
      this.graphics.beginFill(0xFFFFFF, 1);
      this.graphics.lineStyle(0, 0xFFFFFF);
      this.graphics.drawRect(0, 0, this.width, this.height);
      this.stage.addChild(this.graphics);

      $(window).resize(this.onResize);
      this.onResize();
    }
  }

  play() {
    if (!this.isMobile) {
      const animate = () => {
        this.loop = requestAnimationFrame(animate);
        if (!this.smokeShader) return;
        this.count += this.smokeShader.uniforms._speed.value;
        this.smokeShader.uniforms.time.value = this.count;
        this.graphics.alpha = this.smokeShader.uniforms._range14.value;

        this.frame++;
        if (this.frame % 2 === 0) {
          return;
        }
        this.render();
      };
      animate();
    }
  }

  stop() {
    console.log('FogEffect: stop');
    cancelAnimationFrame(this.loop);
  }

  animateEffect(p_anime) {
    console.log('FogEffect: animateEffect:', p_anime);
    if (!this.smokeShader || this.isMobile) return;

    if (p_anime === "start") {
      this.play();
      this.smokeShader.uniforms._speed.value = 0.1;
      this.smokeShader.uniforms._range1.value = 0.4;
      this.smokeShader.uniforms._range2.value = 3.0;
      this.smokeShader.uniforms._range3.value = 0.0;
      this.smokeShader.uniforms._range4.value = 0;
      this.smokeShader.uniforms._range6.value = -0.4;
      this.smokeShader.uniforms._range14.value = 1;

      $(this.smokeShader.uniforms._range2).animate({ 'value': '0.9' }, 4000, "linear");
      $(this.smokeShader.uniforms._range3).animate({ 'value': '5.0' }, 4000, "linear");
      $(this.smokeShader.uniforms._range14).animate({ 'value': '0.0' }, 4000, "linear");
      $(this.smokeShader.uniforms._speed).animate({ 'value': '0.006' }, 5000, "linear");

      $(this.smokeShader.uniforms._range13).animate({ 'value': '0.01' }, 1200, () => {
        $(this.smokeShader.uniforms._range4).animate({ 'value': '0.5' }, 3000, "linear");
      });
    } else if (p_anime === "end") {
      $(this.smokeShader.uniforms._range4).animate({ 'value': '3.0' }, 1000, "linear");
      $(this.smokeShader.uniforms._range6).animate({ 'value': '-1.0' }, 1000, "linear");
      $(this.smokeShader.uniforms._range14).animate({ 'value': '0.0' }, 1000, "linear");

      $(this.smokeShader.uniforms._range1).animate({ 'value': '-2.0' }, 3000, "linear");
      $(this.smokeShader.uniforms._range2).animate({ 'value': '-2.0' }, 3000, "linear");

      $(this.smokeShader.uniforms._range13).animate({ 'value': '0.01' }, 2000, "linear", () => {
        this.smokeShader.uniforms._speed.value = 0;
        cancelAnimationFrame(this.loop);
      });
    }
  }

  getState() {
    return this.smokeShader;
  }

  onResize() {
    if (this.renderer && !this.isMobile) {
      this.renderer.view.style.width = $(window).width() + 'px';
      this.renderer.view.style.height = $(window).height() + 'px';
    }
  }

  render() {
    if (!this.isMobile) {
      this.renderer.emit('prerender');

      if (this.renderer.gl.isContextLost()) return;

      this.renderer.drawCount = 0;
      this.renderer._lastObjectRendered = this.stage;

      if (this.renderer._useFXAA) {
        this.renderer._FXAAFilter[0].uniforms.resolution.value.x = this.renderer.width;
        this.renderer._FXAAFilter[0].uniforms.resolution.value.y = this.renderer.height * 0.5;
        this.stage.filterArea = this.renderer.renderTarget.size;
        this.stage.filters = this.renderer._FXAAFilter;
      }

      const cacheParent = this.stage.parent;
      this.stage.parent = this.renderer._tempDisplayObjectParent;
      this.stage.updateTransform();
      this.stage.parent = cacheParent;

      const gl = this.renderer.gl;
      this.renderer.setRenderTarget(this.renderer.renderTarget);
      gl.clearColor(0.0, 0.0, 0, this.smokeShader.uniforms._range13.value);
      gl.clear(gl.COLOR_BUFFER_BIT);
      this.renderer.renderDisplayObject(this.stage, this.renderer.renderTarget);
      this.renderer.emit('postrender');
    }
  }
}


