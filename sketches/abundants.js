var Abundants = function(p)
{

  
 this.compute = function (n)
  {
     var cont = 0;
     var number = 0;
     while (true)
     {
       number++;
       var divisors = sum_of_div(number);
       if ( divisors > number )
       {
            cont ++;
       }
       if (cont == n)
         break;
     }
     return number;
  }
   compute = function (n)
  {
     var cont = 0;
     var number = 0;
     while (true)
     {
       number++;
       var divisors = sum_of_div(number);
       if ( divisors > number )
       {
            cont ++;
       }
       if (cont == n)
         break;
     }
     return number;
  }
    
   function sum_of_div (n)
  {
     var cont = 0;
     for ( var i = 1 ; i < n ; i ++)
       if ( n % i == 0)
         cont += i;
     return cont;
  }
  
      function sumDivArray (  n )
  {
    var div = [];
    for ( var i = 0 ; i < n ; i ++ )
    {
      div.push(sum_of_div(  this.compute(i+1)));
    }
    return div;
  }
    

  
this.draw = function ( n)
{
    var terms = n;
     var abundants = [];
     abundants.push(this.to_array(terms));
     abundants.push(sumDivArray ( terms));
     var wth = 0;
     for (var i = 0 ; i < terms; i ++)
       wth+= abundants[1][i];
     var x=0;
     if ( n < 3 )
       wth *= 3;
     for (var i = 0 ; i < terms; i ++)
     {
       x += p.map (abundants[1][i]/2, 0, wth, 0, p.width);
       var radious = p.map(abundants[0][i], 0, wth, 0, p.width);
       p.fill ( hue, p.map ( abundants [0][i], 0, abundants[0][terms-1], 0, 100),100);
       p.ellipse ( x ,radious/2 + p.mouseY, radious, radious);
       var y = radious + p.map (abundants[1][i]/2, 0, wth, 0, p.width) + p.mouseY;
       radious = p.map(abundants[1][i], 0, wth, 0, p.width);
       p.fill ( hue + 130, p.map ( abundants [1][i], 0, abundants[1][terms-1], 0, 100) , 100);
       p.ellipse ( x ,y, radious, radious);
       x +=  p.map (abundants[1][i]/2, 0, wth, 0, p.width);

     }
    
    
}

};

Abundants.prototype = new Sequence;