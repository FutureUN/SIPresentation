
var sketch = function( p ) {
    
    p.setup = function() {
        p.createCanvas(400, 400);
        p.colorMode(p.HSB, 360, 100, 100);
        p.noLoop();     
    };
    
    p.draw = function() {
        p.background(0);
        var l = new Leyland(p);
  
        l.draw(12);
        l.barChart(p,20);
        l.lineChart(p,20);

    }; 
        
};

var myp5 = new p5(sketch, 'sequence_id');