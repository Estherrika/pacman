'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPER_FOOD = '&#10045;'

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0,
}

var gBoard

function init() {
    showBoardContainer()
    gGame.foodCount = 0
    updateScore(0)
    gGhosts = []

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gCherryInterval = setInterval(addCherry, 15000)
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []


    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }

    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    gGame.foodCount -= 5
    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    if (diff === 0) {
        gGame.score = 0
    }
    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}

function gameOver(isVictory) {
    console.log('Game Over')

    clearInterval(gGhostsInterval)
    clearInterval(gCherryInterval)
    showGameOver()
    const elMsgSpan = document.querySelector('.game-over .msg')
    elMsgSpan.innerText = isVictory ? 'VICTORY' : 'GAME OVER'
    gGame.isOn = false

}


function showBoardContainer() {
    showElement('.board-container')
    hideElement('.game-over')
}

function showGameOver() {
    hideElement('.board-container')
    showElement('.game-over')
}

function showElement(selector) {
    const el = document.querySelector(selector)
    el.classList.remove('hide')
}

function hideElement(selector) {
    const el = document.querySelector(selector)
    el.classList.add('hide')
}


function countFood() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) {
                gGame.foodCount++
            }
        }
    }
    console.log('countFood', gGame.foodCount)
}