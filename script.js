// ---------- Elementos ----------
const btnCrear  = document.getElementById('btnCrear');
const escenario = document.getElementById('escenario');
const ramo      = document.getElementById('ramo');
const sub       = document.getElementById('sub');
const inputColor = document.getElementById('color');
const hex       = document.getElementById('hex');
const muestras  = document.querySelectorAll('.muestras button');

// ---------- Datos del ramo ----------
// x, y: posición de la flor | r: giro | s: tamaño
const rosas = [
  { x: 200, y: 95,  r: 0,   s: 1.05 },
  { x: 135, y: 140, r: -14, s: 1.0  },
  { x: 265, y: 140, r: 14,  s: 1.0  },
  { x: 200, y: 175, r: 0,   s: 1.1  },
  { x: 85,  y: 215, r: -24, s: 0.9  },
  { x: 315, y: 215, r: 24,  s: 0.9  },
  { x: 150, y: 235, r: -8,  s: 0.95 },
  { x: 250, y: 235, r: 8,   s: 0.95 },
];

const hojas = [
  { x: 128, y: 290, r: -35 }, { x: 272, y: 290, r: 35 },
  { x: 100, y: 262, r: -60 }, { x: 300, y: 262, r: 60 },
  { x: 175, y: 300, r: -15 }, { x: 225, y: 300, r: 15 },
];

// ---------- Dibujar el ramo ----------
function dibujarRamo() {
  const tallos = rosas.map((p, i) =>
    `<path class="tallo" pathLength="1" style="--i:${i}"
       d="M${p.x} ${p.y} C${p.x} ${p.y + 110} 200 330 200 430"/>`
  ).join('');

  const hojasSvg = hojas.map(h =>
    `<ellipse class="hoja base" cx="${h.x}" cy="${h.y}" rx="24" ry="9"
       transform="rotate(${h.r} ${h.x} ${h.y})" style="animation-delay:.5s"/>`
  ).join('');

  const papel = `
    <g class="base" style="animation-delay:.6s">
      <path class="papel" d="M92 315 Q200 355 308 315 L228 508 Q200 518 172 508 Z"/>
      <path class="pliegue" d="M200 345 L200 505 M140 332 L184 500 M260 332 L216 500"/>
      <path class="lazo" d="M150 420 Q200 436 250 420 L246 444 Q200 460 154 444 Z"/>
      <ellipse class="lazo" cx="182" cy="428" rx="20" ry="11" transform="rotate(-20 182 428)"/>
      <ellipse class="lazo" cx="218" cy="428" rx="20" ry="11" transform="rotate(20 218 428)"/>
    </g>`;

  const flores = rosas.map((p, i) =>
    `<g transform="translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})">
       <g class="flor" style="--i:${i}">
         <use href="#rosa" x="-50" y="-50" width="100" height="100"/>
       </g>
     </g>`
  ).join('');

  ramo.innerHTML = tallos + hojasSvg + papel + flores;
}

// ---------- Cambiar color ----------
function cambiarColor(color) {
  document.documentElement.style.setProperty('--rose', color);
  inputColor.value = color;
  hex.textContent = color;
}

// ---------- Eventos ----------
btnCrear.addEventListener('click', () => {
  escenario.hidden = false;
  dibujarRamo();                       // vuelve a dibujar: se repite la animación
  btnCrear.textContent = 'Crear otro ramo';
  sub.textContent = 'Elige el color de tus rosas.';
});

inputColor.addEventListener('input', e => cambiarColor(e.target.value));

muestras.forEach(b => b.addEventListener('click', () => cambiarColor(b.dataset.color)));