const gridContainer = document.querySelector(".grid-container")
const gridValueText = document.querySelector(".grid-size")

const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "#000000" // black
const DEFAULT_GRID_COLOR = "#FFFFFF" // white

let userGridSize = DEFAULT_GRID_SIZE
let userColor = DEFAULT_COLOR
let isMouseDown = false
let currentMode


const createGrid = () => {
    gridContainer.style.gridTemplateColumns = `repeat(${userGridSize}, 1fr)`;
    gridContainer.innerHTML = ""

    for (let i = 0; i < userGridSize * userGridSize; i++) {
        const div = document.createElement("div")
        div.classList.add("square-box")
        gridContainer.appendChild(div)
    }
}


const getUserGridSize = () => {
    let inputSize = parseInt(prompt("Enter grid size you want to create"))

        if (isNaN(inputSize) || inputSize < 0) {
            alert("Please enter a number")
        } else if (inputSize > 100)  {
            alert("Please enter a number les than 100")
        } else {
            userGridSize = inputSize
            createGrid()
        }
}


const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return `rgb(${r}, ${g}, ${b})`
}


const setupButtonListeners = () => {
    const userSizeBtn = document.querySelector(".user-grid-btn")
    const randomColorBtn = document.querySelector(".random-color")
    const eraserBtn = document.querySelector(".eraser")
    const resetBtn = document.querySelector(".reset")
    const colorPicker = document.querySelector(".color-picker")
    const gridSizeSlider = document.querySelector(".input-slider")

    userSizeBtn.addEventListener("click",getUserGridSize)

    randomColorBtn.addEventListener("click", () => {
        currentMode = "Random"
        highlightActiveButton(randomColorBtn)
    })

    eraserBtn.addEventListener("click", () => {
        currentMode = "Eraser"
        highlightActiveButton(eraserBtn)
    })

    resetBtn.addEventListener("click", () => {
        const squareBoxes = document.querySelectorAll(".square-box")
        squareBoxes.forEach(square => {
            square.style.backgroundColor = DEFAULT_GRID_COLOR
        })
    })

    colorPicker.value = DEFAULT_COLOR
    colorPicker.addEventListener("input", (e) => userColor = e.target.value)

    gridSizeSlider.value = DEFAULT_GRID_SIZE
    gridValueText.textContent = DEFAULT_GRID_SIZE
    gridSizeSlider.addEventListener("input", (e) => {
        gridValueText.textContent = e.target.value
        userGridSize = e.target.value
        createGrid()
    })
}


const highlightActiveButton = (selectedButton) => {
    const buttons = document.querySelectorAll("button")

    buttons.forEach(button => {
        if (button === selectedButton) {
            // Check if the button is already selected
            if (button.classList.contains("select")) {
                // If it is, remove the selection (deselect it)
                button.style.backgroundColor = "";
                button.style.color = "";
                button.classList.remove("select");
                currentMode = ""
            } else {
                // If it's not, select it
                button.style.backgroundColor = "blue";
                button.style.color = "white";
                button.classList.add("select");
            }
        } else {
            // Deselect all other buttons
            button.style.backgroundColor = "";
            button.style.color = "";
            button.classList.remove("select");
        }
    });
}


const coloring = (element) => {
    if (currentMode === "Random") {
        element.style.backgroundColor = getRandomColor()
    } else if (currentMode === "Eraser") {
        element.style.backgroundColor = DEFAULT_GRID_COLOR
    } else {
        element.style.backgroundColor = userColor
    }
}


gridContainer.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    if (e.target.classList.contains("square-box")) {
        coloring(e.target)
    }
    e.preventDefault();
})


window.addEventListener("mouseup", () => isMouseDown = false)

gridContainer.addEventListener("mouseover", (e) => {
    if (isMouseDown && e.target.classList.contains("square-box")) {
        coloring(e.target)
    }
})


gridContainer.addEventListener("mouseup",() => isMouseDown = false )


setupButtonListeners()
createGrid()