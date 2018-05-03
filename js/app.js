//variable declaration
let score = 0;
let yEnemies = [60, 140, 220, 140, 60, 210];
let hearts = document.getElementsByTagName('ul')[0];
let points = document.querySelector('.score');
points.innerHTML = "Your score is  "+score;


//superclass Game,from which our Enemy and Player classes inherit some common
//methods for displaying properly on canvas
class Game {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }
    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
}

//Enemy class
class Enemy extends Game {
    constructor(x, y, image, speed) {
        super(x, y, image, speed);
        this.speed = speed;
    }
    /*Every time a bug reaches the end of canvas,
    it starts over from a new random y from
    yEnemies array with different speed. */
    update(dt) {
        let i;
        if (this.x < 505) {
            this.x += dt * 15 * this.speed * Math.random();
        } else {
            i = Math.random() * yEnemies.length | 0 + 0;
            this.y = yEnemies[i];
            this.x = -100;
        }
        //checks for collisions
        /*function for collision detection from
        https://stackoverflow.com/questions/2440377/javascript-collision-detection
        based on pythagorean theorem*/
        let a, b, c;
        a = this.x - player.x;
        b = this.y - player.y;
        c = 70;
        if (a * a + b * b <= c * c) {
            player.x = 200;
            player.y = 380;
            player.checkLives();
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(-100, 140, 'images/enemy-bug.png', 50);
let enemy2 = new Enemy(-100, 60, 'images/enemy-bug.png', 20);
let enemy3 = new Enemy(-100, 220, 'images/enemy-bug.png', 30);
let allEnemies = [enemy1, enemy2, enemy3];


//Player class
class Player extends Game {
    constructor(x, y, image, lives) {
        super(x, y, image, lives);
        this.lives = lives;
    }
    update(dt) {
        //adds 100 points each time the player reaches the water.If the score reaches 1000 points,
        //a congratulate modal appears
        if (this.y < 40) {
            this.x = 200;
            this.y = 380;
            score += 100;
            points.innerText = "Your score is  "+score;
            if (score === 1000) {
                openWinModal();
            }
        }

    }
    //this function is for player's movement using the up,down,left and right keys
    handleInput(key) {
        if (key === 'left' && this.x > 0) {
            this.x -= 100;
        } else if (key === 'right' && this.x < 400) {
            this.x += 100;
        } else if (key === 'up') {
            this.y -= 80;
        } else if (key === 'down' && this.y < 380) {
            this.y += 80;
        }
    }


    /*function for checking collisions' number in order to remove hearts
    ,freezes the enemies and opens modal if game is over*/
    checkLives() {
        this.lives -= 1;
        hearts.removeChild(hearts.children[0]);
        if (this.lives === 0) {
            allEnemies.forEach(function(enemy) {
                enemy.speed = 0;
            });
            openModal();
        }
    }

}



// Place the player object in a letiable called player
let player = new Player(200, 380, 'images/char-boy.png', 3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

/**********************************************
              Modal Code
              *********************************/

// Get modal element
let modal = document.getElementById('gameOverModal');
let winModal = document.getElementById('winningModal');
// Listen for outside or inside click
modal.addEventListener('click', modalClick);
winModal.addEventListener('click', modalClick);
// Function to open modal
function openModal() {
    modal.style.display = 'block';
}

function openWinModal() {
    winModal.style.display = 'block';
}
// Function to close modal and start new game if outside click
function modalClick(e) {
    this.style.display = 'none';
    location.reload();
}
