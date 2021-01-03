const GOLDEN_RATIO = (1 + Math.sqrt(5))/2;

function load() {
  const NUM_RECTS = 10;
  const AREA = 2000;
  let svg = document.getElementById("svg");
  let rects = createRandomRects(NUM_RECTS, AREA);
  let postionMinDistanceGoldenRatio = getPostionMinDistanceGoldenRatio(rects);
  for (let i=0; i<rects.length; i++) {
    let color = "hsl(" + (i* 360/(NUM_RECTS+1)) + ", 100%, 50%)";
    rects[i].setColor(color);
    rects[i].print();
    let text = rects[i].getRatio() + " - " + GOLDEN_RATIO  + " => " + rects[i].getDistanceGoldenRatio();
    if (i == postionMinDistanceGoldenRatio){
      text += " !!!!!!"
    }
    printParagraph(text , color);
  }
}

function getPostionMinDistanceGoldenRatio(rects){
  let postionMinDistanceGoldenRatio = 0;
  for(let i=1; i<rects.length; i++){
    if (rects[postionMinDistanceGoldenRatio].getDistanceGoldenRatio() > rects[i].getDistanceGoldenRatio()){
      postionMinDistanceGoldenRatio = i;
    }
  }
  return postionMinDistanceGoldenRatio;
}

function createRandomRects(amount, area){
  let rects = [];
  do {
    let proposalRect = createRandomRect(area);
      let intersect = false;
      for (let rect of rects) {
        if (rect.intersect(proposalRect)) {
          intersect = true;
        }
      }
      if (!intersect) {
        rects.push(proposalRect);
      }
  } while (rects.length < amount);
  return rects;
}

function createRandomRect(area){
  let width = random();
  let height = random();
  if (width < height){
    let temp = width;
    width = height;
    height = temp;
  }
  let factor = Math.sqrt(area/(width*height));
  let xwidth = width * factor;
  let xheight = height * factor;
  return new Rect(svg, random(), random(), xwidth, xheight);
}

function printParagraph(text, color){
  let div = document.getElementById("div");
  let p = document.createElement("p");
  p.style.color = color;
  p.innerHTML = text; 
  div.appendChild(p);
  return p;
}

function random() {
  return Math.floor(Math.random() * 400 + 10);
}