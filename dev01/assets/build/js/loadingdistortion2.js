class LoadingDistortionEffect {
    constructor(opts) {
      this.parent = opts.parent || console.error("Parent element is required");
      this.imageSrc = opts.image || console.error("Image source is required");
      this.dispImage = opts.displacementImage || console.error("Displacement image is required");
      this.intensity = opts.intensity || 1;
      this.speed = opts.speed || 1.6;
      this.easing = opts.easing || Expo.easeOut;
      this.tween = null; 
      this.vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
  
      this.fragmentShader = `
        varying vec2 vUv;
        uniform sampler2D image;
        uniform sampler2D disp;
        uniform float progress;
        uniform float effectFactor;
  
        void main(){
          vec2 uv = vUv;
          vec4 dispTexture = texture2D(disp, uv);
          float distortion = (1.0 - progress) * effectFactor * dispTexture.r;
          vec2 distortedUV = vec2(uv.x + distortion, uv.y);
          vec4 color = texture2D(image, distortedUV);
          gl_FragColor = color;
        }
      `;
  
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
        antialias: true,
        alpha: true,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.parent.offsetWidth, this.parent.offsetHeight);
      this.renderer.setClearColor(0xffffff, 0.0);
      this.parent.appendChild(this.renderer.domElement);
  
      this.loader = new THREE.TextureLoader();
      this.loader.crossOrigin = "";
  
      this.imageTexture = this.loader.load(this.imageSrc);
      this.dispTexture = this.loader.load(this.dispImage);
      this.dispTexture.wrapS = this.dispTexture.wrapT = THREE.RepeatWrapping;
  
      this.material = new THREE.ShaderMaterial({
        uniforms: {
          image: { type: "t", value: this.imageTexture },
          disp: { type: "t", value: this.dispTexture },
          progress: { type: "f", value: 0.0 },
          effectFactor: { type: "f", value: this.intensity },
        },
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
        transparent: true,
      });
  
      this.geometry = new THREE.PlaneBufferGeometry(
        this.parent.offsetWidth,
        this.parent.offsetHeight,
        1
      );
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);
  
      window.addEventListener("resize", () => {
        this.renderer.setSize(this.parent.offsetWidth, this.parent.offsetHeight);
        this.camera.left = this.parent.offsetWidth / -2;
        this.camera.right = this.parent.offsetWidth / 2;
        this.camera.top = this.parent.offsetHeight / 2;
        this.camera.bottom = this.parent.offsetHeight / -2;
        this.camera.updateProjectionMatrix();
      });
  
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // if (entry.isIntersecting) {
            //   this.trigger(true);
            // } else {
            //   this.trigger(false);
            // }
            if (entry.isIntersecting) {
              this.trigger(true);
              this.observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );
      this.observer.observe(this.parent);
  
      this.animate();
    }
  
    trigger(forward = true) {
      if (this.tween) this.tween.kill();
  
      const targetValue = forward ? 1.0 : 0.0;
  
      this.tween = TweenMax.to(this.material.uniforms.progress, this.speed, {
        value: targetValue,
        ease: this.easing,
      });
    }
  
    animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
  }
  