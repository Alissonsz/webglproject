import { ProcessInput } from '/js/ProcessInput.js';
import { Renderer } from '/js/Renderer.js';
import { Player } from '/js/Player.js';

console.log('hm');
var canvas = document.querySelector("#c");

var render = new Renderer();

var gameObjects = [];
gameObjects.push(new Player([-100, 0]));
gameObjects.push(new Player([100, 0]));

ProcessInput.init();
ProcessInput.StartListen();

render.init(canvas).then(function(){
  mainloop()
});

function mainloop(){
  render.clearBuffer();

  var inputState = ProcessInput.getInputState();
  
  gameObjects.map( gameObject => {
    gameObject.update(inputState);
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

