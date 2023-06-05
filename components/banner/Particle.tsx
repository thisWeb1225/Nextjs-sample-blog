import { MouseType } from "./particleText";

/**
 * Particle object
 */
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

  constructor(ctx, canvasWidth, canvasHeight, gap, x, y, color) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.size = gap;
    this.dx = 0; // delta with mouse
    this.dy = 0;
    this.vx = 0; // the force of mouse push
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.05;
    this.ease = Math.random() * 0.1 + 0.01;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  update() {
    this.vx *= this.friction; // let the vx and vy slow
    this.vy *= this.friction;
    this.x += this.vx + (this.originX - this.x) * this.ease;
    this.y += this.vy + (this.originY - this.y) * this.ease;
  }

  encounterMouse(mouse: MouseType) {
    this.dx = mouse.x - this.x;
    this.dy = mouse.y - this.y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.force = -(mouse.radius / this.distance) * 20;

    if (this.distance < mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx = this.force * Math.cos(this.angle);
      this.vy = this.force * Math.sin(this.angle);
    }
  }
}

export default Particle;
