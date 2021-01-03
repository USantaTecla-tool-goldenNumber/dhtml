function Rect(svg, x, y, width, height) {
  this.svg = svg;
  this.rectNode = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.leftTop = new Coordinate(x, y);
  this.leftBottom = new Coordinate(x, y).shiftH(width);
  this.rightTop = new Coordinate(x, y).shiftV(height);
  this.rightBottom = new Coordinate(x, y).shiftH(width).shiftV(height);
  this.coordinates = [this.leftTop, this.leftBottom, this.rightTop, this.rightBottom];

  this.print = function () {
    this.svg.appendChild(this.rectNode);
    this.rectNode.style.stroke = "black";
    this.rectNode.style.strokeWidth = "3px";
    this.rectNode.setAttributeNS(null, "x", this.x + "px");
    this.rectNode.setAttributeNS(null, "y", this.y + "px");
    this.rectNode.setAttributeNS(null, "width", this.width + "px");
    this.rectNode.setAttributeNS(null, "height", this.height + "px");
  }

  this.intersect = function (rect) {
    return this.x >= rect.x - this.width
      && this.x <= rect.x + rect.width
      && this.y >= rect.y - this.height
      && this.y <= rect.y + rect.height;
  }

  this.includeCoordinate = function (coordinate) {
    return this.leftTop.isLeft(coordinate) &&
      coordinate.isLeft(this.rightBottom) &&
      this.leftTop.isTop(coordinate) &&
      coordinate.isTop(this.rightBottom);
  }

  this.include = function (rect) {
    let result = true;
    for (coordinate of this.coordinates) {
      if (!rect.includeCoordinate(coordinate)) {
        result = false;
      }
    }
    return result;
  }

  this.getRatio = function (){
    return this.width/this.height;
  }

  this.getDistanceGoldenRatio = function(){
    return Math.abs(this.getRatio() - GOLDEN_RATIO);
  }

  this.setColor = function(color){
    this.rectNode.style.fill = color;
  }

}