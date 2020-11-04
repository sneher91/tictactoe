
 /*----- constants -----*/
const player = {
    '1' : 'pink',
    '-1' : 'cornflowerblue',
    'null' : 'white'
};
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
  
/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
let reset = document.getElementById('reset');
let squares = document.getElementById('container');
let msg = document.getElementById('player-turn');

/*----- event listeners -----*/
squares.addEventListener('click', handleSquares);
reset.addEventListener('click', init);

/*----- functions -----*/
init();
function init() {
    //initialize all of the state variables.

    //the moves variable is setting up an empty game board. 
    //each null value is equal to a space on the tictactoe board.
    board = [null, null, null, null, null, null, null, null, null];

    //the turn is automatically set to player 1 upon initialization.
    turn = 1;

    //the winner is set to null because there is no winner at the start.
    //the winner value will be updated once the gameplay finishes to 1, -1, or tie.
    winner = null;
   
    //always call the render function at the end of initialization. 
    render();
};
function render () {
   
   /* We are iterating over each value in the "moves" array. 
   Which, at the moment, is set to null. The params of the forEach 
   are move (each element within the array) and idx (which accesses the index value of each element)
   From there, we are wanting to check if the space is occupied. So, 
   we access the box variable which holds the values of each square
   if the box index has the backg*/
    board.forEach(function(move, idx) {
        console.log(move, idx);
        document.getElementById(idx).style.background = player[move];
    });
    

    /*if winner is still equal to  null, then the game is still in progress and the message
    will reflect whose turn it is. player[turn] <--the values will correspond with the
    player object key-values.*/
    if (winner === null) 
    {msg.textContent = `It is player ${player[turn].toUpperCase()}'s turn.`;
    reset.style.visibility = 'hidden';
}
    /*if there is a winner, the message will return with the player who has won. The 
    winner value will be updated to 1 or -1 and it will grab that key from the player 
    object to show who has one. */
    if (winner) {
        msg.textContent = `Congratulations! Player ${player[winner].toUpperCase()} has won!`;
        reset.style.visibility= 'visible';
    }
    /* if there is a tie, the message will return with the following message:
    The bang operator creates a falsey statement from the condition you are supplying. */
    else if(!board.includes(null)) {
        msg.textContent = `There has been a tie. Play again.`;
        reset.style.visibility = 'visible';
    }
}

function handleSquares(evt) {
    // if the element clicked has an id of container then execute.
    if (evt.target.id === 'container') return; 
    const idx = parseInt(evt.target.id.replace('move', ''));
    if (board[idx]) return; //if the board has a value at that index then end.
    if (winner !== null) return; //if the winner value is no longer null then end. 
    board[idx] = turn; //this is updating the value of the board array with the value of the turn.
    
    winCheck(); //invoke the winCheck function before the next turn so that it can check the combinations and see if the win conditions have been met. 
     turn *= -1;

     render();
}

function winCheck() {
//.some() goes through each element in the array and its taking each the index values for each 
//and checking to see if the values return a truth statement.
    let checkCombos = winningCombos.some(function (combination) {
            Math.abs(board[combination[0]] + board[combination[1]] + board[combination[2]]) === 3
       });
    if (checkCombos === true) winner = turn;
    
}

    

     
     
