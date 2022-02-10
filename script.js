const gameBoard = (() => {
  let _board = ["","","","","","","","",""];
  let _numSquareFilled = 0;
  let _currentPlayer = "X";
  let _winningSquares = [];

  const getBoard = () => {
      return _board;
  }

  const getPlayer = () => {
    return _currentPlayer;
  }

  const checkTie = () => {
    return _numSquareFilled === 9;
  }

  const getWinningSquares = () => {
    return _winningSquares;
  }

  const checkWinner = (input) => {

    for (let i = 0; i < 3; i++) {
      // check cols
      if ((_board[i] === _board[i+3] && _board[i+3] === _board[i+6]) && _board[i] === input) {
        _winningSquares = [i, i+3, i+6];
        return true
      }
    }

    for (let i = 0; i < 3; i++) {
      // check rows
      let j = i*3;
      if ((_board[j] === _board[j+1] && _board[j+1] === _board[j+2]) && _board[j] === input) {
        _winningSquares = [j, j+1, j+2];
        return true;
      }
    }

    //check diagonals
    if ((_board[0] === _board[4] && _board[4] === _board[8]) && _board[4] === input) {
      _winningSquares = [0, 4, 8];
      return true;
    }
    else if ((_board[2] === _board[4] && _board[4] === _board[6]) && _board[4] === input) {
      _winningSquares = [2, 4, 6];
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
    _winningSquares = [];
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
      getPlayer,
      getWinningSquares
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
          endGame("Player O wins");
        }
        else if (gameBoard.checkWinner("X")) {
          endGame("Player X wins");
        }
        else if (gameBoard.checkTie()) {
          endGame("Tie game");
        }
        else {
          gameText.innerHTML = "Player " + gameBoard.getPlayer() + "'s move";
        }
      }
    });

  });

  const endGame = (inputText) => {
    gameText.innerHTML = inputText;
    let winningSquares = gameBoard.getWinningSquares();
    for (let i = 0; i < winningSquares.length; i++) {
      let winningSquare = parseInt(winningSquares[i]);
      const winningDiv = document.querySelector(`[data-index='${winningSquare}']`);
      winningDiv.style.backgroundColor = "#B9F0CD";
    }

    isGameFinished = true;
  }

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
      gameDisplay.forEach((square) => {
        square.style.backgroundColor = "";
      })
      displayBoard();
      gameText.innerHTML = "Player X's move"
  });

  return {
    displayBoard
  };
})();
