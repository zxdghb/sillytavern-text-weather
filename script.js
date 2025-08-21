/* Text Weather Extension - script.js (v2.1.0 - Clipping Fix & Centered Position) */
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
                // ★ 创建新的HTML结构来解决遮罩问题 ★
                // 1. 云朵容器 (负责遮罩)
                const cloudContainer = document.createElement('div');
                cloudContainer.className = 'weather-cloud-container';
                
                // 2. 云朵本身
                const cloud = document.createElement('div');
                cloud.className = 'weather-cloud';
                cloudContainer.appendChild(cloud);

                // 3. 粒子容器 (会被云朵容器遮罩)
                const particles = document.createElement('div');
                particles.className = 'weather-particles ' + (weather.name === 'rain' ? 'weather-rain' : 'weather-snow');
                
                const particleCount = 5;
                for (let i = 0; i < particleCount; i++) {
                    const p = document.createElement('span');
                    p.textContent = weather.name === 'rain' ? '|' : '❄️';
                    p.style.left = `${10 + Math.random() * 80}%`; // 粒子在容器内随机分布
                    p.style.animationDelay = `${Math.random() * 2}s`;
                    p.style.animationDuration = `${(weather.name === 'rain' ? 1.5 : 4) + Math.random()}s`;
                    particles.appendChild(p);
                }
                cloudContainer.appendChild(particles);
                
                // 将完整的云朵+粒子结构添加到主容器
                container.appendChild(cloudContainer);
            }

            setTimeout(() => { container.style.opacity = 1; }, 50);
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
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
        console.log("🌦️ Text Weather extension (v2.1.0) loaded successfully!");
    }
})();
