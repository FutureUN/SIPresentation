var Composite = function (p)
{
var arr= [];

function  num_div ( n ){
  for ( var i = 1; i<= n ; i ++)
  {
    if ( n % i == 0)
    arr.push (i);
  }
  return arr;
}
function is_comp (  n ){
  for ( var i = 2; i < n; i ++)
    if ( n % i == 0 )
          return true;
  return false; 
}

this.compute = function (n ){
  var cont = 0;
  var num = 1;
  var nth= -1;
  while (true){
    if (cont == n )
      break;
    if ( is_comp (num))
    {
      cont++;
      nth=num;
    } 
    num++;
  }
  return nth;
}

this.draw = function(n)
{
  p.stroke (hue,100,100);
  var base=0, h=0 ;
  var xpos=0, ypos = 0; 
  var arr = num_div (n);
  var s = arr.length;
  var column = arr[ (s/2) - 1];
  var row = arr[ s / 2 ];
  if ( s%2 == 1){
    base = Math.sqrt(p.width * p.height /n);
    h = base;
    row =  column = Math.sqrt (n) ; 
  }
  if ( s % 2 == 0){
    base = p.width / column;
    h=p.height / row;
    row = arr [(s/2) - 1];
    column = arr[ s / 2 ];
   }
  var sq = 1; 
  for ( var i = 0; i < column ; i ++)
  {
    for ( var j = 0; j < row ; j ++)
    {
      p.fill (0);
      if ( ! is_comp(sq)){ 
         p.fill (hue  ,50, p.map ( sq , 0 , n , 0 , 100));
       }
      p.rect ( xpos, ypos, base, h);
      //println ( xpos + "   " + ypos);
      xpos = xpos + base;
      sq++;
      //println (sq);
    }
        xpos = 0;
        ypos = ypos + h;
  }
 }
};

Composite.prototype = new Sequence;