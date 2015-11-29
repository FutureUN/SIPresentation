var Stick = function ()
{
	var stick = [];  
	var top = [];  
	var donut;
	var donuts =  [new Group(), new Group(), new Group()];
	
	var selected = -1;
	var sizeSelected = 0;
	var comesFrom = -1;

	var NUMBER_OF_DONUTS = 6;	
	
	this.setup= function ()
	{	
		//console.log (INF);
		background(200,50,100);
		initGame(NUMBER_OF_DONUTS);

	};


	draw = function ()
	{
		background(200,50,100);
		if(donuts[2].length == NUMBER_OF_DONUTS )
       	{
       		//updateSprites(false);   		
           	text("GANOOOOOOOOOOOOOOOOOOOO!!!!!11",width/2,height/2);
           	console.log("GANOOOOOOOOOOOOOOOOOOOO");
		}
		//console.log(selected);
		for ( var i = 0 ; i < 3 ; i ++ )
			takeOne(i);		
		if (selected != -1 )
		{
			donuts[comesFrom][selected].position.y = 300;
			for ( var i = 0 ; i < 3 ; i ++ )
				grabOne(i)
		}
		
		drawSprites();
	}

	initGame = function (n)
	{
		for ( var i = 0 ; i < 3 ; i ++  )
		{
			stick.push( createSprite(width*(i+1)/4, 500 , 20, 300));
			top.push(createSprite(width*(i+1)/4, 340 , 20, 20));
			stick[i].mouseActive = true;
			top[i].mouseActive = true;
		}
		for(var i =0 ; i< n ; i ++)
		{

			donut = createSprite(width /4 ,600-(i*40+20), 150 - ( i * 20 ),40);
			donuts[0].add(donut);
			donuts[0][i].mouseActive= true;
		}
		drawSprites();
	};
	grabOne = function (n)
	{
		if (top[n].mouseIsPressed)
			{
		//		console.log("yeah" + donuts1[donuts1.length-1].width ) ;
				if (donuts[n].length == 0 || donuts[n][donuts[n].length-1].width > sizeSelected )
				{
					donuts[n].add (createSprite(width * (n+1) /4 ,600-(donuts[n].length*40+20), sizeSelected,40));
					donuts[n][donuts[n].length-1].shapeColor = donuts[comesFrom][selected].shapeColor;
					donuts[n][donuts[n].length-1].mouseActive = true;
					donuts[comesFrom][selected].remove();
					selected = -1;
				}
				else if ( donuts[n][donuts[n].length-1].width == sizeSelected)
				{
					donuts[n][donuts[n].length-1].position.y =600-((donuts[n].length-1)*40+20)
					selected = -1;
				}
			}
	}


	takeOne = function(n)
	{
		if ( donuts[n].length > 0)
		{
			if ( donuts[n][donuts[n].length-1].mouseIsPressed && selected == -1) 
			{	
				selected = donuts[n].length-1;
				sizeSelected = donuts[n][selected].width;
			//donuts1[donuts1.length-1].remove();
				comesFrom = n;			
			}
		}
	}

}

Stick.prototype = new sketch;

