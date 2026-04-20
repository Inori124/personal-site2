'use client';

import { useEffect } from 'react';

export default function InteractiveWallpaper() {
  useEffect(() => {
    const root = document.documentElement;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let targetX = width * 0.5;
    let targetY = height * 0.45;
    
    const applyOffsets = () => {
      const nx = targetX / width - 0.5;
      const ny = targetY / height - 0.5;

      root.style.setProperty('--blob-1-dx', `${nx * 220}px`);
      root.style.setProperty('--blob-1-dy', `${ny * 150}px`);
      root.style.setProperty('--blob-2-dx', `${nx * 280}px`);
      root.style.setProperty('--blob-2-dy', `${ny * 175}px`);
      root.style.setProperty('--blob-3-dx', `${nx * 180}px`);
      root.style.setProperty('--blob-3-dy', `${ny * 210}px`);
      root.style.setProperty('--veil-x', `${nx * 72}px`);
      root.style.setProperty('--veil-y', `${ny * 52}px`);
    };

    const handlePointerMove = (event: PointerEvent | MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      applyOffsets();
    };

    const resetTarget = () => {
      targetX = width * 0.5;
      targetY = height * 0.45;
      applyOffsets();
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      resetTarget();
    };

    applyOffsets();
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', resetTarget);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('pointerleave', resetTarget);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="interactive-wallpaper" aria-hidden="true">
      <div className="interactive-wallpaper__mesh" />
      <div className="interactive-wallpaper__veil">
        <div className="interactive-wallpaper__veil-flow" />
      </div>
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
