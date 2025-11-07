const envelopeContainer = document.getElementById('envelopeContainer');
const bgMusic = document.getElementById('bg-music');
const transitionSound = document.getElementById('transition-sound');
const letter = document.getElementById('letter');
const nextButton = document.getElementById('next-button');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const page5 = document.getElementById('page5');
const page6 = document.getElementById('page6');
const page7 = document.getElementById('page7'); // La página final ahora es la 7
const finalButton = document.getElementById('final-button');
const tooltipContainer = document.querySelector('.tooltip-container');
const confirmationGif = document.getElementById('confirmation-gif');
const iSwearSound = document.getElementById('i-swear-sound');
const page4Music = document.getElementById('page4-music');
const finalMusic = document.getElementById('final-music');
const page6Sound = document.getElementById('page6-sound'); // Nuevo sonido para la página 6
const page5Sound = document.getElementById('page5-sound');

const flyingImage1 = document.getElementById('flying-image-1');
const flyingImage2 = document.getElementById('flying-image-2');

envelopeContainer.addEventListener('click', function() {
    // No reproducir sonido si el clic fue en la carta misma
    if (event.target.closest('#letter')) {
        return;
    }

    const isOpen = this.classList.toggle('open');

    if (isOpen) {
        bgMusic.play();
    } else {
        bgMusic.pause();
        bgMusic.currentTime = 0; // Reinicia la música
    }
});

letter.addEventListener('click', function() {
    bgMusic.pause();
    bgMusic.currentTime = 0; // Reinicia la música
});

nextButton.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace recargue la página

    transitionSound.play(); // Reproduce el nuevo sonido

    // 1. Desvanece la primera página
    page1.style.opacity = '0';

    // 2. Espera un poco y luego cambia de página
    setTimeout(() => {
        page1.style.display = 'none';
        page2.style.display = 'flex';
        page2.style.opacity = '1'; // Inicia la aparición de la segunda página
        startTypingAnimation(); // Inicia la animación de escritura
    }, 1500); // Este tiempo debe coincidir con la duración de la transición en CSS
});

function typeWriter(element, text, onComplete) {
    let i = 0;
    const speed = 50; // Velocidad de escritura en milisegundos
    element.style.visibility = 'visible'; // Hace el párrafo visible
    element.style.opacity = '1'; // Asegura que no sea transparente
    element.classList.add('typing-cursor');

    function type() {
        if (i < text.length) {
            // Para manejar las etiquetas <strong> sin escribirlas letra por letra
            if (text.charAt(i) === '<') {
                const closingTagIndex = text.indexOf('>', i);
                element.innerHTML = text.substring(0, closingTagIndex + 1);
                i = closingTagIndex;
            } else {
                element.innerHTML = text.substring(0, i + 1);
            }
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor');
            if (onComplete) onComplete();
        }
    }
    type();
}

function startTypingAnimation() {
    const line1 = document.getElementById('detail-line-1');
    const line2 = document.getElementById('detail-line-2');
    const text1 = line1.innerHTML;
    const text2 = line2.innerHTML;

    line1.innerHTML = '';
    line2.innerHTML = '';

    typeWriter(line1, text1, () => {
        // Cuando la primera línea termina, empieza la segunda
        typeWriter(line2, text2, () => {
            // Cuando la segunda línea termina, empieza la secuencia de desvanecimiento
            setTimeout(() => {
                line1.style.opacity = '0';
                line2.style.opacity = '0';

                // Espera a que el texto se desvanezca antes de quitarlo del layout
                setTimeout(() => {
                    line1.style.display = 'none';
                    line2.style.display = 'none';
                    tooltipContainer.style.display = 'block';
                    // Aparece el botón con su contenedor y la animación de oscilación
                    setTimeout(() => tooltipContainer.style.opacity = '1', 100);

                }, 1500); // Coincide con la transición de opacidad del CSS                
            }, 15000); // Espera 5 segundos
        });
    });
}

finalButton.addEventListener('click', function() {
    // Oculta la nubesita (tooltip) inmediatamente al hacer clic
    document.querySelector('.tooltip-text').style.display = 'none';

    // Detener y reiniciar todos los sonidos para asegurar que paren.
    bgMusic.pause();
    bgMusic.currentTime = 0;
    transitionSound.pause();
    transitionSound.currentTime = 0;
    
    page2.style.opacity = '0';
    finalButton.classList.add('fly-away');

    setTimeout(() => {
        page2.style.display = 'none';
        page3.style.display = 'flex';
        page3.style.opacity = '1';

        // Después de que la página final aparezca, muestra el GIF
        setTimeout(() => {
            confirmationGif.style.display = 'block';
            setTimeout(() => {
                confirmationGif.style.opacity = '1';

                // Espera 3 segundos después de que el GIF aparece
                setTimeout(() => {
                    // 1. Reproduce el primer sonido
                    iSwearSound.play();

                    // 2. Cuando el primer sonido termine, reproduce el segundo y haz la transición
                    iSwearSound.onended = function() {
                        page4Music.play(); // Empieza la música de la página 4
                        page3.style.opacity = '0';
                        setTimeout(() => {
                            page3.style.display = 'none';
                            page4.style.display = 'flex';
                            page4.style.opacity = '1';

                            // Inicia la secuencia de animación en la página 4
                            setTimeout(() => {
                                flyingImage1.classList.add('fly-across-1');
                                flyingImage2.classList.add('fly-across-2');
                            }, 15000); // Espera 15 segundos, la animación ocurrirá en los últimos 5 segundos

                            // Después de 20 segundos, pasa a la NUEVA página 5
                            setTimeout(() => {
                                page4.style.opacity = '0';
                                setTimeout(() => {
                                    page4Music.pause();
                                    page4Music.currentTime = 0;
                                    page4.style.display = 'none';
                                    page5.style.display = 'flex';
                                    page5.style.opacity = '1';

                                    // Hacemos sonar las campanas cuando aparece el texto
                                    setTimeout(() => {
                                        page5Sound.play();
                                    }, 1000); // Coincide con el retraso de la animación del texto

                                    // Esperamos 25 segundos en la página 5 (vestimenta) y luego pasamos a la página 6 (regalo)
                                    setTimeout(() => {
                                        page5.style.opacity = '0';
                                        setTimeout(() => {
                                            page5.style.display = 'none';
                                            page5Sound.pause(); // Detenemos el sonido de las campanas
                                            page5Sound.currentTime = 0;
                                            page6.style.display = 'flex';
                                            page6.style.opacity = '1';

                                            // Hacemos sonar las campanas creepy cuando aparece el texto en la página 6
                                            setTimeout(() => {
                                                page6Sound.play();
                                            }, 1000); // Coincide con el retraso de la animación del texto


                                            // Esperamos 15 segundos en la página 6 (regalo) y luego pasamos a la página 7 (final)
                                            setTimeout(() => {
                                                page6.style.opacity = '0';
                                                setTimeout(() => {
                                                    page6.style.display = 'none';
                                                    page7.style.display = 'flex';
                                                    page7.style.opacity = '1';
                                                    page6Sound.pause(); // Detenemos el sonido de las campanas creepy
                                                    page6Sound.currentTime = 0;
                                                    // Retrasamos la música final para que empiece junto con la animación de la frase en la página 7
                                                    setTimeout(() => {
                                                        finalMusic.play();
                                                    }, 1500);
                                                }, 1500); // Duración de la transición
                                            }, 15000); // Duración de la página 6

                                        }, 1500); // Duración de la transición de página 5 a 6
                                    }, 46000); // Duración de la nueva página 5

                                }, 1500); // Duración de la transición de página 4 a 5
                            }, 20000); // 20 segundos en total en la página 4

                        }, 1500); // Duración de la transición de fundido
                    };
                }, 3000); // 3 segundos de espera
            }, 50); // Pequeño delay para iniciar la transición del GIF
        }, 1500); // Espera a que la transición de la página termine
    }, 1000); // Coincide con la duración de la animación en CSS
});

// Cuando la música final termina, vuelve al principio recargando la página.
finalMusic.addEventListener('ended', function() {
    // 1. Desvanece la última página
    page7.style.opacity = '0';

    // 2. Espera a que termine la transición de desvanecimiento antes de recargar
    setTimeout(() => {
        location.reload();
    }, 1500); // Coincide con la duración de la transición en CSS
});

// Lógica del contador regresivo
function startCountdown() {
    const countdownDate = new Date("Mar 22, 2026 12:30:00").getTime();

    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown-timer").innerHTML = "¡La magia ha comenzado!";
        }
    }, 1000);
}

// Lógica para bloquear la vista en escritorio
function checkDevice() {
    const desktopBlocker = document.getElementById('desktop-blocker');
    // Si el ancho de la ventana es mayor a 800px, asumimos que es escritorio/tablet grande
    if (window.innerWidth > 800) {
        desktopBlocker.style.display = 'flex'; // Mostramos el bloqueo
    } else {
        desktopBlocker.style.display = 'none'; // Nos aseguramos que esté oculto en móvil
    }
}

// Inicia el contador cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    checkDevice(); // Comprobamos el tipo de dispositivo al cargar

    // Opcional: Volver a comprobar si el usuario cambia el tamaño de la ventana
    window.addEventListener('resize', checkDevice);

    startCountdown();

    // Lógica para registrar el Service Worker para la PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.log('Error al registrar el Service Worker:', error);
            });
    }
});