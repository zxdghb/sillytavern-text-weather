/* Text Weather Extension - script.js (Final Version) */
(function() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initWeatherEffect();
    } else {
        document.addEventListener('DOMContentLoaded', initWeatherEffect);
    }

    function initWeatherEffect() {
        const weatherTypes = [
            { name: 'rain', className: 'weather-rain' },
            { name: 'snow', className: 'weather-snow' },
            { name: 'sun', className: 'weather-sun' }
        ];

        const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

        function applyWeather(container, weather) {
            // 移除旧的天气class
            container.className = 'weather-container-active'; // 一个基础class
            // 添加新的天气class
            setTimeout(() => {
                container.classList.add(weather.className);
            }, 10); // 短暂延迟确保class切换生效
        }
        
        // 创建一个全局的天气样式表，这样我们就不需要为每个消息都创建一遍
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            .weather-container-active.weather-rain::before { content: ''; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 70 45'%3E%3Cpath d='M55.5,45h-41C6.5,45,0,38.5,0,30.5S6.5,16,14.5,16c1.5,0,3,0.2,4.4,0.7C22.3,7.9,31.2,2,41.5,2C52.8,2,62,11.2,62,22.5c0,1.8-0.2,3.6-0.7,5.3c4.6,0.8,8.2,4.8,8.2,9.7C69.5,43.2,63.2,45,55.5,45z' fill='%23a0c4ff'/%3E%3C/svg%3E"); background-size: contain; background-repeat: no-repeat; animation: cloud-float 6s ease-in-out infinite; z-index: 10; }
            .weather-container-active.weather-rain::after { content: '雨'; font-family: sans-serif; font-size: 16px; color: transparent; position: absolute; bottom: -5px; left: 50%; width: 1px; height: 1px; text-shadow: -25px 0px 0 #8cb7ff, -10px -15px 0 #8cb7ff, 5px 5px 0 #8cb7ff, 20px -10px 0 #8cb7ff, 35px 10px 0 #8cb7ff; animation: fall-rain-text 2.2s linear infinite; }
            .weather-container-active.weather-snow::before { content: ''; }
            .weather-container-active.weather-snow::after { content: '❄️'; font-size: 18px; color: transparent; position: absolute; bottom: 0; left: 50%; width: 1px; height: 1px; text-shadow: -30px 0px 0 #e0f2fe, -15px -15px 0 #e0f2fe, 0px 5px 0 #e0f2fe, 15px -10px 0 #e0f2fe, 30px 10px 0 #e0f2fe; animation: fall-snow-emoji 5s linear infinite; }
            .weather-container-active.weather-sun::before { content: '☀️'; font-size: 45px; position: absolute; top: 10px; left: 50%; transform: translateX(-50%); animation: spin-sun 15s linear infinite; z-index: 2; }
            .weather-container-active.weather-sun::after { content: ''; }
            @keyframes cloud-float { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-45%, -3px); } }
            @keyframes fall-rain-text { to { transform: translateY(60px); opacity: 0; } }
            @keyframes fall-snow-emoji { to { transform: translateY(70px) translateX(15px); opacity: 0; } }
            @keyframes spin-sun { to { transform: translateX(-50%) rotate(360deg); } }
        `;
        document.head.appendChild(styleSheet);


        const chatElement = document.getElementById('chat');
        if (!chatElement) return;
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.classList.contains('mes')) {
                            const prevMessage = node.previousElementSibling;
                            if (prevMessage && prevMessage.classList.contains('mes')) {
                                // 为前一个消息创建一个天气容器（如果还没有）
                                if (!prevMessage.querySelector('.weather-container-active')) {
                                    const weatherContainer = document.createElement('div');
                                    prevMessage.appendChild(weatherContainer);
                                    
                                    const randomWeather = getRandomItem(weatherTypes);
                                    applyWeather(weatherContainer, randomWeather);
                                }
                            }
                        }
                    });
                }
            });
        });

        observer.observe(chatElement, { childList: true });
        console.log("🌦️ Final Text Weather extension loaded successfully!");
    }
})();