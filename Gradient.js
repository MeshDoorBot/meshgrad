
// Gradient.js - Local version from whatamesh
export class Gradient {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.points = [];
    this.animationFrameId = null;
  }

  initGradient(selector) {
    this.canvas = document.querySelector(selector);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.generatePoints();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generatePoints() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.points = Array.from({ length: 10 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 100 + Math.random() * 100,
      dx: -1 + Math.random() * 2,
      dy: -1 + Math.random() * 2
    }));
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalAlpha = 0.5;

    this.points.forEach(p => {
      const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, 'rgba(255, 0, 150, 0.5)');
      grad.addColorStop(1, 'rgba(0, 150, 255, 0)');
      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      this.ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > this.canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.dy *= -1;
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
