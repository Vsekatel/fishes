
let aq;

function init() {
	const startPoint = performance.now();

	aq = new Aquarium;
	gradientCreator = new GradientCreator;
	const app = new PIXI.Application({ 
		width: screen.width, 
		height: screen.height*0.893
		, 	
	});

	
	gradientCreator.multipleColorGradientRect(app.stage, app.screen.width, app.screen.height, bgColors, 0, 0);
	
	const appDOM = document.body.appendChild(app.view);
	
	app.ticker.add((delta) => {
		tick(delta);
	});

	
	appDOM.onclick = (event) => {
		
		const r = (Math.random() >= 0.5 ? 1 : 0);
		let t;
		if (r === 0)
			t = CREATURE_TYPES.DEFAULT;
		else if(r === 1)
			t = CREATURE_TYPES.ALTERNATE;
		else
			console.error('wtf');

		const c = new Creature(t, event.clientX, event.clientY);

		c.setAcceleration(new Vector(0.001, 0.001));

	};

	aq.view = app;

	console.log('loaded in ' + (performance.now() - startPoint) + ' ms');
}

function tick(delta) {
	aq.time++;

	aq.population.forEach(creature => {
		creature.speed.add(creature.acceleration);

		if (creature.speed.length() > creature.maxSpeed.length()) {
			creature.speed.bound(creature.maxSpeed);
			creature.acceleration.set(0, 0);
		}
		if (creature.speed.length() > MAX_SPEED.length()) {
			creature.speed.bound(MAX_SPEED);
			creature.acceleration.set(0, 0);
		}

		creature.position.add(creature.speed);

		const x = creature.position.x;
		const y = creature.position.y;
		creature.view.position.set(x, y);

		creature.attachments.forEach(att => {
			if (att.isVisible) {
					att.view.position.set(x + att.x, y + att.y);
			}
		});
	});
}