/* Sentimental Weather Extension - script.js (v4.0.0 - AI-Powered) */
(function() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSentimentalWeather();
    } else {
        document.addEventListener('DOMContentLoaded', initSentimentalWeather);
    }

    function initSentimentalWeather() {
        // 创建一个 Sentiment 分析器实例
        const sentiment = new Sentiment();
        const chatElement = document.getElementById('chat');
        if (!chatElement) return;

        function createWeather(container, weatherName) {
            container.innerHTML = ''; // 清空旧内容

            if (weatherName === 'sun') {
                const sun = document.createElement('div');
                sun.className = 'weather-sun';
                sun.textContent = '☀️';
                container.appendChild(sun);
            } else {
                const cloudContainer = document.createElement('div');
                cloudContainer.className = 'weather-cloud-container';
                const cloud = document.createElement('div');
                cloud.className = 'weather-cloud';
                cloudContainer.appendChild(cloud);

                const particles = document.createElement('div');
                particles.className = 'weather-particles ' + (weatherName === 'rain' ? 'weather-rain' : 'weather-snow');
                
                const particleCount = 5;
                for (let i = 0; i < particleCount; i++) {
                    const p = document.createElement('span');
                    p.textContent = weatherName === 'rain' ? '|' : '❄️';
                    p.style.left = `${10 + Math.random() * 80}%`;
                    p.style.animationDelay = `${Math.random() * 2}s`;
                    p.style.animationDuration = `${(weatherName === 'rain' ? 1.5 : 4) + Math.random()}s`;
                    particles.appendChild(p);
                }
                cloudContainer.appendChild(particles);
                container.appendChild(cloudContainer);
            }
            setTimeout(() => { container.style.opacity = 1; }, 50);
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.classList.contains('mes')) {
                            const prevMessage = node.previousElementSibling;
                            if (prevMessage && prevMessage.classList.contains('mes') && !prevMessage.querySelector('.weather-container')) {
                                
                                // ★★★ 智能逻辑核心 ★★★
                                const messageTextElement = prevMessage.querySelector('.mes_text');
                                const messageText = messageTextElement ? messageTextElement.innerText : '';
                                
                                // 1. 分析文本情感
                                const result = sentiment.analyze(messageText);
                                const score = result.score; // score > 0 是积极, < 0 是消极, == 0 是中性
                                
                                // 2. 根据情感分数决定天气
                                let weatherName;
                                if (score > 0) {
                                    weatherName = 'sun'; // 积极情绪 -> 晴天
                                } else if (score < 0) {
                                    weatherName = 'rain'; // 消极情绪 -> 雨天
                                } else {
                                    weatherName = 'snow'; // 中性情绪 -> 雪天 (一种宁静的感觉)
                                }
                                // ★★★★★★★★★★★★★★★★★
                                
                                const weatherContainer = document.createElement('div');
                                weatherContainer.className = 'weather-container';
                                prevMessage.appendChild(weatherContainer);
                                createWeather(weatherContainer, weatherName);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(chatElement, { childList: true });
        console.log("🌦️ Sentimental Weather extension (v4.0.0) loaded successfully!");
    }
})();
