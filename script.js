// Modernized clock with embedded images (SVG data URIs) and 12/24h toggle
document.addEventListener('DOMContentLoaded', () => {
    const msg = document.querySelector('.time-value');
    const periodText = document.querySelector('.period-text');
    const img = document.getElementById('imagem');
    const formatToggle = document.getElementById('formatToggle');

    // Simple embedded SVGs (data URIs) for morning/afternoon/night
    const images = {
        morning: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'><rect width='120' height='80' rx='12' fill='%23FFF7E6'/><g fill='none' stroke='%23FFB74D' stroke-width='2'><circle cx='60' cy='34' r='12' fill='%23FFD54F' stroke='none'/></g></svg>",
        afternoon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'><rect width='120' height='80' rx='12' fill='%23FFF0E0'/><circle cx='60' cy='30' r='14' fill='%23FF8A65'/></svg>",
        night: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'><rect width='120' height='80' rx='12' fill='%230B1221'/><g fill='%23F8F9FA'><circle cx='82' cy='28' r='10'/><circle cx='28' cy='20' r='2'/><circle cx='46' cy='14' r='1.6'/></g></svg>"
    };

    let is24 = true;

    function setBackgroundForPeriod(period) {
        if (period === 'morning') {
            document.body.style.background = 'linear-gradient(135deg, #FFB75E 0%, #F76B1C 100%)';
        } else if (period === 'afternoon') {
            document.body.style.background = 'linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #141E30 0%, #243B55 100%)';
        }
    }

    function swapImage(newSrc) {
        if (!img) return;
        img.classList.add('fade-out');
        setTimeout(() => {
            img.src = newSrc;
            img.classList.remove('fade-out');
        }, 300);
    }

    function updateClock() {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();

        // Determine period
        let period = 'night';
        if (h >= 0 && h < 12) period = 'morning';
        else if (h >= 12 && h < 18) period = 'afternoon';

        // Format hour according to toggle
        let displayHour = h;
        let suffix = '';
        if (!is24) {
            suffix = h >= 12 ? ' PM' : ' AM';
            displayHour = h % 12 || 12; // convert to 12h
        }

        const hh = String(displayHour).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        const ss = String(s).padStart(2, '0');

        msg.textContent = `${hh}:${mm}:${ss}${suffix}`;
        if (period === 'morning') {
            periodText.textContent = 'Bom dia! Está amanhecendo...';
            swapImage(images.morning);
        } else if (period === 'afternoon') {
            periodText.textContent = 'Boa tarde! O sol está brilhando...';
            swapImage(images.afternoon);
        } else {
            periodText.textContent = 'Boa noite! As estrelas estão surgindo...';
            swapImage(images.night);
        }

        setBackgroundForPeriod(period);
    }

    // Initialize
    updateClock();
    // Update every second
    setInterval(updateClock, 1000);

    // Toggle handler
    if (formatToggle) {
        formatToggle.addEventListener('click', () => {
            is24 = !is24;
            formatToggle.setAttribute('aria-pressed', String(!is24));
            formatToggle.textContent = is24 ? '24h' : '12h';
            // Refresh immediately
            updateClock();
        });
    }
});
