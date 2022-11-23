
class Aquarium {

	width = screen.width;
	height = screen.width;

	bounds = { top: 0, right: 0, bottom: 0, left: 0 };

	time = 0;

	population = [];
	food = [];

	view;

	// -----------------------------------------------------------------------

	constructor(width, height) {
		if (width)
			this.width = width;
		if (height)
			this.height = height;
	}

	// -----------------------------------------------------------------------

	setBounds() {
		const halfW = Math.floor(this.width / 2);
		const halfH = Math.floor(this.height / 2);

		this.bounds.top = -halfH;
		this.bounds.right = halfW;
		this.bounds.bottom = halfH;
		this.bounds.left = -halfW;

		// this.renderer.matter.world.setBounds(-halfW, -halfH, halfW, halfH);
	}

	addCreature(creature) {
		this.population.push(creature);

		const x = creature.position.x;
		const y = creature.position.y;
		const img = creature.img.path;

		const spr = PIXI.Sprite.from(img);
		spr.position.set(x, y);
		aq.view.stage.addChild(spr);

		creature.view = spr;

		creature.addAttachment(new Attachment(creature.id, -10, -10, true));
	}

	removeCreature(creature) {
		const i = this.population.indexOf(creature);

		if (i < 0)
			return;

		this.population.splice(creature);
	}

	addFood(food) {
		this.food.push(food);
	}

	removeFood(food) {
		const i = this.food.indexOf(food);

		if (i < 0)
			return;

		this.food.splice(i);
	}

}

// ---------------------------------------------------------------------------

const FOOD_TYPES = Object.freeze({
	PLANT: 0,
	MEAT: 1,
	SPOILED: 2
});

class Food {

	type;

	value;

	position = new Vector;
	speed = new Vector;
	maxSpeed = new Vector;
	acceleration = new Vector;

	age;
	maxAge;
	spoilingAge;

	canSpoil;

	// -----------------------------------------------------------------------

	constructor(type, x, y) {

		this.type = type;

		this.spawn(x, y);

	}

	// -----------------------------------------------------------------------

	spawn(x, y) {
		if (x && y)
			this.setPosition(x, y);

		aq.addFood(this);
	}

	dissolve() {
		aq.removeFood(this);
	}

	setPosition(x, y) {
		this.position.x = x;
		this.position.y = y;
	}

	spoil() {
		this.type = FOOD_TYPES.SPOILED;
	}

	// -----------------------------------------------------------------------

	static getClosest(position, vision) {
		//
	}

}

// ---------------------------------------------------------------------------


const BORDER_TYPES = Object.freeze({
	AIR: 0,
	SOIL: 1,
	ICE: 2,
	ABYSS: 3
});

// ---------------------------------------------------------------------------

class Attachment {
	text;
	isVisible;
	x;
	y;
	view;

	constructor(text = '', x = 0, y = 0, isVisible = false) {
		this.setText(text).setPosition(x, y).setVisibility(isVisible);
	}

	// -----------------------------------------------------------------------

	setText(text) {
		this.text = text;

		return this;
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;

		return this;
	}

	setVisibility(flag) {
		this.isVisible = flag;

		return this;
	}

	setView(view) {
		this.view = view;
	}
}
