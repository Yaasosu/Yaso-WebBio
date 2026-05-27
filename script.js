const wallpapers = [
    "img/wallpaper_1.png",
    "img/wallpaper_2.png"
];
let index = 0;
let isAnimating = false;

// ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ: 
// Загружаем все картинки в кэш браузера при старте скрипта
wallpapers.forEach(src => {
    const img = new Image();
    img.src = src;
});

// инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.bg').style.backgroundImage = `url('${wallpapers[0]}')`;
});

function changeWallpaper(event) {
    if (isAnimating) return;
    isAnimating = true;
    
    index = (index + 1) % wallpapers.length;
    
    const bg = document.querySelector(".bg");
    const next = document.querySelector(".bg-next");
    const x = event.clientX;
    const y = event.clientY;
    
    next.style.transition = "none";
    next.style.backgroundImage = `url('${wallpapers[index]}')`;
    
    // Добавлен -webkit- для поддержки Safari и iOS
    next.style.webkitClipPath = `circle(0% at ${x}px ${y}px)`;
    next.style.clipPath = `circle(0% at ${x}px ${y}px)`;
    
    // Принудительная перерисовка (reflow), чтобы браузер применил нулевой круг до анимации
    void next.offsetHeight;
    
    next.style.transition = "clip-path 0.9s cubic-bezier(.54, 0, .34, .99), -webkit-clip-path 0.9s cubic-bezier(.54, 0, .34, .99)";
    next.style.webkitClipPath = `circle(150% at ${x}px ${y}px)`;
    next.style.clipPath = `circle(150% at ${x}px ${y}px)`;
    
    next.addEventListener("transitionend", () => {
        bg.style.backgroundImage = `url('${wallpapers[index]}')`;
        next.style.transition = "none";
        next.style.webkitClipPath = `circle(0% at ${x}px ${y}px)`;
        next.style.clipPath = `circle(0% at ${x}px ${y}px)`;
        isAnimating = false;
    }, { once: true });
}


//

function copyText(event) {
    // Предотвращаем стандартное поведение ссылки (чтобы страница не дергалась вверх)
    event.preventDefault();

    // Твой ник в Discord, который будет скопирован
    const discordId = "pudgezzzz"; // Замени на свой актуальный ник, если нужно

    // API для копирования текста в буфер обмена
    navigator.clipboard.writeText(discordId).then(() => {
        // Находим наше уведомление по ID
        const toast = document.getElementById("copyToast");

        // Добавляем класс 'show', чтобы уведомление плавно появилось
        toast.classList.add("show");

        // Убираем класс 'show' через 2.5 секунды (2500 миллисекунд)
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
        
    }).catch(err => {
        console.error('Ошибка при копировании: ', err);
    });
}