let spinning = false;

function randomPick() {
    const inputs = document.querySelectorAll('.input-data');
    const resultDiv = document.getElementById('result');

    if (inputs.length === 0) {
        resultDiv.innerHTML = 'Nincs adat a sorsoláshoz.';
        return;
    }

    const randomIndex = Math.floor(Math.random() * inputs.length);
    const selectedInput = inputs[randomIndex];
    const selectedData = selectedInput.value;

    // Töröljük az esetleges korábbi kiemeléseket és nagyításokat
    inputs.forEach(input => {
        input.classList.remove('highlighted', 'zoom');
    });

    // Kiemeljük a kiválasztott mezőt és nagyítjuk
    selectedInput.classList.add('highlighted', 'zoom');
    resultDiv.innerHTML = `A kisorsolt adat: ${selectedData}`;
}

function addInput() {
    const inputsContainer = document.getElementById('inputs');
    const inputRow = document.createElement('div');
    inputRow.className = 'input-row';
    inputRow.innerHTML = `
        <input type="text" placeholder="Adat" class="input-data" autofocus onkeyup="handleKeyUp(event)">
        <button class="remove-button" onclick="removeInput(this)">Töröl</button>
    `;
    inputsContainer.appendChild(inputRow);

    // Állítsuk be az új mező fókuszát
    const newInput = inputRow.querySelector('.input-data');
    newInput.focus();
}

function removeInput(button) {
    const inputRow = button.parentNode;
    inputRow.parentNode.removeChild(inputRow);

    // Frissítsük a "Töröl" gombokat
    updateRemoveButtonVisibility();
}

function handleKeyUp(event) {
    if (event.key === 'Enter') {
        addInput();
    }
}

function updateRemoveButtonVisibility() {
    const inputs = document.querySelectorAll('.input-data');
    const removeButtons = document.querySelectorAll('.remove-button');

    // Ellenőrizzük, hogy van-e több mint egy input mező
    if (inputs.length > 1) {
        removeButtons.forEach(button => {
            button.style.display = 'inline-block';
        });
    } else {
        removeButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
}

function reset() {
    const inputsContainer = document.getElementById('inputs');
    const resultDiv = document.getElementById('result');
    
    // Töröljük az eredményt
    resultDiv.innerHTML = '';

    // Töröljük az összes input mezőt, kivéve az elsőt
    const inputs = document.querySelectorAll('.input-data');
    for (let i = 1; i < inputs.length; i++) {
        inputs[i].parentNode.parentNode.removeChild(inputs[i].parentNode);
    }
    
    // Töröljük az első input mező tartalmát
    inputs[0].value = '';

    // Frissítsük a "Töröl" gombokat
    updateRemoveButtonVisibility();
}
