
let life = 5;
let sucess = 0;
//apend the score to the screen and wining
let LifeDiv = document.querySelector('.life');
let winDiv = document.querySelector('.sucess');
LifeDiv.innerHTML = "You have ( "+life+" ) Lives" ;
winDiv.innerHTML = "You Won ( "+sucess+" ) Times";

// set a random position for the bugs on the screen
var getRandomPosition = function() {
    var number = Math.floor((Math.random() * 3) + 1);
    return number;
};
// Enemies our player must avoid
class Enemy {
    constructor() {
    // Variables applied to each of our instances go here,

    // we've provided one for you to get started
    this.x= 0;
    this.y=((getRandomPosition())*60);

    this.speed= ((getRandomPosition())*70);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 505)
    {
        this.x = 0;
        this.y = (getRandomPosition())*70;
    }
    this.x += this.speed * dt;
}


// Draw the enemy on the screen, required method for game
render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

    constructor(){
        this.sprite='images/char-boy.png';
        this.x = 200;
        this.y = 410;
        this.speed =70;
        this.win = 0;
        this.game = true ;
        this.life = 5 ;
        this.gemsCollected = 0;
    }
    update(dt){

        this.checkBroder();
        this.checkCollisions();
        this.checkGameWin();
        this.checkGameOver();

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // check the player have lives or game is over
    checkGameOver(){
        if (this.life == 0)
        {
            this.LoseMessage();
            this.gameReset();
            this.game = false;

        }
    }
    // set alose message to the screen
    LoseMessage() {
        let txt;
        let person = prompt("Please enter your name:", "Your Name");
        if (person == null || person == "") {
            txt = "I hope you enjoyed the game";
        } else {
            txt = "Thank you " + person + "!  for Playing the Game";
        }
        document.getElementById("message").innerHTML = txt;
    };
    // to check if the playes is still have lifes
    checkGameWin(){
        if (this.y <=-15)
        {
         this.winGame();
        }
    }
// reset the game when the player is game over
    gameReset(){
        this.life = 5;
        this.win = 0;
        this.game = true;
        this.reset();
        LifeDiv.innerHTML = `You have ( ${this.life} ) Lives ` ;
        winDiv.innerHTML = `You Won ( ${this.win} ) Times  `;
    }
    // win the game and add more diffculty to the screen
    winGame(){
        this.win +=1 ;
        winDiv.innerHTML = `You Won ( ${this.win} ) Times  ` ;
        LifeDiv.innerHTML = `You have ( ${this.life} ) Lives `;
        alert('YOU WIN');
        this.reset();
        switch (this.win) {
            case 5:
            allEnemies.push(new Enemy());
            break;
            case 10:
            allEnemies.push(new Enemy());
            break;
            case 15:
            allEnemies.push(new Enemy());
            allEnemies.push(new Enemy());
            break;
            case 20:
            allEnemies.push(new Enemy());
            allEnemies.push(new Enemy());
            allEnemies.push(new Enemy());
            break;

		}
    }
    // handle the playe use
    loseGame(){
        this.life -= 1;
        LifeDiv.innerHTML = `You have ( ${this.life} ) Lives ` ;
    }


//handle the input keyboard for the player movment
    handleInput(action_p){

        if(action_p == 'left')
        {
            this.x -= this.speed;
        }
        if(action_p == 'right')
        {
            this.x += this.speed;
        }

        if(action_p == 'up')
        {
            this.y -= this.speed;
        }
        if(action_p == 'down')
        {
            this.y += this.speed;
        }


    }
    // prevent player from being out of canvas
    checkBroder(){
        if (this.x < -50 || this.x >= 450 || this.y <-200 || this.y >=450)
        {

            this.reset();
        }
    }
    // reset the player to his position if reach the edge of canvas
    reset(){
        this.x = 200;
        this.y = 410;
    }


// this method is to chech the player and the enemies and the death
    checkCollisions(){
    var len = 	 allEnemies.length;
    for (var i = 0; i < len; i++) {
        if ((allEnemies[i].x) <= this.x + 40 &&
            (allEnemies[i].x + 40) >= (this.x) &&
            (allEnemies[i].y)<= this.y + 40 &&
            (allEnemies[i].y + 40) >= (this.y)) {
            this.loseGame();
            alert('YOU LOSE');
            this.reset();
         }
    }

}

}

// this function is to show the gems to the screen


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();
let allEnemies = [];
for (let i = 0; i < 3; i++) {

    allEnemies[i]= new Enemy() ;

}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
