const PLAYFILED_COLUMNS = 10;
const PLAYFILED_ROWS = 20;
const TETROMINO_NAMES = ["I", "J", "L", "O", "S", "Z", "T"];

const TETROMINOES = {
    "I": [
        [1],
        [1],
        [1],
        [1]
    ],

    "J": [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],

    "L": [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],

    "O": [
        [1, 1],
        [1, 1]
    ],

    "S": [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],

    "Z": [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],

    "T": [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]

};

function convertPositionToIndex(row, column) {
    return row * PLAYFILED_COLUMNS + column;
}

let playfield;
let tetromino;

function generatePlayField() {
    for (let i = 0; i < PLAYFILED_ROWS * PLAYFILED_COLUMNS; i++) {
        const div = document.createElement("div");
        document.querySelector(".grid").append(div);
    }

    playfield = new Array(PLAYFILED_ROWS).fill()
        .map(() => new Array(PLAYFILED_COLUMNS).fill(0))
}

generatePlayField();

function getRandomTetromino() {
    const randomIndex = Math.floor(Math.random() * TETROMINO_NAMES.length);
    const name = TETROMINO_NAMES[randomIndex];
    const matrix = TETROMINOES[name];
    
    return {
        name,
        matrix,
        row: 0,
        column: Math.floor((PLAYFILED_COLUMNS - matrix[0].length) / 2)
    };
}

function generateTetromino() {
    tetromino = getRandomTetromino();
}

generateTetromino();

const cells = document.querySelectorAll(".grid div");
function drowPlayField() {
    for (let row = 0; row < PLAYFILED_ROWS; row++) {
        for (let column = 0; column < PLAYFILED_COLUMNS; column++) {
            if (playfield[row][column] == 0) continue;
            const name = playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }

}

function drowTetromino() {
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (!tetromino.matrix[row][column]) continue;
            const cellIndex = convertPositionToIndex(
                tetromino.row + row,
                tetromino.column + column
            );
            cells[cellIndex].classList.add(name);
        }
    }
}


function draw() {
    cells.forEach(cell => cell.removeAttribute("class"));
    drowTetromino();
    drowPlayField();
}

draw();

document.addEventListener("keydown", onKeyDown);
function onKeyDown(e) {
    switch (e.key) {
        case "ArrowDown":
            moveTetrominoDown();
            break;
        case "ArrowLeft":
            moveTetrominoLeft();
            break;
        case "ArrowRight":
            moveTetrominoRight();
            break;
    };

    draw();
}

function moveTetrominoDown() {
    tetromino.row += 1;
}

function moveTetrominoLeft() {
    tetromino.column -= 1;
}

function moveTetrominoRight() {
    tetromino.column += 1;
}