import { GameObject, ObjectTypes } from "/js/GameObject.js";
import { InputTypes } from '/js/ProcessInput.js';
import { ColisionModule, ColisionTypes } from '/js/ColisionModule.js';
import { GeometryUtils } from '/js/GeometryUtils.js';

export class Ball extends GameObject {
	constructor (pos, radius, amountOfTriangles) {
		super();
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
		this.unsolvedColisions = [];

		this.movmentVector = [0, 0];
        this.velocityX = 2;
		this.velocityY = 2;
	}

	draw (render) {
        render.drawCircle(this.geometry, this.pos);
    }

    update (inputState, deltaTime) {
		ColisionModule.CheckBallColision(this, this.pos, this.radius);
		this.solveColisions();
    	this.pos[0] += this.velocityX * deltaTime;
    	this.pos[1] += this.velocityY * deltaTime;
	}
	
	solveColisions() {
		this.unsolvedColisions.map((colision, index) => {
			if (colision[0] == ColisionTypes.TOP) {
				let reflectVector = GeometryUtils.getReflectVecor([this.velocityX, this.velocityY], [0, -1]);
				this.velocityX = reflectVector[0];
				this.velocityY = reflectVector[1];
				this.unsolvedColisions.splice(index, 1);
			} else if (colision[0] == ColisionTypes.RIGHT) {
				if(colision[1] == ObjectTypes.PLAYER) {
					let reflectVector = GeometryUtils.getReflectVecor([this.velocityX, this.velocityY], [-1, 0]);
					this.velocityX = reflectVector[0] *= 1.3;
					this.velocityY = reflectVector[1] *= 1.3;
					this.unsolvedColisions.splice(index, 1);
				} else {
					
				}
			} else if (colision[0] == ColisionTypes.BOTTOM) {
				let reflectVector = GeometryUtils.getReflectVecor([this.velocityX, this.velocityY], [0, 1]);
				this.velocityX = reflectVector[0];
				this.velocityY = reflectVector[1];
				this.unsolvedColisions.splice(index, 1);
			} else if (colision[0] == ColisionTypes.LEFT) {
				if(colision[1] == ObjectTypes.PLAYER) {
					let reflectVector = GeometryUtils.getReflectVecor([this.velocityX, this.velocityY], [1, 0]);
					this.velocityX = reflectVector[0] *= 1.3;
					this.velocityY = reflectVector[1] *= 1.3;
					this.unsolvedColisions.splice(index, 1);
				} else {
					
				}
			}
		});
	}
}