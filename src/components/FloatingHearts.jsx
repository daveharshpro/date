import React, { useEffect, useRef } from 'react';

export const FloatingHearts = ({ intensity = 'normal' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles count based on intensity
    const particleCount = intensity === 'high' ? 45 : intensity === 'low' ? 15 : 28;

    const hearts = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 8,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.25,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: Math.random() > 0.4 ? '#FF7597' : Math.random() > 0.5 ? '#FF4D6D' : '#FFB3C1',
      isParticle: Math.random() > 0.7
    }));

    function drawHeart(x, y, size, opacity, color, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const d = size;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
      ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    function drawSparkle(x, y, size, opacity, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      hearts.forEach((item) => {
        item.y -= item.speedY;
        item.x += Math.sin(item.y * 0.01) * 0.5 + item.speedX;
        item.rotation += item.rotationSpeed;

        if (item.y < -30) {
          item.y = height + 20;
          item.x = Math.random() * width;
        }
        if (item.x < -20) item.x = width + 20;
        if (item.x > width + 20) item.x = -20;

        if (item.isParticle) {
          drawSparkle(item.x, item.y, item.size, item.opacity, item.color);
        } else {
          drawHeart(item.x, item.y, item.size, item.opacity, item.color, item.rotation);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};
