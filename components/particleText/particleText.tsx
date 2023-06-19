import { useRef, useEffect } from "react";
import Particle from "../../lib/Particle";

export type textOptionsType = {
  content: string,
  size: number,
  weight: number | string,
  color: string,
  x: number,
  y: number,
  center?: {
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

const ParticleText = ({texts, canvasContainer}: ParticleTextProps) => {
  const mouseRadius = 80;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const mouse = useRef<MouseType>({ x: 0, y: 0, radius: 0 });

  const canvasResize = (canvas: HTMLCanvasElement, canvasContainer: HTMLElement) => {
    if (canvasContainer) {
      const containerRect = canvasContainer.getBoundingClientRect();
      canvas.width = containerRect.width;
      canvas.height = containerRect.height;
    } else {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
    
  }

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    if (!ctx || !canvas.current) return;
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }

  const darwText = (ctx: CanvasRenderingContext2D, texts: textOptionsType[]) => {

    texts.forEach((text) => {
      const {content, size, weight, color, x, y, center} = text;

      ctx.textAlign = center?.x || 'center';
      ctx.textBaseline = center?.y || 'middle';

      ctx.fillStyle = color;
      ctx.font = `${weight} ${size}px Inter`;
      ctx.fillText(content, x, y);
    })
  }

  // when component mounted, set the canvas animation
  useEffect(() => {
    if (!texts || !canvas.current) return;

    // set mouse position
    const mouseMove = (e) => {
      const canvasRect = canvas.current.getBoundingClientRect();
      mouse.current.x = e.clientX - canvasRect.left;
      mouse.current.y = e.clientY - canvasRect.top;
      mouse.current.radius = mouseRadius;
    }
    // if mouse out the container
    const mouseLeave = () => {
      mouse.current.radius = 0;
    }
    canvas.current.addEventListener('mousemove', mouseMove);
    canvas.current.addEventListener('mouseleave', mouseLeave);
    
    // Parameter
    let frameId: number;
    ctx.current = canvas.current.getContext('2d', { willReadFrequently: true });
    const particles = [];
  
    // set canvas' width and height
    canvasResize(canvas.current, canvasContainer);

    // generate Paritcle
    const generateParticle = (canvas: HTMLCanvasElement) => {
      
      darwText(ctx.current, texts);
      const pixels = ctx.current.getImageData(0, 0, canvas.width, canvas.height).data;

      // when get the pixels, clear the canvas' text
      clearCanvas(ctx.current)

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

    // update every particles
    const updateParticles = () => {
      particles.forEach(particle => {
        particle.draw();
        particle.encounterMouse(mouse.current);
        particle.update();
      })
    }

    const animate = () => {
      clearCanvas(ctx.current) // need clear canvas before update particle
      updateParticles();
      frameId = requestAnimationFrame(animate);
    }

    const init = () => {
      if (frameId) cancelAnimationFrame(frameId);
      // clear old data
      canvasResize(canvas.current, canvasContainer);
      clearCanvas(ctx.current);

      // clear old particle
      particles.splice(0, particles.length);

      // generate new particle
      generateParticle(canvas.current);
      animate();
    }

    init();
    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(frameId);
    }

  }, [canvas, texts])

  return <canvas ref={canvas}></canvas>

}

export default ParticleText;