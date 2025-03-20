let startTime;
let elapsedTime = 0; // Время в миллисекундах
let timerInterval;
let audio = document.getElementById('audio-player'); // Музыкальный элемент

// Форматирование времени
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Обновление таймера
function updateTimer() {
    elapsedTime = Date.now() - startTime;
    document.querySelector('.recordSpeed').textContent = `SLP ${formatTime(elapsedTime)}`;
}

// Запуск таймера
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// Сброс таймера
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.querySelector('.recordSpeed').textContent = `SLP 00:00:00`;
}

// Обновление текущего времени
function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.querySelector('.time').textContent = `${hours}:${minutes}:${seconds}`;
}

// Воспроизведение аудио
function playAudio() {
    audio.play();
    document.querySelector('.mute-button').textContent = "Pause"; // Меняем текст на "Pause"
}

// Переключение аудио
function toggleAudio() {
    if (audio.paused) {
        audio.currentTime = 0; // Сбрасываем на начало
        playAudio(); // Запускаем музыку заново
    } else {
        audio.pause(); // Останавливаем музыку
        document.querySelector('.mute-button').textContent = "Play"; // Меняем текст на "Play"
    }
}

// Основной обработчик событий
document.addEventListener('DOMContentLoaded', function () {
    const revealButton = document.getElementById('reveal-button');
    const muteButton = document.querySelector('.mute-button');
    const content = document.getElementById('content');
    const backgroundBlur = document.querySelector('.background-blur');
    const introWrap = document.querySelector('.intro-wrap');

    // Обработчик для клика по кнопке revealButton
    if (revealButton) {
        revealButton.addEventListener('click', function () {
            console.log('Reveal button clicked!');  // Печатаем в консоль, чтобы удостовериться, что событие сработало

            // Скрываем кнопку
            this.style.display = 'none'; 

            // Показываем скрытый контент
            content.classList.remove('hidden');

            // Добавляем анимацию
            backgroundBlur.classList.add('animate');
            introWrap.classList.remove('hidden');  // Показываем основной контент
            introWrap.classList.add('animate');

            // Запуск таймера и воспроизведение музыки
            startTimer();
            playAudio();
        });
    }

    if (muteButton) {
        muteButton.addEventListener('click', function () {
            console.log('Mute button clicked!');
            toggleAudio(); // Переключение аудио
        });
    }

    // Установка начального времени
    document.querySelector('.recordSpeed').textContent = `SLP 00:00:00`;

    // Запуск обновления времени
    setInterval(updateCurrentTime, 1000);
});

window.onload = function () {
    console.log("Page loaded");
};
