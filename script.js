
  const gameBoard = (() => {
    const board = [];
    for (let i = 1; i <= 9; i++) {
      board.push(i);
    }

    const checkForWin = () => {
      let isWon = false;
      const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
      for(let i = 0; i < winningCombos.length; i++){
        const [a,b,c] = winningCombos[i];
        if(board[a] === board[b] && board[a] === board[c]){
          isWon = true;
        }
      }
      return isWon;
    }

    const checkForTie = () => {
      let isTie = false;
      if(board[0] !== 1 && board[1] !== 2 && board[2] !== 3 &&
        board[3] !== 4 && board[4] !== 5 && board[5] !== 6 &&
        board[6] !== 7 && board[7] !== 8 && board[8] !== 9){

          isTie = true;
      }
      return isTie;
    }

    const dropToken = (cell, player) => {
      board[cell - 1] = player;
    }

    return {
      board,
      dropToken,
      checkForWin,
      checkForTie,
    }
  }) ();



function gameController() {
  const board = gameBoard.board;

  const players = [
    {
      name: "PlayerX",
      token: "X",
    },
    {
      name: "PlayerO",
      token: "O",
    }
  ];
  
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    console.log(board[0] + " " + board[1] + " " + board[2]);
    console.log(board[3] + " " + board[4] + " " + board[5]);
    console.log(board[6] + " " + board[7] + " " + board[8]);
  };

  const playRound = (cell = prompt("Enter Cell:")) => {
    if(cell > 0 && cell < 10 && board[cell - 1] !== 'X' && board[cell - 1] !== 'O'){
      console.log(`Dropping ${getActivePlayer().name}'s token...`);
      gameBoard.dropToken(cell, getActivePlayer().token);
      if(gameBoard.checkForWin() === true) {
        printNewRound();
        console.log(`${getActivePlayer().name} Won`);
      }
      else if(gameBoard.checkForTie() === true){
        printNewRound();
        console.log("It's a tie");
      }
      else{
        switchPlayerTurn();
        printNewRound();
        console.log(`${getActivePlayer().name}'s turn.`);
        playRound();
      } 
    }else {
        playRound();
    }
  }
  console.log(`${getActivePlayer().name}'s turn.`);
  printNewRound();
  playRound();

  return {
    playRound,
    getActivePlayer,
  }
};

function screenController() {
  //const game = gameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = gameBoard.board;
    //const activePlayer = game.getActivePlayer();

    // Display player's turn
    //playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    // Render board squares
    
      board.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function 
        cellButton.dataset.column = index;
        cellButton.textContent = cell;
        boardDiv.appendChild(cellButton);
      })
  }
  updateScreen();
}
//   // Add event listener for the board
//   function clickHandlerBoard(e) {
//     const selectedColumn = e.target.dataset.column;
//     // Make sure I've clicked a column and not the gaps in between
//     if (!selectedColumn) return;
    
//     game.playRound(selectedColumn);
//     updateScreen();
//   }
//   boardDiv.addEventListener("click", clickHandlerBoard);

//   // Initial render
//   updateScreen();

//   // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
// }

screenController();