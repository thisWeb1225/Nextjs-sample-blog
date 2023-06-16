import { useRef, useEffect } from "react";
import Particle from "./Particle";

export type TextOptions = {
  content: string,
  size: number,
  weight: number | string,
  color: string,
  x: number,
  y: number
}

export type MouseType = {
  x: number,
  y: number,
  radius?: number
}

type Props = {
  fonts: TextOptions[]
}

const ParticleText = ({fonts}: Props) => {
  const mouseRadius = 120;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const mouse = useRef<MouseType>({ x: 0, y: 0, radius: mouseRadius });

  const canvasResize = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    if (!ctx || !canvas.current) return;
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }

  const darwText = (ctx, fonts) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    fonts.forEach((font) => {
      const {content, size, weight, color, x, y} = font
      ctx.fillStyle = color;
      ctx.font = `${weight} ${size}px sans-serif`;
      ctx.fillText(content, x, y);
    })
  }

  // when component mounted, set the canvas animation
  useEffect(() => {
    if (!fonts || !canvas.current) return;

    // set mouse position
    const mouseMove = (e) => {
      const canvasRect = canvas.current.getBoundingClientRect();
      mouse.current.x = e.clientX - canvasRect.left;
      mouse.current.y = e.clientY - canvasRect.top;
      mouse.current.radius = mouseRadius;
    }
    canvas.current.addEventListener('mousemove', mouseMove);
    
    // Parameter
    let frameId;
    ctx.current = canvas.current.getContext('2d', { willReadFrequently: true });
    const particles = [];
  
    // set canvas' width and height
    canvasResize(canvas.current);

    // generate Paritcle
    const generateParticle = (canvas: HTMLCanvasElement) => {
      
      darwText(ctx.current, fonts);
      const pixels = ctx.current.getImageData(0, 0, canvas.width, canvas.height).data;

      // when get the pixels, clear the canvas' text
      clearCanvas(ctx.current)

      // get the data of canvas' every chunk, the type of gap must be integer 
      const gap = 1;
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 0) {
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = `rgb(${red}, ${green}, ${blue})`;
            particles.push(new Particle(ctx.current, canvas.width, canvas.height, gap, x, y, color))
          }
        }
      }
      for (let i = 0; i < 5000; i ++) {
        particles.push(new Particle(ctx.current, canvas.width, canvas.height, gap, Math.random() * canvas.width , Math.random() * canvas.height, '#147dfa'))
      }
    }

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
      canvasResize(canvas.current);
      clearCanvas(ctx.current);

      // clear old particle
      particles.splice(0, particles.length);

      // generate new particle
      generateParticle(canvas.current);
      animate();
    }

    init();
    window.addEventListener('resize', init)

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(frameId);
    }

  }, [canvas, fonts])

  return <canvas ref={canvas}></canvas>

}

export default ParticleText;