class Highlight {
    app;
    createHighlight(app, widthCalculated) {
        var torHighlight = random(-300, 0);
        var sprite = PIXI.Sprite.from('assets/highlight.png');
        sprite.width = widthCalculated;
        sprite.x = leftHighlight;
        sprite.y = torHighlight - 500;
        sprite.angle = 30;
        sprite.alpha = 1;
        leftHighlight += widthCalculated;
        app.stage.addChild(sprite);

        app.ticker.add(() => {
            var randnum = random(-100, 100);
            if (randnum + sprite.y < -500 && randnum + sprite.y > -1000) {
                sprite.y += randnum/100;
            } else {
                sprite.y -= randnum/100;
            }
        });
    }

}