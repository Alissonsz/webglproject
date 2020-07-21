import { ProcessInput } from '/js/ProcessInput.js';
import { ColisionModule, ColisionTypes } from '/js/ColisionModule.js';
import { Renderer } from '/js/Renderer.js';
import { Player } from '/js/Player.js';
import { Ball } from '/js/Ball.js';
import { Wall } from '/js/Wall.js';

console.log('hm');
var canvas = document.querySelector("#c");

var render = new Renderer();

var gameObjects = [];

const perfectFrameTime = 1000 / 60;
var deltaTime = 0;
var lastTimestamp = Date.now();

ProcessInput.init();
ProcessInput.StartListen();
ColisionModule.init();

render.init(canvas).then(function(){
  gameObjects.push(new Wall([-render.gl.canvas.clientWidth/2, render.gl.canvas.clientHeight/2], render.gl.canvas.clientWidth, 70, ColisionTypes.TOP));
  gameObjects.push(new Wall([-render.gl.canvas.clientWidth/2, -render.gl.canvas.clientHeight/2 + 7], render.gl.canvas.clientWidth, 70, ColisionTypes.BOTTOM));
  gameObjects.push(new Wall([-render.gl.canvas.clientWidth/2, render.gl.canvas.clientHeight/2], 50, render.gl.canvas.clientHeight, ColisionTypes.LEFT));
  gameObjects.push(new Wall([render.gl.canvas.clientWidth/2 - 10, render.gl.canvas.clientHeight/2], 50, render.gl.canvas.clientHeight, ColisionTypes.RIGHT));
  gameObjects.push(new Player([-render.gl.canvas.clientWidth/2 + 80, 0], ColisionTypes.LEFT, 1));
  gameObjects.push(new Player([(render.gl.canvas.clientWidth/2) - 90, 0], ColisionTypes.RIGHT, 2));
  gameObjects.push(new Ball([0, 0], 20, 50));
  mainloop();
});

function mainloop(){
  let timestamp = Date.now();
  deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
  lastTimestamp = timestamp;

  render.clearBuffer();

  var inputState = ProcessInput.getInputState();
  
  gameObjects.map( gameObject => {
    gameObject.update(inputState, deltaTime);
    gameObject.draw(render);
  });
  
  requestAnimationFrame(mainloop);
}



/*function checkColisionWithGround() {
  if (ballTranslation[1] >= (gl.canvas.clientHeight/2) - 10) {
    var groundNorm = [0, -1];
    ballMovementVector = getReflectVecor(ballMovementVector, groundNorm);
  } else if (ballTranslation[0] >= (gl.canvas.clientWidth/2) - 10) {
    document.getElementsByTagName('body')[0].innerHTML = ('<h1>JOGADOR 1 VENCEU</h1>');
  } else if (ballTranslation[1] <= -(gl.canvas.clientHeight/2) + 10) {
    var groundNorm = [0, 1];
    ballMovementVector = getReflectVecor(ballMovementVector, groundNorm);
  } else if (ballTranslation[0] <= -(gl.canvas.clientWidth/2) + 10) {
    document.getElementsByTagName('body')[0].innerHTML = ('<h1>JOGADOR 2 VENCEU</h1>');
  }
}

function checkColisionWithPlayers() {
  if (ballTranslation[0] <= (playersRightHigh[0] + translation1[0]) && ballTranslation[1] >= (playersRightHigh[1] - 100 + translation1[1]) && ballTranslation[1] <= (playersRightHigh[1] + translation1[1])) {
    var groundNorm = [1, 0];
    ballMovementVector = getReflectVecor(ballMovementVector, groundNorm);
  } else if (ballTranslation[0] >= (playersRightHigh[0] + translation2[0]) && ballTranslation[1] >= (playersRightHigh[1] - 100 + translation2[1]) && ballTranslation[1] <= (playersRightHigh[1] + translation2[1])) {
    var groundNorm = [-1, 0];
    ballMovementVector = getReflectVecor(ballMovementVector, groundNorm);
  }
}*/

