import { GameObject } from "/js/GameObject.js";
import { ColisionModule, ColisionTypes } from '/js/ColisionModule.js';

export class Wall extends GameObject {
	constructor (point, xOffset, yOffset, colisionType = ColisionTypes.BOTTOM) {
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
		console.log(colisionType);
		if (colisionType == ColisionTypes.TOP) {
			ColisionModule.colisionObjects.push({
				y: (yOffset + point[1]) / 2,
				colisionType: colisionType,
			});
		}
	}

	draw(render){
		render.draw(this.geometry, this.pos);
	}
}