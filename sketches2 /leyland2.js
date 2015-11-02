var circles= 10; 
    
    function setup() {
        
        createCanvas(400, 400);
        noLoop();       
    }
    
    
    
    function draw() {
        background(0);
        
        var lay = leyland();
        var layr = leyland();
        layr.reverse();
        for(var i=0;i<circles;i++)
        {
            var a = map(layr[i],lay[0],layr[0],lay[0],width+width/4);
            var b = map(lay[i],lay[0],layr[0],0,255);
            //console.log(lay);
            noStroke();
            fill(b,0,0);
            ellipse(width/2,height/2,a,a);
            
        }

        }
        

        
        function  pow(n, p)
        {
            if(p==0) 
                return 1;
            else 
                return n * pow(n,p-1);
        }
        
        function leyland()
        {
            var myset = new Set();
            for(var i=0; i<circles;i++)
                for(var j=0;j<circles-i;j++)
                {
                    var m = (Math.pow(i+2,j+2) + Math.pow(j+2,i+2));
                    myset.add(m);
                }
            //console.log(myset);
            var arr = Array.from(myset);
            arr.sort(CompareNumbers);
            //console.log(arr);
            return arr.slice(0,circles);
        }
        
        function CompareNumbers(a, b){
            return a-b; 
        }
