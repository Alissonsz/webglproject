import { ObjectTypes } from "/js/GameObject.js";

var ColisionTypes = Object.freeze({
	RIGHT: 0,
	LEFT: 1,
	TOP: 2,
	BOTTOM: 3
});

class ColisionModule {
	static init () {
		ColisionModule.colisionObjects = new Array();
	}

	static CheckBallColision (ball, check, radius) {
		ColisionModule.colisionObjects.map(object => {
			if (object.colisionType == ColisionTypes.TOP) {
				if (check[1] + radius >= object.y) {
					ball.unsolvedColisions.push([object.colisionType, object.type]);
				}
			} else if (object.colisionType == ColisionTypes.RIGHT) {
				if (check[0] + radius >= object.x) {
					if (object.type == ObjectTypes.PLAYER) {
						if (check[1] - radius <= object.y + object.yOffSet) {
							ball.unsolvedColisions.push([object.colisionType, object.type]);
						}
					} else {
						ball.unsolvedColisions.push([object.colisionType, object.type]);
					}
				}
			} else if (object.colisionType == ColisionTypes.BOTTOM) {
				if ((check[1] - radius) <= object.y) {
					ball.unsolvedColisions.push([object.colisionType, object.type]);
				}
			} else if (object.colisionType == ColisionTypes.LEFT) {
				if ((check[0] - radius) <= object.x) {
					if (object.type == ObjectTypes.PLAYER) {
						if (check[1] + radius >= object.y - object.yOffSet) {
							ball.unsolvedColisions.push([object.colisionType, object.type]);
						}
					} else {
						ball.unsolvedColisions.push([object.colisionType, object.type]);
					}
				}
			}
		});
	}

	static ObjectsCount() {
		return ColisionModule.colisionObjects.length;
	}

	static updateObjectPos(index, x, y, yOffSet) {
		ColisionModule.colisionObjects[index].x = x;
		ColisionModule.colisionObjects[index].y = y;
		ColisionModule.colisionObjects[index].yOffSet = yOffSet;
	}
}

export { ColisionModule, ColisionTypes }