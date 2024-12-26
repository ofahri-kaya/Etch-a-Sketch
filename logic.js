const gridColumn = document.querySelector('.grid-container');
const squaresPerSideInput = document.querySelector('.squares-per-side-input');
const squaresPerSideButton = document.querySelector('.squares-per-side-button');

let squaresPerSideCount = 5;
createGrid();

squaresPerSideButton.addEventListener('click', () => {
    deleteGrid();
    setSquaresPerSideCount();
    createGrid();
});
    
const maxGridCount = 32;

function setSquaresPerSideCount() {
    let value = squaresPerSideInput.value;
    if(isNaN(value) || value <= 0) {
        squaresPerSideCount = 1;
        squaresPerSideInput.setAttribute('placeholder', 'Enter a positive number');
        squaresPerSideInput.value = '';
        return;
    }
    if(value > maxGridCount) {
        squaresPerSideCount = maxGridCount;
        squaresPerSideInput.value = maxGridCount;
        return;
    }
    squaresPerSideInput.setAttribute('placeholder', `Max is ${maxGridCount}`)
    squaresPerSideCount = value;
}

function deleteGrid() {
    gridColumn.innerHTML = '';
}

function createGrid() {
    const squareSize = 512 / squaresPerSideCount;

    for(let x = 0; x < squaresPerSideCount; x++){
        let gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        for(let a = 0; a < squaresPerSideCount; a++){
            let square = document.createElement('div');
            square.classList.add('square');
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;
            gridRow.appendChild(square);
        }
        gridColumn.appendChild(gridRow);
    }
}

gridColumn.addEventListener('mouseover', (event) => {
    if(event.target != gridColumn && !event.target.classList.contains('active'))
        activateSquare(event);
});

function getRandomColor(){
    return colorPalette[Math.floor(Math.random()*12)];
}

const colorPalette = generateRandomPalette();

function generateRandomPalette() {
    let palette = [];
    for(let i = 0; i <12; i++) {
        let colorCode = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        palette.push(colorCode);
    }
    return palette;
}

function activateSquare(event) {
    event.target.classList.add('active');
    const colorCode = getRandomColor();
    event.target.style.backgroundColor = `#${colorCode}`;
    // event.target.style.borderColor = `#${colorCode}`;
}

