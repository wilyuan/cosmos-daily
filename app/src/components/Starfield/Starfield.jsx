import { useEffect, useRef } from 'react';

const STAR_COUNT = 220;

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:             Math.random() * canvas.width,
      y:             Math.random() * canvas.height,
      r:             Math.random() < 0.25 ? 0.9 : 0.5,
      baseOpacity:   Math.random() * 0.4 + 0.2,
      speed:         Math.random() * 2.5 + 1.5,
      phase:         Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = timestamp / 1000;

      stars.forEach(s => {
        const opacity = s.baseOpacity * (0.65 + 0.35 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const onResize = () => {
      setSize();
      // redistribute stars on resize
      stars.forEach(s => {
        s.x = Math.random() * canvas.width;
        s.y = Math.random() * canvas.height;
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
