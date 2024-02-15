'use strict'

const GHOST = '&#9781'
var gGhosts = []
var gDeadGhosts = []



var gGhostsInterval

function createGhosts(board) {
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost(board, i) {
    const ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
        color: getRandomColor(),
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    const forbiddenNextCells = [WALL, GHOST, SUPER_FOOD, CHERRY]
    if (forbiddenNextCells.includes(nextCell)) return

    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver(false)
        return
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)

    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    renderCell(ghost.location, getGhostHTML(ghost))
}


function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span style="color: ${color}">${GHOST}</span>`
}