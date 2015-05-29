/*
 *  Asteroid game HTML using canvas and pure javascript
 *  Copyright (C) 2015-2016 by Alaeddine Messadi
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *  
 *  written by Alaeddine Messadi
 *  email: alaeddine.messadi@icloud.com
 *  https://github.com/AlaeddineMessadi/asteroid-game
 */

var WIDTH = 1200;
var HEIGHT = 600;

var keys = {};

var player = {
    alive: true,
    x: WIDTH / 2 - 10,
    y: HEIGHT / 2 - 10,
    radius: 10,
    orientation: 0,
    acceleration: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
};


var ast1 = {
        alive: true,
        x: 0,
        y: Math.floor((Math.random() * HEIGHT)),
        radius: Math.floor((Math.random() * 20) + 10),
        orientation: Math.floor((Math.random() * 360)),
        velocity: {
            x: Math.floor((Math.random() * 3) + 1),
            y: Math.floor((Math.random() * 3) + 1)
        }
    },
    ast2 = {
        alive: true,
        x: Math.floor((Math.random() * WIDTH)),
        y: 0,
        radius: Math.floor((Math.random() * 20) + 10),
        orientation: Math.floor((Math.random() * 360)),
        velocity: {
            x: Math.floor((Math.random() * 3) + 1),
            y: Math.floor((Math.random() * 3) + 1)
        }
    },
    ast3 = {
        alive: true,
        x: 0,
        y: Math.floor((Math.random() * HEIGHT)),
        radius: Math.floor((Math.random() * 20) + 10),
        orientation: Math.floor((Math.random() * 360)),
        velocity: {
            x: Math.floor((Math.random() * 3) + 0.5),
            y: Math.floor((Math.random() * 3) + 0.5)
        }
    },
    ast4 = {
        alive: true,
        x: 0,
        y: Math.floor((Math.random() * HEIGHT)),
        radius: Math.floor((Math.random() * 20) + 10),
        orientation: Math.floor((Math.random() * 360)),
        velocity: {
            x: Math.floor((Math.random() * 3) + 0.5),
            y: Math.floor((Math.random() * 3) + 0.5)
        }
    },
    ast5 = {
        alive: true,
        x: 0,
        y: Math.floor((Math.random() * HEIGHT)),
        radius: Math.floor((Math.random() * 20) + 10),
        orientation: Math.floor((Math.random() * 360)),
        velocity: {
            x: Math.floor((Math.random() * 3) + 0.5),
            y: Math.floor((Math.random() * 3) + 0.5)
        }
    },
    bullet = {
        alive: true,
        x: 0,
        y: 0,
        radius: 1,
        orientation: 0,
        acceleration: {
            x: 2,
            y: 2
        },
        velocity: {
            x: 0,
            y: 0
        }
    };

var spaceBare = false;
var gameOver = false;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var x,y;
function degToRad(deg) {
    return deg * Math.PI / 180;
}

function update() {
    /************************* Keys *********************************/
    // check for left and right arrow
    if (keys[37]) {
        player.orientation -= 5;
		bullet.orientation = player.orientation;
		x = player.velocity.x;
		y = player.velocity.y;
    }
    if (keys[39]) {
        player.orientation += 5;
		bullet.orientation = player.orientation;
		x = player.velocity.x;
		y = player.velocity.y;
    }



    if (keys[38]) {
        // thrusters applied, add to acceleration vector
        // in relation to orientation
        player.acceleration.x = 0.05 * Math.cos(degToRad(player.orientation));
        player.acceleration.y = 0.05 * Math.sin(degToRad(player.orientation));
    } else {
        // no thrusters, stop acceleration
        player.acceleration.x = 0;
        player.acceleration.y = 0;
    }

    // SpaceBar
    if (keys[32]&&spaceBare===false) {
        spaceBare=true;
        bullet.alive = true ;
        bullet.x = player.x;
        bullet.y = player.y;
        
		bullet.velocity.x = Math.cos(degToRad(player.orientation))*3;
		//if (x<0)		bullet.velocity.x *= -1;
		bullet.velocity.y  = Math.sin(degToRad(player.orientation))*3;
		//if (y<0)		bullet.velocity.y *= +1;
		


    }




    /***************************Wrapping objects **********************/
    if ((WIDTH < bullet.x) || (0 > bullet.x) || (HEIGHT < bullet.y) || (0 > bullet.y)) {
        bullet.alive = false;
        bullet.y = false;
    }

    if (WIDTH < player.x) player.x = 0;
    if (0 > player.x) player.x = WIDTH;
    if (WIDTH < ast1.x) ast1.x = 0;
    if (WIDTH < ast2.x) ast2.x = 0;
    if (WIDTH < ast3.x) ast3.x = 0;
    if (WIDTH < ast4.x) ast4.x = 0;
    if (WIDTH < ast5.x) ast5.x = 0;
    if (HEIGHT < player.y) player.y = 0;
    if (0 > player.y) player.y = HEIGHT;
    if (HEIGHT < ast1.y) ast1.y = 0;
    if (HEIGHT < ast2.y) ast2.y = 0;
    if (HEIGHT < ast3.y) ast3.y = 0;
    if (HEIGHT < ast4.y) ast4.y = 0;
    if (HEIGHT < ast5.y) ast5.y = 0;

    //integrate asteroids' position and velocity; **********************
    ast1.x += ast1.velocity.x;
    ast1.y += ast1.velocity.y;

    ast2.x += ast2.velocity.x;
    ast2.y += ast2.velocity.y;

    ast3.x += ast3.velocity.x;
    ast3.y += ast3.velocity.y;

    ast4.x += ast4.velocity.x;
    ast4.y += ast4.velocity.y;

    ast5.x += ast5.velocity.x;
    ast5.y += ast5.velocity.y;

    // integrate player's position and velocity

    player.velocity.x += player.acceleration.x;
    player.velocity.y += player.acceleration.y;
    player.x += player.velocity.x;
    player.y += player.velocity.y;

    bullet.x += bullet.velocity.x;
    bullet.y += bullet.velocity.y;

    // if player is going too fast, apply some friction on velocity

    if (player.velocity.x * player.velocity.x + player.velocity.y * player.velocity.y > 10) {
        player.velocity.x *= 0.99;
        player.velocity.y *= 0.99;
    }

    /************collision detection******************/
    /****** game over detection *************/
    if (collision(player, ast1) || collision(player, ast2) || collision(player, ast3) || collision(player, ast4) || collision(player, ast5)) gameOver = true;

    collision(ast1, ast2);
    collision(ast1, ast3);
    collision(ast1, ast4);
    collision(ast1, ast5);

    collision(ast2, ast3);
    collision(ast2, ast4);
    collision(ast2, ast5);

    collision(ast3, ast4);
    collision(ast3, ast5);

    collision(ast4, ast5);

    if (collision(ast1, bullet)) bullet.alive = false;
    if (collision(ast2, bullet)) bullet.alive = false;
    if (collision(ast3, bullet)) bullet.alive = false;
    if (collision(ast4, bullet)) bullet.alive = false;
    if (collision(ast5, bullet)) bullet.alive = false;

}

function drawCircle(obj, color) {
    context.translate(obj.x, obj.y);
    context.rotate(degToRad(obj.orientation - 90));
    context.strokeStyle = color;
    context.beginPath();
    context.arc(0, 0, obj.radius, 0, 2 * Math.PI, true);
    context.fillStyle = color;
    context.fill();
    context.stroke();
    context.setTransform(1, 0, 0, 1, 0, 0);
}

function collision(c1, c2) {
    var a;
    var x;
    var y;

    a = c1.radius + c2.radius;
    x = c1.x - c2.x;
    y = c1.y - c2.y;

    if (a > Math.sqrt((x * x) + (y * y))) {
        c1.alive = false;
        return true;
    } else {
        return false;
    }
}

function render() {
    // "clear" canvas
    context.fillStyle = "#000000";
    context.fillRect(0, 0, WIDTH, HEIGHT);

    // set "restore point"
    context.save();

    // move context to align to player's position
    context.translate(player.x, player.y);

    // rotate context to align to player's orientation
    context.rotate(degToRad(player.orientation - 90));

    // draw outer circle
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.arc(0, 0, player.radius, 0, 2 * Math.PI, true);
    context.stroke();

    // draw facing circle
    context.strokeStyle = "#00ffff";
    context.beginPath();
    context.arc(0, player.radius, 2, 0, 2 * Math.PI, true);
    context.stroke();

    // drawCircle(obj);

    // undo translations
    context.restore();
}

// Events

$(document).keydown(function (event) {
    keys[event.keyCode] = true;
});

$(document).keyup(function (event) {
    keys[event.keyCode] = false;
    spaceBare = false;

});



var game = function () {
    if (!gameOver) {

        update();
        render();
        if (ast1.alive) drawCircle(ast1, "#0B503E");
        if (ast2.alive) drawCircle(ast2, "#D71919");
        if (ast3.alive) drawCircle(ast3, "#D7B819");
        if (ast4.alive) drawCircle(ast4, "#011953");
        if (ast5.alive) drawCircle(ast5, "#0FBA0F");

        if (bullet.alive) drawCircle(bullet);
        /*if (bullet.alive) {
            var i = 0;
            setInterval(function(){
                if(i<20)
                {
                    i++;
                drawBullet(bullet);
                }else {clearInterval(this);bullet.alive=false;}
            },100);
        }*/
    } else {
        clearInterval(game);
    }
};


setInterval(game, 10);
