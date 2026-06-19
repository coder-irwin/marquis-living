"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A persistent, full-viewport WebGL light field — volumetric god-rays and a
 * physically-soft glow that the whole site descends past like a slow camera.
 * Pure WebGL1 + a hand-written fragment shader (no R3F/three dependency). The
 * light source drifts toward the cursor. Falls back to a CSS gradient if WebGL
 * is unavailable or the shader fails to compile, and renders a single still
 * frame under prefers-reduced-motion.
 */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main(){
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;
  vec2 light = vec2(0.5 + (u_mouse.x - 0.5) * 0.32, 1.06 + (u_mouse.y - 0.5) * 0.12);
  vec2 dir = uv - light;
  dir.x *= aspect;
  float dist = length(dir);

  // soft radial glow from the light
  float glow = pow(smoothstep(1.45, 0.0, dist), 1.7);

  // volumetric rays — noise modulated by the angle toward the light
  float ang = atan(dir.x, dir.y);
  float r = noise(vec2(ang * 6.0, u_time * 0.04)) * 0.55
          + noise(vec2(ang * 15.0 - u_time * 0.025, 3.0)) * 0.45;
  float rays = pow(r, 2.2) * smoothstep(1.25, 0.08, dist);

  // Light daylit atmosphere: warm paper base, a gentle sun-pool near the
  // light source and soft warm ray-shadows — rather than a dark void.
  vec3 paper = vec3(0.965, 0.945, 0.905);
  vec3 warm = vec3(0.74, 0.58, 0.34);
  vec3 col = paper;
  col = mix(col, warm, glow * 0.13);                 // warm sun-pool
  col = mix(col, warm * 0.78, rays * 0.10);          // faint ray shadows
  // warm bloom rising from the floor
  col = mix(col, warm, smoothstep(0.0, 0.7, uv.y) * 0.04);
  // gentle vignette darkening the corners a touch
  float vig = smoothstep(1.3, 0.4, length((uv - 0.5) * vec2(aspect, 1.0)));
  col = mix(col * vec3(0.9, 0.88, 0.83), col, vig);
  // very fine grain
  col += hash(uv * u_res + u_time) * 0.016 - 0.008;

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function LightField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
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
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();

    let raf = 0;
    let start = 0;
    const render = (t: number) => {
      if (!start) start = t;
      // ease the light toward the cursor for a smooth "camera" feel
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform1f(uTime, (t - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) {
        start = 0;
        raf = requestAnimationFrame(render);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  if (failed) {
    return <div className="d4-lightfallback fixed inset-0 -z-10" aria-hidden />;
  }
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
