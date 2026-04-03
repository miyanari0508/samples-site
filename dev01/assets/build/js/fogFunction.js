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

      vec2 p = gl_FragCoord.xy * 7. / resolution.xy*_range10;
      p.x *= 0.35;
      p.y *= _range9;
      float q = fbm(p - time * 0.1);
      vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));
      vec3 c = mix(c1, c2, fbm(p + r)) + mix(c2, c2, r.x) - mix(c1, c2, r.y);
      float ny = gl_FragCoord.y / resolution.y;
      float a = _range7 + (c.r * cos(shift * gl_FragCoord.y / resolution.y)*_range8);
      gl_FragColor.rgb  = vec3(pow(c.r, _range3) * (1.0 - ny - _range4));
      gl_FragColor.rgb += vec3(smoothstep(0.36, -0., gl_FragCoord.y / resolution.y));
      gl_FragColor.a    = a*_range12 * (1.0-smoothstep(0.0, 1.0, gl_FragCoord.y / resolution.y-_range6));
    }
`


'use strict';

(function () {
  var ua = navigator.userAgent;
  var isMobile = (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0);

  var width = 500;
  var height = 350;
  var renderer;
  var stage;
  var uniforms = {
  };
  uniforms.resolution = { type: 'v2', value: { x: width, y: height } };
  uniforms.shift = { type: '1f', value: 1.6 };
  uniforms.time = { type: '1f', value: 0 };
  uniforms.speed = { type: 'v2', value: { x: 0.2, y: 0.3 } };
  uniforms._speed = { type: '1f', value: 0.009 };

  uniforms._range1 = { type: '1f', value: 0.4 };
  uniforms._range2 = { type: '1f', value: 3.0 };
  uniforms._range3 = { type: '1f', value: 0.0 };
  uniforms._range4 = { type: '1f', value: 0 };

  uniforms._range5 = { type: '1f', value: 0.0 };
  uniforms._range6 = { type: '1f', value: -0.4 };
  uniforms._range7 = { type: '1f', value: 0 };
  uniforms._range8 = { type: '1f', value: -1.45 };

  uniforms._range9 = { type: '1f', value: 1 };
  uniforms._range10 = { type: '1f', value: 1 };

  uniforms._range11 = { type: '1f', value: 0.73 };
  uniforms._range12 = { type: '1f', value: -0.8 };
  uniforms._range13 = { type: '1f', value: 0.01 };
  uniforms._range14 = { type: '1f', value: 1 };

  var smokeShader;
  var shaderSprite;
  var loop;
  var count = 50;
  var frame = 0;
  var graphics;
  var shaderSprite;
  var shaderCode = fogShader;
  var $window = $(window);
  $window.resize(f_onResize);

  function f_kasumi_top_init() {
    if (!isMobile) {
      renderer = new PIXI.autoDetectRenderer(width, height, { transparent: true, resolution: 1 });
      renderer.backgroundColor = 0x000000;
      renderer.autoResize = true;
      document.getElementById('js_fog').appendChild(renderer.view);

      stage = new PIXI.Container();
      smokeShader = new PIXI.AbstractFilter('', shaderCode, uniforms);
      shaderSprite = PIXI.Sprite.fromImage('');
      shaderSprite.width = width;
      shaderSprite.height = height;
      shaderSprite.filters = [smokeShader];
      stage.addChild(shaderSprite);

      //white mask
      graphics = new PIXI.Graphics();
      graphics.beginFill(0xFFFFFF, 1);
      graphics.lineStyle(0, 0xFFFFFF);
      graphics.drawRect(0, 0, width, height);
      stage.addChild(graphics);

      //resize init
      f_onResize();
    }
  }

  // animate
  //--------------------------------------------------
  function f_kasumi_top_play() {
    if (!isMobile) {
      loop = requestAnimationFrame(f_kasumi_top_play);
      if (!smokeShader) return;
      //kasumi speed
      count += (smokeShader.uniforms._speed.value);
      smokeShader.uniforms.time.value = count;

      //white mask
      graphics.alpha = smokeShader.uniforms._range14.value;

      //fps30
      frame++;
      if (frame % 2 == 0) { return; }

      render(renderer, stage);
    }
  }

  // external function
  //--------------------------------------------------
  $.fn.f_kasumi_top_play = function () {
    f_kasumi_top_play();
  }

  $.fn.f_kasumi_top_stop = function () {
    console.log('f_kasumi_top_stop');
    cancelAnimationFrame(loop);
  }

  // external function anime
  //--------------------------------------------------
  $.fn.f_kasumi_top_anime = function (p_anime) {
    console.log('f_kasumi_top_anime:', p_anime);
    if (!smokeShader) return;
    if (!isMobile) {
      /*
      range2 0.9
      range4 0.5
      range3 5
      range14 0
      */

      if (p_anime == "start") {
        f_kasumi_top_play();
        smokeShader.uniforms._speed.value = 0.05;
        smokeShader.uniforms._range1.value = 0.4;
        smokeShader.uniforms._range2.value = 3.0;
        smokeShader.uniforms._range3.value = 0.0;
        smokeShader.uniforms._range4.value = 0;
        smokeShader.uniforms._range6.value = -0.4;
        smokeShader.uniforms._range14.value = 1;


        $(smokeShader.uniforms._range2).animate({ 'value': '0.9' }, 4000, "linear");
        $(smokeShader.uniforms._range3).animate({ 'value': '5.0' }, 4000, "linear");
        $(smokeShader.uniforms._range14).animate({ 'value': '0.0' }, 4000, "linear");

        $(smokeShader.uniforms._speed).animate({ 'value': '0.006' }, 5000, "linear");

        $(smokeShader.uniforms._range13).animate({ 'value': '0.01' }, 1200,
          function () {
            $(smokeShader.uniforms._range4).animate({ 'value': '0.5' }, 3000, "linear");
          });
      } else
        if (p_anime == "end") {
          $(smokeShader.uniforms._range4).animate({ 'value': '3.0' }, 1000, "linear");
          $(smokeShader.uniforms._range6).animate({ 'value': '-1.0' }, 1000, "linear");
          $(smokeShader.uniforms._range14).animate({ 'value': '0.0' }, 1000, "linear");

          $(smokeShader.uniforms._range1).animate({ 'value': '-2.0' }, 3000, "linear");
          $(smokeShader.uniforms._range2).animate({ 'value': '-2.0' }, 3000, "linear");

          $(smokeShader.uniforms._range13).animate({ 'value': '0.01' }, 2000, "linear",
            function () {
              smokeShader.uniforms._speed.value = 0;
              cancelAnimationFrame(loop);
            });
        }
    }
  }

  $.fn.f_kasumi_top_state = function () {
    return smokeShader;
  }


  // resize
  //--------------------------------------------------
  function f_onResize() {
    if (renderer && !isMobile) {
      renderer.view.style.width = $window.width() + 'px';
      renderer.view.style.height = $window.height() + 'px';
    }
  }


  // render
  //--------------------------------------------------
  function render(renderer, object) {
    if (!isMobile) {
      renderer.emit('prerender');

      if (renderer.gl.isContextLost()) return;

      renderer.drawCount = 0;
      renderer._lastObjectRendered = object;

      if (renderer._useFXAA) {
        renderer._FXAAFilter[0].uniforms.resolution.value.x = renderer.width;
        renderer._FXAAFilter[0].uniforms.resolution.value.y = renderer.height * 0.5;
        object.filterArea = renderer.renderTarget.size;
        object.filters = renderer._FXAAFilter;
      }

      var cacheParent = object.parent;
      object.parent = renderer._tempDisplayObjectParent;

      object.updateTransform();

      object.parent = cacheParent;

      var gl = renderer.gl;
      renderer.setRenderTarget(renderer.renderTarget);

      gl.clearColor(0.0, 0.0, 0, smokeShader.uniforms._range13.value);
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.renderDisplayObject(object, renderer.renderTarget);
      renderer.emit('postrender');
    }
  };


  $(document).ready(function () {
    f_kasumi_top_init();
    $.fn.f_kasumi_top_anime("start");
  })
})();

