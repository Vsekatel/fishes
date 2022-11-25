
class Creature {

	type;

	position = new Vector;
	speed = new Vector;
	maxSpeed = new Vector;
	acceleration = new Vector;

	age;
	ageCritical;
	ageLethality;

	satiety;
	satietyMaximum;

	conditions = {
		food: { min: 0, max: 0 },
		depth: { min: 0, max: 0 },
		temperature: { min: 0, max: 0 },
		oxygenation: { min: 0, max: 0 },
		light: { min: 0, max: 0 },
		toxicity: { min: 0, max: 0 }
	};

	vision = 0;

	isAlive = false;

	img = {
		type: 'sprite',
		path: 'assets/fishes_default.png'
	};

	view;

	attachments = [];

	id = '';

	// -----------------------------------------------------------------------

	constructor(type, x, y) {
		this.type = type;

		this.applyType(type);

		this.id = maskString(Random.rid(), '### ### ### ###');

		if (!x)
			x = 0;
		if (!y)
			y = 0;

		this.born(new Vector(x, y));
	}

	// -----------------------------------------------------------------------

	born(vec) {
		this.isAlive = true;

		this.setPosition(vec);

		aq.addCreature(this);
	}

	die() {
		this.isAlive = false;

		aq.removeCreature(this);
	}

	setPosition(vec) {
		this.position = vec;
	}

	setSpeed(vec) {
		this.speed = vec;
	}

	setAcceleration(vec) {
		this.acceleration = vec;
	}

	applyType(type) {
		Object.keys(type).forEach((prop) => {
			// dbg: = valueOf mb?
			this[prop] = type[prop];
		});
	}

	addAttachment(att) {
		this.attachments.push(att);

		att.setOwner(this);

		const idText = new PIXI.Text(att.text, TEXT_STYLE_ID);
		aq.view.stage.addChild(idText);

		att.setView(idText);
	}

	removeAttachment(att) {
		const i = this.attachments.indexOf(att);

		if (i < 0)
			return;

		aq.view.stage.removeChild(att.view);

		this.attachments.splice(att);
	}

	// -----------------------------------------------------------------------

	bhvDrift() {
		//
	}

	bhvSeekFood() {
		//
	}

	bhvAttack() {
		//
	}

	bhvRunAway() {
		//
	}

	bhvMain() {
		//
	}
}