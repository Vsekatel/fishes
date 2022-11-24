const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

class Vector {
	x;
	y;

	constructor(x, y) {
		this.set(x, y);
	}

	// -----------------------------------------------------------------------

	set(x, y) {
		this.x = x || 0;
		this.y = y || 0;

		return this;
	}

	add(vec) {
		this.x += vec.x;
		this.y += vec.y;

		return this;
	}

	subtract(vec) {
		this.x -= vec.x;
		this.y -= vec.y;

		return this;
	}

	scale(scalar) {
		this.x *= scalar.x;
		this.y *= scalar.y;

		return this;
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	angle() {
		return Math.atan2(this.x, this.y);
	}

	bound(vec) {
		const ratio = this.x / this. y;

		if (this.x > vec.x) {
			this.x = vec.x;
			this.y = this.x * ratio;
		}
		if (this.y > vec.y) {
			this.y = vec.y;
			this.x = this.y * (1 / ratio);
		}
	}
}


class Random {
	static alphabet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

	static int(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static float(min, max) {
		return Math.random() * (max - min) + min;
		// exclusive max, but fuck it, there is no real difference
	}

	static rid(length = 12) {
		let str = '';

		for (let i = 0; i < length; i++) {
			str += this.alphabet[this.int(0, 15)];
		}

		return str;
	}
}


// https://www.tutorialspoint.com/masking-a-string-javascript
function maskString(str, pattern) {
	let i = 0;

	const padded = pattern.replace(/#/g, () => {
		return str[i++];
	});
	
	return padded;
}