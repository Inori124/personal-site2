'use client';

import { useEffect } from 'react';

export default function InteractiveWallpaper() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const setPosition = (x: number, y: number) => {
      root.style.setProperty('--wallpaper-x', `${x}px`);
      root.style.setProperty('--wallpaper-y', `${y}px`);
    };

    const move = (x: number, y: number) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPosition(x, y));
    };

    const handlePointerMove = (event: PointerEvent) => {
      move(event.clientX, event.clientY);
    };

    const resetToCenter = () => {
      setPosition(window.innerWidth / 2, window.innerHeight * 0.35);
    };

    resetToCenter();
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    window.addEventListener('resize', resetToCenter);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resetToCenter);
    };
  }, []);

  return (
    <div className="interactive-wallpaper" aria-hidden="true">
      <div className="interactive-wallpaper__mesh" />
      <div className="interactive-wallpaper__orb" />
      <div className="interactive-wallpaper__ring interactive-wallpaper__ring--one" />
      <div className="interactive-wallpaper__ring interactive-wallpaper__ring--two" />
    </div>
  );
}
