
var Galaga = function ()
{	
	var Plane;
	var img; 
	var psize = 40;
	var asteroids, Count =0; 
	var bulls ;
	var frame = 10;
	var ROWS = 5 , COL = 12;
	var bgImg;
	
	this.setup = function()
	{
		frameRate(frame);
		bgImg = loadImage("images/flappy_bg.png");

		asteroids = new Group(); 
		bulls =  new Group(); 
		Plane = createSprite(width/2, height/1.2, psize,psize);
  		Plane.draw = function(){triangle(psize/2,0,0,psize,psize,psize) }
  		for(var i=0;i<ROWS;i++)
  		{
  			for(var j=i; j<COL-i; j++)
  			{
  				var a = createSprite( 25*(j+1),25*(i+1), 20,20);
  				asteroids.add(a);
  				a.velocity.y=0.1;
  			}
  			for(var j=ROWS-i-1; j<COL-(ROWS-i-1); j++)
  			{
  				var a = createSprite( 25*(j) + 25 *COL,25*(i+1), 20,20);
  				asteroids.add(a);
  				a.velocity.y=0.1;
  			}
  		}
	};
	
	draw = function ()
	{
		//clear();
		background(160,50,80);
		textSize(30);
		text ( Count, width-40 , 30)
		Plane.position.x = constrain(mouseX-psize/2,0,width-psize);

		//camera.position.y = (Plane.position.y);

		for(var i=0;i<bulls.length; i++)
			if(bulls[i].position.y < 0){
				bulls[i].remove();
			}

		image( bgImg, 0,height/2);
		image(bgImg, 400, height/2)
		camera.on();
		asteroids.overlap(bulls,erase);
		drawSprites();
	};

	mousePressed = function() 
	{
		var s = createSprite(constrain(mouseX,psize/2,width-psize/2),height/1.2, 5,10);
		bulls.add(s);
		s.velocity.y =  -4;
		s.life=height/1.5;
		//console.log(bulls);

	};
	erase  = function (asteroid, bull)
	{
		bull.remove();
		asteroid.remove();
		Count++;
	};

};
Galaga.prototype = new sketch;
