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
let playerShip = {
  name: "the USS Assembly",
  hull: 20,
  firepower: 5,
  accuracy: 7,
};

//List of alien ships
//Each of these values should be random
let aliens = [
  {
    name: "Alien1",
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (8 - 6) + 6),
  },
  {
    name: "Alien2",
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (8 - 6) + 6),
  },
  {
    name: "Alien3",
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (8 - 6) + 6),
  },
  {
    name: "Alien4",
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (8 - 6) + 6),
  },
  {
    name: "Alien5",
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (8 - 6) + 6),
  },
  {
    name: "Alien6",
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (8 - 6) + 6),
  },
];

//Round number
let round = 0;

//Function attack player
const attackPlayer = (player, attacker) => {
  //   console.log(player.hull);
  //determine accuracy and firepower and see if hit landed
  let accuracy = Math.floor(Math.random() * (10 - 1) + 1);
  //   console.log("value", accuracy);
  //   console.log("attacker accuracy", attacker.accuracy);
  if (accuracy <= attacker.accuracy) {
    player.hull -= attacker.firepower;
    console.log("The shot hit", player.hull);
  } else {
    console.log("The shot missed");
  }
  //   console.log(player.hull);
};

//function to determine if your attack works
//Get random number
//If lower than ship accuracy, record hit
//If hit, record damage than determine if alien is dead

//function to determine if alien attack works
//Get random number
//If lower than ship accuracy, record hit to you
//If hit, record damage than determine if you are dead
const shootAlien = () => {
  console.log("Reading a shot");
  attackPlayer(aliens[round], playerShip);

  if (aliens[round].hull > 0) {
    console.log(aliens[round].name, "readies a shot");
    attackPlayer(playerShip, aliens[round]);
  } else {
    console.log(aliens[round].name, "is defeated!!!");
    //Determine if there are still aliens left
    if (round === 5) {
      //If so give option to retreat or stay
    } else {
      //If not say you win
      //Increase round by 1
      console.log("Continue on?");
      continueOn();
    }
  }
};

//Function for determining continue or retreat
const continueOn = () => {
  let options = document.querySelector(".continueOn");
  options.style = "display:block";
};

//Display player or alien
const display = () => {
  console.log(aliens[round].name, "is approaching");
};

//Game start up
const startUp = () => {
  console.log(
    "The aliens are attacking",
    playerShip.name,
    "has been called to defend"
  );
  display();
};

//Function to continue
const moveOn = () => {
  round++;
  let options = document.querySelector(".continueOn");
  options.style = "display:none";
};

//Function to escape
const escape = () => {
  console.log("You have escaped, you killed", round, "alien ships");
};
//win state(all ships destroyed)

//lose state(you are destroyed)

//Escape state(The game is over and you fled)
//Show player has escaped along with how many ships are destroyed
//In future, allow player to repair but limit times of escape?

//main game loop
//You attack alien, than determine if it is alive
//If alive, alien attacks you and then determin if you survive
startUp();
