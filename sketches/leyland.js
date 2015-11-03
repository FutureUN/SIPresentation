var Leyland = function(p)
{
    
  

        this.draw = function(n) {
       
        var lay = this.to_array(n);
        var layr = this.to_array(n);
        //console.log(lay);
        layr.reverse();
        for(var i=0;i<n;i++)
        {
            py = p.mouseY - p.width/2;
            px = p.mouseX - p.height/2;
            var a = p.map(layr[i],lay[0],layr[0],lay[0],p.width);
            var b = p.map(lay[i],lay[0],layr[0],0,100);
            p.fill(hue,100,b*(n));
            p.stroke(hue,100,50);
            var x = p.width/2+px*n/(a/b);
            var y = p.height/2+py*n/(a/b);
      
            if(y>p.height)
                y=p.height;
            else if(y<0)
                y=0;
            if(x>p.width)
                x=p.width;
            else if(x<0)
                x=0;
            p.ellipse(x,y,a,a);
            
        }

        }; 
        

        
        function  pow(n, p)
        {
            if(p==0) 
                return 1;
            else 
                return n * pow(n,p-1);
        }
        
        this.compute = function(n)
        {
            var myset = new Set();
            for(var i=0; i<n;i++)
                for(var j=0;j<n-i;j++)
                {
                    var m = (Math.pow(i+2,j+2) + Math.pow(j+2,i+2));
                    myset.add(m);
                }
            //console.log(myset);
            var arr = Array.from(myset);
            arr.sort(CompareNumbers);
            //console.log(arr);
            return arr[n-1];
        }
        
        function CompareNumbers(a, b){
            return a-b; 
        }


};

Leyland.prototype = new Sequence;