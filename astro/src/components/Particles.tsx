import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; r: number; vx: number; vy: number; color: string };

export default function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    const scaleX = devicePixelRatio;
    const scaleY = devicePixelRatio;

    let particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.5 ? 'rgba(0,229,255,0.6)' : 'rgba(124,58,237,0.6)'
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * scaleX;
      h = canvas.height = canvas.offsetHeight * scaleY;
    };
    window.addEventListener('resize', onResize);
    draw();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 -z-10 opacity-40" />;
}
