document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultsContainer = document.getElementById('results-container');
    const countInput = document.getElementById('count-input');
    const themeCheckbox = document.getElementById('checkbox');

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
    };

    themeCheckbox.addEventListener('change', (event) => {
        applyTheme(event.target.checked);
    });

    // Load saved theme or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : true; // Default to dark mode
    themeCheckbox.checked = shouldBeDark;
    applyTheme(shouldBeDark);

    generateBtn.addEventListener('click', displayNumbers);

    // Initial generation
    displayNumbers();
});
