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

type Props = {
  fonts: TextOptions[]
}

const ParticleText = ({fonts}: Props) => {
  const mouseRadius = 120;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const mousePosition = useRef({ x: 0, y: 0, radius: mouseRadius });


  useEffect(() => {
    if (!fonts) return;

    // set mouse position
    const mouseMove = (e) => {
      const canvasRect = canvas.current.getBoundingClientRect();
      mousePosition.current.x = e.clientX - canvasRect.left;
      mousePosition.current.y = e.clientY - canvasRect.top;
      mousePosition.current.radius = mouseRadius;
    }
    canvas.current.addEventListener('mousemove', mouseMove);
    
    // Parameter
    let frameId;
    const ctx = canvas.current.getContext('2d', { willReadFrequently: true });
    const { width, height } = canvas.current;
    const particles = [];

    /**
     * canvas function
     */
    const canvasResize = () => {
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;
    }

    const clearCanvas = () => {
      ctx.clearRect(0, 0, width, height);
    }

    const generateParticle = () => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      fonts.forEach((font) => {
        const {content, size, weight, color, x, y} = font
        ctx.fillStyle = color;
        ctx.font = `${weight} ${size}px sans-serif`;
        ctx.fillText(content, x, y);
      })

      const pixels = ctx.getImageData(0, 0, width, height).data;

      // when get the pixels, clear the canvas' text
      clearCanvas()

      // get the data of canvas' every chunk, the type of gap must be integer 
      const gap = 1;
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 0) {
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = `rgb(${red}, ${green}, ${blue})`;
            particles.push(new Particle(ctx, width, height, gap, x, y, color, mousePosition.current))
          }
        }
      }
    }

    const render = () => {
      particles.forEach(particle => {
        particle.draw();
        particle.update();
      })
    }

    const animate = () => {
      clearCanvas() // every frame need clear all canvas first
      render();
      frameId = requestAnimationFrame(animate);
    }

    const init = () => {
      if (frameId) cancelAnimationFrame(frameId);
      // clear old data
      canvasResize();
      clearCanvas();
      particles.splice(0, particles.length);

      // generate new particle
      generateParticle();
      animate();
    }

    if (canvas.current) {
      window.addEventListener('resize', init)
      init();
    }

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(frameId);
      clearCanvas();
    }

  }, [canvas, fonts])

  return <canvas className="w-screen h-screen" ref={canvas}></canvas>

}

export default ParticleText;