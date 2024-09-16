
  const gameBoard = () => {
    const board = [];
    let k = 1;
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i].push(Cell());
        k++;
      }
    }

    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
    };
    return {printBoard};
  };

  const createPlayers = function (){
    const players = [
      {
        playerName: "You",
        token: "X",
      },
      {
        playerName: "Computer",
        token: "O",
      }
    ];
  
    return {players};
  };

  function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }


function gameController ( playerOneName = "PlayerX", playerTwoName = "PlayerO") {
  const board = gameBoard();

  const players = [
    {
      name: playerOneName,
      token: "X"
    },
    {
      name: playerTwoName,
      token: "O"
    }
  ];

  const printNewRound = () => {
    board.printBoard();
    // console.log(`${getActivePlayer().name}'s turn.`);
  };

  printNewRound();
}

const game = gameController();
