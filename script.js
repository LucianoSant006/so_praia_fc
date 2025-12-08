
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () =>
    navbar.classList.toggle("sticky", window.scrollY > 0)
);

// Menu Mobile (Hamburguer)
const menu = document.querySelector(".menu");
const toggleMenu = () => menu.classList.toggle("active");

document.querySelector(".menu-btn").addEventListener("click", toggleMenu);
document.querySelector(".close-btn").addEventListener("click", toggleMenu);

document
    .querySelectorAll(".menu a")
    .forEach((link) => link.addEventListener("click", toggleMenu));

// Lenis Smooth Scrolling
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
};
requestAnimationFrame(raf);
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// Scroll Reveal
const sr = ScrollReveal({
    origin: "bottom",
    distance: "40px",
    duration: 800,
    delay: 200,
    easing: "ease-in-out",
});

gsap.to("nav", {
    opacity: 1,
    duration: 2,
});
sr.reveal(".hero-headlines h1");
sr.reveal(".hero-headlines p", { delay: 500 });
sr.reveal(".hero-headlines-buttons", { delay: 1000 });
sr.reveal(".processo-headlines h1");
sr.reveal(".processo-headlines p", { delay: 500 });
sr.reveal(".processo-img", { delay: 500 });
sr.reveal(".pets-headlines");
sr.reveal(".acao-item", { interval: 200 }); 
sr.reveal(".sobre-headlines");
sr.reveal(".img-sobre");
sr.reveal(".testimunhas h1", { delay: 500 });
sr.reveal(".testimunhas h6");
sr.reveal(".testimunhas-item", { delay: 1000, interval: 200 });
sr.reveal(".footer-brand");
sr.reveal(".footer-links", { delay: 500, origin: "left" });
sr.reveal(".footer-doacao", { delay: 500, origin: "bottom" });
sr.reveal(".copyright", { delay: 600 });
sr.reveal(".presentes-container", { delay: 300 }); // Animação para nova seção

// GSAP Text Reveal
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor;
    const fg = char.dataset.fgColor;
    const text = new SplitType(char, { type: "chars" }); 

    gsap.fromTo(
        text.chars,
        { color: bg, },
        {
            color: fg,
            duration: 0.3,
            stagger: 0.02,
            scrollTrigger: {
                trigger: char,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                markers: false,
                toggleActions: "play play reverse reverse",
            },
        }
    );
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("carousel-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // Configuração
    const scrollAmount = 300; // Quanto ele rola por vez (ajuste se necessário)
    const autoScrollDelay = 3000; // Tempo em milissegundos (3000 = 3 segundos)
    let autoScrollInterval;

    // --- Funções de Movimento ---

    // Rolar para a direita
    function scrollNext() {
        // Verifica se chegou no fim
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            // Se chegou no fim, volta para o começo suavemente
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Se não, rola para o lado
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    // Rolar para a esquerda
    function scrollPrev() {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }

    // --- Ativar os Botões ---
    nextBtn.addEventListener("click", () => {
        scrollNext();
        resetTimer(); // Reinicia o tempo se a pessoa clicar
    });

    prevBtn.addEventListener("click", () => {
        scrollPrev();
        resetTimer();
    });

    // --- Automação (Passar sozinho) ---
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(scrollNext, autoScrollDelay);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function resetTimer() {
        stopAutoScroll();
        startAutoScroll();
    }

    // Pausa quando o mouse está em cima do carrossel
    container.addEventListener("mouseenter", stopAutoScroll);
    
    // Volta a rodar quando o mouse sai
    container.addEventListener("mouseleave", startAutoScroll);

    // Inicia a contagem assim que a página carrega
    startAutoScroll();
});
// Seleciona os elementos

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

// Função para abrir o menu
menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
});

// Função para fechar o menu (clicando no X)
closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
});

// Função para fechar o menu ao clicar em qualquer link (Opcional, mas recomendado)
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});
// --- JOGO DO PÊNALTI ---
let isKicking = false;

function chutarBola() {
    if (isKicking) return; // Evita cliques duplos
    isKicking = true;

    const container = document.getElementById('ball-container');
    const msg = document.getElementById('game-msg');

    // 1. Adiciona a classe que inicia a animação no CSS
    container.classList.add('kick-animation');

    // 2. Muda o texto no momento do impacto
    setTimeout(() => {
        msg.innerText = "CHUTOU...";
        msg.style.color = "#FFD700";
    }, 200);

    // 3. Momento que a bola entra no gol (0.8s depois)
    setTimeout(() => {
        msg.innerText = "GOOOOOOOL DO SÓ PRAIA!";
        msg.style.color = "#fff";
        msg.style.fontSize = "2rem";
        
        // Efeito de confete ou cor (opcional: piscar a tela)
        document.querySelector('.game-container').style.borderColor = "#FFD700";
    }, 900);

    // 4. Reseta o jogo depois de 3 segundos para chutar de novo
    setTimeout(() => {
        container.classList.remove('kick-animation');
        msg.innerText = "Clique na bola para chutar de novo!";
        msg.style.fontSize = "1.5rem";
        msg.style.color = "white";
        document.querySelector('.game-container').style.borderColor = "white";
        isKicking = false;
    }, 3000);
}