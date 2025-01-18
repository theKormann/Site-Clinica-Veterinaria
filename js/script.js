import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

window.addEventListener('scroll', function() {
    var specialtiesSection = document.querySelector('.tittleesp');
    var specialtiesRow1 = document.querySelector('.row1esp');
    var specialtiesRow2 = document.querySelector('.row2esp');

    var rect = specialtiesSection.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        specialtiesRow1.classList.add('show-specialties');
        specialtiesRow2.classList.add('show-specialties');
    }
});
let currentIndex = 0; // Começa no índice 0
const slides = document.querySelectorAll('.swiper-slide');
const slider = document.querySelector('.swiper-wrapper');
const totalSlides = slides.length;

// Adiciona a cópia da primeira e da última imagem para criar um loop contínuo
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);
slider.appendChild(firstSlide);
slider.insertBefore(lastSlide, slides[0]);

// Atualiza o número total de slides para incluir as cópias
const updatedTotalSlides = totalSlides + 2; // Incluindo as cópias

// Função para mostrar o slide atual
function showSlide(index) {
    if (index >= updatedTotalSlides) {
        currentIndex = 1; // Volta para a primeira imagem real
    } else if (index < 0) {
        currentIndex = updatedTotalSlides - 3; // Vai para a última imagem real
    } else {
        currentIndex = index;
    }

    // Transição suave para a mudança de slide
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Remover animação anterior
    const content = slides[currentIndex].querySelector('.swiper-slide-contents');
    content.classList.remove('fadeInLeft');

    // Adicionar animação
    setTimeout(() => {
        content.classList.add('fadeInLeft'); // Aplica o efeito de fadeInLeft
    }, 50); // Pequeno delay para garantir que a animação seja reaplicada
}

// Função para reiniciar a transição ao voltar para o slide inicial ou final
function resetTransition() {
    setTimeout(() => {
        slider.style.transition = 'none'; // Remove a transição para evitar o efeito de "salto"
        slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Corrige a posição
    }, 500); // Tempo que coincide com o tempo da transição
}

// Configuração para navegação por arrasto
let isDragging = false;
let startX = 0;
let endX = 0;

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    slider.style.cursor = 'grabbing';
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    endX = e.pageX;
});

slider.addEventListener('mouseup', () => {
    if (isDragging) {
        if (startX > endX) {
            showSlide(currentIndex + 1); // Mover para a próxima imagem
        } else if (startX < endX) {
            showSlide(currentIndex - 1); // Mover para a imagem anterior
        }
        isDragging = false;
        slider.style.cursor = 'grab';
    }
});

// Após a transição, reinicia a transição para permitir o loop contínuo
slider.addEventListener('transitionend', () => {
    if (currentIndex === 0) {
        currentIndex = updatedTotalSlides - 2; // Volta para o último slide real
        resetTransition();
    } else if (currentIndex === updatedTotalSlides - 1) {
        currentIndex = 1; // Vai para o primeiro slide real
        resetTransition();
    }
});

// Função de autoplay
function autoplay() {
    setInterval(() => {
        showSlide(currentIndex + 1); // Mover para o próximo slide
    }, 3000); // Troca de slide a cada 3 segundos
}

// Inicializar o slider para mostrar a primeira imagem
showSlide(currentIndex);

// Iniciar o autoplay
autoplay();



// Evento para reiniciar a transição quando chega no final ou no início do slider
slider.addEventListener('transitionend', () => {
    if (currentIndex === 0) {
        slider.style.transition = 'none';
        showSlide(updatedTotalSlides - 3); // Volta para a última imagem real
    } else if (currentIndex === updatedTotalSlides - 1) {
        slider.style.transition = 'none';
        showSlide(1); 
    }
});
// Função para copiar o texto
function copyText() {
    const textArea = document.getElementById('textToCopy');
    textArea.select();  // Seleciona o texto
    document.execCommand('copy');  // Copia o texto para a área de transferência
  
    // Adiciona a classe "copied" ao textarea para mudar a cor de fundo
    textArea.classList.add('copied');
  
    // Remover a classe após 1.5 segundos para restaurar o estilo original
    setTimeout(() => {
      textArea.classList.remove('copied');
    }, 1500);
}
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const main = document.getElementById('main');
    
signUpButton.addEventListener('click', ()=> {
    main.classList.add("right-panel-archive");
});
signUpButton.addEventListener('click', ()=> {
    main.classList.add("right-panel-archive");
});