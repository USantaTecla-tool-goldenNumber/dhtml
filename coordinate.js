function Coordinate(x, y){
  this.x = x;
  this.y = y;

  this.shiftH = function(x){
    this.x += x;
    return this;
  }

  this.shiftV = function(y){
    this.y += y;
    return this;
  }

  this.isLeft = function(coordinate){
    return this.x <= coordinate.x;
  }

  this.isTop = function(coordinate){
    return this.y <= coordinate.y;
  }

  this.clone = function(){
    return new Coordinate(this.x, this.y);
  }

}