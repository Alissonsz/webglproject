import { GameObject, ObjectTypes } from "/js/GameObject.js";
import { ColisionModule, ColisionTypes } from '/js/ColisionModule.js';

export class Wall extends GameObject {
	constructor (point, xOffset, yOffset, colisionType = undefined) {
		super();
		this.geometry = [
			-xOffset, yOffset,
			xOffset, yOffset,
			-xOffset, -yOffset,
			-xOffset, -yOffset,
			xOffset, yOffset,
			xOffset, -yOffset
		];

		this.pos = point;
		if (colisionType == ColisionTypes.TOP) {
			ColisionModule.colisionObjects.push({
				y: (this.pos[1] - yOffset),
				colisionType: colisionType,
				type: ObjectTypes.WALL,
			});
		} else if (colisionType == ColisionTypes.RIGHT) {
			ColisionModule.colisionObjects.push({
				x: (this.pos[0] - xOffset),
				colisionType: colisionType,
				type: ObjectTypes.WALL,
			});
		} else if (colisionType == ColisionTypes.BOTTOM) {
			ColisionModule.colisionObjects.push({
				y: (this.pos[1] + yOffset),
				colisionType: colisionType,
				type: ObjectTypes.WALL,
			});
		} else if (colisionType == ColisionTypes.LEFT) {
			console.log(this.pos[0]);
			ColisionModule.colisionObjects.push({
				x: (this.pos[0] + xOffset),
				colisionType: colisionType,
				type: ObjectTypes.WALL,
			});
		}
	}

	draw(render){
		render.draw(this.geometry, this.pos);
	}
}