const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const gravity = 0.2;

  class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * -10 - 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.radius = 4;
        this.alpha = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += gravity;
        this.alpha -= 0.005;

        if (this.alpha <= 0) {
            fireworks.splice(fireworks.indexOf(this), 1);
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createFirework() {
  const firework = new Firework();
  fireworks.push(firework);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.03) {
      createFirework();
  }

  fireworks.forEach(firework => {
      firework.update();
      firework.draw();
  });
}

animate();

function showFireworks() {
  const birthdayMessage = document.getElementById('birthdayMessage');
  birthdayMessage.style.display = 'block';

  canvas.style.display = 'block';
  const cakeImage = document.getElementById('cake');
  cakeImage.style.display = 'none';
}