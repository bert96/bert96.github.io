var renderer;
var mouse, raycaster;
var scene, camera, controls;
var loadPlanet, planetGeometry, planetMaterial, thePlanet, theClouds, cloudMaterial, theAtmosphere, atmosphereMaterial;
var javMaterial, beMaterial, resMaterial, sensorMaterial, designMaterial;
var theJavCity = [];
var theBeCity = [];
var theResCity = [];
var theSensorCity = [];
var theDesignCity = [];
var materialArray = [];
var mesh;

init();
animate();
renderPlanetMotion();
//add event listener to mouse and calls function when activated
window.addEventListener( 'mousedown', onDocumentMouseDown, false );
window.addEventListener( 'touchstart', onDocumentTouchStart, false );
window.requestAnimationFrame(render);

function init() {
	//Creating the environment where all the objects get loaded on.
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.01, 20000 );

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

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

    //functionality to define the 3d background of the canvas.
	var imagePrefix = "images/starmap";
	// var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var directions  = ["", "", "", "", "", ""];
	var imageSuffix = ".jpg";
	var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );

	const textureLoader = new THREE.TextureLoader();

	textureLoader.load(
			// resource URL
		'images/starmap.jpg',
		// onLoad callback
		function ( texture ) {
			for (var i = 0; i < 6; i++) {
				// in this example I create the material when the texture is loaded
				materialArray.push( new THREE.MeshBasicMaterial( {
					map: texture,
					side: THREE.BackSide
				}));
			 }
		},

		// onProgress callback currently not supported
		undefined,

		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	)

	var skyBox = new THREE.Mesh( skyGeometry, materialArray );
	scene.add( skyBox );

    /////////////////////////////////////The Planet////////////////////////////////////

	//variable to define the texture of the planete.
	loadPlanet = new THREE.TextureLoader().load( "images/mars.jpg" );
	//variable to define the size and shape of the sphere.
	planetGeometry = new THREE.SphereGeometry( 10, 100, 100);
	//variable to define the color or texture of the sphere.
	planetMaterial = new THREE.MeshBasicMaterial( { map: loadPlanet } );
	//mesh both variables together to then add this one to the scene.
	thePlanet = new THREE.Mesh( planetGeometry, planetMaterial );
	scene.add( thePlanet );

	//---------------------------------Planet Atmosphere---------------------------
	//variable to define the size and shape of the sphere.
	var atmosphereGeometry = new THREE.SphereGeometry( 10.15, 100, 100);
	//variable to define the color or texture of the sphere.
	atmosphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff7200, transparent:true, opacity:0.20 } );
	//mesh both variables together to then add this one to the scene.
	theAtmosphere = new THREE.Mesh( atmosphereGeometry, atmosphereMaterial );
	scene.add( theAtmosphere );

	//---------------------------------Planet clouds-------------------------------
	//variable to define the texture of the atmosphere.
	var loadClouds = new THREE.TextureLoader().load( "images/cloudmap1.png" );
	//variable to define the size and shape of the sphere.
	var cloudGeometry = new THREE.SphereGeometry( 10.20, 100, 100);
	//variable to define the color or texture of the sphere.
	cloudMaterial = new THREE.MeshBasicMaterial( { map: loadClouds, transparent:true, opacity: 0.9 } );
	//mesh both variables together to then add this one to the scene.
	theClouds = new THREE.Mesh( cloudGeometry, cloudMaterial );

	/////////////////////////////////////Planet cities///////////////////////////////////

	//---------------------------------front-end city----------------------------------

	var javGeometry = new THREE.SphereGeometry( 0.5, 100, 100);
	//variable to define the color or texture of the sphere.
	javMaterial = new THREE.MeshBasicMaterial( { color: 0xff7200 } );
	//mesh both variables together to then add this one to the scene.
	theJavCity = new THREE.Mesh( javGeometry, javMaterial );
	thePlanet.add( theJavCity );

	//Adding floating nametag to city
	var javSprite = makeTextSprite( " Frontend ",
	{ fontsize: 20, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:0, b:0, a:0.8} } );
	javSprite.position.set(0,0,5);
	theJavCity.add( javSprite );

	//-------------------------------back-end city--------------------------------------

	var beGeometry = new THREE.SphereGeometry( 0.5, 100, 100);
	//variable to define the color or texture of the sphere.
	beMaterial = new THREE.MeshBasicMaterial( { color: 0xff7200 } );
	//mesh both variables together to then add this one to the scene.
	theBeCity = new THREE.Mesh( beGeometry, beMaterial );
	thePlanet.add( theBeCity );

	//Adding floating nametag to city
	var beSprite = makeTextSprite( " Backend ",
	{ fontsize: 20, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:0, b:0, a:0.8} } );
	beSprite.position.set(0,0,5);
	theBeCity.add( beSprite );

	//-------------------------------research city--------------------------------------

	var resGeometry = new THREE.SphereGeometry( 0.5, 100, 100);
	//variable to define the color or texture of the sphere.
	resMaterial = new THREE.MeshBasicMaterial( { color: 0xff7200 } );
	//mesh both variables together to then add this one to the scene.
	theResCity = new THREE.Mesh( resGeometry, resMaterial );
	thePlanet.add( theResCity );

	//Adding floating nametag to city
	var resSprite = makeTextSprite( " Research ",
	{ fontsize: 20, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:0, b:0, a:0.8} } );
	resSprite.position.set(0,0,5);
	theResCity.add( resSprite );

	//---------------------------------sensor city--------------------------------------

	var sensorGeometry = new THREE.SphereGeometry( 0.5, 100, 100);
	//variable to define the color or texture of the sphere.
	sensorMaterial = new THREE.MeshBasicMaterial( { color: 0xff7200 } );
	//mesh both variables together to then add this one to the scene.
	theSensorCity = new THREE.Mesh( sensorGeometry, sensorMaterial );

	//Adding floating nametag to city
	var sensorSprite = makeTextSprite( " Sensors ",
	{ fontsize: 20, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:0, b:0, a:0.8} } );
	sensorSprite.position.set(0,0,5);
	theSensorCity.add( sensorSprite );

	//---------------------------------design city--------------------------------------

	var designGeometry = new THREE.SphereGeometry( 0.5, 100, 100);
	//variable to define the color or texture of the sphere.
	designMaterial = new THREE.MeshBasicMaterial( { color: 0xff7200 } );
	//mesh both variables together to then add this one to the scene.
	theDesignCity = new THREE.Mesh( designGeometry, designMaterial );
	thePlanet.add( theDesignCity );

	//Adding floating nametag to city
	var designSprite = makeTextSprite( " Designing ",
	{ fontsize: 20, fontface: "Arial", borderColor: {r:0, g:255, b:0, a:1.0}, backgroundColor: {r:0, g:0, b:0, a:0.8} } );
	designSprite.position.set(0,0,5);
	theDesignCity.add( designSprite );


	var light = new THREE.PointLight(0xffffff);
	light.position.set(1000,0,1500);
	scene.add(light);

	//Defining positions of all objects and the viewpoint

	//camera position
	camera.position.z = 40;
	camera.position.x = 20;
	camera.position.y = 0;

	//planet
	thePlanet.position.z = 0;
	thePlanet.position.x = 0;
	thePlanet.position.y = 0;

	theAtmosphere.position.z = 0;
	theAtmosphere.position.x = 0;
	theAtmosphere.position.y = 0;

	//cities
	theJavCity.position.z = 9.5;
	theJavCity.position.x = 1;
	theJavCity.position.y = 3;

	theBeCity.position.z = 0;
	theBeCity.position.x = -3;
	theBeCity.position.y = 9.55;

	theResCity.position.z = 0;
	theResCity.position.x = 8.75;
	theResCity.position.y = -5;
	theResCity.rotation.y = 2;
	theResCity.rotation.x = -2;

	theSensorCity.position.z = -8.55;
	theSensorCity.position.x = 3;
	theSensorCity.position.y = 4.45;
	theSensorCity.rotation.x = 3;

	theDesignCity.position.z = 0;
	theDesignCity.position.x = -10;
	theDesignCity.position.y = 0;
	theDesignCity.rotation.y = 5;
	theDesignCity.rotation.x = 0;


	//function to resize canvas on window size
	window.addEventListener( 'resize', onWindowResize, false );

	//defining controls to allow the user to click objects
	//adding raycaster and mouse as 2D vector
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	//reset the info screen
	$(".info-screen").empty();
}

function onDocumentTouchStart( e ) {
	e.preventDefault();

	e.clientX = e.touches[0].clientX;
	e.clientY = e.touches[0].clientY;
	onDocumentMouseDown( e );
}

function onDocumentMouseDown( e ) {
	e.preventDefault();

	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	const beCityClick = raycaster.intersectObject( theBeCity );
	const javCityClick = raycaster.intersectObject( theJavCity );
	const resCityClick = raycaster.intersectObject( theResCity );
	const sensorCityClick = raycaster.intersectObject( theSensorCity );
	const designCityClick = raycaster.intersectObject( theDesignCity );

	var color = (Math.random() * 0xffffff);

	$(".close-button").click(function() {
		var checkDisplay = $(".info-screen").css("display");
		console.log(checkDisplay);
		if(checkDisplay == "block") {
			$(".info-screen").css("display", "none");
		}
	});

	if( designCityClick.length > 0 ) {
		console.log("It works!");
		theDesignCity.name = "theDesignCity";
		theDesignCity.material.color.setHex( color );
		$(".info-screen").css("display", "block");
		$(".info-screen").empty();
		$(".info-screen.phaseOne").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Design City</h2>"
			+"<img src='images/designmap1.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>This year I learned quite a lot about simple basics when it comes to designing. What I learned mostly about this year, is that it is very important to interview your client properly and stay always in close contact with the person. This way you can always get feedback on a project and tweak it towards your clients&#39; desires.</p>"
			+"</div>");

		$(".info-screen.phaseTwo").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Design City</h2>"
			+"<img src='images/designmap2.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>One of the more interesting things I learned about designing this year, is user experience and designing a proper database. User Experience is about doing quite a lot of research to get specifics for functionalities in the application from your target group. The biggest thing I learned here is that designing is mostly about doing a really good research where all the design specifics are already determined. Doing a good research is the core of every good designed product, as it fulfills most of the needs of your target group. </br></br>We also learned to create a proper database, which I think is also really important. Having a well set up database, makes extracting and injecting data into your database a lot easier. So it is always good to implement some extra time to think of setting up your database to spare yourself trouble later on when you want to use it.</p>"
			+"</div>");

		$(".info-screen.phaseThree").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Design City</h2>"
			+"<img src='images/designmap3.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>During my Minor, I learned about certain design methods and applying them during our main project. While I am not really an mechanical engineer, I did learn about aspects of it which can also be important to apply while making sensor systems. We designed with a sustainability point of view. This means, that you take in consideration all the factors that are intertwined with product that you want to create. There is are a lot of methods to be applied with sustainable design, but the big picture basically is that you tweak your design from multiple point of views. You work from a inner layer to an outer layer of societal factors that have to be taken into consideration. The inner layer basically starts with the economic point of view (how can the product be sold to our target group?), the middle circle is the society (Which people do we have to take in consideration making this product?) and the outer circle is the environment (how can we make a product that is recyclable or not harmful for the environment?). </p>"
			+"</div>");

		$(".info-screen.phaseFour").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Design City</h2>"
			+"<img src='images/designmap4.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>During this year I want to apply the things I learned from the design research lectures to my final study project.</p>"
			+"</div>");
	}

	if( sensorCityClick.length > 0 ) {
		theSensorCity.name = "theSensorCity";
		theSensorCity.material.color.setHex( color );
		$(".info-screen").css("display", "block");
		$(".info-screen").empty();
		$(".info-screen.phaseThree").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Sensor City</h2>"
			+"<img src='images/sensormap3.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>The reason I chose the minor Technology to Create is to get more knowledge connected to Internet of Things. I wanted to learn to program sensors and to use them in web- and application development. During this time we got a lot of assignments with Arduino, I learned here a lot on the different sensors there are and how to build a circuit for the sensors. Besides that I learned how to program sensors systems with the Arduino, which are ideal as an proof of concept for sensor projects you might be working on.</p>"
			+"</div>");

		$(".info-screen.phaseFour").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Sensor City</h2>"
			+"<img src='images/sensormap3.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>I would like to push myself using new technologies that are available for the Arduino to create a certain sensor system for our IWP project. During an interview our project group learned that the client wants to have a positioning system which is apparently quite challenging to make. I would like to put myself out of my comfortzone and research the possibilities and program a positioning system.</p>"
			+"</div>");
	}

	if( resCityClick.length > 0 ) {
		theResCity.name = "theResCity";
		theResCity.material.color.setHex( color );
		$(".info-screen").css("display", "block");
		$(".info-screen").empty();
		$(".info-screen.phaseOne").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Research City</h2>"
			+"<img src='images/researchmap1.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>This first year, we didn&#39;t learn much about researching yet. I did get feedback on writing essays on how to apply certain methods and how to properly references for reading and applying articles. Other than that, I used most of my experiences from my previous study (Archeology) to write essays.</p>"
			+"</div>");

		$(".info-screen.phaseTwo").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Research City</h2>"
			+"<img src='images/researchmap2.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>The first thing I learned with doing research, is that I liked to do it surprisingly much. I never really had interests in doing research before. Doing the deskresearch assignment, I really liked looking for academic articles and reading them. I think it is really interesting to learn about all type of things, no matter what the research assignment is. Sadly, I did fail at the first try of this assignment. Reason for this is that I was surprised by the amount of time you need to look for proper articles. I learned that looking for articles and reading them properly is the biggest consume of time when doing a research. Besides that, I also learned that formulating certain sentences is also a weakness of mine. I did get a good grade on doing the research, but a lower grade on doing the writing. So this is something I can focus on improving for the future.</p>"
			+"</div>");

		$(".info-screen.phaseThree").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Research City</h2>"
			+"<img src='images/researchmap3.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>During my minor I learned a lot about doing research from a sustainable point of view. Since we were making a big physical product with a lot of tech attached to it (a sensor buoy). It was important for us to keep many factors in mind to make a product fitting for all the factors it influences. I learned a lot during this research, mostly about interviewing. I interviewed a lot of people together with a project group member that was experienced in doing research. We also did a lot of presentations with the project group. During this time it helped me a lot to overcome my presentation anxiety and it learned me a lot of doing proper interviews to get useful data for our paper.</p>"
			+"</div>");

		$(".info-screen.phaseFour").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Research City</h2>"
			+"<img src='images/researchmap4.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>Doing a design research is something I haven’t really done before. I would like to learn more about this by applying certain methods which Chris Dijksterhuis has teached us during his lectures. I also look forward to then apply this knowledge on the final study assignment.</p>"
			+"</div>");
	}

	if( beCityClick.length > 0 ) {
		theBeCity.name = "theBeCity";
		theBeCity.material.color.setHex( color );
		$(".info-screen").css("display", "block");
		$(".info-screen").empty();
		$(".info-screen.phaseOne").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Backend City</h2>"
			+"<img src='images/bemap1.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>To be honest, back-end was probably the least attractive thing I learned during this year. It is a essential component to atleast know the basics of PHP to apply to your own projects. During this year we learned about Wordpress and learned to set up our own theme whilst also applying the different back-end functionalities to your theme. For me personally, it was always really vague why certain functions work a certain way, and made it quite hard for me to learn and apply. What made things easier for me to understand back-end coding, is to watch video’s and talk to teachers who explain it in a deeper way.</p>"
			+"</div>");

		$(".info-screen.phaseTwo").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Backend City</h2>"
			+"<img src='images/bemap2.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>This year back-end development defined for me that I wanted to become a front-end developer. The assignment we had for the content management system was very focused on creating a proper back-end environment for the system with Object Oriented Programming. I had trouble with understanding certain aspects of creating such a system and was quite frustrated because of that. What I learned is that creating a proper and well thought of back-end environment is one of the most important parts of creating a website. I had trouble creating this, and because of that I also had a lot of trouble creating a working front-end environment with JSON, because my back-end was bad. In the end, even as a front-end developer you need to have some knowledge about back-end to create a properly working website.</p>"
			+"</div>");

		$(".info-screen.phaseThree").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Backend City</h2>"
			+"<img src='images/bemap2.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>During my third year I spend my first semester on a minor called Technology to Create. During this minor we had a project where we would make a sensor system for the Groninger Seaports. For this system I had the main task to get the data from a sensor device and put it in a database. Here I put myself a bit out of my comfort zone to learn something completely new to process this data. Here I learned basics on how to use the Python language to process this data into a SQL database. Even though it took some time to get this system working, it was a very fun and informative process. I learned that while getting out of your comfort zone can be a scary thing that you might fail at, that failing is a good thing. You learn the most from failing at your first try, the important thing is to learn from it and move on to get the thing working in some way. If you get something working, you can learn more making something efficient.</p>"
			+"</div>");

		$(".info-screen.phaseFour").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Backend City</h2>"
			+"<img src='images/bemap2.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>For my upcoming final study assignment, I will probably work with Arduino again to create a sensor system. I want to focus this time on changing things up when it comes to using data in a database. There are certain components that can be used with a Arduino to make this more efficient. I would like to learn and apply these components to use during this project.</p>"
			+"</div>");
	}

	if( javCityClick.length > 0 ) {
		theJavCity.name = "theJavCity";
		theJavCity.material.color.setHex( color );

		$(".info-screen").css("display", "block");
		$(".info-screen").empty();
		$(".info-screen.phaseOne").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Frontend City</h2>"
			+"<img src='images/javmap1.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>Starting with the study, I had no idea of anything related to code. I started from the bottom, having to learn HTML, CSS and Javascript from scratch. HTML and CSS is the basics of front-end developing, and I learned it very quickly. For me it was very easy to understand and to apply the basics of HTML and CSS. Later that year, we also got lectures in Javascript. Javascript is way broarder in what you can do with it, and making it also more complicated for me. In my first year, I still struggled to apply Javascript properly in projects and could only do quite simple things with it. What I learned from this year is, that you need to keep learning by trying to challenge yourself by trying to program something in a reverse engineering type of way. So you look at already existing things, and you try to rebuild it from scratch in your own code.</p>"
			+"</div>");

		$(".info-screen.phaseTwo").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Frontend City</h2>"
			+"<img src='images/javmap2.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>The second year had some lectures and assignments which learned me quite a lot. One of the most interesting projects we were doing was creating a content management system by applying Object Oriented Programming. This is a good mix of Javascript and PHP which learned me a lot more about programming and how complicated it can get. Sadly, this year I failed this subject. It was for me still quite confusing and hard to learn OOP. What made me fail this subject, is that I had too redo other subjects from my first year which were important to get my propaedeutics. I used to be a person that was relatively lazy when it comes to finishing homework. This year learned me to be more proactive instead of reactive, it is always better to instantly finish projects or assignments the moment you get them than postponing them till the last moment.</p>"
			+"</div>");

		$(".info-screen.phaseThree").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Frontend City</h2>"
			+"<img src='images/javmap3.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>This year I had a internship at a full internet service company. I fulfilled my role as a front-end developer there. During my studytime, this has been the most informative time for my front-end skills. During this time I had a 24/7 mentor who I could ask for help when developing something. Besides that, I always got good feedback on how I could create things better. I learned a lot of new things in the fields of HTML, CSS, Javascript and JQuery. I was especially surprised on how much there was still to learn on the field of CSS. I learned a lot of new CSS techniques during my internship time. The things that went less well, is trying to to estimate the time I need for certain tasks. During my internship we used the scrum method during projects. With the scrum method, you iterate in sprints and review the process of your work that way every three weeks. From the reviews I always lacked knowledge how much time I would need to finish certain tickets (assignments) and would always need more time than I estimated. This is a weakness I tried to work on during my internship, but I learned that this is something you get better at if you also get better at programming. If you get better at programming, you have a better idea how long it takes to program something which gives you also a better vision how much time it takes to make.</p>"
			+"</div>");

		$(".info-screen.phaseFour").append(""
			+"<div class='close-object'>"
				+"<div class='close-button'></div>"
			+"</div>"
			+"<h2 class='city-name'>Frontend City</h2>"
			+"<img src='images/javmap4.jpg' width='100%' height='auto' class='city-map'>"
			+"<div class='info-screen-text'>"
				+"<p id='typewriter'>During my fourth year, I have so far learned new things on the field of front-end development. For the infographic assignment, I wanted to push myself a bit out of my comfort zone, rather than making something with the knowledge I already have. I decided to use the Three framework to make a 3D interactive infographic about my development during this study. I do have some basic knowledge about this framework, but I wanted to push this a little further to create some new functions with it to broaden my knowledge. Making click functions in a 3D environment is pretty complicated to make which is also one of the biggest learning points from this project.</p>"
			+"</div>");
	}
}

function makeTextSprite( message, parameters ){
	if ( parameters === undefined ) parameters = {};

	var fontface = parameters.hasOwnProperty("fontface") ?
		parameters["fontface"] : "Arial";

	var fontsize = parameters.hasOwnProperty("fontsize") ?
		parameters["fontsize"] : 18;

	var borderThickness = parameters.hasOwnProperty("borderThickness") ?
		parameters["borderThickness"] : 2;

	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:0, g:0, b:0, a:1.0 };

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
		{ map: texture } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(10,5,0);
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

function renderPhaseOne() {
	planetMaterial.map = new THREE.TextureLoader().load( "images/mars.jpg" );
	planetMaterial.needsUpdate = true;
	scene.remove(theClouds);
	thePlanet.remove( theSensorCity );
	$(".info-screen").empty();
	$(".info-screen").css("display", "none");
	$(".info-screen").addClass("phaseOne");
	$(".info-screen").removeClass("phaseTwo phaseThree phaseFour");
}

function renderPhaseTwo() {
	scene.remove(theClouds);
	scene.add( theClouds );
	thePlanet.remove( theSensorCity );
	cloudMaterial.map = new THREE.TextureLoader().load( "images/cloudmap1.png" );
	planetMaterial.map = new THREE.TextureLoader().load( "images/mars2.jpg" );
	cloudMaterial.needsUpdate = true;
	planetMaterial.needsUpdate = true;
	$(".info-screen").empty();
	$(".info-screen").css("display", "none");
	$(".info-screen").addClass("phaseTwo");
	$(".info-screen").removeClass("phaseOne phaseThree phaseFour");
}

function renderPhaseThree() {
	scene.remove(theClouds);
	scene.add( theClouds );
	thePlanet.remove( theSensorCity );
	thePlanet.add( theSensorCity );
	cloudMaterial.map = new THREE.TextureLoader().load( "images/cloudmap2.png" );
	planetMaterial.map = new THREE.TextureLoader().load( "images/mars3.jpg" );
	cloudMaterial.needsUpdate = true;
	planetMaterial.needsUpdate = true;
	$(".info-screen").empty();
	$(".info-screen").css("display", "none");
	$(".info-screen").addClass("phaseThree");
	$(".info-screen").removeClass("phaseOne phaseTwo phaseFour");
}

function renderPhaseFour() {
	scene.remove(theClouds);
	scene.add( theClouds );
	thePlanet.remove( theSensorCity );
	thePlanet.add( theSensorCity );
	cloudMaterial.map = new THREE.TextureLoader().load( "images/cloudmap3.png" );
	planetMaterial.map = new THREE.TextureLoader().load( "images/mars4.jpg" );
	cloudMaterial.needsUpdate = true;
	planetMaterial.needsUpdate = true;
	$(".info-screen").empty();
	$(".info-screen").css("display", "none");
	$(".info-screen").addClass("phaseFour");
	$(".info-screen").removeClass("phaseOne phaseTwo phaseThree");
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
	render();
}

function render() {
	renderer.render(scene, camera);
}

function renderPlanetMotion() {
	requestAnimationFrame(renderPlanetMotion);
	thePlanet.rotation.y += 0.0006;
	theClouds.rotation.y += -0.0003
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();
}
