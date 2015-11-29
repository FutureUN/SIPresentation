var Bounce = function ()
{
	var GRAVITY = .2; 
	var bounce, floor; 
	var static = false;
	var obstacles , obstacle; 
	this.setup = function()
	{

		bounce = createSprite(width/2,height/2,30,30);
		bounce.draw = function(){ fill(180,100,100); ellipse(0,0,30,30) };
		bounce.maxSpeed = 10;

		obstacles = new Group();

		floor = createSprite(width/2,height,width,30);
		floor.shapeColor = 0;
		floor.immovable = true;
		obstacles.add(floor);
		obstacle = createSprite(width/2,height-90,40,10);
		obstacles.add(obstacle);

	};

	draw = function()
	{
		Keydown();
		static = false;
		//console.log(bounce.velocity.x);
		background(200,50,100);
		//bounce.bounce(floor);
		if(!static)
			bounce.velocity.y += GRAVITY;

		bounce.collide(obstacles, function(){static = true; bounce.velocity.y=0; });

		drawSprites();

	};

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