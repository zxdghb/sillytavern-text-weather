/* Text Weather Extension - script.js (v3.0.0 - Final DOM Creation Method) */
(function() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initWeatherEffect();
    } else {
        document.addEventListener('DOMContentLoaded', initWeatherEffect);
    }

    function initWeatherEffect() {
        const weatherTypes = [{ name: 'rain' }, { name: 'snow' }, { name: 'sun' }];
        const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const chatElement = document.getElementById('chat');
        if (!chatElement) return;

        function createWeather(container) {
            container.innerHTML = ''; // 清空旧内容
            const weather = getRandomItem(weatherTypes);

            if (weather.name === 'sun') {
                const sun = document.createElement('div');
                sun.className = 'weather-sun';
                sun.textContent = '☀️';
                container.appendChild(sun);
            } else {
                // ★ 创建云朵元素
                const cloud = document.createElement('div');
                cloud.className = 'weather-cloud';
                container.appendChild(cloud);

                // ★ 创建独立的粒子元素
                const particleCount = 5; // 你可以增加这个数量来让雨/雪更密集
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('span');
                    particle.className = 'weather-particle';
                    
                    if (weather.name === 'rain') {
                        particle.classList.add('particle-rain');
                        particle.textContent = '|';
                        particle.style.animationDuration = `${1.5 + Math.random()}s`;
                    } else { // snow
                        particle.classList.add('particle-snow');
                        particle.textContent = '❄️';
                        particle.style.animationDuration = `${4 + Math.random() * 2}s`;
                    }
                    
                    // 为每个粒子设置随机的水平位置和动画延迟
                    particle.style.left = `${15 + Math.random() * 70}%`; // 在容器内随机分布
                    particle.style.animationDelay = `${Math.random() * 2}s`;
                    
                    container.appendChild(particle);
                }
            }
            // 渐显效果
            setTimeout(() => { container.style.opacity = 1; }, 50);
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.classList.contains('mes')) {
                            const prevMessage = node.previousElementSibling;
                            if (prevMessage && prevMessage.classList.contains('mes') && !prevMessage.querySelector('.weather-container')) {
                                const weatherContainer = document.createElement('div');
                                weatherContainer.className = 'weather-container';
                                prevMessage.appendChild(weatherContainer);
                                createWeather(weatherContainer);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(chatElement, { childList: true });
        console.log("🌦️ Text Weather extension (v3.0.0) loaded successfully!");
    }
})();
