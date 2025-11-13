document.addEventListener('DOMContentLoaded', ()=>{

  // Link transitions: for full-page navigation (non-anchor)
  document.querySelectorAll('.navbar a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      // allow internal same-page anchors
      if (href.startsWith('#')) return;
      e.preventDefault();
      document.body.style.transition = 'opacity .45s ease';
      document.body.style.opacity = '0';
      setTimeout(()=> location.href = href, 460);
    });
  });

  // Fade-in on load
  document.body.style.opacity = '0';
  setTimeout(()=> { document.body.style.transition = 'opacity .45s ease'; document.body.style.opacity = '1'; }, 50);

  /* ------------------ Sakura Canvas ------------------ */
  const canvas = document.getElementById('sakuraCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  addEventListener('resize', resize); resize();

  class Petal {
    constructor(){
      this.x = Math.random()*canvas.width;
      this.y = Math.random()*canvas.height - canvas.height;
      this.size = (Math.random()*8)+3;
      this.speed = (Math.random()*1.6)+0.5;
      this.rotation = Math.random()*Math.PI*2;
      this.rotSpeed = (Math.random()-0.5)*0.02;
      this.osc = Math.random()*2 + 0.5;
      this.alpha = 0.75 + Math.random()*0.25;
      this.wind = (Math.random()-0.5)*0.6;
    }
    update(){
      this.x += Math.sin(this.y / 40) * this.osc * 0.6 + this.wind;
      this.y += this.speed;
      this.rotation += this.rotSpeed;
      if(this.y > canvas.height + 20){
        this.y = -20;
        this.x = Math.random()*canvas.width;
      }
    }
    draw(){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.quadraticCurveTo(this.size*0.6, -this.size*0.4, this.size, 0);
      ctx.quadraticCurveTo(this.size*0.1, this.size*0.9, 0, 0);
      ctx.closePath();
      ctx.fillStyle = `rgba(255,182,193, ${this.alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  let petals = [];
  function initPetals(n=90){
    petals = [];
    for(let i=0;i<n;i++) petals.push(new Petal());
  }
  initPetals();

  function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let p of petals){ p.update(); p.draw(); }
    requestAnimationFrame(loop);
  }
  loop();

  // subtle parallax for header avatar
  const avatar = document.querySelector('.avatar-wrap');
  if(avatar){
    document.addEventListener('mousemove',(e)=>{
      const cx = innerWidth/2, cy = innerHeight/2;
      const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      avatar.style.transform = `translate(${dx*6}px, ${dy*6}px) scale(1.01)`;
    });
    document.addEventListener('mouseleave', ()=> avatar.style.transform = '');
  }
});
