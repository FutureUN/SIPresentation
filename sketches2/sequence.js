
var Sequence = function(p)
{
    //Overwrite
    
    hue = 180;
    
    //this.compute = function(){};
    this.draw = function() {};
        
    this.to_array = function(n)
    {   
        var num = []; 
        for (var i=0;i<n;i++)
            num.push(compute(i+1));
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
         p.stroke(hue,0,100);
         p.line(x,y,x2,y2);
         p.ellipse(x,y,6,6);
         
     }
    };
    
    this.curveChart = function (p,n){
     var lay = this.to_array(n);
     var xy = []; 
     for (var i =0; i<n;i++)
     {
         var x = p.map (i+1, 0,n,0,p.width); 
         var y = p.map (lay[i], 0,lay[n-1],p.height,0);
         xy.push(x);
         xy.push(y);
     }
     console.log(xy);
     p.bezier(xy);
        
    }
    
};

