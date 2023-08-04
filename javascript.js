const container = document.querySelector('.container')
const gridSize = 10
let colorMode = 'original'
let drawMode = 'hover'
let clicked = false;

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

const grid = document.querySelectorAll('.box')

if (drawMode === 'drag') {
    grid.forEach((pixel) => {
        pixel.addEventListener('mousedown', () => clicked = true)
        pixel.addEventListener('mousemove', dragged);
        pixel.addEventListener('mouseup', () => clicked = false)
    })
}

if (drawMode === 'hover') {
    grid.forEach((pixel) => pixel.addEventListener('mouseover', hover))
}

function hover() {
    if (colorMode === 'original')
        colorOriginal(this)
    else if (colorMode === 'rainbow')
        colorRainbow(this)
}

function dragged() {
    if (clicked && colorMode === 'original')
        colorOriginal(this)
    else if (clicked && colorMode === 'rainbow')
        colorRainbow(this)
}

function colorOriginal(obj) {
    console.log("color")
    if (obj.classList.contains('hover1')) {
        obj.classList.remove('hover1')
        obj.classList.add('hover2')
    } else if (obj.classList.contains('hover2')) {
        obj.classList.remove('hover2')
        obj.classList.add('hover3')
    } else if (obj.classList.contains('hover3')) {
        obj.classList.remove('hover3')
        obj.classList.add('hover4')
    } else if (obj.classList.contains('hover4')) {
        obj.classList.remove('hover4')
        obj.classList.add('hover5')
    } else {
        obj.classList.add('hover1')
    }
}

function colorRainbow(obj) {
    if (!obj.classList.contains('colored')) {
        obj.style.background = randomColor()
        obj.classList.add('colored')
    }
}

function randomColor() {
    let r = Math.round(Math.random() * 255)
    let b = Math.round(Math.random() * 255)
    let g = Math.round(Math.random() * 255)
    let a = Math.random() * 0.5 + 0.5
    return `rgba(${r},${g},${b},${a}`
}