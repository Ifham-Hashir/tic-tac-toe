
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
      switchPlayerTurn();
      printNewRound();
      gameBoard.checkForWin();
      gameBoard.checkForTie();
    }else {
        playRound();
    }
  }

  const game = (() => {
    printNewRound();
    while(true) {
      if(gameBoard.checkForWin() === true) {
        switchPlayerTurn();
        console.log(`${getActivePlayer().name} Won`)
        break;
      } 
      else if(gameBoard.checkForTie() === true){
        switchPlayerTurn();
        console.log("It's a tie");
        break;
      }
      else if(gameBoard.checkForWin() === false){
        console.log(`${getActivePlayer().name}'s turn.`);
        playRound();
      }
    }
  }) ();

  return {
    game,
  }
};


gameController();