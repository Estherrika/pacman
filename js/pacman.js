'use strict'
const CHERRY = '&#127826'
const PACMAN = '🙃'
var gPacman
var gCherryInterval


function createPacman(board) {
    gPacman = {
        location: { i: 3, j: 5 },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            gGhosts.push(...gDeadGhosts)
            gDeadGhosts = []
            console.log('gGhosts:', gGhosts)
        }, 5000)
    }

    if (nextCell === GHOST) {
        if (!gPacman.isSuper) return gameOver(false)
        eatGhost(nextLocation)
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount--
    }
    
    if (nextCell === CHERRY) {
        updateScore(10)
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    renderCell(gPacman.location, EMPTY)


    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    renderCell(gPacman.location, PACMAN)



    if (gGame.foodCount === 0) {
        console.log('victory')
        gGame.victory = true
        gameOver(true)
    }
}

function eatGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
            var deadGhost = gGhosts.splice(i, 1)[0]
            gDeadGhosts.push(deadGhost)
            if (ghost.currCellContent === FOOD) {
                updateScore(1)
                gGame.foodCount--
                ghost.currCellContent = EMPTY
            }
            return
        }
    }
}

function getNextLocation(eventKeyboard) {
    const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break;

        case 'ArrowDown':
            nextLocation.i++
            break;

        case 'ArrowLeft':
            nextLocation.j--
            break;

        case 'ArrowRight':
            nextLocation.j++
            break;

        default: return null
    }
    return nextLocation
}
function addCherry() {

    var cell = getEmptyCell()
    if (!cell) return
    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell, CHERRY)
}

function getEmptyCell() {
    var emptyCells = []

    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === EMPTY) {
                emptyCells.push({ i, j })
            }
        }

    }
    if (!emptyCells.length) return null

    var randomIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    return emptyCells[randomIdx]

}