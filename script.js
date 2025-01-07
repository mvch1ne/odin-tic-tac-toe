/*=============== Top-Level Execution =============*/
runGame();

// Test Execution





/*=============== Core Function Declaration ==========*/

function runGame(){
    // Ask for details and create players
   const players = createPlayers();

    // Generate the order of the game. Assume X always starts
    const gameOrder = generateGameOrder();
    
    // Play Round
    playRound(players, gameOrder);
}



/*================ Auxilliary Function Storage =================*/
function createPlayers(){
    // Ask for their names and create objects
    const players = Players(prompt("First Player: "), prompt("Second Player: "));
    return players
}

function Players(firstPlayer, secondPlayer){
    const playerMap = {
        X : firstPlayer,
        O : secondPlayer
    }
    return playerMap
}

function generateGameOrder(){
    const gameOrder = [];
    for(let i = 0; i < 9; i++){
        if(i % 2 == 0){ // Even so 'X'
            gameOrder.push('X');
        } else { // Odd so 'O'
            gameOrder.push('O');
        }
    }
    return gameOrder;
}

function playRound(players, gameOrder){
    // Initialize the board to start
    const board = gameBoard();

    // Execute the game based on the game order
    gameOrder.forEach(playMark => {
        console.log(`${players[playMark]}'s turn!`);
        console.log(`Pick an empty cell to place your mark, ${players[playMark]}`);

        let [r, c] = prompt('Row, Column').split(',');
        let moveValidity = board.validatePlayPosition([r,c]);
        while(moveValidity === false){
            console.log(`Pick an empty cell to place your mark, ${players[playMark]}`);
            let [r, c] = prompt('Row, Column').split(',');
            moveValidity = board.validatePlayPosition([r,c]);
        }

        // Past this point, the move is valid
        board.makePlay(playMark, [r,c]);
        // Display the board after the move is complete
        board.displayBoard();

        // Check for win or draw. If none, continue game
        const gameState = checkGameState(board);
        console.log(gameState);
        if (gameState.state === 'won') {
            console.log(`Game Over! ${players[gameState.mark]} has won!`);
            return;
        } else if (gameState.state === 'drawn') {
            console.log("Game Over! It's a draw!");
            return;
        }
    });
}

function checkGameState(board){
    // Game State Options: won, drawn, continuing
    // If won, also return winning mark

    const boardArray = board.accessBoard();
    // Check for a win by row completion

    // Define row checkers
    const row0 = boardArray[0][0] === boardArray[0][1] && boardArray[0][1] === boardArray[0][2] && boardArray[0][0] !== 0;
    const row1 = boardArray[1][0] === boardArray[1][1] && boardArray[1][1] === boardArray[1][2] && boardArray[1][0] !== 0;
    const row2 = boardArray[2][0] === boardArray[2][1] && boardArray[2][1] === boardArray[2][2] && boardArray[2][0] !== 0;

    // Define column checkers
    const col0 = boardArray[0][0] === boardArray[1][0] && boardArray[1][0] === boardArray[2][0] && boardArray[0][0] !== 0;
    const col1 = boardArray[0][1] === boardArray[1][1] && boardArray[1][1] === boardArray[2][1] && boardArray[0][1] !== 0;
    const col2 = boardArray[0][2] === boardArray[1][2] && boardArray[1][2] === boardArray[2][2] && boardArray[0][2] !== 0;
    // Define diagonal checkers
    const diag1 = boardArray[0][0] === boardArray[1][1] && boardArray[1][1] === boardArray[2][2] && boardArray[0][0] !== 0;
    const diag2 = boardArray[0][2] === boardArray[1][1] && boardArray[1][1] === boardArray[2][0] && boardArray[0][2] !== 0;

    let winningMark = null;

    if (row0) {
        winningMark = boardArray[0][0];
    } else if (row1) {
        winningMark = boardArray[1][0];
    } else if (row2) {
        winningMark = boardArray[2][0];
    } else if (col0) {
        winningMark = boardArray[0][0];
    } else if (col1) {
        winningMark = boardArray[0][1];
    } else if (col2) {
        winningMark = boardArray[0][2];
    } else if (diag1) {
        winningMark = boardArray[0][0];
    } else if (diag2) {
        winningMark = boardArray[0][2];
    }

    console.log("Winning Mark: ", winningMark);
    if (winningMark) {
        return { state: 'won', mark: winningMark };
    }

    // Check for draw
    const DEFAULT_CELL_VALUE = 0;
    const isDraw = boardArray.flat().every(cell => cell !== DEFAULT_CELL_VALUE);
    if (isDraw) {
        return { state: 'drawn' };
    }
    return { state: 'continuing' };
}


/*=============== Core Asset Declaration ==========*/
function gameBoard(){
    // Initialize the board;
    const DEFAULT_CELL_VALUE = 0;

    const board = 
    [
        [DEFAULT_CELL_VALUE, DEFAULT_CELL_VALUE, DEFAULT_CELL_VALUE],
        [DEFAULT_CELL_VALUE, DEFAULT_CELL_VALUE, DEFAULT_CELL_VALUE],
        [DEFAULT_CELL_VALUE, DEFAULT_CELL_VALUE, DEFAULT_CELL_VALUE]
    ];


    // Getting the board state
    const accessBoard = () => board;

     // Displaying the board to console
    const displayBoard = () => board.forEach(row => console.log(row));

    // Modifying the board with play moves
    const makePlay = (mark, playPosition) => {
        [r,c] = playPosition;
        board[r][c] = mark;
    }

    const validatePlayPosition = (playPosition) => {
        const [r, c] = playPosition;
        if((r > -1 && r < 3) && (c > -1 && c < 3) && board[r][c] === DEFAULT_CELL_VALUE){ // valid coordinates + empty cell
            return true; // valid play position
        } else{
            return false; // invalid play position
        }
    }
    return { accessBoard, makePlay, displayBoard, validatePlayPosition}
};

