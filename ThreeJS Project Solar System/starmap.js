var camera, controls, scene, renderer;
var spotlight;
var theSun, theMercury, theVenus, theEarth, theMars, theJupiter, theSaturn, theUranus;
var theLuna;

//current simulation speed is 1 second = 1 day
//orbit speed: 1 day = 0.0001
//so for example: orbit speed mercury = 88 days = 0,00088

init();
animate();
renderSun();
renderMercury();
renderMercuryOrbit();
renderVenus();
renderVenusOrbit();
renderEarth();
renderEarthOrbit();
	renderLuna();
	renderLunaOrbit();
renderMars();
renderMarsOrbit();
renderJupiter();
renderJupOrbit();
renderSaturn();
renderSatOrbit();
renderUranus();
renderUraOrbit();
renderNeptune();
renderNepOrbit();

	function init(){
	//First making the scene to load the objects on.
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.01, 20000 );

		renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		renderer.setSize(window.innerWidth, window.innerHeight);
	    renderer.shadowMap.enabled = true;
	    renderer.shadowMapSoft = true;

		//axis helper to define the z x and y positions of the map.

		var axis = new THREE.AxisHelper(25);
		scene.add( axis );
		
		var imagePrefix = "images/starmap";
		// var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
		var directions  = ["", "", "", "", "", ""];
		var imageSuffix = ".jpg";
		var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );	
		
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
				side: THREE.BackSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
		var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		scene.add( skyBox );

		//a grid to give a better view of the canvas objects
		// var grid = new THREE.GridHelper(100, 5);
		// var color = new THREE.Color("rgb(255, 0, 0)");
		// grid.setColors(color, 0x666666)
		// scene.add(grid);

		///////////////////////Variables for objects (planets etc.)///////////////////////

		//Invisible object added to the different planets to create an orbit
		var OrbitTex = new THREE.TextureLoader().load( "" );

		/////////////////////////////////////The sun////////////////////////////////////

		//variable to define the texture of the sun.
		var loadSun = new THREE.TextureLoader().load( "images/suncyl1.jpg" );
		//variable to define the size and shape of the sphere.
		var geometry = new THREE.SphereGeometry( 10, 100, 100);
		//variable to define the color or texture of the sphere.
		var material = new THREE.MeshBasicMaterial( { map: loadSun } ); 
		//mesh both variables together to then add this one to the scene.
		theSun = new THREE.Mesh( geometry, material );
		scene.add( theSun );

		//----------------------------------Sun glow----------------------------------
		//variable to define the texture of the sun.
		var loadSun2 = new THREE.TextureLoader().load( "images/suncyl1.jpg" );
		//variable to define the size and shape of the sphere.
		var geometry2 = new THREE.SphereGeometry( 10.2, 100, 100);
		//variable to define the color or texture of the sphere.
		var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent:true, opacity:0.20 } ); 
		//mesh both variables together to then add this one to the scene.
		theSun2 = new THREE.Mesh( geometry2, material2 );
		scene.add( theSun2 );
		///////////////////////end sun///////////////////////

		/////////////////////////////////////Mercury////////////////////////////////////
		
		//variable to define the size and shape of the sphere.
		var geometryMeOrbit = new THREE.SphereGeometry(1, 1, 1);
		//variable to define the color or texture of the sphere.
		var meOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		mercuryOrbit = new THREE.Mesh( geometryMeOrbit, meOrbitMaterial );
		scene.add( mercuryOrbit );

		var mercury = new THREE.TextureLoader().load( "images/mercury.jpg" );

		var mercuryGeometry = new THREE.SphereGeometry(0.035, 100, 100);
		var mercuryMaterial = new THREE.MeshBasicMaterial( { map: mercury } );
		theMercury = new THREE.Mesh( mercuryGeometry, mercuryMaterial );
		mercuryOrbit.add( theMercury );

		var mercCameraGeometry = new THREE.SphereGeometry(0.010, 1, 1);
		var mercCameraMap = new THREE.MeshBasicMaterial( { map: OrbitTex } );
		mercCameraBall = new THREE.Mesh( mercCameraGeometry, mercCameraMap );
		mercuryOrbit.add( mercCameraBall );

		var mercurySprite = makeTextSprite( " Mercury ", 
		{ fontsize: 32, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:128, b:0, a:0.8} } );
		mercurySprite.position.set(0,2.5,0);
		theMercury.add( mercurySprite );
		/////////////////////////////////////Venus/////////////////////////////////////

		//Invisible object that added to the rendered mercury object to create an orbit
		//variable to define the size and shape of the sphere.
		var geometryVeOrbit = new THREE.SphereGeometry(1, 1, 1);
		//variable to define the color or texture of the sphere.
		var veOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		venusOrbit = new THREE.Mesh( geometryVeOrbit, veOrbitMaterial );
		scene.add( venusOrbit );

		var venus = new THREE.TextureLoader().load( "images/ven0mss2.jpg" );

		//0.1
		var venusGeometry = new THREE.SphereGeometry(0.087, 100, 100);
		var venusMaterial = new THREE.MeshBasicMaterial( { map: venus } );
		theVenus = new THREE.Mesh( venusGeometry, venusMaterial );
		venusOrbit.add( theVenus );

		var venCameraGeometry = new THREE.SphereGeometry(0.010, 1, 1);
		var venCameraMap = new THREE.MeshBasicMaterial( { map: OrbitTex } );
		venCameraBall = new THREE.Mesh( venCameraGeometry, venCameraMap );
		venusOrbit.add( venCameraBall );

		var venusSprite = makeTextSprite( " Venus ", 
		{ fontsize: 32, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:128, b:0, a:0.8} } );
		venusSprite.position.set(0,2.5,0);
		theVenus.add( venusSprite );

		/////////////////////////////////////Earth/////////////////////////////////////
		//variable to define the size and shape of the sphere.
		var geometryEarthOrbit = new THREE.SphereGeometry(0.01, 0.01, 0.01);
		//variable to define the color or texture of the sphere.
		var earthOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		earthOrbit = new THREE.Mesh( geometryEarthOrbit, earthOrbitMaterial );
		scene.add( earthOrbit );

		var earth = new THREE.TextureLoader().load( "images/earth-living.jpg" );

		//0.1
		var earthGeometry = new THREE.SphereGeometry(0.091, 100, 100);
		var earthMaterial = new THREE.MeshBasicMaterial( { map: earth } );
		theEarth = new THREE.Mesh( earthGeometry, earthMaterial );
		earthOrbit.add( theEarth );

		var earthCameraGeometry = new THREE.SphereGeometry(0.010, 1, 1);
		var earthCameraMap = new THREE.MeshBasicMaterial( { map: OrbitTex } );
		earthCameraBall = new THREE.Mesh( earthCameraGeometry, earthCameraMap );
		earthOrbit.add( earthCameraBall );

		var earthSprite = makeTextSprite( " Earth ", 
		{ fontsize: 32, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:128, b:0, a:0.8} } );
		earthSprite.position.set(0,2.5,0);
		theEarth.add( earthSprite );

		//////////////////////////////EARTH-MOON-Luna//////////////////////////////
		//variable to define the size and shape of the sphere.
		var geometryLunaOrbit = new THREE.SphereGeometry(0.01, 0.01, 0.01);
		//variable to define the color or texture of the sphere.
		var lunaOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		lunaOrbit = new THREE.Mesh( geometryLunaOrbit, lunaOrbitMaterial );
		earthOrbit.add( lunaOrbit );

		var luna = new THREE.TextureLoader().load( "images/luna.jpg" );

		var lunaGeometry = new THREE.SphereGeometry(0.0248, 100, 100);
		var lunaMaterial = new THREE.MeshBasicMaterial( { map: luna } );
		theLuna = new THREE.Mesh( lunaGeometry, lunaMaterial );
		lunaOrbit.add( theLuna );

		/////////////////////////////////////Mars//////////////////////////////////////
		//variable to define the size and shape of the sphere.
		var geometryMarsOrbit = new THREE.SphereGeometry(1, 1, 1);
		//variable to define the color or texture of the sphere.
		var marsOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		marsOrbit = new THREE.Mesh( geometryMarsOrbit, marsOrbitMaterial );
		scene.add( marsOrbit );

		var mars = new THREE.TextureLoader().load( "images/mars.jpg" );

		//0.1
		var marsGeometry = new THREE.SphereGeometry(0.048, 100, 100);
		var marsMaterial = new THREE.MeshBasicMaterial( { map: mars } );
		theMars = new THREE.Mesh( marsGeometry, marsMaterial );
		marsOrbit.add( theMars );

		var marsCameraGeometry = new THREE.SphereGeometry(0.010, 1, 1);
		var marsCameraMap = new THREE.MeshBasicMaterial( { map: OrbitTex } );
		marsCameraBall = new THREE.Mesh( marsCameraGeometry, marsCameraMap );
		marsOrbit.add( marsCameraBall );

		var marsSprite = makeTextSprite( " Mars ", 
		{ fontsize: 32, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:128, b:0, a:0.8} } );
		marsSprite.position.set(0,2.5,0);
		theMars.add( marsSprite );


		/////////////////////////////////////Jupiter///////////////////////////////////
		//variable to define the size and shape of the sphere.
		var geometryJupOrbit = new THREE.SphereGeometry(1, 1, 1);
		//variable to define the color or texture of the sphere.
		var jupOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		jupOrbit = new THREE.Mesh( geometryJupOrbit, jupOrbitMaterial );
		scene.add( jupOrbit );

		var jupiter = new THREE.TextureLoader().load( "images/jup0vtt2.jpg" );

		//0.1
		var jupGeometry = new THREE.SphereGeometry(1, 100, 100);
		var jupMaterial = new THREE.MeshBasicMaterial( { map: jupiter } );
		theJupiter = new THREE.Mesh( jupGeometry, jupMaterial );
		jupOrbit.add( theJupiter );

		var jupCameraGeometry = new THREE.SphereGeometry(0.010, 1, 1);
		var jupCameraMap = new THREE.MeshBasicMaterial( { map: OrbitTex } );
		jupCameraBall = new THREE.Mesh( jupCameraGeometry, jupCameraMap );
		jupOrbit.add( jupCameraBall );

		var jupiterSprite = makeTextSprite( " Jupiter ", 
		{ fontsize: 32, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:128, b:0, a:0.8} } );
		jupiterSprite.position.set(0,2.5,0);
		theJupiter.add( jupiterSprite );

		/////////////////////////////////////Saturn////////////////////////////////////
		//variable to define the size and shape of the sphere.
		var geometrySatOrbit = new THREE.SphereGeometry(1, 1, 1);
		//variable to define the color or texture of the sphere.
		var satOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		satOrbit = new THREE.Mesh( geometrySatOrbit, satOrbitMaterial );
		scene.add( satOrbit );

		var saturn = new THREE.TextureLoader().load( "images/saturn.jpg" );

		//0.1
		var satGeometry = new THREE.SphereGeometry(0.83, 100, 100);
		var satMaterial = new THREE.MeshBasicMaterial( { map: saturn } );
		theSaturn = new THREE.Mesh( satGeometry, satMaterial );
		satOrbit.add( theSaturn );

		var satCameraGeometry = new THREE.SphereGeometry(0.010, 1, 1);
		var satCameraMap = new THREE.MeshBasicMaterial( { map: OrbitTex } );
		satCameraBall = new THREE.Mesh( satCameraGeometry, satCameraMap );
		satOrbit.add( satCameraBall );

		var saturnSprite = makeTextSprite( " Saturn ", 
		{ fontsize: 32, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:128, b:0, a:0.8} } );
		saturnSprite.position.set(0,2.5,0);
		theSaturn.add( saturnSprite );

		//-----------------------------Saturns ring---------------------------------

		var saturnRing = new THREE.TextureLoader().load( "images/saturnRing.png" );

		//0.1
		var sringGeometry = new THREE.SphereGeometry(2.5, 100, 100);
		var sringMaterial = new THREE.MeshBasicMaterial( { map: saturnRing, transparent: true } );
		theSring = new THREE.Mesh( sringGeometry, sringMaterial );
		theSaturn.add( theSring );

		/////////////////////////////////////Uranus////////////////////////////////////
		//variable to define the size and shape of the sphere.
		var geometryUraOrbit = new THREE.SphereGeometry(1, 1, 1);
		//variable to define the color or texture of the sphere.
		var uraOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		uraOrbit = new THREE.Mesh( geometryUraOrbit, uraOrbitMaterial );
		scene.add( uraOrbit );

		var uranus = new THREE.TextureLoader().load( "images/Uranus_Map.jpg" );

		//0.1
		var uraGeometry = new THREE.SphereGeometry(0.36, 100, 100);
		var uraMaterial = new THREE.MeshBasicMaterial( { map: uranus } );
		theUranus = new THREE.Mesh( uraGeometry, uraMaterial );
		uraOrbit.add( theUranus );

		var uraCameraGeometry = new THREE.SphereGeometry(0.010, 1, 1);
		var uraCameraMap = new THREE.MeshBasicMaterial( { map: OrbitTex } );
		uraCameraBall = new THREE.Mesh( uraCameraGeometry, uraCameraMap );
		uraOrbit.add( uraCameraBall );

		var uranusSprite = makeTextSprite( " Uranus ", 
		{ fontsize: 32, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:128, b:0, a:0.8} } );
		uranusSprite.position.set(743.2,2,2);
		uraOrbit.add( uranusSprite );

		/////////////////////////////////////Neptune////////////////////////////////////
		//variable to define the size and shape of the sphere.
		var geometryNepOrbit = new THREE.SphereGeometry(1, 1, 1);
		//variable to define the color or texture of the sphere.
		var nepOrbitMaterial = new THREE.MeshBasicMaterial( { map: OrbitTex } );

		nepOrbit = new THREE.Mesh( geometryNepOrbit, nepOrbitMaterial );
		scene.add( nepOrbit );

		var neptune = new THREE.TextureLoader().load( "images/texture_neptune.jpg" );

		//0.1
		var nepGeometry = new THREE.SphereGeometry(0.35, 100, 100);
		var nepMaterial = new THREE.MeshBasicMaterial( { map: neptune } );
		theNeptune = new THREE.Mesh( nepGeometry, nepMaterial );
		nepOrbit.add( theNeptune );

		var nepCameraGeometry = new THREE.SphereGeometry(0.010, 1, 1);
		var nepCameraMap = new THREE.MeshBasicMaterial( { map: OrbitTex } );
		nepCameraBall = new THREE.Mesh( nepCameraGeometry, nepCameraMap );
		nepOrbit.add( nepCameraBall );

		var neptuneSprite = makeTextSprite( " Neptune ", 
		{ fontsize: 32, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:128, b:0, a:0.8} } );
		neptuneSprite.position.set(0,2.5,0);
		theNeptune.add( neptuneSprite );


		///////////////////////end objects///////////////////////
		
		//(start)position of camera and objects.
		camera.position.z = 40;
		camera.position.x = 0;
		camera.position.y = 0;

		theSun.position.z = 0;
		theSun.position.x = 0;
		theSun.position.y = 0;

		mercuryOrbit.position.z = 0;
		mercuryOrbit.position.x = 0;
		mercuryOrbit.position.y = 0;

		theMercury.position.z = 0;
		theMercury.position.x = 15;
		theMercury.position.y = 0;

		mercCameraBall.position.z = 0;
		mercCameraBall.position.x = 15;
		mercCameraBall.position.y = 0;

		venusOrbit.position.z = 0;
		venusOrbit.position.x = 0;
		venusOrbit.position.y = 0;

		theVenus.position.z = 0;
		theVenus.position.x = 28;
		theVenus.position.y = 0;

		venCameraBall.position.z = 0;
		venCameraBall.position.x = 28;
		venCameraBall.position.y = 0;

		earthOrbit.position.z = 0;
		earthOrbit.position.x = 0;
		earthOrbit.position.y = 0;

		theEarth.position.z = 0;
		theEarth.position.x = 38.7;
		theEarth.position.y = 0;

		lunaOrbit.position.z = 0;
		lunaOrbit.position.x = 38.7;
		lunaOrbit.position.y = 0;

		theLuna.position.z = 0.091+(38.7*0.00274);
		theLuna.position.x = 0;
		theLuna.position.y = 0;

		earthCameraBall.position.z = 0;
		earthCameraBall.position.x = 38.7;
		earthCameraBall.position.y = 0;

		marsOrbit.position.z = 0;
		marsOrbit.position.x = 0;
		marsOrbit.position.y = 0;

		theMars.position.z = 0;
		theMars.position.x = 59;
		theMars.position.y = 0;

		marsCameraBall.position.z = 0;
		marsCameraBall.position.x = 59;
		marsCameraBall.position.y = 0;

		jupOrbit.position.z = 0;
		jupOrbit.position.x = 0;
		jupOrbit.position.y = 0;

		theJupiter.position.z = 0;
		theJupiter.position.x = 201.5;
		theJupiter.position.y = 0;

		jupCameraBall.position.z = 0;
		jupCameraBall.position.x = 201.5;
		jupCameraBall.position.y = 0;

		satOrbit.position.z = 0;
		satOrbit.position.x = 0;
		satOrbit.position.y = 0;

		theSaturn.position.z = 0;
		theSaturn.position.x = 369.9;
		theSaturn.position.y = 0;

		satCameraBall.position.z = 0;
		satCameraBall.position.x = 369.9;
		satCameraBall.position.y = 0;

		uraOrbit.position.z = 0;
		uraOrbit.position.x = 0;
		uraOrbit.position.y = 0;

		theUranus.position.z = 0;
		theUranus.position.x = 743.2;
		theUranus.position.y = 0;
		theUranus.rotation.z = 1.6;

		uraCameraBall.position.z = 0;
		uraCameraBall.position.x = 743.2;
		uraCameraBall.position.y = 0;

		nepOrbit.position.z = 0;
		nepOrbit.position.x = 0;
		nepOrbit.position.y = 0;

		theNeptune.position.z = 0;
		theNeptune.position.x = 1164.4;
		theNeptune.position.y = 0;

		nepCameraBall.position.z = 0;
		nepCameraBall.position.x = 1164.4;
		nepCameraBall.position.y = 0;

	    window.addEventListener( 'resize', onWindowResize, false );

	    //controls to allow the user to move the canvas around with the mouse.
		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.rotateSpeed = 4;
		controls.zoomSpeed = 0.5;
		controls.panSpeed = 4;
		controls.noZoom = false;
		controls.noPan = true;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;
		controls.keys = [ 65, 83, 68 ];
		controls.addEventListener( 'change', render );
	}

	//function to make a 2d element (textbox) in a 3d environment
	function makeTextSprite( message, parameters ){
		if ( parameters === undefined ) parameters = {};
		
		var fontface = parameters.hasOwnProperty("fontface") ? 
			parameters["fontface"] : "Arial";
		
		var fontsize = parameters.hasOwnProperty("fontsize") ? 
			parameters["fontsize"] : 18;
		
		var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
			parameters["borderThickness"] : 4;
		
		var borderColor = parameters.hasOwnProperty("borderColor") ?
			parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
		
		var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
			parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
			
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		context.font = "Bold " + fontsize + "px " + fontface;
	    
		// get size data (height depends only on font size)
		var metrics = context.measureText( message );
		var textWidth = metrics.width;
		
		// background color
		context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
									  + backgroundColor.b + "," + backgroundColor.a + ")";
		// border color
		context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
									  + borderColor.b + "," + borderColor.a + ")";

		context.lineWidth = borderThickness;
		roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
		// 1.4 is extra height factor for text below baseline: g,j,p,q.
		
		// text color
		context.fillStyle = "rgba(0, 255, 0, 1.0)";

		context.fillText( message, borderThickness, fontsize + borderThickness);
		
		// canvas contents will be used for a texture
		var texture = new THREE.Texture(canvas) 
		texture.needsUpdate = true;

		var spriteMaterial = new THREE.SpriteMaterial( 
			{ map: texture, useScreenCoordinates: false } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.scale.set(10,5,1.0);
		return sprite;	
	}

	// function for drawing rounded rectangles (boxes) for the text information
	function roundRect(ctx, x, y, w, h, r){
	    ctx.beginPath();
	    ctx.moveTo(x+r, y);
	    ctx.lineTo(x+w-r, y);
	    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
	    ctx.lineTo(x+w, y+h-r);
	    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
	    ctx.lineTo(x+r, y+h);
	    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
	    ctx.lineTo(x, y+r);
	    ctx.quadraticCurveTo(x, y, x+r, y);
	    ctx.closePath();
	    ctx.fill();
		ctx.stroke();   
	}

	function onWindowResize(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		controls.handleResize();
		render();
	}
	//function that allows you to move the canvas.
	function animate(){
		requestAnimationFrame(animate);
		controls.update();
		render();
	}
/////////////////////////////////////////////////////////////////////////////////////////
//Objects placed inside the planets to attach the camera to. 
//This to prevent the camera to rotate with the planets own rotation.
	function cameraOnMercury() {
		mercCameraBall.add(camera);
		camera.position.z = 0;
		camera.position.x = 0.2;
		camera.position.y = 0;	
	}

	function cameraOnVenus() {	
		venCameraBall.add(camera);
		camera.position.z = 0;
		camera.position.x = 0.2;
		camera.position.y = 0;	
	}

	function cameraOnEarth() {
		earthCameraBall.add(camera);
		camera.position.z = 0;
		camera.position.x = 0.2;
		camera.position.y = 0;
	}

	function cameraOnMars() {
		marsCameraBall.add(camera);
		camera.position.z = 0;
		camera.position.x = 0.2;
		camera.position.y = 0;
	}

	function cameraOnJupiter() {
		jupCameraBall.add(camera);
		camera.position.z = 0;
		camera.position.x = 5;
		camera.position.y = 0;
	}

	function cameraOnSaturn() {
		satCameraBall.add(camera);
		camera.position.z = 0;
		camera.position.x = 5;
		camera.position.y = 0;
	}

	function cameraOnUranus() {
		uraCameraBall.add(camera);
		camera.position.z = 0;
		camera.position.x = 5;
		camera.position.y = 0;
	}

	function cameraOnNeptune() {
		nepCameraBall.add(camera);
		camera.position.z = 5;
		camera.position.x = 5;
		camera.position.y = 0;
	}

	//The sun rotates 66000 km per day, with this all objects will have their rotation calculated.
	//the orbit of an object has as unit EARTH DAYS where 1 earth day is 1 second.
	//the planet rotation has as unit EARTH DAYS Where 1 earth day is 1 second.
	function renderSun(){
		requestAnimationFrame(renderSun);
		theSun.rotation.y += 0.00066;
	}

	function renderMercuryOrbit(){
		requestAnimationFrame(renderMercuryOrbit);
		mercuryOrbit.rotation.y += 0.00088;
	}

	function renderMercury(){
		requestAnimationFrame(renderMercury);
		theMercury.rotation.y += 0.00132;
	}

	function renderVenusOrbit(){
		requestAnimationFrame(renderVenusOrbit);
		venusOrbit.rotation.y += 0.00035;
	}

	function renderVenus(){
		requestAnimationFrame(renderVenus);
		theVenus.rotation.y += 0.00032;
	}

	function renderEarthOrbit(){
		requestAnimationFrame(renderEarthOrbit);
		earthOrbit.rotation.y += 0.00021;
	}
	/////////////////////EARTH///////////////////////
	function renderEarth(){
		requestAnimationFrame(renderEarth);
		theEarth.rotation.y += 0.07665;
	}
	//////////////////EARTHS MOONS///////////////////
	function renderLunaOrbit(){
		requestAnimationFrame(renderLunaOrbit);
		lunaOrbit.rotation.y += 0.0028054;
	}

	function renderLuna(){
		requestAnimationFrame(renderEarth);
		theLuna.rotation.y += 0.0028054;
	}
	/////////////////END EARTH///////////////////////
	function renderMarsOrbit(){
		requestAnimationFrame(renderMarsOrbit);
		marsOrbit.rotation.y += 0.00011;
	}

	function renderMars(){
		requestAnimationFrame(renderMars);
		theMars.rotation.y += 0.07864;
	}

	function renderJupOrbit(){
		requestAnimationFrame(renderJupOrbit);
		jupOrbit.rotation.y += 0.000017;
	}

	function renderJupiter(){
		requestAnimationFrame(renderJupiter);
		theJupiter.rotation.y += 0.188736;
	}

	function renderSatOrbit(){
		requestAnimationFrame(renderSatOrbit);
		satOrbit.rotation.y += 0.00000684;
	}

	function renderSaturn(){
		requestAnimationFrame(renderSaturn);
		theSaturn.rotation.y += 0.177217;
	}

	function renderUraOrbit(){
		requestAnimationFrame(renderUraOrbit);
		uraOrbit.rotation.y += 0.00000241;
	}

	function renderUranus(){
		requestAnimationFrame(renderUranus);
		theUranus.rotation.x += -0.136077;
		theUranus.rotation.y += 0.00000241;
	}

	function renderNepOrbit(){
		requestAnimationFrame(renderNepOrbit);
		nepOrbit.rotation.y += 0.00000123;
	}

	function renderNeptune(){
		requestAnimationFrame(renderNeptune);
		theNeptune.rotation.y += 0.118328;
	}

	//render the camera to show the objects.
	function render(){
		renderer.render(scene, camera);
	}