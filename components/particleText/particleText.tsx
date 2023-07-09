import { useRef } from "react";

import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

import Particle from "../../lib/Particle";
import { resizeCanvas, clearCanvas, darwCanvasText } from "../../lib/canvas";
import { useRouter } from "next/router";

/**
 * Type
 */

export type TextOptionsType = {
  content: string,
  contentCh?: string,
  size: number,
  weight: number | string,
  color: string,
  x: number | string,
  y: number | string,
  align?: {
    x: 'start' | 'center' | 'end',
    y: 'bottom' | 'middle' | 'top',
  }
}

export type MouseType = {
  x: number,
  y: number,
  radius?: number
}

type ParticleTextProps = {
  texts: TextOptionsType[],
  canvasContainer: HTMLDivElement
}

/**
 * Component
 */

const ParticleText = ({ texts, canvasContainer }: ParticleTextProps) => {
  const mouseRadius = 60;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef<MouseType>({ x: 0, y: 0, radius: 0 });

  const router = useRouter();

  // when component mounted, set the canvas animation
  useIsomorphicLayoutEffect(() => {
    if (!texts || !canvasRef.current || !canvasContainer) return;

    const positionTranformedTexts = texts.map(text => {
      const canvasContainerRect = canvasContainer.getBoundingClientRect();

      const hasPercent = new RegExp(/\d+(?=%)/);
      const hasPixel = new RegExp(/(?<=%)[\S]+/);
      // if text = 50 - 123, percent = 0.5, pixel = -123
      const percentX = typeof text.x === 'string' ? parseInt(text.x.trim().match(hasPercent)[0]) / 100 : 0;
      const percentY = typeof text.y === 'string' ? parseInt(text.y.trim().match(hasPercent)[0]) / 100 : 0;
      const pixelX = typeof text.x ===
        'string'
        ? text.x.trim().match(hasPixel)?.[0] === undefined
          ? 0  // if text.x don't have pixel number
          : parseInt(text.x.trim().match(hasPixel)?.[0]) // if text.x have pixel number, turn to the real number
        : text.x; // if text.x === number
      const pixelY = typeof text.y ===
        'string'
        ? text.y.trim().match(hasPixel)?.[0] === undefined
          ? 0
          : parseInt(text.y.trim().match(hasPixel)?.[0])
        : text.y;

      const x = canvasContainerRect.width * percentX + pixelX;
      const y = canvasContainerRect.height * percentY + pixelY;
      return { ...text, x, y }
    });

    // set mouse position
    const mouseMove = (e: MouseEvent) => {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - canvasRect.left;
      mouse.current.y = e.clientY - canvasRect.top;
      mouse.current.radius = mouseRadius;
    }
    // if mouse out the container, let mouse's radius to 0
    const mouseLeave = () => {
      mouse.current.radius = 0;
    }
    canvasRef.current.addEventListener('mousemove', mouseMove);
    canvasRef.current.addEventListener('mouseleave', mouseLeave);

    // Particle text parameter
    let frameId: number;
    const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
    const particles = [];

    // generate Paritcle
    const generateParticle = (canvas: HTMLCanvasElement) => {


      darwCanvasText(canvas, positionTranformedTexts, router.locale);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      // when get the pixels, clear the canvas' text
      clearCanvas(canvas);

      // get the data of canvas' every chunk, the type of gap must be integer 
      const gap = 1;
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = pixels[index + 3];
          // if the chunk has color (means the chunk is not transparnet), create a new particle
          if (alpha > 0) {
            // get every chunk's color and create a new particle
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = `rgb(${red}, ${green}, ${blue})`;
            particles.push(new Particle(ctx, canvas.width, canvas.height, gap, x, y, color))
          }
        }
      }
    }

    // function for update every particles
    const updateParticles = () => {
      particles.forEach(particle => {
        particle.draw();
        particle.encounterMouse(mouse.current);
        particle.update();
      })
    }

    const animate = () => {
      clearCanvas(canvasRef.current) // need clear canvas before update particles
      updateParticles();
      frameId = requestAnimationFrame(animate);
    }

    const init = () => {
      // clear old data
      if (frameId) cancelAnimationFrame(frameId);
      resizeCanvas(canvasRef.current, canvasContainer);

      // clear old particle
      particles.splice(0, particles.length);

      // If google font is ready, generate new particle
      document.fonts.ready.then(() => {
        generateParticle(canvasRef.current);
      })
      animate();
    }

    init();

    return () => {
      cancelAnimationFrame(frameId);
    }

  }, [texts, router.locale])

  return <canvas ref={canvasRef}></canvas>

}

export default ParticleText;