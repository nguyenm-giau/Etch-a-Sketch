const gridContainer = document.querySelector(".grid-container")
const gridSizeSlider = document.querySelector(".input-slider")
const gridValueText = document.querySelector(".grid-size")
const toggleGrid = document.querySelector(".toggle-grid")


const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "#000000" // black
const DEFAULT_GRID_COLOR = "#FFFFFF" // white

let userGridSize = DEFAULT_GRID_SIZE
let userColor = DEFAULT_COLOR
let isMouseDown
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



const showModalGrid = () => {
    const gridSizeModal = document.querySelector(".grid-size-modal");
    const gridSizeInput = document.querySelector(".grid-size-input");
    const cancelBtn = document.querySelector(".cancel-btn");
    const applyBtn = document.querySelector(".apply-btn");

    gridSizeModal.style.display = "inline-block";
    gridSizeInput.focus()

    applyBtn.addEventListener("click", () => {
        const modalContent = document.querySelector(".modal-content");

        let errorText = document.querySelector(".error-message");
        
        if (gridSizeInput.value > 64 || gridSizeInput.value < 2) {
            if (!errorText) {
                errorText = document.createElement("p");
                errorText.textContent = "Please enter a number between 2 and 64";
                errorText.classList.add("error-message");
                modalContent.insertBefore(errorText, gridSizeInput);
            }
            gridSizeInput.focus()
        } else {
            if (errorText) {
                errorText.remove();
            }
            userGridSize = gridSizeInput.value;
            gridSizeModal.style.display = "none";
            gridValueText.textContent = `${userGridSize} x ${userGridSize}`
            gridSizeSlider.value = userGridSize
            createGrid();
        }
    });

    cancelBtn.addEventListener("click", () => {
        const errorText = document.querySelector(".error-message")
        gridSizeModal.style.display = "none"
        gridSizeInput.value = ""
        if (errorText) {
            errorText.remove();
        }
    });
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
    const eraserBtn = document.querySelector(".erase")
    const darkenBtn = document.querySelector(".darken-btn")
    const clearBtn = document.querySelector(".clear-btn")
    const colorPicker = document.querySelector(".color-picker")
    const hideGridBtn = document.querySelector(".hide-grid-btn")
    const resetAllBtn = document.querySelector(".reset-btn")

    hideGridBtn.addEventListener("click", () => {
        hideGridBtn.classList.toggle("hidden")
        const squareBoxes = document.querySelectorAll(".square-box")
        if (hideGridBtn.classList.contains("hidden")) {
            squareBoxes.forEach(square => {
                document.querySelector(".btn-grid-img").src = "./img/icons8-border-48.png"
                toggleGrid.textContent = "Show"
                square.style.border = "none"
            })
        } else {
            squareBoxes.forEach(square => {
                document.querySelector(".btn-grid-img").src = "./img/icons8-border-32.png"
                toggleGrid.textContent = "Hide"
                square.style.border = "1px solid rgb(175, 173, 173)"
            })
        }
        
    })

    colorPicker.value = DEFAULT_COLOR
    colorPicker.addEventListener("input", (e) => userColor = e.target.value)

    userSizeBtn.addEventListener("click",showModalGrid)

    randomColorBtn.addEventListener("click", () => {
        currentMode = "Random"
        highlightActiveButton(randomColorBtn)
    })

    eraserBtn.addEventListener("click", () => {
        currentMode = "Eraser"
        highlightActiveButton(eraserBtn)
        applyCursorStyle(gridContainer, eraserBtn)
    })

    clearBtn.addEventListener("click", () => {
        const squareBoxes = document.querySelectorAll(".square-box")
        squareBoxes.forEach(square => {
            square.style.backgroundColor = DEFAULT_GRID_COLOR
            square.style.opacity = ""
        })
    })

    gridSizeSlider.value = DEFAULT_GRID_SIZE
    gridValueText.textContent = `${DEFAULT_GRID_SIZE} x ${DEFAULT_GRID_SIZE}`
    gridSizeSlider.addEventListener("input", (e) => {
        if (hideGridBtn.classList.contains("hidden")) {
            hideGridBtn.classList.remove("hidden")
            toggleGrid.textContent = "Hide"
            createGrid()
        }

        gridValueText.textContent = `${e.target.value} x ${e.target.value}`
        userGridSize = e.target.value
        createGrid()

    })


    resetAllBtn.addEventListener("click", () => {
        resetButtonStyles()

        hideGridBtn.classList.remove("hidden")
        toggleGrid.textContent = "Hide"

        currentMode = ""
        userGridSize = DEFAULT_GRID_SIZE
        userColor = DEFAULT_COLOR
        colorPicker.value = DEFAULT_COLOR
        gridSizeSlider.value = DEFAULT_GRID_SIZE
        gridValueText.textContent = `${DEFAULT_GRID_SIZE} x ${DEFAULT_GRID_SIZE}`
        createGrid()
    })


    darkenBtn.addEventListener("click", () => {
        currentMode = "Darken"
        highlightActiveButton(darkenBtn)
        applyCursorStyle(gridContainer, darkenBtn)
    })
}

const applyCursorStyle = (element, btn) => {
    if (btn.classList.contains("erase") && btn.classList.contains("select")) {
        const eraseImg = "./img/icons8-eraser-tool-24.png"
        element.style.cursor = `url(${eraseImg}) ,auto`
    } else {
         element.style.cursor = `auto`
    }
}


const resetButtonStyles = () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        applyCursorStyle(gridContainer, button);
        button.classList.remove("select");
        button.style.backgroundColor = "";
        button.style.color = "";
    });
};

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
                button.style.backgroundColor = "#01062E";
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

const applyDarkeningEffect = (element) => {
    if (element.style.opacity === '') {
        element.style.opacity = 0.1;
    } else {
        element.style.opacity = Math.min(parseFloat(element.style.opacity) + 0.1, 1);
    }
};


const coloring = (element) => {
    if (currentMode === "Random") {
        element.style.backgroundColor = getRandomColor()
    } else if (currentMode === "Eraser") {
        element.style.opacity = ""
        element.style.backgroundColor = DEFAULT_GRID_COLOR
    } else if (currentMode === "Darken") {
        element.style.backgroundColor =  userColor
        applyDarkeningEffect(element)
    } else {
        element.style.backgroundColor = userColor
        element.style.opacity = 1
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
