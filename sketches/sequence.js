
var Sequence = function(p)
{
    //Overwrite
    
    hue = 180;
    
    
    this.sethue = function(n)
    {
        hue = n;
    };
    
    //this.compute = function(){};
    this.draw = function() {};
        
    this.to_array = function(n)
    {   
        var num = []; 
        for (var i=0;i<n;i++)
            num.push(this.compute(i+1));
        return num;
    };

   
    
    this.barChart = function(p,n) {
        
      var lay = this.to_array(n);
      var count = 0;
      for(var i=0; i<n;i++)
      {
          //console.log(lay[i]);
          var wid = p.map(lay[i], lay[0],lay[n-1],lay[0],p.width);
          p.stroke(hue,100,30);
          p.fill(hue,100,100);
          p.rect(0,(p.height/n)*count,wid,p.height/n);
          count++;
      }   
    };
    
    this.lineChart = function (p,n){
     var lay = this.to_array(n);
     for(var i=0;i<n-1;i++)
     {
         var x = p.map (i+1, 0,n,0,p.width); 
         var y = p.map (lay[i], 0,lay[n-1],p.height,0);
         var x2 = p.map (i+2, 0,n,0,p.width); 
         var y2 = p.map (lay[i+1], 0,lay[n-1],p.height,0);
         p.stroke(hue,100,100);
         p.fill(hue,100,100);
         p.line(x,y,x2,y2);
         p.ellipse(x,y,6,6);
         
     }
    };
    
    this.curveChart = function (p,n){
 //TODO misssing implementation
    p.noFill();
    if ( n < 3 )
      return;
    var xpos=0;
    var ypos=p.height;
    var nth=1;
    var seq =  this.to_array(n);
    
    var x = p.map (nth, 0, n, 0,  p.width);
    var y = p.map (seq[0], 0, seq[n-1], p.height , 0);
    var x1 = p.map (nth + 1, 0, n, 0,  p.width);
    var y1 = p.map (seq[1], 0, seq[n-1], p.height , 0);
    var x2 = p.map (nth + 2, 0, n, 0,  p.width);
    var y2 = p.map (seq[2], 0, seq[n-1], p.height , 0);
    p.stroke (hue , 100 ,100);
    p.curve (x,y,x,y,x1,y1,x2,y2); 
    nth ++;
    for ( var i = 1; i < n - 2; i ++)
    {
      x1 =  p.map (nth, 0, n, 0,  p.width);
      y1 = p.map (seq[i], 0, seq[n-1], p.height , 0);
      x2 = p.map (nth + 1, 0, n, 0,  p.width);
      y2 = p.map (seq[i + 1], 0, seq[n-1], p.height , 0);
      var x3 = p.map (nth + 2, 0, n, 0,  p.width);
      var y3 = p.map (seq[i + 2], 0, seq[n-1], p.height , 0);
      nth ++;
      p.stroke (hue, 100 ,100);
      p.curve ( x,y,x1,y1,x2,y2,x3,y3);
      
      x = x1;
      y = y1;
      // println(xpos + " " + ypos);*/
    }
     x1 = p.map (nth, 0, n, 0,  p.width);
     y1 = p.map (seq[n-2], 0, seq[n-1], p.height , 0);
     x2 = p.map (nth + 1, 0, n, 0,  p.width);
     y2 = p.map (seq[n-1], 0, seq[n-1], p.height , 0);
   
    p.stroke (hue , 100 ,100);
    p.curve ( x,y,x1,y1,x2,y2,x2,y2);
    }
    
};

