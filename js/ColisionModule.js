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

	static CheckBallColision (check, radius) {
		ColisionModule.colisionObjects.map(object => {
			if ( object.colisionType == ColisionTypes.TOP ) {
				if (check[1] + radius >= object.y) {
					return object.colisionType;
					console.log('?');
				}
			}
		});
	}
}

export { ColisionModule, ColisionTypes }