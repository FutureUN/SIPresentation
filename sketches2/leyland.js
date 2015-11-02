var Leyland = function(p)
{
    
        this.draw = function(n) {
       
        var lay = this.to_array(n);
        var layr = this.to_array(n);
        console.log(lay);
        layr.reverse();
        for(var i=0;i<n;i++)
        {
            var a = p.map(layr[i],lay[0],layr[0],lay[0],p.width);
            var b = p.map(lay[i],lay[0],layr[0],0,100);
            p.fill(hue,100,b);
            p.ellipse(p.width/2,p.height/2,a,a);
            
        }

        }; 
        

        
        function  pow(n, p)
        {
            if(p==0) 
                return 1;
            else 
                return n * pow(n,p-1);
        }
        
        compute = function(n)
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