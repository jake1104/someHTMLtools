document.addEventListener('DOMContentLoaded', () => {
  // --- Candle and Flame Logic (unchanged) ---
  const candles = Array.from(document.querySelectorAll('.candle-large, .candle-small'));
  const largeCandle = document.querySelector('.candle-large');
  const cx = 50, cy = -5, rx = 25, ry = 5;
  const numCandles = candles.length;
  const angleStep = Math.PI / (numCandles > 1 ? numCandles - 1 : 1);
  const largeCandleIndex = candles.indexOf(largeCandle);
  if (largeCandleIndex > -1) {
    const middleIndex = Math.floor(numCandles / 2);
    [candles[largeCandleIndex], candles[middleIndex]] = [candles[middleIndex], candles[largeCandleIndex]];
  }
  candles.forEach((candle, i) => {
    const angle = i * angleStep;
    const jitterX = (Math.random() - 0.5) * 4;
    const jitterY = (Math.random() - 0.5) * 4;
    const x = cx - rx * Math.cos(angle) + jitterX;
    const y = cy - ry * Math.sin(angle) + jitterY;
    candle.style.left = `${x}%`;
    candle.style.top = `${y}%`;
  });
  const flames = document.querySelectorAll('.flame');
  flames.forEach(flame => {
    const randomDuration = 0.5 + Math.random();
    const randomDelay = Math.random() * 0.5;
    flame.style.animationDuration = `${randomDuration}s`;
    flame.style.animationDelay = `${randomDelay}s`;
  });

  // --- Popper Logic ---
  const cake = document.querySelector('.cake');
  const originalPoppers = Array.from(document.querySelectorAll('.popper-container')).map(p => p.cloneNode(true));
  const cycleTime = 5000 + 3000;

  // Generate shell colors once per session
  const shellColors = [
    { color1: `hsl(${Math.random() * 360}, 100%, 60%)`, color2: `hsl(${Math.random() * 360}, 100%, 60%)` }, // For left popper
    { color1: `hsl(${Math.random() * 360}, 100%, 60%)`, color2: `hsl(${Math.random() * 360}, 100%, 60%)` }  // For right popper
  ];

  function explodePoppers() {
    const currentPoppers = document.querySelectorAll('.popper-container');

    currentPoppers.forEach((popper, index) => {
      const newPopper = originalPoppers[index].cloneNode(true);
      const sessionColors = shellColors[index];

      // Apply rotation directly to the popper
      newPopper.classList.add('rotating');
      setTimeout(() => {
        newPopper.classList.remove('rotating');
      }, 200); // Matches the animation duration

      const shell = newPopper.querySelector('.popper-shell');
      if (shell) {
        shell.style.background = `repeating-linear-gradient(45deg, ${sessionColors.color1}, ${sessionColors.color1} 8px, ${sessionColors.color2} 8px, ${sessionColors.color2} 16px)`;
      }

      const confetti = newPopper.querySelectorAll('.confetti');
      confetti.forEach(piece => {
        const randomDuration = 3 + Math.random() * 2;
        const x_final = (Math.random() - 0.5) * 500;
        const r_final = (Math.random() - 0.5) * 720;
        const y_final = 380 + Math.random() * 40;
        const flutter_amplitude = Math.random() * 50;
        const flutter_frequency = Math.random() * 3 + 2;
        const t1 = 0.25, t2 = 0.5, t3 = 0.75;
        const y1 = y_final * t1, y2 = y_final * t2, y3 = y_final * t3;
        const x1 = x_final * t1 + flutter_amplitude * Math.sin(flutter_frequency * t1 * Math.PI * 2);
        const x2 = x_final * t2 + flutter_amplitude * Math.sin(flutter_frequency * t2 * Math.PI * 2);
        const x3 = x_final * t3 + flutter_amplitude * Math.sin(flutter_frequency * t3 * Math.PI * 2);
        const r1 = (Math.random() - 0.5) * 360, r2 = (Math.random() - 0.5) * 360, r3 = (Math.random() - 0.5) * 360;
        const delay = Math.random() * 1;
        const hue = Math.random() * 360;

        piece.style.setProperty('--x-final', `${x_final}px`);
        piece.style.setProperty('--r-final', `${r_final}deg`);
        piece.style.setProperty('--y-final', `${y_final}px`);
        piece.style.setProperty('--x1', `${x1}px`);
        piece.style.setProperty('--r1', `${r1}deg`);
        piece.style.setProperty('--y1', `${y1}px`);
        piece.style.setProperty('--x2', `${x2}px`);
        piece.style.setProperty('--r2', `${r2}deg`);
        piece.style.setProperty('--y2', `${y2}px`);
        piece.style.setProperty('--x3', `${x3}px`);
        piece.style.setProperty('--r3', `${r3}deg`);
        piece.style.setProperty('--y3', `${y3}px`);
        piece.style.animationDuration = `${randomDuration}s`;
        piece.style.animationDelay = `${delay}s`;
        piece.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
      });

      newPopper.classList.add('explode');
      popper.parentNode.replaceChild(newPopper, popper);
    });
  }

  function cycle() {
    explodePoppers();
    setTimeout(cycle, cycleTime);
  }

  cycle();
});