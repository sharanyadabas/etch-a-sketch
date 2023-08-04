const container = document.querySelector('.container')
let gridSize = 10
let colorMode = ''
let drawMode = ''
let clicked = false
let grid

const slider = document.querySelector('#myRange')
const sliderText = document.querySelector('#sliderText')

sliderText.textContent = `${slider.value} x ${slider.value}`
slider.oninput = () => {
    sliderText.textContent = `${slider.value} x ${slider.value}`
    removeGrid()
    rainbowBTN.classList.remove('selected')
    originalBTN.classList.remove('selected')
    hoverBTN.classList.remove('selected')
    dragBTN.classList.remove('selected')
    gridSize = slider.value
    createGrid()
}

const originalBTN = document.querySelector('#original')
const rainbowBTN = document.querySelector('#rainbow')
const dragBTN = document.querySelector('#drag')
const hoverBTN = document.querySelector('#hover')

originalBTN.onclick = () => {
    rainbowBTN.classList.remove('selected')
    originalBTN.classList.add('selected')
    colorMode = 'original'
    reset()
    draw()
}

rainbowBTN.onclick = () => {
    originalBTN.classList.remove('selected')
    rainbowBTN.classList.add('selected')
    colorMode = 'rainbow'
    reset()
    draw()
}

dragBTN.onclick = () => {
    hoverBTN.classList.remove('selected')
    dragBTN.classList.add('selected')
    drawMode = 'drag'
    reset()
    draw()
}

hoverBTN.onclick = () => {
    dragBTN.classList.remove('selected')
    hoverBTN.classList.add('selected')
    drawMode = 'hover'
    reset()
    draw()
}

createGrid()
draw()

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        const parent = document.createElement('div')
        parent.classList.add('row')
        container.appendChild(parent)

        for (let j = 0; j < gridSize; j++) {
            const child = document.createElement('div')
            child.classList.add('box')
            parent.appendChild(child)
        }
    }
}

function removeGrid() {
    const rows = document.querySelectorAll('.row')
    rows.forEach((row) => container.removeChild(row))
}

function reset() {
    clicked = false
    grid.forEach((pixel) => {
        pixel.classList.remove('colored', 'hover1', 'hover2', 'hover3', 'hover4', 'hover5')
        pixel.style = ""
    })
}

function draw() {
    grid = document.querySelectorAll('.box')
    grid.forEach((pixel) => {
        if (drawMode === 'drag') {
            pixel.addEventListener('mousedown', () => clicked = true)
            pixel.addEventListener('mousemove', dragged)
            pixel.addEventListener('mouseup', () => clicked = false)
        }
        if (drawMode === 'hover')
            pixel.addEventListener('mouseover', hover)
    })
}

function hover() {
    if (drawMode === 'drag')
        return
    if (colorMode === 'original')
        colorOriginal(this)
    if (colorMode === 'rainbow')
        colorRainbow(this)
}

function dragged() {
    if (drawMode === 'hover')
        return
    if (clicked) {
        if (colorMode === 'original')
            colorOriginal(this)
        else if (colorMode === 'rainbow')
            colorRainbow(this)
    }
}

function colorOriginal(obj) {
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