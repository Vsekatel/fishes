// Drawing the gradient
//

class ColorWithAlfa{
  color;
  alpha;
  constructor(colorFrom, alphaFrom){
    this.color = colorFrom;
    this.alpha = alphaFrom;
  }
}

class GradientCreator {
  parrent;
  width;
  height;
  startTop;
  startLeft;
  color1;
  alpha1;
  color2;
  alpha2;

  multipleColorGradientRect(parrent, width, height, colors, startLeft, startTop){
    for(var i = 0; i < colors.length - 1;  i++){
      this.gradientRectToParrent(parrent, width, height/(colors.length-1), 0, startTop, colors[i].color, colors[i].alpha, colors[i+1].color, colors[i+1].alpha);
      startTop += height/(colors.length-1);
    }

  }

  gradientRectToParrent(parrent, width, height, startLeft, startTop, color1, alpha1, color2, alpha2) {
    var gradient = new PIXI.Graphics();
    parrent.addChild(gradient);
    //
    var rect = {
      width: width,
      height: height
    };
    var round = 20;
    //
    var colorFromData = this.prepareColorData(color1, alpha1);
    var colorToData = this.prepareColorData(color2, alpha2);
    //
    var stepCoef;
    var stepColor;
    var stepAlpha;
    var stepsCount = 500;
    var stepHeight = rect.height / stepsCount;
    for (var stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
      stepCoef = stepIndex / stepsCount;
      stepColor = this.getColorOfGradient(colorFromData, colorToData, stepCoef);

      gradient.beginFill(stepColor.color, stepColor.alpha);
      gradient.drawRect(
        startLeft,
        rect.height * stepCoef+startTop,
        rect.width,
        stepHeight
      );
    }
  }

  getRGBChannels = function (color) {
    var colorText = color.toString(16);
    if (colorText.length < 6) {
      while (colorText.length < 6) {
        colorText = "0" + colorText;
      }
    }

    var result = {
      red: parseInt(colorText.slice(0, 2), 16),
      green: parseInt(colorText.slice(2, 4), 16),
      blue: parseInt(colorText.slice(4, 6), 16)
    };
    return result;
  }

  prepareColorData = function (color, alpha) {
    return {
      color: color,
      alpha: alpha,
      channels: this.getRGBChannels(color)
    }
  }

  getColorOfGradient = function (from, to, coef) {

    var prepareRGBChannelColor = function (channelColor) {
      var colorText = channelColor.toString(16);
      if (colorText.length < 2) {
        while (colorText.length < 2) {
          colorText = "0" + colorText;
        }
      }

      return colorText;
    }

    if (!from.alpha && from.alpha !== 0) {
      from.alpha = 1;
    }
    if (!from.alpha && from.alpha !== 0) {
      to.alpha = 1;
    }

    var colorRed = Math.floor(from.channels.red + coef * (to.channels.red - from.channels.red));
    colorRed = Math.min(colorRed, 255);
    var colorGreen = Math.floor(from.channels.green + coef * (to.channels.green - from.channels.green));
    colorGreen = Math.min(colorGreen, 255);
    var colorBlue = Math.floor(from.channels.blue + coef * (to.channels.blue - from.channels.blue));
    colorBlue = Math.min(colorBlue, 255);

    var rgb = prepareRGBChannelColor(colorRed) + prepareRGBChannelColor(colorGreen) + prepareRGBChannelColor(colorBlue);

    return {
      color: parseInt(rgb, 16),
      alpha: from.alpha + coef * (to.alpha - from.alpha)
    };
  }
}