<section id="themes">
	<h2>Themes</h2>
		<p>
			Set your presentation theme: <br>
			<!-- Hacks to swap themes after the page has loaded. Not flexible and only intended for the reveal.js demo deck. -->
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/black.css'); return false;">Black (default)</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/white.css'); return false;">White</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/league.css'); return false;">League</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/sky.css'); return false;">Sky</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/beige.css'); return false;">Beige</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/simple.css'); return false;">Simple</a> <br>
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/serif.css'); return false;">Serif</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/night.css'); return false;">Night</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/moon.css'); return false;">Moon</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/solarized.css'); return false;">Solarized</a>
		</p>
</section>

H:

# Successions 

by  [Sebastian Chaves](https://github.com/adamantwharf) - [Laura Santos](https://github.com/lsfinite) - [Jimmy Pulido](https://github.com/jiapulidoar)

H:

# Index

<!-- .slide: data-background="#7E2121" --> 

 1. Super Class <!-- .element: class="fragment" data-fragment-index="1"-->
 1. Abundant Numbers <!-- .element: class="fragment" data-fragment-index="2"-->
 1. Leyland Numbers <!-- .element: class="fragment" data-fragment-index="3"-->
 1. Composite Numbers <!-- .element: class="fragment" data-fragment-index="4"-->
 
	
H:

# Abundant Numbers 
<!-- .slide: data-background="#005050" -->
V:
 
 ## What is it about?
 Explanation of suseccion <!-- .element: class="fragment" data-fragment-index="1"-->

 Important functions used in the code<!-- .element: class="fragment" data-fragment-index="2"-->

 The final code <!-- .element: class="fragment" data-fragment-index="3"--> 
V:
## Abundant Number

 What is?
  
  >In number theory, an abundant number is a number for which the sum of its proper divisors is greater than the number itself. The amount by which the sum exceeds the number is the abundance. 

   Take from [Wikipedia](https://en.wikipedia.org/wiki/Abundant_number)
V:
## Example:
12 is an abundant number. 
Divisors: 1, 2, 3, 4, 6 <!-- .element: class="fragment" data-fragment-index="1"-->

Sum: 16  <!-- .element: class="fragment" data-fragment-index="2"-->

Abundance:4  <!-- .element: class="fragment" data-fragment-index="3"-->

> 16 Is grater than 12 <!-- .element: class="fragment" data-fragment-index="4"-->

V:
## Important functions used in the code (explanation)
### Sum_of_div
```java
<!--
int sum_of_div ( int n )
{
    tmp.append(n);
    int sum = 0;
    for ( int i = 1; i < n ; i ++)
        if ( n % i == 0 )
        {
            sum = sum + i;
            tmp.append(i);
        }
    return sum;    
}
-->
 ```
V:
## Code Processing: 
```java
<!-- 
//Better testing 
ArrayList<IntList>  abundants = new ArrayList <IntList>();
IntList tmp = new IntList();
int sum_of_div ( int n )
{
  tmp.append(n);
  int sum = 0;
  for ( int i = 1; i < n ; i ++)
    if ( n % i == 0 )
    {
      sum = sum + i;
      tmp.append(i);
    }
  return sum;    
}
// a comment to test git
void setup ()
{
   size(576,442);
   background(0,50,50);
   int n = 10;

   int cont = 0;
   int number = 1;

   while ( true )
   {
     if ( cont == n )
       break;
     tmp = new IntList();
     int sumDiv = sum_of_div(number);
     if ( number < sumDiv)
     {
       tmp.append(sumDiv);
       abundants.add(tmp);
       cont ++ ;
     }
     number ++ ;
      
   }
   for ( int i = 0 ; i < cont ; i ++ )
   {
      println (i + " " + abundants.get(i) );
   }
   float scale = 3;
   float x = 0;
   for ( int xi = 0 ; xi < 6 ; xi ++ )
   {
     float radOfSum = abundants.get(xi).get(abundants.get(xi).size() - 1 )/2.0;
     x += radOfSum  * scale;
     float radOfNumber = abundants.get(xi).get(0)/2.0;
     float y =  radOfNumber * scale;
     fill(255,255,200);
     noStroke();
     ellipse(x,y, radOfNumber * 2 * scale ,radOfNumber * 2 * scale);
     y += radOfNumber* scale;
     
     for ( int i = 1 ; i < abundants.get(xi).size(); i ++ )
     {
       int size = abundants.get(xi).size();
       float diamOfActual =abundants.get(xi).get(i);
       float diamOfFirst = abundants.get(xi).get(1);
       float diamOfLast = abundants.get(xi).get(size - 2 ) * 1.1;
       float a = map(diamOfActual,diamOfFirst 
                 ,diamOfLast,0,255);
       fill(255,255-a,255-a); 
       noStroke();
       y += diamOfActual/2.0 * scale;
       //println(y);
       ellipse(x, y , diamOfActual* scale,diamOfActual* scale);
       y += diamOfActual/2.0 * scale;  
     }
     x += radOfSum * scale;
   }
}
-->
```

V:
## Code JavaScript: 
```java
<!-- 
var sketch = function ( p ) {

    var n = 10; 
    var abundants =  [];
    var tmp = new Array();
    function sum_of_div ( n )
    {
    tmp.push(n);
    var sum = 0;
    for ( var i = 1; i < n ; i ++)
        if ( n % i == 0 )
        {
        sum = sum + i;
        tmp.push(i);
        }
    return sum;    
    }
      p.setup =   function() {
            
            p.createCanvas(576, 438);
            p.noLoop();       
        }
        
        
        
        p.draw = function () {
            p.background(0,50,50);
        //   console.log("algo");
            var cont = 0;
            var number = 1;
            //ellipse(30,30,30,30);
            while ( true )
            {
                if ( cont == n )
                    break;
                tmp = new Array();
                var sumDiv = sum_of_div(number);
        //      console.log(sumDiv);
                
                if ( number < sumDiv)
                {
                    tmp.push(sumDiv);
                    //console.log(tmp);
                    abundants.push(tmp);
                   // console.log(abundants);
                    cont ++ ;
                }
                number ++ ;
            
            }

            var scale = 3;
            var x = 0;
            for ( var xi = 0 ; xi < 6 ; xi ++ )
            {
                var radOfSum = abundants[xi][abundants[xi].length - 1]/2.0;
                x += radOfSum * scale;
                var radOfNumber = abundants[xi][0]/2.0;
                var y =  radOfNumber * scale;
                p.fill(255,255,200);
                p.noStroke();
                p.ellipse(x,y, radOfNumber * 2 *  scale ,radOfNumber * 2 *  scale);
                y += radOfNumber* scale;
                
                for ( var i = 1 ; i < abundants[xi].length; i ++ )
                {
                    var length = abundants[xi].length;
                    var diamOfActual = abundants[xi][i];
                    var diamOfFirst = abundants[xi][1];
                    var diamOfLast = abundants[xi][length-2]*1.1;
                    var a = p.map(diamOfActual,diamOfFirst,diamOfLast,0,255);
                    p.fill(255,255-a,255-a); 
                    p.noStroke();
                    y += diamOfActual/2.0 * scale;
                    p.ellipse(x, y , diamOfActual* scale,diamOfActual* scale);
                    y += diamOfActual/2.0 * scale;  
                }
                x += radOfSum * scale;
            }
            
    }
};
var myp5 = new p5 (sketch, 'abundant_id');
-->
```
V:
##The result 

<div id='abundant_id'> </div>


H:
# Leyland Numbers
<!-- .slide: data-background="#7E2121"  -->
V:

## What is it about?

Explanation of suseccion <!-- .element: class="fragment" data-fragment-index="1"-->
 
Important functions used in the code<!-- .element: class="fragment" data-fragment-index="2"-->

The final code <!-- .element: class="fragment" data-fragment-index="3"-->

V:
## Leyland numbers

What is?
>In number theory, a Leyland number is a number of the form **x^y + y^x** where x and y are integers greater than 1.

This requirement is important, since without it every positive integer would be a Leyland number of the form x1 + 1x.
Also, because of the commutative property of addition, the condition x ≥ y is usually added to avoid double-covering the set of Leyland numbers (so we have 1 < y ≤ x).<!-- .element: class="fragment" data-fragment-index="1"-->
   

Take from [Wikipedia](https://en.wikipedia.org/wiki/Leyland_number) 

V:

## Example:


**X=2    and     Y=2**      (x,y > 1)
> X^Y + Y^X = 2^2 + 2^2 =  <!-- .element: class="fragment" data-fragment-index="1"-->
8

8 is the first leyland number  <!-- .element: class="fragment" data-fragment-index="2"-->


V:
## Important functions used in the code (explanation)
### Pow
The best way to calculate the power of a number.
```java
<!--
int pow(int n, int p)
{
  if(p==0) return 1;
    
  else if ( p % 2 == 1 )
    return n * pow(n,p-1);
  
  int a = pow ( n , p%2);
  return a * a;
}
-->
 ```

 
V:
## Important functions used in the code (explanation)
### leyland
```java
<!--
IntList v;
IntList leyland (int n)
{
  if (n>13)
    n=13;
  v=new IntList();
  enesimo= new IntList();
  for(int i=0;i<n;i++)
    for(int j=0;j<=n-i;j++)
      {
          int m = ( pow(i+2,j+2) + pow(j+2,i+2) ); 
          if(! v.hasValue(m) )
            v.append(m);
      }
   //println(v);
   v.sort();
   //println(v);
   for(int i=0;i<n;i++)
      enesimo.append(v.get(i));
   return enesimo;
}
-->
 ```

V:
## Code Processing: 
```java
<!-- 
IntList v;
IntList enesimo;
int pow(int n, int p)
{
  if(p==0) return 1;
    
  else if ( p % 2 == 1 )
    return n * pow(n,p-1);
  int a = pow ( n , p/2);
  return a * a;
}

IntList layland (int n)
{
  if (n>13)
    n=13;
  v=new IntList();
  enesimo= new IntList();
  for(int i=0;i<n;i++)
    for(int j=0;j<=n-i;j++)
      {
          int m = ( pow(i+2,j+2) + pow(j+2,i+2) ); 
          if(! v.hasValue(m) )
            v.append(m);
      }
   //println(v);
   v.sort();
   //println(v);
   for(int i=0;i<n;i++)
      enesimo.append(v.get(i));
   return enesimo;
}

void setup()
{
  background(0);
  //ellipse(200,200,55,55);
  size(400,400);
  int n = 12;
  IntList lay =layland(n);
  IntList layr = layland(n);
  layr.sortReverse();
  
  for(int i=0;i<lay.size();i++)
  {
    float a = map (layr.get(i),lay.get(0),layr.get(0),lay.get(0),width+width/4);
    float b = map (lay.get(i),lay.get(0),layr.get(0),0,255);
    fill(b,0,0);
    noStroke();
    ellipse(width/2,height/2,a,a);
  }
}
-->
```


V:
## Code JavaScript:

```java
<!-- 
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
-->
```
V: 

##The result 

<div id='leyland_id'> </div>




