/* ── Header scroll ─────────────────────────────────────────────── */
const hdr = document.getElementById('header');
window.addEventListener('scroll', () => {
    hdr.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Mobile nav ────────────────────────────────────────────────── */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav    = document.getElementById('mobileNav');
const closeNavBtn  = document.getElementById('closeNavBtn');

function openNav()  { mobileNav.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeNav() { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }

hamburgerBtn.addEventListener('click', openNav);
closeNavBtn.addEventListener('click', closeNav);

document.querySelectorAll('.mob').forEach(a => {
    a.addEventListener('click', closeNav);
});

/* ── Scroll reveal (Intersection Observer) ─────────────────────── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Contact form ──────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const submitSpan  = submitBtn.querySelector('span');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    submitSpan.textContent = 'Sending…';
    submitBtn.disabled     = true;

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (response.ok) {
            submitSpan.textContent     = 'Message Sent ✓';
            submitBtn.style.background = 'var(--gold)';
            submitBtn.style.borderColor= 'var(--gold)';
            submitSpan.style.color     = 'var(--black)';
            setTimeout(() => {
                submitSpan.textContent     = 'Send Enquiry';
                submitBtn.style.background = '';
                submitBtn.style.borderColor= '';
                submitSpan.style.color     = '';
                contactForm.reset();
            }, 3500);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (err) {
        alert('Something went wrong. Please try again.');
    } finally {
        submitBtn.disabled = false;
    }
});
