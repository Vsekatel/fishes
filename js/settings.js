
const MAX_SPEED = new Vector(10, 10);

// ---------------------------------------------------------------------------
const bgColors = [new ColorWithAlfa(0xFFF7E5, 1), new ColorWithAlfa(0x8CD1E5, 1), new ColorWithAlfa(0x52A0B6, 1), new ColorWithAlfa(0x3F6E8D, 1), new ColorWithAlfa(0x070A1E, 1)];
const TEXT_STYLE_ID = new PIXI.TextStyle({
	fontFamily: 'Arial',
	fontSize: 12,
	fontWeight: 'bold',
	stroke: '#d742f5',
	strokeThickness: 5,
	dropShadow: false,
	wordWrap: true,
	wordWrapWidth: 440,
	lineJoin: 'round',
});