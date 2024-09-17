
  const gameBoard = (() => {
    const board = [];
    for (let i = 1; i <= 9; i++) {
      board.push(i);
    }

    const winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];

    const dropToken = (cell, player) => {
      if(board[cell - 1] !== 'X' || board[cell - 1] !== 'O'){
        board[cell - 1] = player;
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
    console.log(board[0] + " " + board[1] + " " + board[2]);
    console.log(board[3] + " " + board[4] + " " + board[5]);
    console.log(board[6] + " " + board[7] + " " + board[8]);
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (cell = prompt("Enter Cell:")) => {
    if(cell > 0 && cell < 10){
      console.log(`Dropping ${getActivePlayer().name}'s token...`);
      gameBoard.dropToken(cell, getActivePlayer().token);
      switchPlayerTurn();
      printNewRound();
    }else {
      playRound();
    }
  };

  printNewRound();
  playRound();

  return {
    playRound,
  }
}


gameController();