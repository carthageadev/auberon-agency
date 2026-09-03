import { useEffect, useRef } from "react";

/* Light blue plasma shader with animated film grain + pointer interaction.
   Raw WebGL (no extra deps). Fills whatever box it's placed in. */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_pulse; /* 0 at rest, spikes on pointer motion */

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float slow = u_time * 0.10; /* lazy drift */
  float fast = u_time * 0.9;  /* lively ripple */

  /* slow travelling field + fast rippling detail */
  float w = noise(vec2(p.x * 2.0 - slow * 0.6, p.y * 2.0) + vec2(0.0, -slow * 0.4));
  float v = noise(p * 3.4 + vec2(-fast * 0.35, fast * 0.22) + w * 1.1);
  float v2 = noise(p * 7.0 + vec2(fast * 0.5, -fast * 0.4) + v);

  /* pulse briefly tightens + brightens the wave */
  float kick = 1.0 + u_pulse * 0.9;
  float plasma = sin((p.x * 3.0 + p.y * 4.2) * kick + (v * 4.5 + v2 * 1.5) + fast * 0.9) * 0.5 + 0.5;
  plasma = smoothstep(0.2, 0.9, plasma * 0.6 + v * 0.5);

  vec3 paper = vec3(0.949, 0.945, 0.929); /* #F2F1ED */
  vec3 ice   = vec3(0.741, 0.839, 0.949); /* light blue */
  vec3 deep  = vec3(0.580, 0.710, 0.890); /* depth blue */

  vec3 col = mix(paper, ice, plasma * 0.85);
  col = mix(col, deep, smoothstep(0.55, 1.0, plasma) * 0.45);

  /* sleek surge while the pointer moves */
  col += vec3(0.62, 0.76, 0.95) * (u_pulse * 0.35 * smoothstep(0.25, 0.95, plasma));

  /* animated grain */
  float g = hash(uv * u_res * 0.5 + fract(u_time) * 371.0) - 0.5;
  col += g * 0.055;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(sh) || "shader compile failed");
  }
  return sh;
}

export function ShaderBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    /* 2D fallback if WebGL is unavailable */
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    }) as WebGLRenderingContext | null;

    if (!gl) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, canvas.width || 300, 0);
        grad.addColorStop(0, "#F2F1ED");
        grad.addColorStop(0.5, "#BCD6F2");
        grad.addColorStop(1, "#F2F1ED");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width || 300, canvas.height || 150);
      }
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uPulse = gl.getUniformLocation(prog, "u_pulse");

    /* pointer velocity → pulse (spikes on move, decays to 0) */
    const pulse = { value: 0 };
    let lastX = -1;
    let lastY = -1;
    let lastT = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastX >= 0 && now > lastT) {
        const speed =
          Math.hypot(e.clientX - lastX, e.clientY - lastY) /
          Math.max(1, now - lastT);
        pulse.value = Math.min(1.4, pulse.value + speed * 0.9);
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();

    const draw = (t: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uPulse, pulse.value);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduced) {
      draw(1.0);
    } else {
      const loop = (now: number) => {
        pulse.value *= 0.93;
        draw((now - start) / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
