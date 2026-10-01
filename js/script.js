/* ==========================================================================
   LA VOZ DEL ADORADOR - INTERACTIVIDAD & LOGICA JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initFormWhatsApp();
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initInaugurationModal();
  initCopyAddress();
  initAOS();
  initYearCopy();
});

/**
 * 0. Actualización dinámica del año de copyright
 */
function initYearCopy() {
  const yearEl = document.getElementById('year-copy');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * 1. Contador Regresivo hacia el 24 de Octubre a las 11:00 AM
 */
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Fecha del evento: 24 de Octubre a las 11:00 AM
  // Determinamos el año correspondiente (si ya pasó en el año actual, apuntamos al siguiente)
  const now = new Date();
  let targetYear = now.getFullYear();
  let eventDate = new Date(targetYear, 9, 24, 11, 0, 0); // Mes 9 = Octubre en JS (0-indexado)

  if (now.getTime() > eventDate.getTime()) {
    targetYear += 1;
    eventDate = new Date(targetYear, 9, 24, 11, 0, 0);
  }

  function update() {
    const currentTime = new Date().getTime();
    const distance = eventDate.getTime() - currentTime;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/**
 * 2. Generador de Mensaje y Redirección directa a WhatsApp
 * Número suministrado: 11 38 09 56 67 (Argentina: +54 9 11 3809-5667)
 */
function initFormWhatsApp() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const role = document.getElementById('reg-role').value;
    const church = document.getElementById('reg-church').value.trim() || 'No especificada';
    const notes = document.getElementById('reg-notes').value.trim() || 'Ninguna';

    if (!name || !phone) {
      alert('Por favor, ingresa tu nombre y número de contacto.');
      return;
    }

    // Número de WhatsApp oficial: +54 9 11 3809-5667
    const phoneNumber = '5491138095667';

    // Redacción del mensaje cálido y estructurado
    const message = 
`🕊️ *INFORMACIÓN / INSCRIPCIÓN: LA VOZ DEL ADORADOR* 🕊️
*Talleres & Capacitación Ministerial*

Hola! Me gustaría inscribirme al taller. Mis datos son:

👤 *Nombre:* ${name}
📱 *Teléfono:* ${phone}
🎵 *Área / Vocación:* ${role}
⛪ *Comunidad / Iglesia:* ${church}
✍️ *Mensaje o Consulta:* ${notes}

¡Que nada sea un impedimento para poder crecer! 🙌`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, '_blank');
  });
}

/**
 * 3. Menú Móvil
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const isOpen = navLinks.classList.contains('mobile-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Cerrar al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/**
 * 4. Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 5. Smooth Scroll para enlaces internos
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/* ==========================================================================
   [MÓDULO TEMPORAL] CONTROL DEL MODAL DE INAUGURACIÓN
   (Para retirar la lógica tras el 24 de Octubre, simplemente quita esta función)
   ========================================================================== */
function initInaugurationModal() {
  const modal = document.getElementById('inauguration-modal');
  if (!modal) return;

  const openPill = document.getElementById('open-event-modal-pill');
  const openHeroBtn = document.getElementById('hero-open-event-btn');
  const closeBtn = document.getElementById('close-event-modal-btn');
  const dismissBtn = document.getElementById('modal-dismiss-btn');

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Apertura manual mediante clics
  if (openPill) openPill.addEventListener('click', openModal);
  if (openHeroBtn) openHeroBtn.addEventListener('click', openModal);

  // Cierre
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

  // Cerrar al hacer clic fuera de la tarjeta
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Presentación sutil automática la primera vez por sesión (tras 1.8s)
  const hasSeenModal = sessionStorage.getItem('vda_inauguration_seen');
  if (!hasSeenModal) {
    setTimeout(() => {
      openModal();
      sessionStorage.setItem('vda_inauguration_seen', 'true');
    }, 1800);
  }
}

/**
 * 6. Copiar dirección al portapapeles con confirmación visual
 */
function initCopyAddress() {
  const copyBtn = document.getElementById('copy-address-btn');
  const copyText = document.getElementById('copy-btn-text');
  if (!copyBtn) return;

  const address = 'Calle 453 N° 1665, Gutiérrez, Berazategui, Provincia de Buenos Aires';

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(address);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = address;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      copyBtn.classList.add('copied');
      if (copyText) copyText.textContent = '¡Copiado!';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (copyText) copyText.textContent = 'Copiar Dirección';
      }, 2500);
    } catch (err) {
      console.error('Error al copiar dirección:', err);
    }
  });
}

/**
 * 8. Inicialización de AOS.js (Animaciones al hacer scroll)
 */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disableMutationObserver: false,
    });
  }
}

