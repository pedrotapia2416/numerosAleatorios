document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('random-number-form');
    const minInput = document.getElementById('min');
    const maxInput = document.getElementById('max');
    const withRepetitionCheckbox = document.getElementById('with-repetition');
    const resultsList = document.getElementById('results-list');
    const clearResultsButton = document.getElementById('clear-results');
    let generatedNumbers = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const min = parseFloat(minInput.value);
        const max = parseFloat(maxInput.value);
        const withRepetition = withRepetitionCheckbox.checked;

        if (!isNaN(min) && !isNaN(max)) {
            const randomNumber = generateRandomNumber(min, max, withRepetition);
            displayResult(randomNumber);
        } else {
            alert('Ingresa valores numéricos válidos para el mínimo y el máximo.');
        }
    });

    function generateRandomNumber(min, max, withRepetition) {
        if (withRepetition) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            let numbers = [];
            for (let i = min; i <= max; i++) {
                if (!generatedNumbers.includes(i)) {
                    numbers.push(i);
                }
            }
            if (numbers.length === 0) {
                alert('Se han generado todos los números posibles.');
                return null;
            }
            const randomIndex = Math.floor(Math.random() * numbers.length);
            const randomNumber = numbers.splice(randomIndex, 1)[0];
            generatedNumbers.push(randomNumber);
            if (generatedNumbers.length === max - min + 1) {
                generatedNumbers = [];
            }
            return randomNumber;
        }
    }

    function displayResult(number) {
        if (number !== null) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.textContent = `Número Aleatorio: ${number}, Hora de Creación: ${getCurrentTime()}`;
            resultsList.appendChild(li);
        }
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString();
    }

    clearResultsButton.addEventListener('click', function() {
        resultsList.innerHTML = ''; // Limpia la lista de resultados
        generatedNumbers = []; // Restablece el seguimiento de números generados
    });
    
});
