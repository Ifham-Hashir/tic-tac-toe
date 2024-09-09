const gameBoard = (() => {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(j);
    }
  }
  return {board};
}) ();

console.log(gameBoard);

function createPlayers (playerOne, playerTwo){
  const players = [
    {
      playerName: playerOne,
      token: "X",
    },
    {
      playerName: playerTwo,
      token: "O",
    }
  ];

  return {players};
}

console.log(createPlayers("Ifham", "Metal"));