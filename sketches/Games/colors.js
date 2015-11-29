var Colors = function ()
{
	var fst_cube , color_Cube, cubes, drop;
	var gameOver = true;
	this.setup = function()
	{
		createCanvas(600,400);
		colorMode(HSB, 360, 100, 100);
		background(200,50,100);
		//Create a group of sprites "cubes" with different colors 
		//that will be the target of the drop.
		cubes= new Group();
		fst_cube = width / 10; 
		for ( var i = 0 ; i < 5 ; i ++ )	
		{
			color_Cube = createSprite( fst_cube, height-50, width/5 , 100); 
			color_Cube.shapeColor =  addColor(i); 
			fst_cube += width / 5;
			cubes.add(color_Cube);
		}	
		drawSprites(cubes);		
	};
	
	addColor= function(n)
	{
	//this function gives a color according to the number in the parameter 
		var color; 
		switch(n) 
		{
        	case 0:
        		color = "yellow" ;
        		break;
        	case 1:
        		color = "green" ; 
        		break;
        	case 2: 
        		color = "blue";
        		break;
        	case 3:
        		color = "purple" ;
        		break;
        	case 4:
        		color = "pink" ;
        		break;
    		default:
        	    color = 0;
		}
		return color;
	}
// 
 	draw = function()
 	{
		if ( !GameOver )
		{
			drop = createSprite( width /2 , height /2 , 100 , 100); 
		}
		drawSprite(drop);
 	};
    mousePressed = function()
   {
  		if(GameOver)
    		GameOver= false;
	}

};
var myp5 = new p5(sketch, 'colors'); 
Colors.prototype = new sketch;