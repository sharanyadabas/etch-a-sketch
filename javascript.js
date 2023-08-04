const container = document.querySelector('.container')
const gridSize = 10
let colorMode = 'original'
let drawMode = 'drag'

const originalBTN = document.querySelector('#original')
const rainbowBTN = document.querySelector('#rainbow')
const dragBTN = document.querySelector('#drag')
const hoverBTN = document.querySelector('#hover')

originalBTN.onclick = () => {
    colorMode = 'original'
    reset()
}

rainbowBTN.onclick = () => {
    colorMode = 'rainbow'
    reset()
}

dragBTN.onclick = () => {
    drawMode = 'drag'
    reset()
}

hoverBTN.onclick = () => {
    drawMode = 'hover'
    reset()
}
function reset() {
    clicked = false
    console.log(`${colorMode} and ${drawMode}`)
    grid.forEach((pixel) => {
        pixel.classList.remove('colored', 'hover1', 'hover2', 'hover3', 'hover4', 'hover5')
        pixel.style = ""
    })
}

for (let i = 0; i < gridSize; i++) {
    const arr = ['a', 'b', 'c', 'd']

    const parent = document.createElement('div')
    parent.setAttribute('id', arr[i])
    parent.classList.add('row')
    container.appendChild(parent)

    for (let j = 0; j < gridSize; j++) {
        const child = document.createElement('div')
        child.classList.add('box')
        parent.appendChild(child)
    }
}

let clicked = false;
const grid = document.querySelectorAll('.box')

if (drawMode === 'drag') {
    grid.forEach((pixel) => {
        pixel.addEventListener('mousedown', () => clicked = true)
        pixel.addEventListener('mousemove', hover);
        pixel.addEventListener('mouseup', () => clicked = false)
    })
}
else if (drawMode === 'hover') {
    grid.forEach((pixel) => pixel.addEventListener('mouseover', hover))
}

function hover() {
    if ((drawMode === 'hover' || (drawMode === 'drag' && clicked)) && colorMode === 'original') {
        if (this.classList.contains('hover1')) {
            this.classList.remove('hover1')
            this.classList.add('hover2')
        } else if (this.classList.contains('hover2')) {
            this.classList.remove('hover2')
            this.classList.add('hover3')
        } else if (this.classList.contains('hover3')) {
            this.classList.remove('hover3')
            this.classList.add('hover4')
        } else if (this.classList.contains('hover4')) {
            this.classList.remove('hover4')
            this.classList.add('hover5')
        } else {
            this.classList.add('hover1')
        }
    }
    else if ((drawMode === 'hover' || (drawMode === 'drag' && clicked)) && colorMode === 'rainbow') {
        if (!this.classList.contains('colored')) {
            this.style.background = randomColor()
            this.classList.add('colored')
        }
    }
}

function randomColor() {
    let r = Math.round(Math.random() * 255)
    let b = Math.round(Math.random() * 255)
    let g = Math.round(Math.random() * 255)
    let a = Math.random() * 0.5 + 0.5
    return `rgba(${r},${g},${b},${a}`
}