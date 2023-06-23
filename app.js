//A game round
// You attack the first alien ship
// If the ship survives, it attacks you
// If you survive, you attack the ship again
// If it survives, it attacks you again ... etc
// If you destroy the ship, you have the option to attack the next ship or to retreat
// If you retreat, the game is over, perhaps leaving the game open for further developments or options
// You win the game if you destroy all of the aliens
// You lose the game if you are destroyed

// There are six alien ships.
// The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship.
// Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order.
// After you have destroyed a ship, you have the option to make a hasty retreat.

//Logic for determining accuracy
//console.log(Math.floor(Math.random() * (10 - 1) + 1));
//Is this value less than the ship accuracy

//The player ship
let playerShip = {};

let playerPics = ["p80.gif", "EarthShip.gif", "ZBlue.gif"];

let flags = 0;

//List of alien ships
//Each of these values should be random
let aliens = [];

//Round number
let round = 0;

//Reset aliens array
const resetShips = () => {
  aliens = [
    {
      name: "Scouter",
      hull: Math.floor(Math.random() * (6 - 3 + 1) + 3),
      firepower: Math.floor(Math.random() * (3 - 2 + 1) + 2),
      accuracy: Math.floor(Math.random() * (7 - 5 + 1) + 5),
      image: "AS100.gif",
    },
    {
      name: "Alien2",
      hull: Math.floor(Math.random() * (6 - 3 + 1) + 3),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: Math.floor(Math.random() * (8 - 5 + 1) + 5),
      image: "ZPurple.gif",
    },
    {
      name: "Alien3",
      hull: Math.floor(Math.random() * (6 - 3 + 1) + 3),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: Math.floor(Math.random() * (8 - 6 + 1) + 6),
      image: "AlienPilot100.gif",
    },
    {
      name: "The A team",
      hull: Math.floor(Math.random() * (6 - 4 + 1) + 4),
      firepower: Math.floor(Math.random() * (5 - 3 + 1) + 3),
      accuracy: Math.floor(Math.random() * (8 - 6 + 1) + 6),
      image: "Aliens02.gif",
    },
    {
      name: "THE CLAAAAAAW",
      hull: Math.floor(Math.random() * (8 - 5 + 1) + 5),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: Math.floor(Math.random() * (8 - 6 + 1) + 6),
      image:
        "https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-s1q5sn_ecb74152.jpeg?region=0,0,450,450",
    },
    {
      name: "The Dabber",
      hull: Math.floor(Math.random() * (9 - 6 + 1) + 6),
      firepower: Math.floor(Math.random() * (6 - 4 + 1) + 4),
      accuracy: Math.floor(Math.random() * (9 - 6 + 1) + 6),
      image:
        "https://ih1.redbubble.net/image.912469023.6065/st,small,507x507-pad,600x600,f8f8f8.u1.jpg",
    },
  ];
  playerShip = {
    name: "The USS Assembly",
    hull: 20,
    firepower: 3,
    accuracy: 1,
    missles: 3,
  };
};

//Function attack player
const attackPlayer = (player, attacker) => {
  //determine accuracy and firepower and see if hit landed
  let accuracy = Math.floor(Math.random() * (10 - 1 + 1) + 1);

  if (accuracy <= attacker.accuracy) {
    player.hull -= attacker.firepower;
    console.log("The shot hit", player.hull);
    if (attacker === playerShip) {
      updateConsole("Player shot hit");
    } else {
      updateConsole("Alien shot hit");
    }
  } else {
    console.log("The shot missed");
    if (attacker === playerShip) {
      updateConsole("Player shot missed");
    } else {
      updateConsole("Alien shot missed");
    }
  }
  displayHuman();
  displayAlien();
};

//Logic to end the game
const endGame = () => {
  let options = document.querySelector(".continueOn");
  options.style = "display:none";
  let ending = document.querySelector(".newGame");
  ending.style = "display:block";
  document.querySelector(".shoot").disabled = true;
  document.querySelector(".missle").disabled = true;
  document.querySelector(".shields").disabled = true;
};

//restart the game
const restart = () => {
  // resetShips();
  round = 0;
  clearConsole();
  hideWinner();
  startUp();

  let player = document
    .querySelector(".player")
    .setAttribute("src", "WinEarth.gif");

  let ending = document.querySelector(".newGame");
  ending.style = "display:none";

  //Show choose ship screen
  document.querySelector(".Chooseship").style = "display:block";
};

//No New game
const noNewGame = () => {
  console.log("No new game");
  let ending = document.querySelector(".newGame");
  ending.style = "display:none";
};

//fire a missle at the alien
const fireMissles = () => {
  if (playerShip.missles > 0) {
    playerShip.missles--;
    updateConsole("fire missle");
    aliens[round].hull -= 5;
    displayAlien();
    if (aliens[round].hull <= 0) {
      console.log(aliens[round].name, "is defeated!!!");
      updateConsole(aliens[round].name + " is defeated!!");

      nextRound();
    }
    displayHuman();
  } else {
    updateConsole("There are no more missles");
  }
};

//Activate shields to raise health by a random number
//Takes a turn
const useShield = () => {
  let shields = Math.floor(Math.random() * (4 - 2 + 1) + 2);
  updateConsole("Activating shields");
  playerShip.hull += shields;

  updateConsole("Restored " + shields + " health");

  //disable shields button
  document.querySelector(".shields").disabled = true;

  //Alien gets a chance to attack
  console.log(aliens[round].name, "readies a shot");
  attackPlayer(playerShip, aliens[round]);
  if (playerShip.hull <= 0) {
    clearConsole();
    updateConsole("Ship Destroyed!! You loose");
    endGame();
  }
};

//Process logic for shooting at an alien, and an alein shooting back
const shootAlien = () => {
  console.log("Reading a shot");
  attackPlayer(aliens[round], playerShip);

  if (aliens[round].hull > 0) {
    //Alien is still alive
    console.log(aliens[round].name, "readies a shot");
    attackPlayer(playerShip, aliens[round]);
    if (playerShip.hull <= 0) {
      clearConsole();
      updateConsole("Ship Destroyed!! You loose");
      alienWinner();
      endGame();
    }
  } else {
    clearConsole();
    console.log(aliens[round].name, "is defeated!!!");
    updateConsole(aliens[round].name + " is defeated!!");
    nextRound();
  }
};

//Determine if we need another round
const nextRound = () => {
  //Determine if there are still aliens left
  round++;
  if (round === 6) {
    //If so give option to retreat or stay
    console.log("You win, the aliens have been defeated");
    updateConsole("You win!! The aliens have been defeated!!");
    playerWinner();
    endGame();
  } else {
    //If not say you win
    //Increase round by 1
    console.log("Continue on?");
    continueOn();
  }
};

//Aliens win
const alienWinner = () => {
  document.querySelector(".winner").style = "display:block";

  let winner = document.querySelector(".gamewinner");
  console.log(winner);
  winner.setAttribute("src", "WinAlien2.gif");
};

//Humans win
const playerWinner = () => {
  document.querySelector(".winner").style = "display:block";

  let winner = document.querySelector(".gamewinner");
  console.log(winner);
  winner.setAttribute("src", "WinEarth.gif");
};

//Hide the hide square
const hideWinner = () => {
  document.querySelector(".winner").style = "display:block";

  let winner = document.querySelector(".gamewinner");
  console.log(winner);
  winner.setAttribute("src", "");
};

//Function for determining continue or retreat
const continueOn = () => {
  let options = document.querySelector(".continueOn");
  options.style = "display:block";

  //Disable action buttons
  document.querySelector(".shoot").disabled = true;
  document.querySelector(".missle").disabled = true;
  document.querySelector(".shields").disabled = true;
};

//Display player or alien
const displayNewAlien = () => {
  console.log(aliens[round].name, "is approaching");
  updateConsole(aliens[round].name + " is approaching");
  let a = document.querySelector(".alien");
  a.setAttribute("src", aliens[round].image);
  // a.classList.toggle("alien");
  let alien = document.querySelector(".alienname");
  alien.innerHTML = aliens[round].name;
  displayAlien();
};

const displayAlien = () => {
  document.querySelector(".healthAlien").innerHTML =
    "Health: " + aliens[round].hull;

  document.querySelector(".firepowerAlien").innerHTML =
    "Firepower: " + aliens[round].firepower;

  document.querySelector(".accuracyAlien").innerHTML =
    "Accuracy: " + aliens[round].accuracy;
};

const displayHuman = () => {
  document.querySelector(".health").innerHTML = "Health: " + playerShip.hull;

  document.querySelector(".missilesleft").innerHTML =
    "Missles Left: " + playerShip.missles;
};

//Game start up
const startUp = () => {
  resetShips();

  updateConsole("The aliens are attacking");
  updateConsole(playerShip.name + " has been called to defend");
  console.log(
    "The aliens are attacking",
    playerShip.name,
    "has been called to defend"
  );

  displayNewAlien();

  displayHuman();
};

//choose the ship to use
const chooseShip = (shipNum) => {
  let player = document
    .querySelector(".player")
    .setAttribute("src", playerPics[shipNum]);

  document.querySelector(".shoot").disabled = false;
  document.querySelector(".missle").disabled = false;
  document.querySelector(".shields").disabled = false;

  document.querySelector(".Chooseship").style = "display:none";
};

//Function to continue
const moveOn = () => {
  let options = document.querySelector(".continueOn");
  options.style = "display:none";

  //Clear the console
  clearConsole();

  //Reenable action buttons
  document.querySelector(".shoot").disabled = false;
  document.querySelector(".missle").disabled = false;
  document.querySelector(".shields").disabled = false;

  displayNewAlien();
};

//Escape state(The game is over and you fled)
//Show player has escaped along with how many ships are destroyed
//In future, allow player to repair but limit times of escape?
//Function to escape and end the game that way
const escape = () => {
  endGame();
  clearConsole();
  console.log("You have escaped, you killed", round, "alien ships");
  updateConsole("You have escape, you killed " + round + " alien ships");
};

//Update the center display to update
const updateConsole = (message) => {
  if (flags > 5) {
    clearConsole();
  }
  //Add a new message to the console
  let log = document.querySelector(".gamelog");

  let mess = document.createElement("p");
  mess.innerHTML = message;

  log.append(mess);
  flags++;
  // console.log("flags", flags);
};

//clear the console
const clearConsole = () => {
  flags = 0;
  let log = document.querySelector(".gamelog");
  log.replaceChildren();
};

//Set explosion method
const setExplosion = () => {
  //Set an explosion picture for either the player or the alien
  // https://as1.ftcdn.net/v2/jpg/05/63/16/14/1000_F_563161494_iYVA1GGkVrd6QYPJtEXWSfJ6xr4OuZ77.jpg
};

//main game loop
//You attack alien, than determine if it is alive
//If alive, alien attacks you and then determin if you survive
startUp();
