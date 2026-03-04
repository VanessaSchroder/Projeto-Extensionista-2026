document.addEventListener('DOMContentLoaded', () => {
    // --- Efeito de Rolagem do Cabeçalho ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // --- Revelar Elementos ao Rolar ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Verificação inicial

    // --- Lógica da Barra de Privacidade ---
    const privacyBar = document.getElementById('privacyBar');
    const acceptPrivacy = document.getElementById('acceptPrivacy');

    // Mostrar após 1.5s se não tiver sido aceito ainda
    if (!localStorage.getItem('privacyAccepted')) {
        setTimeout(() => {
            privacyBar.classList.add('active');
        }, 1500);
    }

    acceptPrivacy.addEventListener('click', () => {
        privacyBar.classList.remove('active');
        localStorage.setItem('privacyAccepted', 'true');
    });

    // --- Lógica do Widget de Assistente ---
    const assistantTrigger = document.getElementById('assistantTrigger');
    const assistantWindow = document.getElementById('assistantWindow');
    const closeAssistant = document.getElementById('closeAssistant');
    const assistantBody = document.getElementById('assistantBody');

    assistantTrigger.addEventListener('click', () => {
        assistantWindow.style.display = 'flex';
        // Rolar automaticamente para o fim
        assistantBody.scrollTop = assistantBody.scrollHeight;
    });

    closeAssistant.addEventListener('click', () => {
        assistantWindow.style.display = 'none';
    });

    // Atraso da mensagem inicial
    setTimeout(() => {
        if (assistantWindow.style.display !== 'flex') {
            // Opcional: Pulsar o gatilho para chamar atenção
            assistantTrigger.style.transform = 'scale(1.2)';
            setTimeout(() => assistantTrigger.style.transform = 'scale(1)', 300);
        }
    }, 5000);

    // --- Envio de Formulário de Contato (Mock) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Mensagem Enviada!';
                btn.style.background = '#25D366';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
