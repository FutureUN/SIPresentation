// This version only contain 2 levels. for the nonce...

// Instructions: move the plane with the mouse 
// and shoot with a click (max 3 bullets) for kill the Aliens  and Winn!!!!! 
//
//
var Galaga = function ()
{	
	var Plane;
	var img; 
	var psize = 50, GameOver;
	var asteroids, Count, level = 0; 
	var bulls ;
	var frame = 1;
	var ROWS = 5 , COL = 12, total;
	var bgImg, planeimg, bbee, gbee;
	var destroyed, laser, start, explosion; 
	
	this.setup = function()
	{

		frameRate(frame);
		// ####Animaciones ####
		bgImg = loadAnimation("images/Galaga/back1","images/Galaga/back2","images/Galaga/back3","images/Galaga/back4");
		planeimg = loadImage("images/Galaga/Galaga.png");
		bbee = loadAnimation("images/Galaga/bbee1.png", "images/Galaga/bbee2.png");
		gbee = loadAnimation("images/Galaga/gbee1.png", "images/Galaga/gbee2.png");
		destroyed = loadSound('Sounds/Galaga/galaga_destroyed.wav');
		laser = loadSound('Sounds/Galaga/laser.wav');
		laser.setVolume(0.2);
		destroyed.setVolume(0.4);
		start = loadSound('Sounds/Galaga/start.mp3');
		explosion = loadSound('Sounds/Galaga/explosion.wav');
		bgImg.frameDelay = 10;
		GameOver = true;
		asteroids = new Group(); 
		bulls =  new Group(); 
		Plane = createSprite(width/2, height/1.2, psize,psize);
		Plane.addImage(planeimg);
  		//Plane.draw = function(){triangle(psize/2,0,0,psize,psize,psize) }
  		textAlign(CENTER);
  		textSize(50);
  		fill(0,100,100);
  		text("Click New Game",width/2,height/2);

	};
	
	draw = function ()
	{
		//clear();
		fill(0,100,100);
		textSize(30);
		textAlign(CENTER);
		if(!GameOver){
			background(0);
			animation( bgImg, width/2,height/2);
			Plane.position.x = constrain(mouseX,psize/2,width-psize/2);

			//camera.position.y = (Plane.position.y);

			for(var i=0;i<bulls.length; i++)
				if(bulls[i].position.y < 0){
					bulls[i].remove();
				}
			for(var i=0;i<asteroids.length;i++)  //Die 
				if(asteroids[i].position.y > height/1.2){
					die();
					text("Click Again",width/2,height/2);
				}

			if(Count >= total){
				win();
				text("WIN!!!, Click Next Level",width/2,height/2);
			}
			text ( Count, width-40 , 30)
			camera.on();
			asteroids.overlap(bulls,erase);
			drawSprites();
		}
	};

	newgame = function()
	{
		updateSprites(true);
		Count = 0;
		total = 0; 
		GameOver = false;
		levels(level);
		start.play();
	}

	die = function()
	{
		explosion.play();
		GameOver = true;
		updateSprites(false);
		text("Click Again",width/2,height/2);
  		asteroids.removeSprites();
  		
	}
	win = function()
	{
		GameOver = true;
  		level++;
		updateSprites(false);
		fill(0,100,100);
		asteroids.removeSprites();
  		
	}

	mousePressed = function() 
	{
		if(bulls.length<3){
			var s = createSprite(constrain(mouseX,psize/2,width-psize/2),height/1.2 - 10, 5,10);
			bulls.add(s);
			s.velocity.y =  -4;
			s.life=height/1.5;
			laser.play();
		}
		//console.log(bulls);
		if(GameOver)
    		newgame();

	};
	erase  = function (asteroid, bull)
	{
		destroyed.play();
		bull.remove();
		asteroid.remove();
		Count++;
	};

	levels = function(level) //Retorna el nivel deseado 
	{
		switch(level){
		case 0:
		// !!!!!! LEVEL #1 !!!!!!!
			for(var i=0;i<ROWS;i++)
	  		{
	  			for(var j=i; j<COL-i; j++)
	  			{
	  				var a = createSprite( 25*(j+1),25*(i+1), 20,20);
	  				asteroids.add(a);
	  				a.velocity.y=0.15;
	  				total++;
	  				if((j+i)%2 !=0)
	  					a.addAnimation("green",gbee);
	  				else 
	  					a.addAnimation("blue",bbee);
	  				a.animation.frameDelay = 50;
	  
	  			}
	  			for(var j=ROWS-i-1; j<COL-(ROWS-i-1); j++)
	  			{
	  				var a = createSprite( 25*(j) + 25 *COL,25*(i+1), 20,20);
	  				asteroids.add(a);
	  				a.velocity.y=0.15;
	  				total++;
	  				if((j+i)%2 !=0)
	  					a.addAnimation("green",gbee);
	  				else 
	  					a.addAnimation("blue",bbee);
	  				a.animation.frameDelay = 50;
	  			}
	  		}
	  		break;
	  	case 1:
	  	//!!!!!!! LEVEL # 2 !!!!!!!
	  		for(var i=0;i<ROWS;i++)
	  		{
	  			for(var j=i; j<COL-i; j++)
	  			{
	  				var a = createSprite( 45*(j+1),25*(i+1), 20,20);
	  				asteroids.add(a);
	  				a.velocity.y=0.3;
	  				total++;
	  				if((j+i)%2 !=0)
	  					a.addAnimation("green",gbee);
	  				else 
	  					a.addAnimation("blue",bbee);
	  				a.animation.frameDelay = 50;
	  
	  			}
	  		}
	  		break;
	  	default:
	  		break;
		}


	};

};
Galaga.prototype = new sketch;
