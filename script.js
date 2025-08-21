/* Text Weather Extension - script.js (v2.0.0 - Smart Position) */
(function() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initWeatherEffect();
    } else {
        document.addEventListener('DOMContentLoaded', initWeatherEffect);
    }

    function initWeatherEffect() {
        const weatherTypes = [
            { name: 'rain' },
            { name: 'snow' },
            { name: 'sun' }
        ];
        const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const chatElement = document.getElementById('chat');
        if (!chatElement) return;

        function createWeather(container, weather) {
            container.innerHTML = ''; // 清空旧内容

            // ★ 智能定位逻辑 ★
            if (weather.name === 'sun') {
                // 太阳：保持居中
                container.style.left = '50%';
                container.style.transform = 'translateX(-50%)';
                const sun = document.createElement('div');
                sun.className = 'weather-sun';
                sun.textContent = '☀️';
                container.appendChild(sun);
            } else {
                // 雨/雪：定位到头像上方
                const prevMessage = container.parentElement;
                const avatarWrapper = prevMessage.querySelector('.mesAvatarWrapper');
                if (avatarWrapper) {
                    const avatarRect = avatarWrapper.getBoundingClientRect();
                    const chatRect = chatElement.getBoundingClientRect();
                    // 计算头像中心点相对于聊天框的横坐标
                    const leftPosition = avatarRect.left - chatRect.left + (avatarRect.width / 2);
                    container.style.left = `${leftPosition}px`;
                    container.style.transform = 'translateX(-50%)';
                } else {
                    // 如果找不到头像，就默认居中
                    container.style.left = '50%';
                    container.style.transform = 'translateX(-50%)';
                }

                // 创建云朵
                const cloud = document.createElement('div');
                cloud.className = 'weather-cloud';
                container.appendChild(cloud);

                // 创建粒子效果容器
                const particles = document.createElement('div');
                particles.className = 'weather-particles ' + (weather.name === 'rain' ? 'weather-rain' : 'weather-snow');
                
                // 创建多个粒子
                const particleCount = 5; // 雨丝/雪花数量
                for (let i = 0; i < particleCount; i++) {
                    const p = document.createElement('span');
                    p.textContent = weather.name === 'rain' ? '|' : '❄️';
                    p.style.left = `${Math.random() * 100}%`;
                    p.style.animationDelay = `${Math.random() * 2}s`;
                    p.style.animationDuration = `${1.5 + Math.random()}s`;
                    particles.appendChild(p);
                }
                container.appendChild(particles);
            }
            // 渐显效果
            setTimeout(() => { container.style.opacity = 1; }, 50);
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.classList.contains('mes')) {
                            const prevMessage = node.previousElementSibling;
                            if (prevMessage && prevMessage.classList.contains('mes')) {
                                if (prevMessage.querySelector('.weather-container')) return; // 防止重复添加
                                const weatherContainer = document.createElement('div');
                                weatherContainer.className = 'weather-container';
                                prevMessage.appendChild(weatherContainer);
                                const randomWeather = getRandomItem(weatherTypes);
                                createWeather(weatherContainer, randomWeather);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(chatElement, { childList: true });
        console.log("🌦️ Text Weather extension (v2.0.0) loaded successfully!");
    }
})();
