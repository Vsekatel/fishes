
const CREATURE_TYPES = Object.freeze({
	DEFAULT: {
		name: 'default',
		maxSpeed: new Vector(0.5, 0.5),
		img: {
			type: 'sprite',
			path: 'assets/fishes_default.png'
		}
	},
	ALTERNATE: {
		name: 'alternate',
		maxSpeed: new Vector(1, 1),
		img: {
			type: 'sprite',
			path: 'assets/fishes_alternate.png'
		}
	}
});