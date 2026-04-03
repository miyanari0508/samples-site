class HoverEffect {
    constructor(opts) {
      this.vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `;
  
      this.fragmentShader = `
        varying vec2 vUv;
  
        uniform sampler2D texture;
        uniform sampler2D texture2;
        uniform sampler2D disp;
  
        uniform float dispFactor;
        uniform float effectFactor;
  
        void main() {
            vec2 uv = vUv;
            vec4 disp = texture2D(disp, uv);
            
            vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r * effectFactor), uv.y);
            vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r * effectFactor), uv.y);
            
            vec4 _texture = texture2D(texture, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);
            
            vec4 finalTexture = mix(_texture, _texture2, dispFactor);
            
            gl_FragColor = finalTexture;
        }
      `;
  
      this.parent = opts.parent || console.warn("No parent specified");
      this.dispImage = opts.displacementImage || console.warn("Displacement image missing");
      this.image1 = opts.image1 || console.warn("First image missing");
      this.image2 = opts.image2 || console.warn("Second image missing");
      this.intensity = opts.intensity || 1;
      this.speedIn = opts.speedIn || 1.6;
      this.speedOut = opts.speedOut || 1.2;
      this.userHover = (opts.hover === undefined) ? true : opts.hover;
      this.easing = opts.easing || Expo.easeOut;
  
      this.mobileAndTabletCheck = function() {
        var check = false;
        (function(a) {
          if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a.substr(0,4))) {
            check = true;
          }
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
      };
  
      this.scene = new THREE.Scene();
  
      this.camera = new THREE.OrthographicCamera(
        this.parent.offsetWidth / -2,
        this.parent.offsetWidth / 2,
        this.parent.offsetHeight / 2,
        this.parent.offsetHeight / -2,
        1,
        1000
      );
      this.camera.position.z = 1;
  
      this.renderer = new THREE.WebGLRenderer({
        antialias: false
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(0xffffff, 0.0);
      this.renderer.setSize(this.parent.offsetWidth, this.parent.offsetHeight);
      this.parent.appendChild(this.renderer.domElement);
  
      this.loader = new THREE.TextureLoader();
      this.loader.crossOrigin = "";
      this.texture1 = this.loader.load(this.image1);
      this.texture2 = this.loader.load(this.image2);
      this.disp = this.loader.load(this.dispImage);
      this.disp.wrapS = this.disp.wrapT = THREE.RepeatWrapping;
  
      this.texture1.magFilter = this.texture2.magFilter = THREE.LinearFilter;
      this.texture1.minFilter = this.texture2.minFilter = THREE.LinearFilter;
      this.texture1.anisotropy = this.texture2.anisotropy = this.renderer.getMaxAnisotropy();
  
      this.mat = new THREE.ShaderMaterial({
        uniforms: {
          effectFactor: { type: "f", value: this.intensity },
          dispFactor: { type: "f", value: 0.0 },
          texture: { type: "t", value: this.texture1 },
          texture2: { type: "t", value: this.texture2 },
          disp: { type: "t", value: this.disp }
        },
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
        transparent: true,
        opacity: 1.0
      });
  
      this.geometry = new THREE.PlaneBufferGeometry(
        this.parent.offsetWidth,
        this.parent.offsetHeight,
        1
      );
      this.object = new THREE.Mesh(this.geometry, this.mat);
      this.scene.add(this.object);
  
      if (this.userHover) {
        this.addEvents();
      }
  
      window.addEventListener("resize", () => {
        this.renderer.setSize(this.parent.offsetWidth, this.parent.offsetHeight);
      });
  
      this.animate();
    }
  
    addEvents() {
      let evtIn = "mouseenter";
      let evtOut = "mouseleave";
      if (this.mobileAndTabletCheck()) {
        evtIn = "touchstart";
        evtOut = "touchend";
      }
  
      this.parent.addEventListener(evtIn, (e) => {
        TweenMax.to(this.mat.uniforms.dispFactor, this.speedIn, {
          value: 1,
          ease: this.easing
        });
      });
  
      this.parent.addEventListener(evtOut, (e) => {
        TweenMax.to(this.mat.uniforms.dispFactor, this.speedOut, {
          value: 0,
          ease: this.easing
        });
      });
    }
  
    next() {
      TweenMax.to(this.mat.uniforms.dispFactor, this.speedIn, {
        value: 1,
        ease: this.easing
      });
    }
  
    previous() {
      TweenMax.to(this.mat.uniforms.dispFactor, this.speedOut, {
        value: 0,
        ease: this.easing
      });
    }
  
    animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
  }
  