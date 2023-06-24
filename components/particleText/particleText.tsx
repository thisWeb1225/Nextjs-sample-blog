import { useRef, useEffect } from "react";

import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

import Particle from "../../lib/Particle";
import { resizeCanvas, clearCanvas, darwCanvasText } from "../../lib/canvas";
import isDeviceMobile from "../../lib/isDeviceMobile";

/**
 * Type
 */

export type textOptionsType = {
  content: string,
  size: number,
  weight: number | string,
  color: string,
  x: number,
  y: number,
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
  texts: textOptionsType[],
  canvasContainer: HTMLElement
}

/**
 * Component
 */

const ParticleText = ({ texts, canvasContainer }: ParticleTextProps) => {
  const mouseRadius = 60;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const mouse = useRef<MouseType>({ x: 0, y: 0, radius: 0 });

  // when component mounted, set the canvas animation
  useIsomorphicLayoutEffect(() => {
    if (!texts || !canvasRef.current) return;

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
    ctx.current = canvasRef.current.getContext('2d', { willReadFrequently: true });
    const particles = [];

    // To prevent scrolling on mobile and trigger the "init()" function when the navigation bar is hidden
    // we need set the variable to store initWidth/Height
    const initWidth = window.innerWidth, initHeight = window.innerHeight;

    // generate Paritcle
    const generateParticle = (canvas: HTMLCanvasElement) => {

      darwCanvasText(canvas, ctx.current, texts);
      const pixels = ctx.current.getImageData(0, 0, canvas.width, canvas.height).data;

      // when get the pixels, clear the canvas' text
      clearCanvas(ctx.current, canvas);

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
            particles.push(new Particle(ctx.current, canvas.width, canvas.height, gap, x, y, color))
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
      clearCanvas(ctx.current, canvasRef.current) // need clear canvas before update particles
      updateParticles();
      frameId = requestAnimationFrame(animate);
    }

    const init = () => {
      // clear old data
      if (frameId) cancelAnimationFrame(frameId);
      resizeCanvas(canvasRef.current, canvasContainer);

      // clear old particle
      particles.splice(0, particles.length);

      // generate new particle
      generateParticle(canvasRef.current);
      animate();
    }

    init();

    const resizeInit = () =>  {
      // if is mobile and the height was change, it is mean the nav be hidden, so don't do anything 
      if (isDeviceMobile() && initHeight !== window.innerHeight) return;
      init();
    }
    window.addEventListener('resize', resizeInit);

    return () => {
      window.removeEventListener('resize', resizeInit);
      cancelAnimationFrame(frameId);
    }

  }, [canvasRef.current, texts])

  return <canvas ref={canvasRef}></canvas>

}

export default ParticleText;