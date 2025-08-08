document.querySelector('.ripple-button').addEventListener('click', function (e) {
  const circle = document.createElement('span');
  const diameter = Math.max(this.clientWidth, this.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
  circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
  const ripple = this.querySelector('span');
  if (ripple) ripple.remove();
  this.appendChild(circle);
});

const button = document.querySelector('.ripple-button');
button.style.position = 'relative';
button.style.overflow = 'hidden';
button.style.background = 'linear-gradient(145deg, #232946 60%, #121629 100%)';
button.style.boxShadow = '0 8px 24px #12162988, 0 1.5px 0 #fff2 inset';
button.style.color = '#fff';
button.style.border = 'none';
button.style.borderRadius = '22px';
button.style.fontSize = '1.2rem';
button.style.padding = '22px 56px';
button.style.letterSpacing = '1px';
button.style.cursor = 'pointer';
button.style.transition = 'box-shadow 0.2s, transform 0.2s';

// Style the button text using a span for animated gradient
button.style.fontFamily = "'Orbitron', 'Segoe UI', Arial, sans-serif";
button.style.fontWeight = '700';
button.style.textTransform = 'uppercase';

// Move text content into a span for gradient animation
let textSpan = button.querySelector('.button-text-gradient');
if (!textSpan) {
  textSpan = document.createElement('span');
  textSpan.className = 'button-text-gradient';
  textSpan.textContent = button.textContent;
  button.textContent = '';
  button.appendChild(textSpan);
}
textSpan.style.display = 'inline-block';
textSpan.style.backgroundClip = 'text';
textSpan.style.webkitBackgroundClip = 'text';
textSpan.style.webkitTextFillColor = 'transparent';
textSpan.style.textShadow = '0 2px 8px #fff8, 0 1px 0 #f5d76e, 0 0 16px #232946cc';
textSpan.style.backgroundImage = 'linear-gradient(90deg, #fffbe6 0%, #f5d76e 50%, #fffbe6 100%)';
textSpan.style.backgroundSize = '200% 100%';
textSpan.style.backgroundPosition = '0% 0%';
textSpan.style.transition = 'text-shadow 0.2s';

// Animate gradient moving to right in text
let gradPos = 0;
function animateTextGradient() {
  gradPos += 0.8;
  if (gradPos > 100) gradPos = 0;
  textSpan.style.backgroundPosition = `${gradPos}% 0%`;
  requestAnimationFrame(animateTextGradient);
}
animateTextGradient();

// Animate text glow on hover (only shadow, keep gradient always)
button.addEventListener('mouseenter', () => {
  button.style.boxShadow = '0 20px 40px #121629cc, 0 2.5px 0 #fff3 inset';
  button.style.transform = 'translateY(-4px) scale(1.03)';
  textSpan.style.textShadow = 'none';
});
button.addEventListener('mouseleave', () => {
  button.style.boxShadow = '0 8px 24px #12162988, 0 1.5px 0 #fff2 inset';
  button.style.transform = 'none';
  textSpan.style.textShadow = '0 2px 8px #fff8, 0 1px 0 #f5d76e, 0 0 16px #232946cc';
});

// Create moon (more realistic: add craters and subtle shadow)
const moon = document.createElement('div');
moon.style.position = 'absolute';
moon.style.width = '38px';
moon.style.height = '38px';
moon.style.borderRadius = '50%';
moon.style.background = 'radial-gradient(circle at 14px 14px, #fffbe6 70%, #f5d76e 100%)';
moon.style.top = '18px';
moon.style.left = '22px';
moon.style.boxShadow = '0 0 22px 8px #fffbe6cc, 0 6px 18px #f5d76e77 inset, 6px 8px 18px #23294644';
moon.style.zIndex = '2';
moon.classList.add('moon-3d');

// Add craters to moon
for (let i = 0; i < 4; i++) {
  const crater = document.createElement('div');
  crater.style.position = 'absolute';
  crater.style.borderRadius = '50%';
  crater.style.background = 'rgba(220,210,160,0.22)';
  crater.style.width = `${6 + Math.random() * 5}px`;
  crater.style.height = crater.style.width;
  crater.style.left = `${12 + Math.random() * 14}px`;
  crater.style.top = `${10 + Math.random() * 12}px`;
  crater.style.boxShadow = '0 1px 2px #bcae7a44 inset';
  moon.appendChild(crater);
}
button.appendChild(moon);

// Create stars (more realistic: twinkle, color variation, glow)
const starCount = 16;
const stars = [];
for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.style.position = 'absolute';
  const size = Math.random() * 2.5 + 3.5;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.borderRadius = '50%';
  // Subtle color variation for realism
  const color = Math.random() > 0.7 ? '#ffeebb' : '#fff';
  star.style.background = color;
  star.style.opacity = Math.random() * 0.5 + 0.5;
  star.style.top = `${Math.random() * 60 + 10}px`;
  star.style.left = `${Math.random() * 120 + 48}px`;
  // Glow effect
  star.style.boxShadow = `0 0 ${6 + Math.random() * 10}px 2px ${color}cc, 0 0 2px 1px #fff8`;
  star.classList.add('star-3d');
  button.appendChild(star);
  stars.push(star);
}

// Animate moon and stars in realistic 3D motion
let angle = 0;
function animate3D() {
  angle += 0.012;
  // Moon: elliptical orbit, subtle tilt, and shadow movement
  const moonX = 8 * Math.cos(angle * 0.8);
  const moonY = 6 * Math.sin(angle * 0.7);
  moon.style.transform = `
    translate3d(${moonX}px, ${moonY}px, 18px)
    rotateY(${Math.sin(angle) * 14}deg)
    rotateX(${Math.cos(angle * 1.2) * 10}deg)
    scale(${1 + Math.sin(angle) * 0.04})
  `;
  moon.style.boxShadow = `0 0 22px 8px #fffbe6cc, ${6 + Math.sin(angle)*4}px 8px 18px #23294644`;

  // Animate craters for subtle parallax
  Array.from(moon.children).forEach((crater, i) => {
    crater.style.transform = `translateY(${Math.sin(angle + i) * 1.5}px) scale(${0.95 + Math.abs(Math.sin(angle + i*2))*0.08})`;
  });

  // Stars: different orbits, depths, twinkle, and color flicker
  stars.forEach((star, i) => {
    const orbit = 26 + i * 7;
    const depth = 10 + Math.sin(angle * (1.1 + i * 0.07)) * 8;
    const starAngle = angle * (1 + i * 0.07) + i;
    const x = Math.cos(starAngle) * orbit;
    const y = Math.sin(starAngle) * orbit * 0.5;
    // Twinkle and color flicker
    const twinkle = 0.85 + Math.abs(Math.sin(angle * 2.2 + i * 1.7)) * 0.35;
    const blur = Math.abs(Math.sin(angle * 2 + i)) * 0.7;
    const hue = 50 + Math.sin(angle * 1.5 + i) * 10;
    star.style.transform = `
      translate3d(${x}px, ${y}px, ${depth}px)
      scale(${twinkle})
    `;
    star.style.filter = `blur(${blur}px) brightness(${1 + twinkle * 0.2})`;
    if (star.style.background === '#ffeebb') {
      star.style.background = `hsl(${hue}, 90%, 90%)`;
      star.style.boxShadow = `0 0 ${8 + twinkle * 8}px 2px hsl(${hue}, 90%, 90%)cc, 0 0 2px 1px #fff8`;
    }
  });
  requestAnimationFrame(animate3D);
}
animate3D();

const bubbleCount = 130; // Even more bubbles for celebration
const bubbles = [];
const burstSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e3e3e.mp3'); // royalty-free pop sound

// Create a container for bubbles
const bubbleContainer = document.createElement('div');
bubbleContainer.style.position = 'fixed';
bubbleContainer.style.top = '0';
bubbleContainer.style.left = '0';
bubbleContainer.style.width = '100vw';
bubbleContainer.style.height = '100vh';
bubbleContainer.style.pointerEvents = 'auto';
bubbleContainer.style.zIndex = '9999';
bubbleContainer.style.overflow = 'hidden';
document.body.appendChild(bubbleContainer);

// Helper for random dark color (not black, but deep blue/purple/green shades)
function randomBubbleColor() {
  const colors = [
    '#00FFFF',   // deep blue
    '#F5F5DC',   // dark purple
    '#a4ff49ff',   // blue-grey
    '#4000ffff',   // dark green
    '#ff00d4ff',   // blue-purple
    '#8557efff',   // slate
    '#ff0048ff'    // muted dark
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Track how many bubbles have been burst
let burstCount = 0;
const minBurstToReveal = 40;

// Create bubbles
for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement('div');
  const size = Math.random() * 48 + 150;
  bubble.style.position = 'absolute';
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.borderRadius = '50%';
  bubble.style.background = randomBubbleColor();
  bubble.style.boxShadow = `0 0 24px 8px #a5a0a0cc, 0 2px 8px #ffffff88 inset`;
  bubble.style.top = `${Math.random() * 85 + 2}vh`;
  bubble.style.left = `${Math.random() * 95}vw`;
  bubble.style.opacity = '0.98';
  bubble.style.transition = 'transform 0.2s, opacity 0.2s';
  bubble.style.cursor = 'pointer';
  bubble.style.zIndex = '10000';
  // Add a subtle highlight
  const highlight = document.createElement('div');
  highlight.style.position = 'absolute';
  highlight.style.top = '14%';
  highlight.style.left = '20%';
  highlight.style.width = '28%';
  highlight.style.height = '20%';
  highlight.style.borderRadius = '50%';
  highlight.style.background = 'rgba(255,255,255,0.08)';
  bubble.appendChild(highlight);

  // Animate floating
  const floatDuration = Math.random() * 2 + 3;
  bubble.animate([
    { transform: `translateY(0px) scale(1)` },
    { transform: `translateY(-${Math.random() * 60 + 40}px) scale(${1 + Math.random() * 0.08})` },
    { transform: `translateY(0px) scale(1)` }
  ], {
    duration: floatDuration * 1000,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  });

  // Bubble burst handler
  bubble.addEventListener('click', function (e) {
    e.stopPropagation();
    bubble.style.transition = 'transform 0.25s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.18s';
    bubble.style.transform = 'scale(1.4) rotate(18deg)';
    bubble.style.opacity = '0';
    burstSound.currentTime = 0;
    burstSound.play();
    setTimeout(() => {
      bubble.remove();
      // Remove container if all bubbles are gone
      if (!bubbleContainer.querySelector('div')) {
        bubbleContainer.remove();
      }
    }, 180);
    // Confetti burst
    for (let j = 0; j < 18; j++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 4 + 3}px`;
      confetti.style.height = `${Math.random() * 10 + 8}px`;
      confetti.style.background = randomBubbleColor();
      confetti.style.borderRadius = '2px';
      confetti.style.left = `${size / 2}px`;
      confetti.style.top = `${size / 2}px`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = '0.85';
      bubble.appendChild(confetti);
      // Animate confetti
      const angle = Math.random() * 2 * Math.PI;
      const dist = Math.random() * 36 + 24;
      confetti.animate([
        { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${Math.random() * 180}deg)`, opacity: 0 }
      ], {
        duration: 420 + Math.random() * 200,
        easing: 'cubic-bezier(.68,-0.55,.27,1.55)'
      });
      setTimeout(() => confetti.remove(), 520);
    }
  });

  bubbleContainer.appendChild(bubble);
  bubbles.push(bubble);
}

// Prevent scrolling while bubbles are present
document.body.style.overflow = 'hidden';
const observer = new MutationObserver(() => {
  if (!bubbleContainer.querySelector('div')) {
    document.body.style.overflow = '';
    observer.disconnect();
  }
});
observer.observe(bubbleContainer, { childList: true });