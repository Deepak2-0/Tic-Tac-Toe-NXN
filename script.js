let gameContainer = document.getElementById("gameContainer");
let player1;
let player2;
let player = [];
let turn  = 0;
let dimension;
let board= [];
let check;
let gameOver = false;


function start(){

  player1 = document.getElementById("p1").value;
  player.push(player1);
  // console.log(player1);
  player2 = document.getElementById("p2").value;
  player.push(player2);
  // console.log(player2);
  document.getElementsByClassName("turn")[0].innerHTML = `<h3>${player1}'s turn</h3>`;

  if(isEmpty(player1) || isEmpty(player2)){
    alert("Enter both player name");
    return ;
  }

  document.getElementsByClassName("startButton")[0].disabled = true;

  dimension = document.querySelector("#list").value;
  // console.log(dimension);

  for(let i=0;i<dimension;i++){

    let row = document.createElement("div");
    row.classList.add("row");

    for(let j=0;j<dimension;j++){

      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("onclick", `gridClick(${i},${j})`);
      cell.setAttribute("id", ""+i+""+j);

      row.appendChild(cell);
    }

    gameContainer.appendChild(row);
  }

  document.getElementById("p1").disabled = true;
  document.getElementById("p2").disabled  = true;

  for(let i=0;i<dimension;i++){
    let temp = [];
    for(let j = 0;j<dimension;j++){

        temp.push("");
    }
    board.push(temp);
  }

  // console.log(board);
}

function isEmpty(text){
  if(text === ""){
    return true;
  }
  else return false;
}

function gridClick(i,j){

  let elementId = ""+i+""+j;

  // console.log(elementId);
  // document.getElementById(`${elementId}`).innerHTML ="X"; // To check press is working or not
  // console.log( document.getElementById(`${elementId}`).value);

  // let el = document.getElementById(`${elementId}`).value;

  if(gameOver) return;

  if(board[i][j] === ""){

    board[i][j] = turn % 2 === 0 ? "X" : "O" ;
    let playerTurn = player[turn%2];
    turn++;
    document.getElementsByClassName("turn")[0].innerHTML = `<h3>${player[turn%2]}'s turn</h3>`;
  }


  document.getElementById(`${elementId}`).innerHTML = board[i][j];

  if(calculateWinner()){

    let winner = player[(turn+1)%2];
    alert(`Winner is ${winner}`);
    gameOver = true;
    return;

  }

  if(turn  === (dimension*dimension)){
    gameOver = true;
    alert("Game is drawn");
    return;
  }

}

function calculateWinner(){

  // if(turn<dimension+1){
  //   return false;
  // }

  // console.log(`dimension is ${dimension}`);
  // console.log(`x is ${board.length}`);
  console.log(turn);


  for(let i= 0; i<dimension;i++){

    let flag = 0;
    check = board[i][0];
    for(let j= 0;j<dimension;j++){

      if(board[i][j] !== check || board[i][j] === "" ){
        flag =1;
        break;
      }
      // console.log("Inner");
    }
    if(flag === 0 ) return true;
  }


  for(let i= 0; i<dimension;i++){
    let flag = 0;
    check = board[0][i];
    for(let j= 0;j<dimension;j++){

      if(board[j][i] !== check || board[j][i] === ""){
        flag =1;
        break;
      }
      // console.log("Inner");
    }
    if(flag === 0 ) return true;
  }


  check = board[0][0];

  let flag = 0;
  for(let i= 0; i<dimension;i++){

    if(board[i][i] !== check || board[i][i] === ""){
      flag =1;
      break;
    }

  }
  if(flag === 0 ) return true;

  flag = 0;
  len = dimension-1;
  check = board[0][len];
  for(let i= 0; i<dimension;i++){

    if(board[i][len] !== check  || board[i][len] === ""){
      flag =1;
      break;
    }
    len--;

  }
  if(flag === 0 ) return true;


  return false;
}
