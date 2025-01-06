
const gameBoard = (() => {
    const rows = 3; columns = 3;
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    
    // Getting the board state
    const readState = () => board;

    // Displaying the board to console
    const modifyState = () => {
        //Lots of stuff to do here
    }

    return { readState, modifyState }
})();


const runGame = () => {
    // Ask for details and create players
    createPlayers();

    // Generate the order of the game. Assume X always starts
    const gameOrder = generateGameOrder();
    
    // Play Round
    playRound(gameOrder);
}


/*=============== Top-Level Execution =============*/
// runGame();




/*================ Function Storage =================*/
function createPlayers(){
    // Ask for their names and create objects
    const playerX = Player(prompt('First player: '), 'X');
    const playerO = Player(prompt('Second player: '), 'O');

    return { playerX, playerO }
}

function Player(name, mark){
    return { name, mark }
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

function playRound(gameOrder){
    //to do
}


