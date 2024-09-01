const gridContainer = document.querySelector(".grid-container")

const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "black"

let userGridSize = DEFAULT_GRID_SIZE
let userColor = DEFAULT_COLOR

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


const userButtons = () => {
    const userSizeBtn = document.querySelector(".user-grid-btn")
    const randomColorBtn = document.querySelector(".random-color")

    userSizeBtn.addEventListener("click",getUserGridSize)

    randomColorBtn.addEventListener("click", () => {
        userColor = "Random"
    })

}


const coloring = (element) => {
    if (userColor === "Random") {
        element.style.backgroundColor = getRandomColor()
    } else {
        element.style.backgroundColor = userColor
    }
}

let isMouseDown = false

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

userButtons()
createGrid()