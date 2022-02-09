const gameBoard = (() => {
  let _board = ["","","","","","","","",""];
  let _numSquareFilled = 0;
  let _currentPlayer = "X";

  const getBoard = () => {
      return _board;
  }

  const getPlayer = () => {
    return _currentPlayer;
  }

  const checkTie = () => {
    return _numSquareFilled === 9;
  }

  const checkWinner = (input) => {

    for (let i = 0; i < 3; i++) {
      // check cols
      if ((_board[i] === _board[i+3] && _board[i+3] === _board[i+6]) && _board[i] === input) {
        return true
      }
    }

    for (let i = 0; i < 3; i++) {
      // check rows
      let j = i*3;
      if ((_board[j] === _board[j+1] && _board[j+1] === _board[j+2]) && _board[j] === input) {
        return true;
      }
    }

    //check diagonals
    if ((_board[0] === _board[4] && _board[4] === _board[8]) && _board[4] === input) {
      return true;
    }
    else if ((_board[2] === _board[4] && _board[4] === _board[6]) && _board[4] === input) {
      return true;
    }
    else {
      return false;
    }

  }

  const clearBoard = () => {
    _board = ["","","","","","","","",""];
    _numSquareFilled = 0;
    _currentPlayer = "X";
  }

  const updateBoard = (index) => {
    _board[index] = _currentPlayer;
    _numSquareFilled += 1;

    if (_currentPlayer == "X") {
      _currentPlayer = "O";
    }
    else {
      _currentPlayer = "X";
    }

  }

  const getBoardElement = (index) => {
    return _board[index];
  }

  return {
      getBoard,
      updateBoard,
      getBoardElement,
      clearBoard,
      checkWinner,
      checkTie,
      getPlayer
  }
})();

const displayController = (() => {

  let gameDisplay = document.querySelectorAll('div.square');
  let isGameFinished = false;
  const gameText = document.querySelector('div.game-text');

  gameDisplay.forEach((square) => {
    square.addEventListener('click', () => {
      if (isGameFinished) {
        return;
      }
      let boardIndex = parseInt(square.getAttribute("data-index"));
      if (gameBoard.getBoardElement(boardIndex)) {
        gameText.innerHTML = "Can't move here! Player " + gameBoard.getPlayer() + "'s move";
        return;
      }
      else {
        gameBoard.updateBoard(boardIndex);
        displayController.displayBoard();
        if (gameBoard.checkWinner("O")) {
          gameText.innerHTML = "Player O wins"
          isGameFinished = true;
        }
        else if (gameBoard.checkWinner("X")) {
          gameText.innerHTML = "Player X wins"
          isGameFinished = true;
        }
        else if (gameBoard.checkTie()) {
          gameText.innerHTML = "Tie game"
          isGameFinished = true;
        }
        else {
          gameText.innerHTML = "Player " + gameBoard.getPlayer() + "'s move";
        }
      }
    });

  });

  const displayBoard = () => {
      const display = gameBoard.getBoard();

      for (let i = 0; i < display.length; i++) {
        gameDisplay[i].innerHTML = display[i];
      }

  };

  const resetButton = document.querySelector('button.reset-button');
  resetButton.addEventListener('click', () => {
      isGameFinished = false;
      gameBoard.clearBoard();
      displayBoard();
      gameText.innerHTML = "Player X's move"
  });

  return {
    displayBoard
  };
})();
