import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from "react";


class Particle {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  gap: number;
  x: number;
  y: number;
  color: string;
  originX: number;
  originY: number;
  size: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  force: number;
  angle: number;
  distance: number;
  friction: number;
  ease: number;
  mouse: {
    x: number,
    y: number,
    radius: number
  }

  constructor(ctx, canvasWidth, canvasHeight, gap, x, y, color, mousePosition) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.size = gap;
    this.dx = 0
    this.dy = 0
    this.vx = 0
    this.vy = 0
    this.force = 0
    this.angle = 0;
    this.distance = 0
    this.friction = Math.random() * 0.6 + 0.2;
    this.ease = Math.random() * 0.1 + 0.04;
    this.mouse = mousePosition;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  update() {
    this.dx = this.mouse.x - this.x;
    this.dy = this.mouse.y - this.y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.force = -this.mouse.radius / this.distance;

    if (this.distance < this.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}

const Banner = () => {

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const mousePosition = useRef({ x: 0, y: 0, radius: 100 });

  // set mouse position
  useEffect(() => {
    const mouseMove = (e) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
      mousePosition.current.radius = 100;
    }
    canvas.current.addEventListener('mousemove', mouseMove)
  }, [canvas])


  useEffect(() => {
    /**
     * Parameter
     */
    let frameId;
    const ctx = canvas.current.getContext('2d', {willReadFrequently:true});
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
      const title = 'Hello, I am Yang';
      const content1 = 'I am a front-end developer'
      const content2 = 'I will make your website unique'
      const textX = window.innerWidth / 2;
      const textY = window.innerHeight / 2;

      ctx.fillStyle = '#2ecce0';
      ctx.font = "120px Sans-Serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(title, textX, textY);

      ctx.fillStyle = '#ffffff';
      ctx.font = "24px poppins";
      ctx.fillText(content1, textX, textY + 160);
      ctx.fillText(content2, textX, textY + 200);
      const pixels = ctx.getImageData(0, 0, width, height).data;

      // when get the pixels, clear the text
      ctx.clearRect(0, 0, width, height);

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
      ctx.clearRect(0, 0, width, height);
      render();
      frameId = requestAnimationFrame(animate);
    }

    const init = () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (canvas.current) {
        // clear old data
        canvasResize();
        clearCanvas();
        particles.splice(0, particles.length);

        // generate new particle
        generateParticle();
        animate();
      }
    }

    if (canvas.current) {
      window.addEventListener('resize', init)
      init();
    }

    return () => {
      if (canvas.current) {
        window.removeEventListener('resize', init);
      }
      cancelAnimationFrame(frameId);
      clearCanvas();
    }

  }, [canvas])

  return (
    // <div className="min-h-screen flex justify-center items-center">
    //   <div className="text-center grid gap-8">
    //     <h2 className="text-3xl font-bold">Hello, I am Kun Yang</h2>
    //     <p>Make your brand website unique</p>
    //   </div>
    // </div>

    <canvas className="w-screen h-screen" ref={canvas}></canvas>

  )
}

export default Banner;