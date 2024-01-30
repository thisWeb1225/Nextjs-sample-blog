// Libs
import Particle from '../../lib/Particle';
import { resizeCanvas, clearCanvas, drawCanvasText } from '../../lib/canvas';
// Hook
import { useRef, useEffect, useMemo } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useRouter } from 'next/router';
import { useInView } from 'framer-motion';
// Type
import { MouseEventHandler } from 'react';

/**
 * * Type
 */

export type TextOptionsType = {
  content: string;
  contentCh?: string;
  size: number;
  weight: number | string;
  color: string;
  x: number | string;
  y: number | string;
  align?: {
    x: 'start' | 'center' | 'end';
    y: 'bottom' | 'middle' | 'top';
  };
};

export type MouseType = {
  x: number;
  y: number;
  radius?: number;
};

type ParticleTextProps = {
  texts: TextOptionsType[];
  canvasContainer: HTMLDivElement;
};

/**
 * * Component
 */

const GAP = 1;
const MOUSE_RADIUS = 60;

const ParticleText = ({ texts, canvasContainer }: ParticleTextProps) => {
  console.log(texts)

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef<MouseType>({ x: 0, y: 0, radius: 0 });
  const particles = useRef<Particle[]>([]);
  const frameId = useRef<number | undefined>(undefined);

  const router = useRouter();
  const { windowWidth, isMobile } = useWindowWidth();

  const isInView = useInView(canvasRef, { once: true });

  const positionTransformedTexts = texts.map((text) => {
    const canvasContainerRect = canvasContainer.getBoundingClientRect();

    const hasPercent = new RegExp(/\d+%/, 'g');
    const hasPixel = new RegExp(/([-+]\d+)|(\d+)(?![\S%])/, 'g');
    // if text = 50% - 123, percent = 0.5, pixel = -123
    const percentX =
      typeof text.x === 'string'
        ? parseInt(text.x.trim().match(hasPercent)[0]) / 100
        : 0;
    const percentY =
      typeof text.y === 'string'
        ? parseInt(text.y.trim().match(hasPercent)[0]) / 100
        : 0;
    const pixelX =
      typeof text.x === 'string'
        ? text.x.trim().match(hasPixel)?.[0] === undefined
          ? 0 // if text.x don't have pixel number
          : parseInt(text.x.trim().match(hasPixel)?.[0]) // if text.x have pixel number, turn to the real number
        : text.x; // if text.x === number
    const pixelY =
      typeof text.y === 'string'
        ? text.y.trim().match(hasPixel)?.[0] === undefined
          ? 0
          : parseInt(text.y.trim().match(hasPixel)?.[0])
        : text.y;

    const x = canvasContainerRect.width * percentX + pixelX;
    const y = canvasContainerRect.height * percentY + pixelY;
    return { ...text, x, y };
  });

  const mouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - canvasRect.left;
    mouse.current.y = e.clientY - canvasRect.top;
    mouse.current.radius = MOUSE_RADIUS;
  };
  // if mouse out the container, let mouse's radius to 0
  const mouseLeave = () => {
    mouse.current.radius = 0;
  };

  // when component mounted, set the canvas animation
  useEffect(() => {
    if (!texts || !canvasRef.current || !canvasContainer || !isInView) return;

    // Particle text parameter
    const ctx = canvasRef.current.getContext('2d', {
      willReadFrequently: true,
    });

    // generate Particle
    const generateParticle = (canvas: HTMLCanvasElement) => {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      // when get the pixels, clear the canvas' text
      clearCanvas(canvas);

      // get the data of canvas' every chunk, the type of gap must be integer
      for (let y = 0; y < canvas.height; y += GAP) {
        for (let x = 0; x < canvas.width; x += GAP) {
          const index = (y * canvas.width + x) * 4;
          const alpha = pixels[index + 3];
          // if the chunk has color (means the chunk is not transparent), create a new particle
          if (alpha > 0) {
            // get every chunk's color and create a new particle
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = `rgb(${red}, ${green}, ${blue})`;
            particles.current.push(
              new Particle(ctx, canvas.width, canvas.height, GAP, x, y, color)
            );
          }
        }
      }
    };

    // function for update every particles
    const updateParticles = () => {
      particles.current.forEach((particle) => {
        particle.draw();
        particle.encounterMouse(mouse.current);
        particle.update();
      });
    };

    const animate = () => {
      clearCanvas(canvasRef.current); // need clear canvas before update particles
      updateParticles();

      frameId.current = requestAnimationFrame(animate);
    };

    const init = () => {
      // clear old data
      if (frameId.current) cancelAnimationFrame(frameId.current);
      resizeCanvas(canvasRef.current, canvasContainer);

      // clear old particle
      particles.current.splice(0, particles.current.length);

      // If google font is ready, draw canvas and generate new particle and animate
      document.fonts.ready.then(() => {
        drawCanvasText(
          canvasRef.current,
          positionTransformedTexts,
          router.locale
        );

        // if is mobile or not in view, don't need animation
        if (!isMobile || !isInView) {
          generateParticle(canvasRef.current);
          animate();
        }
      });
    };

    init();

    return () => {
      cancelAnimationFrame(frameId.current);
    };
  }, [
    isInView,
    texts,
    router.locale,
    windowWidth,
    canvasRef.current,
    canvasContainer,
  ]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
    ></canvas>
  );
};

export default ParticleText;
