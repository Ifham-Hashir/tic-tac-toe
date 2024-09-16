
  const gameBoard = (() => {
    const board = [];
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i].push(0);
      }
    }

    const dropToken = (row, col, player) => {
      if(board[row][col] === 0){
        board[row][col] = player;
      }
      else {
        return;
      }
    }

    return {
      board,
      dropToken,
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
    console.log(board);
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row = prompt("Enter row:"), col = prompt("Enter col:")) => {
    console.log(`Dropping ${getActivePlayer().name}'s token...`);
    gameBoard.dropToken(row,col, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();
  playRound();
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(board[i][j] === 0)
        playRound();
    }
  }
}

gameController();
