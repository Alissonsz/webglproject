import { GameObject } from "/js/GameObject.js";
import { InputTypes } from '/js/ProcessInput.js';
import { ColisionModule, ColisionTypes } from '/js/ColisionModule.js';

export class Ball extends GameObject {
	constructor (pos, radius, amountOfTriangles) {
		super();
		var numOfVertex = 50;
		var twicePi = 2.0 * Math.PI;
		var circleVertex = new Array();
		circleVertex.push(pos[0]);
		circleVertex.push(pos[1]);

		for (let i=0; i<amountOfTriangles + 1; i++) {
		  let x = circleVertex[0] + (radius * Math.cos(i * twicePi / amountOfTriangles));
		  let y = circleVertex[1] + (radius * Math.sin(i * twicePi / amountOfTriangles));
		  circleVertex.push(x);
		  circleVertex.push(y);
		}

		this.geometry = circleVertex;
		this.pos = pos;
		this.radius = radius;

		this.movmentVector = [0, 0];
        this.velocityX = 1;
        this.velocityY = 1;
	}

	draw (render) {
        render.drawCircle(this.geometry, this.pos);
    }

    update (inputState, deltaTime) {
    	var hm = ColisionModule.CheckBallColision(this.pos, this.radius);

    	this.pos[0] += this.velocityX * deltaTime;
    	this.pos[1] += this.velocityY * deltaTime;
    }
}