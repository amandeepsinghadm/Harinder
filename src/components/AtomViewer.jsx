import React, { useRef, useEffect, useMemo } from 'react';

/**
 * Pure Canvas 2D Atom Viewer — no Three.js dependency issues.
 * Draws nucleus, electron shells, orbiting electrons with glow effects.
 */
const AtomViewer = ({ shells = [2], symbol = '?' }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const electronData = useMemo(() => {
    const data = [];
    shells.forEach((count, shellIdx) => {
      for (let i = 0; i < count; i++) {
        data.push({
          shell: shellIdx,
          angle: (i * (Math.PI * 2)) / count + Math.random() * 0.5,
          speed: (0.6 + Math.random() * 0.4) * (1 / (shellIdx + 1)),
          tilt: (Math.random() - 0.5) * 0.4,
        });
      }
    });
    return data;
  }, [shells]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * 2; // Retina
      canvas.height = rect.height * 2;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.016;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = Math.min(w, h) * 0.12;

      ctx.clearRect(0, 0, w, h);

      // Starfield
      for (let i = 0; i < 60; i++) {
        const sx = ((i * 137.508 + time * 2) % w);
        const sy = ((i * 251.137) % h);
        const brightness = 0.15 + Math.sin(time * 0.5 + i) * 0.1;
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.fillRect(sx, sy, 1, 1);
      }

      // Orbit rings
      shells.forEach((_, idx) => {
        const r = baseRadius * (idx + 1.5);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 255, ${0.06 + idx * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dashed ring for depth
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.35, 0.3 + idx * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(112, 0, 255, ${0.04})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Nucleus glow
      const nucleusGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 0.8);
      nucleusGrad.addColorStop(0, 'rgba(0, 242, 255, 0.5)');
      nucleusGrad.addColorStop(0.3, 'rgba(0, 242, 255, 0.15)');
      nucleusGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nucleusGrad;
      ctx.fillRect(0, 0, w, h);

      // Nucleus core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 0.35);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.2, '#00f2ff');
      coreGrad.addColorStop(0.6, 'rgba(0, 242, 255, 0.4)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Symbol in nucleus
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = `bold ${baseRadius * 0.35}px Orbitron, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol, cx, cy);

      // Electrons
      electronData.forEach((e) => {
        const r = baseRadius * (e.shell + 1.5);
        const angle = e.angle + time * e.speed;
        const ex = cx + Math.cos(angle) * r;
        const ey = cy + Math.sin(angle) * r * (0.6 + e.tilt);

        // Electron trail
        for (let t = 1; t <= 5; t++) {
          const ta = angle - t * 0.08;
          const tx = cx + Math.cos(ta) * r;
          const ty = cy + Math.sin(ta) * r * (0.6 + e.tilt);
          ctx.beginPath();
          ctx.arc(tx, ty, 3 - t * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(112, 0, 255, ${0.15 - t * 0.025})`;
          ctx.fill();
        }

        // Electron glow
        const elGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, 12);
        elGrad.addColorStop(0, 'rgba(112, 0, 255, 0.6)');
        elGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = elGrad;
        ctx.fillRect(ex - 12, ey - 12, 24, 24);

        // Electron core
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#c084fc';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [electronData, symbol]);

  return (
    <div className="w-full h-full relative atom-canvas">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AtomViewer;
