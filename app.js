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
  accuracy: 0.7,
};

//List of alien ships
//Each of these values should be random
let aliens = [
  {
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (0.8 - 0.6) + 0.6),
  },
  {
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (0.8 - 0.6) + 0.6),
  },
  {
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (0.8 - 0.6) + 0.6),
  },
  {
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (0.8 - 0.6) + 0.6),
  },
  {
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (0.8 - 0.6) + 0.6),
  },
  {
    hull: Math.floor(Math.random() * (6 - 3) + 3),
    firepower: Math.floor(Math.random() * (4 - 2) + 2),
    accuracy: Math.floor(Math.random() * (0.8 - 0.6) + 0.6),
  },
];

//Round number
let round = 0;

//Function attack player
const attackPlayer = (player) => {
  console.log(player.hull);
  //determine accuracy and firepower and see if hit landed
  player.hull -= 5;
  console.log(player.hull);
};

//function to determine if your attack works
//Get random number
//If lower than ship accuracy, record hit
//If hit, record damage than determine if alien is dead
const shootAlien = () => {
  attackPlayer(aliens[round]);

  if (aliens[round].hull >= 0) {
    attackPlayer(playerShip);
  } else {
    console.log("The alien is defeated!!!");
  }
};

//function to determine if alien attack works
//Get random number
//If lower than ship accuracy, record hit to you
//If hit, record damage than determine if you are dead
const shootPlayer = () => {};

//win state(all ships destroyed)

//lose state(you are destroyed)

//Escape state(The game is over and you fled)
//Show player has escaped along with how many ships are destroyed
//In future, allow player to repair but limit times of escape?

//main game loop
//You attack alien, than determine if it is alive
//If alive, alien attacks you and then determin if you survive
