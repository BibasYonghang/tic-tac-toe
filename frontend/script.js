// Select DOM elements
let boxes = document.querySelectorAll('.box-cell');
let resetButton = document.querySelector('.reset-button');
let msgContainer = document.querySelector('#msg-container');
let msg = document.querySelector('#msg');

let turnO = true;
const winPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Reset game
const resetGame = () => {
    turnO = true;
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
    msgContainer.classList.remove("show");
    msg.innerText = "";
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Show winner
const showWinner = (winner) => {
    msg.innerText = `🎉 Winner: ${winner}`;
    msgContainer.classList.add("show");

    disableBoxes(); // prevent further clicks
};

// Check winner or draw
const checkWinner = () => {
    for (let pattern of winPattern) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText);
            disableBoxes();
            setTimeout(() => {
                box.innerText = "";
                resetGame()
            }, 1500);
            return true;
        }
    }

    // Draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "🤝 It's a Draw!";
        msgContainer.classList.add("show");
        disableBoxes();
        setTimeout(() => {
            resetGame()
        }, 1500);

        return true;
    }

    return false;
};

// Box click
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // guard clause

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;

        if (!checkWinner()) turnO = !turnO;
    });
});

// Reset button
resetButton.addEventListener("click", resetGame);
