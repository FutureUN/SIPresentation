
var sketch = function( p ) {
    
    var value = 0;
    var n = 12;
    p.setup = function() {
        p.createCanvas(400, 400);
        p.colorMode(p.HSB, 360, 100, 100);
       // p.noLoop();     
    };
    
    p.draw = function() {
        p.background(0);
        var l = new Leyland(p);
        l.lineChart(p,n);
        l.sethue(value);

    }; 
    
    p.mouseMoved = function() {
        value = (value + 1) % 360;
    };
  
    
    p.keyPressed = function() {
        if (p.keyCode === p.LEFT_ARROW) {
            n--;
        } else if (p.keyCode === p.RIGHT_ARROW) {
            n++;
        }
    };
};

var myp5 = new p5(sketch, 'sequence_id');