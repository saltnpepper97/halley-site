<!--
  Live port of Halley's builtin "space" background shader
  (crates/halley-wl/src/render/shaders/gesso_solarsystem.frag): domain-warped
  nebula gas + ridged dust lanes + temperature-tinted stars with diffraction
  glints, all panning with a slow virtual camera. Decorative only.

  Rendered in a full-screen WebGL canvas for the dark theme. On light theme the
  canvas hides and the CSS Starfield fallback takes over. Falls back silently to
  the body gradients if WebGL is unavailable or reduced motion is requested
  (single static frame in the latter case).
-->
<script lang="ts">
  import { onMount } from 'svelte';

  // Vertex: full-screen triangle, v_coords in [0,1] like the compositor's uv.
  const VERT = `
attribute vec2 a_pos;
varying vec2 v_coords;
void main() {
  v_coords = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

  // Fragment: verbatim from gesso_solarsystem.frag, minus the compositor-only
  // texture/alpha plumbing (final alpha is always 1.0 on the web).
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
    color += stars * intensity;
    color += accent * center_lift * 0.018 * intensity;

    gl_FragColor = vec4(color, 1.0);
}`;

  // Matches examples/halley.rune: base "#181a26", accent "#8fa8d8", intensity 1.0.
  const BASE_COLOR = [0x18 / 255, 0x1a / 255, 0x26 / 255];
  const ACCENT_COLOR = [0x8f / 255, 0xa8 / 255, 0xd8 / 255];
  const INTENSITY = 1.0;
  // World units the virtual camera pans per second (gentle diagonal drift).
  const PAN = [5.0, 2.0];

  let canvas: HTMLCanvasElement;

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
    if (!ctx) return; // No WebGL: body gradients + CSS starfield carry it.
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

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // Full-screen triangle.
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

    gl.uniform1f(uIntensity, INTENSITY);
    gl.uniform3fv(uBase, BASE_COLOR);
    gl.uniform3fv(uAccent, ACCENT_COLOR);

    let w = 0;
    let h = 0;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      // camera_size == resolution keeps px_per_world == 1 (home zoom, full star detail).
      gl.uniform2f(uSize, w, h);
    }

    function draw(seconds: number) {
      gl.uniform1f(uTime, seconds);
      gl.uniform2f(uCenter, PAN[0] * seconds, PAN[1] * seconds);
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

    const onResize = () => {
      resize();
      if (!running) draw(reduce.matches ? 0 : (performance.now() - start) / 1000);
    };
    const onVisibility = () => (document.hidden ? stop() : play());
    const onReduceChange = () => {
      stop();
      if (reduce.matches) draw(0);
      else {
        start = 0;
        play();
      }
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    reduce.addEventListener('change', onReduceChange);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduce.removeEventListener('change', onReduceChange);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  });
</script>

<canvas bind:this={canvas} class="space-bg" aria-hidden="true"></canvas>

<style>
  .space-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* Fade into the solid page background toward the bottom, like the old starfield. */
    mask-image: linear-gradient(to bottom, black 0%, black 58%, transparent 94%);
    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 58%, transparent 94%);
  }

  /* Light theme keeps the CSS Starfield instead. */
  :global(:root[data-theme='light']) .space-bg {
    display: none;
  }
</style>
