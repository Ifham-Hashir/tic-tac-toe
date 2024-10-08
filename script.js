
  const gameBoard = (() => {
    const board = [];
    for (let i = 1; i <= 9; i++) {
      board.push("");
    }

    const getBoard = () => board;

    const checkForWin = () => {
      let isWon = false;
      const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
      for(let i = 0; i < winningCombos.length; i++){
        const [a,b,c] = winningCombos[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
          isWon = true;
        }
      }
      return isWon;
    }

    const checkForTie = () => {
      let isTie = false;
      if(board[0] !== "" && board[1] !== "" && board[2] !== "" &&
        board[3] !== "" && board[4] !== "" && board[5] !== "" &&
        board[6] !== "" && board[7] !== "" && board[8] !== ""){

          isTie = true;
      }
      return isTie;
    }

    const dropToken = (cell, player) => {
      board[cell] = player;
    }

    return {
      getBoard,
      dropToken,
      checkForWin,
      checkForTie,
    }
  }) ();



function gameController() {

  const players = [
    {
      name: "Player X",
      token: "X",
    },
    {
      name: "Player O",
      token: "O",
    }
  ];
  
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const playRound = (cell) => {
    gameBoard.dropToken(cell, getActivePlayer().token);
    switchPlayerTurn();
  }



  return {
    playRound,
    getActivePlayer,
    switchPlayerTurn,
  }
};

function screenController() {
  const game = gameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    //clear the board
    boardDiv.textContent = "";

    //get the newest version of the board and player turn
    const board = gameBoard.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    // Render board squares
    
      board.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the cell
        // This makes it easier to pass into our `playRound` function 
        cellButton.dataset.cell = index;
        cellButton.textContent = cell;
        boardDiv.appendChild(cellButton);
      })
  }
  updateScreen();

  // Add event listener for the board
  function clickHandlerBoard(e) {
    if(e.target.textContent !== "" || gameBoard.checkForWin() === true || gameBoard.checkForTie() === true){
      return;
    }
    const selectedCell = e.target.dataset.cell;
    // Make sure I've clicked a cell and not the gaps in between
    //if (!selectedCell) return;
    game.playRound(selectedCell);
    updateScreen();
    if(gameBoard.checkForWin() === true){
      game.switchPlayerTurn();
      const activePlayer = game.getActivePlayer();
      playerTurnDiv.textContent = `${activePlayer.name} Won!!!`;
      return;
    }

    if(gameBoard.checkForTie() === true){
      playerTurnDiv.textContent = `Tie`;
      return;
    }
  }
  const restartBtn = document.querySelector(".restart");
  restartBtn.addEventListener("click", () => {
    location.reload();
  });


  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}

screenController();