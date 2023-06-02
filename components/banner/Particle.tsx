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

export default Particle;
