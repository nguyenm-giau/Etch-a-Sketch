
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "black"

let userGridSize = DEFAULT_GRID_SIZE

const createGrid = () => {
    const gridContainer = document.querySelector(".grid-container")
    gridContainer.style.gridTemplateColumns = `repeat(${userGridSize}, 1fr)`;

    gridContainer.innerHTML = ""

    for (let i = 0; i < userGridSize * userGridSize; i++) {
        const div = document.createElement("div")
        div.classList.add("square-box")
        gridContainer.appendChild(div)
        console.log(i)  
    }

    gridContainer.addEventListener("mouseover", e => {
        if (e.target.classList.contains("square-box")) {
            e.target.style.backgroundColor = DEFAULT_COLOR
        }
      })
}


const getUserGridSize = () => {
    const userSizeBtn = document.querySelector(".user-grid-btn")
    userSizeBtn.addEventListener("click", () => {
        let inputSize = parseInt(prompt("Enter grid size you want to create"))

        if (isNaN(inputSize) || inputSize < 0) {
            alert("Please enter a number")
        } else if (inputSize > 100)  {
            alert("Please enter a number les than 100")
        } else {
            userGridSize = inputSize
            createGrid()
        }
    })

}

getUserGridSize()
createGrid()