//  ¡¡ Experimental  Game !! 
//  ¡¡  Not finished!! 
// Instructions :  move the balloon with Arrow Keys 'UP, LEFT, RIGHT'  

var Bounce = function ()
{
	var GRAVITY = .2; 
	var bounce, floor; 
	var static = false;
	var obstacles , obstacle, obstacle2, star; 
	var colp = loadImage("images/win.png");
	var GameOver = false;
	var win ;
	this.setup = function()
	{

		initGame();
		//obstacles.add(obstacle);

	};
	initGame = function()
	{
		if ( GameOver )
		{
			win.remove();
			GameOver = false;
		}
		bounce = createSprite(width/2,height/2,30,30);
		bounce.draw = function(){ fill(180,100,100); ellipse(0,0,30,30) };
		bounce.maxSpeed = 10;

		obstacles = new Group();

		floor = createSprite(width/2,height,width,30);
		floor.shapeColor = 0;
		floor.immovable = true;
		obstacles.add(floor);
		obstacle = createSprite(width/2,height-90,40,40);
		//obstacles.add(obstacle);
		obstacle.mouseActive = true;
		obstacle2 = createSprite(width/4,height-90,40,40);
		obstacle2.mouseActive = true;
		star = createSprite(width/8,60,40,40);
		star.addImage(loadImage("images/star.png"));
		star.velocity.x = 1.5;
		
	}
	draw = function()
	{
		Keydown();
		static = false;
		//console.log(bounce.velocity.x);
		background(200,50,100);
		//bounce.bounce(floor);
		if ( star.position.x > width)
			star.velocity.x = -1.5;
		if ( star.position.x<0)
			star.velocity.x = 1.5;
		if(!static)
			bounce.velocity.y += GRAVITY;

		bounce.position.x = constrain(bounce.position.x, 0 + bounce.width/2, width- bounce.width/2);
		if ( obstacle.mouseIsPressed  && !bounce.collide(obstacle)) 
		{	
				console.log("asfsdfsd");
				obstacle.position.x=mouseX;
				obstacle.position.y=mouseY;
		}
		if ( obstacle2.mouseIsPressed  && !bounce.collide(obstacle2)) 
		{	
				console.log("asfsdfsd");
				obstacle2.position.x=mouseX;
				obstacle2.position.y=mouseY;
		}
		bounce.collide(obstacles, function(){static = true; bounce.velocity.y=0; });
		bounce.collide(obstacle, function(){static = true; bounce.velocity.y=0; });
		bounce.collide(obstacle2, function(){static = true; bounce.velocity.y=0; });
		bounce.collide(star, finish);
		drawSprites();

	};
	mousePressed = function() {
		console.log("click");
		if(GameOver)
		{

			win.remove();
			initGame();
		}
	}	
	finish = function()
	{
		if ( GameOver == false)
       	{
       		//updateSprites(false);
			for ( var i = 0 ; i < 3 ; i ++  )
			{
				obstacles.removeSprites();
			}
			obstacle.remove();
			obstacle2.remove();
			star.remove();
			bounce.remove();
       	}
       	GameOver = true;
       	win = createSprite ( width/2,height/2,10,10);
		win.addImage(colp);
		drawSprite(win);
	}
	Keydown = function()
	{
		if(keyIsDown(RIGHT_ARROW))
			bounce.velocity.x += 0.1;

		if(keyIsDown(LEFT_ARROW))
			bounce.velocity.x -= 0.1;

		if(bounce.velocity.y == 0)
		if(keyIsDown(UP_ARROW) ){
			bounce.velocity.y = -6;
		}
		if(!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW))
		{
			bounce.velocity.x = 0 ;
		}

		return false;

	}
	die = function()
	{
		updateSprites(false);
		clouds.removeSprites();
  		GameOver = true;
  		//Count=0;
  	}

	newGame = function()
	{

	}

	


};
Bounce.prototype = new sketch;