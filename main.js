document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultsContainer = document.getElementById('results-container');
    const countInput = document.getElementById('count-input');
    const themeCheckbox = document.getElementById('checkbox');
    const currentTimeDisplay = document.getElementById('current-time');
    const countdownDisplay = document.getElementById('lotto-countdown');

    // Function to get a random color for the lottery balls
    const getRandomColor = () => {
        const colors = [
            '#fbc400', // Yellow
            '#69c8f2', // Blue
            '#ff7272', // Red
            '#aaa',    // Gray
            '#b0d840'  // Green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const generateLottoNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 7) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        const bonusNumber = sortedNumbers.pop();
        return { mainNumbers: sortedNumbers, bonusNumber };
    };

    const displayNumbers = () => {
        resultsContainer.innerHTML = ''; // Clear previous results
        const count = parseInt(countInput.value, 10);

        if (isNaN(count) || count < 1 || count > 10) {
            alert('1과 10 사이의 숫자를 입력해주세요.');
            return;
        }

        for (let i = 0; i < count; i++) {
            const { mainNumbers, bonusNumber } = generateLottoNumbers();

            const numbersContainer = document.createElement('div');
            numbersContainer.className = 'numbers-container';

            mainNumbers.forEach(num => {
                const numberDiv = document.createElement('div');
                numberDiv.className = 'number';
                numberDiv.textContent = num;
                numberDiv.style.backgroundColor = getRandomColor();
                numbersContainer.appendChild(numberDiv);
            });

            const plusSign = document.createElement('div');
            plusSign.className = 'plus-sign';
            plusSign.textContent = '+';
            numbersContainer.appendChild(plusSign);

            const bonusDiv = document.createElement('div');
            bonusDiv.className = 'number';
            bonusDiv.textContent = bonusNumber;
            bonusDiv.style.backgroundColor = getRandomColor();
            numbersContainer.appendChild(bonusDiv);

            resultsContainer.appendChild(numbersContainer);
        }
    };

    // Theme switcher logic
    const applyTheme = (isDarkMode) => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Reset Disqus if it exists to re-detect theme
        // Use a small timeout to allow CSS transitions to reach a state where Disqus can sample the color
        if (typeof DISQUS !== 'undefined') {
            setTimeout(() => {
                DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.identifier = window.location.pathname;
                        this.page.url = window.location.href;
                    }
                });
            }, 300);
        }
    };

    themeCheckbox.addEventListener('change', (event) => {
        applyTheme(event.target.checked);
    });

    // Clock and Countdown logic
    const updateClockAndCountdown = () => {
        const now = new Date();
        
        // Update current time
        const options = { 
            year: 'numeric', month: 'long', day: 'numeric', 
            weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit' 
        };
        currentTimeDisplay.textContent = `현재 시간: ${now.toLocaleDateString('ko-KR', options)}`;

        // Calculate next Saturday 20:45
        let nextDraw = new Date(now);
        nextDraw.setHours(20, 45, 0, 0);
        
        // 0 is Sunday, 6 is Saturday
        const dayDiff = (6 - now.getDay() + 7) % 7;
        nextDraw.setDate(now.getDate() + dayDiff);

        // If it's already past 20:45 on Saturday, move to next Saturday
        if (now > nextDraw) {
            nextDraw.setDate(nextDraw.getDate() + 7);
        }

        const diff = nextDraw - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownDisplay.textContent = `다음 추첨까지: ${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
    };

    // Load saved theme or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : true; // Default to dark mode
    themeCheckbox.checked = shouldBeDark;
    applyTheme(shouldBeDark);

    generateBtn.addEventListener('click', displayNumbers);

    // Initial setup
    displayNumbers();
    updateClockAndCountdown();
    setInterval(updateClockAndCountdown, 1000);
});
