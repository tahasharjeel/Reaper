const canvas = document.getElementById('birdy');
const ctx = canvas.getContext('2d');

let fly = new Audio();
let die = new Audio();
let sc = new Audio();

fly.src = "fly.mp3";
die.src = "die.mp3";
sc.src = "score.mp3";

let treeUpArray = [];
let treeDownArray = [];
const gravity = 9.8;
var reqId;

const background = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  speed: 2
}

const bird = {
  x: canvas.width / 12,
  y: canvas.height / 2.5,
  width: 50,
  height: 50,
  speed: 2,
  score: 0
}

const treeUp = {
  x: 200,
  y: 0,
  width: 80,
  height: 150,
  speed: 2
}

const treeDown = {
  x: 200,
  y: 0,
  width: 80,
  height: 150,
  speed: 2
}

var obs = new Image();
obs.src = 'treeUp.png';

var tu = new Image();
tu.src = 'treeUp.png';

var td = new Image();
td.src = 'treeDown.png';

var img = new Image();
img.src = 'background.png';

var birdy = new Image();
birdy.src = 'bird.png';

let r1 = Math.floor(Math.random() * 450);
let r2 = canvas.height - r1 - 100;

treeUpArray[0] = {
  x: canvas.width,
  y: 0,
  height: r1
};

treeDownArray[0] = {
  x: canvas.width,
  height: r2,
  y: canvas.height - r2

};

document.onkeydown = function(event) {
  if (event.keyCode == 32) {
    move();
  }
};

function move() {
  fly.play();
  bird.y -= 40;
}

birdy.onload = function() {
  function loop() {
    ctx.drawImage(birdy, bird.x, bird.y, bird.width, bird.height);
    window.requestAnimationFrame(loop);
  }
  loop();
}

function drawBack() {
  reqId=undefined;
  ctx.drawImage(img, background.x + background.width, background.y, background.width, background.height);
  ctx.drawImage(img, background.x, background.y, background.width, background.height);
  background.x -= background.speed;
  if (background.x + background.width == 0) {
    background.x = 0;
  }

  if (bird.y < 0 || bird.y + bird.height > canvas.height) {
    die.play();
    window.cancelAnimationFrame(reqId);
    alert("GAME OVER!\nSCORE " + bird.score);
    location.reload();
  }



  for (let i = 0; i < treeUpArray.length; i++) {
    ctx.drawImage(tu, treeUpArray[i].x, treeUpArray[i].y, treeUp.width, treeUpArray[i].height);

    ctx.drawImage(td, treeDownArray[i].x, treeDownArray[i].y, treeDown.width, treeDownArray[i].height);



    if (treeUpArray[i].x > 100 - 50) {
      if (bird.x > treeUpArray[i].x) {
        sc.play();
        bird.score++;
      }
      if (bird.x + bird.width > treeUpArray[i].x && bird.y < treeUpArray[i].y + treeUpArray[i].height - 30) {
        die.play();
        window.cancelAnimationFrame(reqId);
        alert("GAME OVER!\nSCORE " + bird.score);
        location.reload();
      } else if (bird.y + bird.height > treeDownArray[i].y + 30 && bird.x + bird.width > treeDownArray[i].x) {
        die.play();
        window.cancelAnimationFrame(reqId);
        alert("GAME OVER!\nSCORE " + bird.score);
        location.reload();
      }
    }
    treeUpArray[i].x -= treeUp.speed;
    treeDownArray[i].x -= treeDown.speed;

    if (treeUpArray[i].x == canvas.width - 500) {

      var c1 = Math.floor(Math.random() * 450);
      var c2 = canvas.height - c1 - 100;
      treeUpArray.push({
        x: canvas.width,
        y: 0,
        height: c1
      });
      treeDownArray.push({
        x: canvas.width,
        height: c2,
        y: canvas.height - c2
      });
    }
  }

  bird.y += bird.speed;
  ctx.font = "30px Arial";
  ctx.fillText("SCORE " + bird.score, 10, 50);
  start();

}

function start(){
  if(!reqId){
    reqId = window.requestAnimationFrame(drawBack);
  }
}

function stop() {
    if (reqId) {
       window.cancelAnimationFrame(reqId);
       reqId = undefined;
    }
}
drawBack();
