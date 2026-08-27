<!--
  The site's single background field.

  One component owns every background layer, mounted once in +layout.svelte:

    canvas    live star/nebula field (WebGL) — opaque, this IS the page ground
    .veil     depth tint that settles the field so content reads over it
    .grid     fine instrument grid
    .vignette edge falloff

  The shader is a port of Halley's builtin "space" background
  (crates/halley-wl/src/render/shaders/gesso_solarsystem.frag): domain-warped
  nebula gas, ridged dust lanes, temperature-tinted stars with diffraction
  glints — plus a periodic comet, because that is the whole point of the name.

  The virtual camera drifts on its own, advances with scroll (quarter speed, so
  scrolling reads as depth rather than as a moving wallpaper), and leans a few
  world units toward the pointer. No WebGL: .fallback carries a CSS starfield.
  Reduced motion: one static frame, no scroll or pointer tracking.
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import { currentScrollY } from '$lib/utils/scroll-lock';

  const VERT = `
attribute vec2 a_pos;
varying vec2 v_coords;
void main() {
  v_coords = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

  const FRAG = `
precision highp float;
varying vec2 v_coords;
uniform vec2 u_resolution;
uniform vec2 u_camera_center;
uniform vec2 u_camera_size;
uniform float u_time;
uniform float u_intensity;
uniform vec3 u_base_color;
uniform vec3 u_accent_color;
uniform float u_light_mode;

const float TAU = 6.2831853;
const float STAR_CELL_PERIOD = 8192.0;

float hash21(vec2 p) {
    p = fract(p * vec2(0.1031, 0.11369));
    p += dot(p, p.yx + 19.19);
    return fract((p.x + p.y) * p.x);
}

float value_noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p, int oct) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
        if (i >= oct) break;
        v += a * value_noise(p);
        p = rot * p * 2.0;
        a *= 0.5;
    }
    return v;
}

float ridge(vec2 p, int oct) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
        if (i >= oct) break;
        float n = value_noise(p);
        n = 1.0 - abs(n - 0.5) * 2.0;
        n = n * n;
        v += a * n;
        p = rot * p * 2.0;
        a *= 0.5;
    }
    return v;
}

float small_star(vec2 p, float radius) {
    float d = length(p);
    float core = 1.0 - smoothstep(radius * 0.35, radius, d);
    float glow = (1.0 - smoothstep(radius, radius * 3.5, d)) * 0.18;
    return core + glow;
}

float glint_star(vec2 p, float radius) {
    float d = length(p);
    float core = 1.0 - smoothstep(radius * 0.25, radius, d);
    float glow = (1.0 - smoothstep(radius, radius * 5.0, d)) * 0.26;
    float arm_x = (1.0 - smoothstep(0.0, radius * 5.0, abs(p.x)))
        * (1.0 - smoothstep(0.0, radius * 0.35, abs(p.y)));
    float arm_y = (1.0 - smoothstep(0.0, radius * 5.0, abs(p.y)))
        * (1.0 - smoothstep(0.0, radius * 0.35, abs(p.x)));
    return core + glow + (arm_x + arm_y) * 0.18;
}

vec3 star_tint(float t) {
    vec3 blue = vec3(0.70, 0.81, 1.00);
    vec3 white = vec3(1.00, 0.98, 0.95);
    vec3 gold = vec3(1.00, 0.87, 0.64);
    vec3 red = vec3(1.00, 0.72, 0.58);
    if (t < 0.22) {
        return mix(blue, white, t / 0.22);
    } else if (t < 0.78) {
        return white;
    } else if (t < 0.91) {
        return mix(white, gold, (t - 0.78) / 0.13);
    }
    return mix(gold, red, (t - 0.91) / 0.09);
}

vec3 star_field(vec2 world, float cell_size, float radius, float threshold, float salt, float glints) {
    vec2 grid = world / cell_size;
    vec2 cell = floor(grid);
    vec2 local = fract(grid) - 0.5;
    vec2 hcell = mod(cell, STAR_CELL_PERIOD);
    vec2 jitter = vec2(hash21(hcell + salt), hash21(hcell + salt + 23.7)) - 0.5;
    vec2 p = local - jitter * 0.72;
    float seed = hash21(hcell + salt * 2.3);
    float gate = step(threshold, seed);
    float size_seed = hash21(hcell + salt * 4.9);
    float twinkle = 0.78 + 0.22 * sin(u_time * (0.75 + seed * 1.5) + seed * TAU);
    float is_glint = step(1.0 - glints, seed);
    float star = mix(
        small_star(p, radius * mix(0.65, 1.35, size_seed)),
        glint_star(p, radius * mix(0.80, 1.55, size_seed)),
        is_glint
    );
    float bright = mix(0.30, 1.45, seed * seed);
    vec3 tint = star_tint(hash21(hcell + salt * 7.1));
    return tint * (star * gate * twinkle * bright);
}

/*
  Periodic comet. Crosses the field on a shallow diagonal, then stays away for
  most of the cycle — it returns rather than loops. Screen space, so it reads
  the same regardless of where the camera has drifted to.
*/
float comet(vec2 auv, float phase) {
    vec2 dir = normalize(vec2(1.0, -0.36));
    vec2 head = vec2(-1.15, 0.52) + dir * (phase * 2.9);
    vec2 d = auv - head;

    float along = dot(d, -dir);
    float perp = abs(dot(d, vec2(-dir.y, dir.x)));

    float taper = clamp(1.0 - along / 0.42, 0.0, 1.0);
    float width = 0.004 + 0.013 * (1.0 - taper);
    float trail = taper * taper * (1.0 - smoothstep(0.0, width, perp)) * step(0.0, along);

    float dist = length(d);
    float core = 1.0 - smoothstep(0.0, 0.0075, dist);
    float glow = (1.0 - smoothstep(0.0, 0.075, dist)) * 0.30;

    return core + glow + trail * 0.9;
}

void main() {
    vec2 uv = v_coords;
    vec2 world = u_camera_center + (uv - 0.5) * u_camera_size;

    vec3 base = max(u_base_color, vec3(0.0));
    vec3 accent = max(u_accent_color, vec3(0.0));
    float intensity = max(u_intensity, 0.0);

    vec2 drift = vec2(u_time * 4.0, -u_time * 2.0);
    vec2 nb = (world + drift) * 0.0009;
    vec2 warp = vec2(fbm(nb + vec2(4.1, 1.7), 3), fbm(nb + vec2(8.2, 2.3), 3));
    nb += (warp - 0.5) * 1.3;

    float clouds = smoothstep(0.35, 0.95, fbm(nb, 4));
    float dust = smoothstep(0.45, 0.95, ridge(nb * 1.7 + vec2(3.3, 7.1), 4));
    float large = fbm(world * 0.00018 + vec2(11.0, 5.0), 2);
    float paper = fbm(world * 0.0016, 3) * 0.5;

    vec3 nebula_dust = accent.brg * 0.8;
    float density = clouds * (0.45 + large * 0.85);

    vec3 color = base * (0.90 + paper * 0.12);
    color = mix(color, accent, density * 0.12 * intensity);
    color = mix(color, nebula_dust, dust * 0.06 * intensity);

    float px_per_world = u_resolution.x / max(u_camera_size.x, 1.0);
    float zoom_fade = smoothstep(0.25, 0.70, px_per_world);

    vec3 stars = vec3(0.0);
    stars += star_field(world, 52.0, 0.020, 0.72, 3.0, 0.010) * 0.30 * mix(1.0, zoom_fade, 0.85);
    stars += star_field(world + vec2(311.0, -127.0), 92.0, 0.018, 0.66, 17.0, 0.030) * 0.58 * mix(1.0, zoom_fade, 0.55);
    stars += star_field(world + vec2(-919.0, 541.0), 180.0, 0.017, 0.58, 41.0, 0.070) * 0.86 * mix(1.0, zoom_fade, 0.30);
    stars += star_field(world + vec2(157.0, 803.0), 34.0, 0.016, 0.82, 67.0, 0.0) * 0.16 * zoom_fade;

    vec2 aspect_uv = (uv - 0.5) * vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    float center_lift = 1.0 - smoothstep(0.20, 1.20, length(aspect_uv));

    /* One pass every 52s, visible for the first third of the cycle. */
    float cycle = fract(u_time / 52.0);
    float pass_phase = clamp(cycle / 0.34, 0.0, 1.0);
    float visible = smoothstep(0.0, 0.10, pass_phase) * (1.0 - smoothstep(0.86, 1.0, pass_phase))
        * step(cycle, 0.34);
    float tail = comet(aspect_uv, pass_phase) * visible;

    if (u_light_mode > 0.5) {
        float star_ink = clamp(max(max(stars.r, stars.g), stars.b) * intensity * 1.45, 0.0, 0.94);
        color = mix(color, vec3(0.035, 0.028, 0.022), star_ink);
        color = mix(color, vec3(0.28, 0.10, 0.03), clamp(tail * 0.85, 0.0, 0.9));
    } else {
        color += stars * intensity;
        color += vec3(1.00, 0.52, 0.26) * tail * 0.85 * intensity;
    }
    color += accent * center_lift * 0.018 * intensity;

    gl_FragColor = vec4(color, 1.0);
}`;

  // Matches examples/halley.rune: base "#181a26", accent "#8fa8d8", intensity 1.0.
  const DARK_BASE_COLOR = [0x18 / 255, 0x1a / 255, 0x26 / 255];
  const DARK_ACCENT_COLOR = [0x8f / 255, 0xa8 / 255, 0xd8 / 255];
  const LIGHT_BASE_COLOR = [0xf3 / 255, 0xee / 255, 0xe7 / 255];
  const LIGHT_ACCENT_COLOR = [0x28 / 255, 0x5f / 255, 0x73 / 255];
  const INTENSITY = 1.0;

  // World units the camera pans per second, unattended.
  const PAN = [5.0, 2.0];
  // Scroll travels the camera at a quarter of page speed, so the field sits
  // behind the content instead of sliding with it.
  const SCROLL_PARALLAX = 0.25;
  // How far the camera leans toward the pointer, in world units.
  const POINTER_REACH = 26;

  let canvas: HTMLCanvasElement;
  // Set once the first frame is on screen, to fade the field in rather than pop it.
  let lit = $state(false);

  function compile(gl: WebGLRenderingContext, type: number, src: string) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('space shader compile failed:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  onMount(() => {
    const ctx = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      premultipliedAlpha: false
    });
    if (!ctx) return; // No WebGL: .fallback carries it.
    const gl: WebGLRenderingContext = ctx;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('space shader link failed:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);
    document.documentElement.dataset.spaceShader = 'ready';

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u('u_resolution');
    const uCenter = u('u_camera_center');
    const uSize = u('u_camera_size');
    const uTime = u('u_time');
    const uIntensity = u('u_intensity');
    const uBase = u('u_base_color');
    const uAccent = u('u_accent_color');
    const uLightMode = u('u_light_mode');

    gl.uniform1f(uIntensity, INTENSITY);

    function syncTheme() {
      const light = document.documentElement.dataset.theme === 'light';
      gl.uniform1f(uLightMode, light ? 1 : 0);
      gl.uniform3fv(uBase, light ? LIGHT_BASE_COLOR : DARK_BASE_COLOR);
      gl.uniform3fv(uAccent, light ? LIGHT_ACCENT_COLOR : DARK_ACCENT_COLOR);
    }

    syncTheme();

    let dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      // camera_size == resolution keeps px_per_world == 1 (full star detail).
      gl.uniform2f(uSize, w, h);
    }

    // Pointer lean is eased toward its target so the field never snaps.
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    function draw(seconds: number) {
      pointerX += (pointerTargetX - pointerX) * 0.045;
      pointerY += (pointerTargetY - pointerY) * 0.045;

      // Scrolling down the page moves the camera up through the field, so the
      // stars fall away behind the content.
      const scroll = currentScrollY() * dpr * SCROLL_PARALLAX;

      gl.uniform1f(uTime, seconds);
      gl.uniform2f(
        uCenter,
        PAN[0] * seconds + pointerX,
        PAN[1] * seconds - scroll + pointerY
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    resize();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let start = 0;
    let running = false;

    function frame(now: number) {
      if (!running) return;
      if (!start) start = now;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(frame);
    }

    function play() {
      if (running || reduce.matches || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    if (reduce.matches) {
      draw(0); // Single static frame — still the full nebula, just frozen.
    } else {
      play();
    }
    lit = true;

    const onPointerMove = (event: PointerEvent) => {
      if (reduce.matches) return;
      pointerTargetX = (event.clientX / window.innerWidth - 0.5) * 2 * POINTER_REACH;
      pointerTargetY = (0.5 - event.clientY / window.innerHeight) * 2 * POINTER_REACH;
    };
    const onResize = () => {
      resize();
      if (!running) draw(reduce.matches ? 0 : (performance.now() - start) / 1000);
    };
    // Scroll only needs a redraw when the loop is parked (reduced motion).
    const onScroll = () => {
      if (!running && reduce.matches) draw(0);
    };
    const onVisibility = () => (document.hidden ? stop() : play());
    const onReduceChange = () => {
      stop();
      if (reduce.matches) {
        pointerTargetX = pointerTargetY = pointerX = pointerY = 0;
        draw(0);
      } else {
        start = 0;
        play();
      }
    };
    const themeObserver = new MutationObserver(() => {
      syncTheme();
      if (!running) draw(reduce.matches ? 0 : (performance.now() - start) / 1000);
    });

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    reduce.addEventListener('change', onReduceChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      stop();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduce.removeEventListener('change', onReduceChange);
      themeObserver.disconnect();
      delete document.documentElement.dataset.spaceShader;
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  });
</script>

<div class="site-background" aria-hidden="true">
  <div class="fallback">
    <div class="star-layer layer-far"></div>
    <div class="star-layer layer-mid"></div>
    <div class="star-layer layer-near"></div>
  </div>

  <canvas bind:this={canvas} class="field" class:lit></canvas>

  <div class="veil"></div>
  <div class="grid"></div>
  <div class="vignette"></div>
</div>

<style>
  .site-background {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
    background: var(--bg-1);
    contain: layout paint style;
  }

  .site-background > * {
    position: absolute;
    inset: 0;
  }

  /* The live field. Opaque — it is the page ground, not a layer over one. */
  .field {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1400ms var(--ease-out);
  }

  .field.lit {
    opacity: 1;
  }

  /*
    Depth tint. Settles the field toward the page colour so panels have
    something to sit on, and carries the one accent bloom the site gets —
    previously duplicated across body, .space-backdrop and the hero.
  */
  .veil {
    background:
      radial-gradient(ellipse 60rem 40rem at 12% -6%, rgba(255, 106, 42, 0.20), transparent 70%),
      radial-gradient(ellipse 52rem 38rem at 88% 12%, rgba(125, 220, 255, 0.10), transparent 72%),
      linear-gradient(180deg, rgba(4, 7, 13, 0.30) 0%, rgba(4, 7, 13, 0.58) 55%, rgba(4, 7, 13, 0.74) 100%);
  }

  /* Instrument grid — full height, fading with distance rather than cut off. */
  .grid {
    background:
      linear-gradient(rgba(246, 239, 231, 0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(246, 239, 231, 0.022) 1px, transparent 1px);
    background-size: 4.5rem 4.5rem;
    mask-image: radial-gradient(ellipse 120% 90% at 50% 0%, black 10%, transparent 82%);
    -webkit-mask-image: radial-gradient(ellipse 120% 90% at 50% 0%, black 10%, transparent 82%);
  }

  .vignette {
    background: radial-gradient(ellipse 96% 80% at 50% 42%, transparent 40%, rgba(2, 4, 8, 0.52) 100%);
  }

  :global(:root[data-theme='light']) .site-background {
    background: var(--bg-1);
  }

  :global(:root[data-theme='light']) .veil {
    background:
      radial-gradient(ellipse 60rem 40rem at 12% -6%, rgba(184, 63, 17, 0.09), transparent 70%),
      radial-gradient(ellipse 52rem 38rem at 88% 12%, rgba(40, 95, 115, 0.06), transparent 72%),
      linear-gradient(180deg, rgba(243, 238, 231, 0.32) 0%, rgba(243, 238, 231, 0.58) 60%, rgba(243, 238, 231, 0.72) 100%);
  }

  :global(:root[data-theme='light']) .grid {
    background:
      linear-gradient(rgba(45, 30, 20, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45, 30, 20, 0.034) 1px, transparent 1px);
  }

  :global(:root[data-theme='light']) .vignette {
    background: radial-gradient(ellipse 96% 80% at 50% 42%, transparent 55%, rgba(89, 62, 42, 0.09) 100%);
  }

  /*
    CSS starfield fallback. Three depth planes at non-commensurate sizes so the
    dot pattern never visibly tiles. Hidden the moment the shader reports ready.
  */
  .fallback {
    overflow: hidden;
  }

  :global(:root[data-space-shader='ready']) .fallback {
    display: none;
  }

  .star-layer {
    position: absolute;
    inset: -25%;
    background-repeat: repeat;
    will-change: transform;
  }

  .layer-far {
    background-image:
      radial-gradient(circle, rgba(246, 239, 231, 0.5) 0 0.6px, transparent 1.2px),
      radial-gradient(circle, rgba(125, 220, 255, 0.34) 0 0.6px, transparent 1.2px);
    background-size: 6.7rem 6.7rem, 9.3rem 9.3rem;
    background-position: 0 0, 3.2rem 5.4rem;
    opacity: 0.7;
    animation: drift-far 320s linear infinite;
  }

  .layer-mid {
    background-image:
      radial-gradient(circle, rgba(246, 239, 231, 0.72) 0 0.9px, transparent 1.6px),
      radial-gradient(circle, rgba(125, 220, 255, 0.6) 0 0.9px, transparent 1.7px);
    background-size: 12.9rem 12.9rem, 16.3rem 16.3rem;
    background-position: 4.5rem 1.2rem, 8.1rem 9.7rem;
    opacity: 0.82;
    animation: drift-mid 220s linear infinite;
  }

  .layer-near {
    background-image:
      radial-gradient(circle, rgba(255, 255, 255, 0.95) 0 1.1px, transparent 2px),
      radial-gradient(circle, rgba(255, 155, 84, 0.8) 0 1px, transparent 2px);
    background-size: 19.7rem 19.7rem, 31.1rem 31.1rem;
    background-position: 2.3rem 7.9rem, 6.6rem 14.2rem;
    animation: drift-near 160s linear infinite, twinkle 7s ease-in-out infinite;
  }

  :global(:root[data-theme='light']) .layer-far {
    background-image:
      radial-gradient(circle, rgba(23, 17, 13, 0.7) 0 0.72px, transparent 1.35px),
      radial-gradient(circle, rgba(40, 95, 115, 0.5) 0 0.68px, transparent 1.3px);
  }

  :global(:root[data-theme='light']) .layer-mid {
    background-image:
      radial-gradient(circle, rgba(18, 14, 11, 0.84) 0 1px, transparent 1.75px),
      radial-gradient(circle, rgba(40, 95, 115, 0.68) 0 0.96px, transparent 1.72px);
  }

  :global(:root[data-theme='light']) .layer-near {
    background-image:
      radial-gradient(circle, rgba(12, 10, 8, 0.94) 0 1.28px, transparent 2.2px),
      radial-gradient(circle, rgba(184, 63, 17, 0.72) 0 1.1px, transparent 2px);
  }

  @keyframes drift-far {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-3rem, 5rem, 0); }
  }

  @keyframes drift-mid {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(4rem, 6rem, 0); }
  }

  @keyframes drift-near {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-5rem, 8rem, 0); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.92; }
    50% { opacity: 0.5; }
  }

  @media (prefers-reduced-motion: reduce) {
    .field {
      transition: none;
      opacity: 1;
    }

    .star-layer {
      animation: none;
    }
  }
</style>
