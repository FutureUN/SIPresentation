
var sketch = function( p ) {

    var color = 0;
    var n = 0;
    var c =0 ;
    
    p.setup = function() {
        p.createCanvas(400, 400);
        p.colorMode(p.HSB, 360, 100, 100);
       // p.noLoop();     
    };
    
    p.draw = function() {
        p.background(0);
        
        
        //console.log(c);
        if(c == 0){
            var l = new Composite(p);
        }else if (c == 1 ){
            var l = new Leyland(p);
        }else if (c == 2){
            var l = new Abundants(p);}
        
        l.sethue(color);
        l.draw(n);
        
        var name = ["Composite" , "Leyland", "Abundant"];
        p.textSize(25);
        p.fill ( hue ,0 ,100);
        p.text(name[c] + "  n = " + n , 50, 30); 
    }; 
    
    p.mouseMoved = function() {
        color  = (color + 1) % 360;
    };
  
    
    p.keyPressed = function() {
            
        if (p.keyCode == p.CONTROL) {
            n--;
            
        }
        else if(p.keyCode == p.ALT){
            n++;
            
        }
       else {
            c = (c+1)%3;
            
        }
            
    };
};

var myp5 = new p5(sketch, 'draw_id');