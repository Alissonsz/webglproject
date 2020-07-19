import { ProcessInput } from '/js/ProcessInput.js';

console.log('hm');
var canvas = document.querySelector("#c");

var gl = canvas.getContext("webgl");

if (!gl) {
// no webgl for you!
}

var translation1 = [-495, 0];
var translation2 = [495, 0];
var ballTranslation = [0, 0];
var ballMovementVector = [1.0, 1.0];
var playersRightHigh = [10, 50];
var player1direct = [0, 0];
var player2direct = [0, 0];
var vertexShaderSource;
var fragmentShaderSource;

var vertexShader;
var fragmentShader;
var processInput = new ProcessInput();
loadShaders();

async function loadShaders() {
  await fetch('/js/vertex-shader.js')
    .then(response => response.text())
    .then(text => {
                  vertexShaderSource = text
                  vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
                  });

  await fetch('/js/frag-shader.js')
    .then(response => response.text())
    .then(text => {
                  fragmentShaderSource = text
                  fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  });
  var program = createProgram(gl, vertexShader, fragmentShader);

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var translateUniformLocation = gl.getUniformLocation(program, "translation");
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  var positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [
    -10, -50,
    10, -50,
    -10, 50,
    -10, 50,
    10, -50,
    10, 50,
  ];

  var ballPositions = [
    -10, 10,
    -10, -10,
    10, 10,
    10, 10,
    -10, -10,
    10, -10
  ]

  translation1[0] = -gl.canvas.clientWidth/2 + 30;
  translation2[0] = gl.canvas.clientWidth/2 - 30;

  processInput.StartListen();

  function mainloop(){
    ballTranslation[0] += ballMovementVector[0]*2;
    ballTranslation[1] += ballMovementVector[1]*2;
    translation1[1] += player1direct[1];
    translation2[1] += player2direct[1];
    checkColisionWithGround();
    checkColisionWithPlayers();
    draw();
    requestAnimationFrame(mainloop);
  }
  
  requestAnimationFrame(mainloop);

  function draw () {
    resize(gl);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.uniform2fv(translateUniformLocation, translation1);


    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);

    gl.uniform2fv(translateUniformLocation, translation2)
    gl.drawArrays(primitiveType, offset, count);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ballPositions), gl.STATIC_DRAW);
    gl.uniform2fv(translateUniformLocation, ballTranslation)
    gl.drawArrays(primitiveType, offset, count);
  }
  
  document.addEventListener('keydown', function (event) {
    console.log(event.keyCode);
    if(event.keyCode == 40) {
      player1direct = [0, -1];
    } else if (event.keyCode == 38) {
      player1direct = [0, 1];
    } else if (event.keyCode == 83) {
      player2direct = [0, -1];
    } else if (event.keyCode == 87) {
      player2direct = [0, 1];
    }
    draw();
  });

  draw();
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function resize(gl) {
  var realToCSSPixels = window.devicePixelRatio;

  // Lookup the size the browser is displaying the canvas in CSS pixels
  // and compute a size needed to make our drawingbuffer match it in
  // device pixels.
  var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
  var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

  // Check if the canvas is not the same size.
  if (gl.canvas.width  !== displayWidth ||
      gl.canvas.height !== displayHeight) {

    // Make the canvas the same size
    gl.canvas.width  = displayWidth;
    gl.canvas.height = displayHeight;
  }
}

function getReflectVecor(dirVector, normal) {
  normal = normalize(normal);
  var dotProduct = getDotProduct(dirVector, normal);
  dotProduct = dotProduct * 2;
  normal[0] = normal[0] * dotProduct;
  normal[1] = normal[1] * dotProduct;
  dirVector[0] = ballMovementVector[0] - normal[0];
  dirVector[1] = ballMovementVector[1] - normal[1];

  return dirVector;
}

function getDotProduct(vector1, vector2) {
  var dotProduct = (vector1[0] * vector2[0]) + (vector1[1] * vector2[1]);
  return dotProduct;
}

function getModule(vector) {
  var vectorModule = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
  return vectorModule;
}

function normalize(vector) {
  var vectorModule = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
  return [vector[0] / vectorModule, vector[1] / vectorModule];
}

function checkColisionWithGround() {
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
}

