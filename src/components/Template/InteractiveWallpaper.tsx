'use client';

import { useEffect } from 'react';

export default function InteractiveWallpaper() {
  useEffect(() => {
    const root = document.documentElement;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let targetX = width * 0.5;
    let targetY = height * 0.45;
    let rafId = 0;

    let b1x = width * 0.18;
    let b1y = height * 0.2;
    let b2x = width * 0.82;
    let b2y = height * 0.28;
    let b3x = width * 0.5;
    let b3y = height * 0.82;
    let veilX = 0;
    let veilY = 0;

    const lerp = (current: number, next: number, factor: number) =>
      current + (next - current) * factor;

    const render = () => {
      const nx = targetX / width - 0.5;
      const ny = targetY / height - 0.5;

      b1x = lerp(b1x, width * 0.18 + nx * 180, 0.035);
      b1y = lerp(b1y, height * 0.2 + ny * 120, 0.035);
      b2x = lerp(b2x, width * 0.82 + nx * 210, 0.028);
      b2y = lerp(b2y, height * 0.28 + ny * 140, 0.028);
      b3x = lerp(b3x, width * 0.5 + nx * 140, 0.022);
      b3y = lerp(b3y, height * 0.82 + ny * 160, 0.022);
      veilX = lerp(veilX, nx * 56, 0.018);
      veilY = lerp(veilY, ny * 40, 0.018);

      root.style.setProperty('--blob-1-x', `${b1x}px`);
      root.style.setProperty('--blob-1-y', `${b1y}px`);
      root.style.setProperty('--blob-2-x', `${b2x}px`);
      root.style.setProperty('--blob-2-y', `${b2y}px`);
      root.style.setProperty('--blob-3-x', `${b3x}px`);
      root.style.setProperty('--blob-3-y', `${b3y}px`);
      root.style.setProperty('--veil-x', `${veilX}px`);
      root.style.setProperty('--veil-y', `${veilY}px`);

      rafId = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const resetTarget = () => {
      targetX = width * 0.5;
      targetY = height * 0.45;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      resetTarget();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', resetTarget);
    window.addEventListener('resize', handleResize);
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', resetTarget);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="interactive-wallpaper" aria-hidden="true">
      <div className="interactive-wallpaper__mesh" />
      <div className="interactive-wallpaper__veil" />
      <div className="interactive-wallpaper__blob interactive-wallpaper__blob--one">
        <div className="interactive-wallpaper__blob-shape interactive-wallpaper__blob-shape--one" />
      </div>
      <div className="interactive-wallpaper__blob interactive-wallpaper__blob--two">
        <div className="interactive-wallpaper__blob-shape interactive-wallpaper__blob-shape--two" />
      </div>
      <div className="interactive-wallpaper__blob interactive-wallpaper__blob--three">
        <div className="interactive-wallpaper__blob-shape interactive-wallpaper__blob-shape--three" />
      </div>
    </div>
  );
}
