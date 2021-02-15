var scene, camera, controls;
var renderer;
var mesh, theVessle, theEarth, theMoon;

init();
animate();

	function init(){
	//First making the scene to load the objects on.
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.01, 20000 );

		renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		renderer.setSize(window.innerWidth, window.innerHeight);
	    renderer.shadowMap.enabled = true;
	    renderer.shadowMapSoft = true;

		//axis helper to define the z x and y positions of the map.

		// var axis = new THREE.AxisHelper(25);
		// scene.add( axis );

		var light = new THREE.PointLight(0x777777);
		light.position.set(0,0,1000);
		scene.add(light);

		camera.position.z = 100;
		camera.position.x = -150;
		camera.position.y = 0;

		//controls to allow the user to move the canvas around with the mouse.
		controls = new THREE.TrackballControls( camera, renderer.domElement );
			controls.rotateSpeed = 4;
			controls.zoomSpeed = 0.5;
			controls.panSpeed = 4;
			controls.noZoom = true;
			controls.noPan = true;
			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.3;
			controls.keys = [ 65, 83, 68 ];
			controls.addEventListener( 'change', render );


		///////////////////////////////////////vessle/////////////////////////////////////
		//the vessle allows the determination of the moonrotation speed.

		var vessle = new THREE.TextureLoader().load( "" );

		//0.1
		var vessleGeometry = new THREE.SphereGeometry(1, 1, 1);
		var vessleMaterial = new THREE.MeshBasicMaterial( { map: vessle } );
		theVessle = new THREE.Mesh( vessleGeometry, vessleMaterial );
		scene.add( theVessle );

		theVessle.position.z = -100;
		theVessle.position.x = 150;
		theVessle.position.y = 12;

		//////////////////////////////////////earth///////////////////////////////////////

		var earth = new THREE.TextureLoader().load( "/assets/images/earth-living.jpg" );

		//0.1
		var earthGeometry = new THREE.SphereGeometry(100, 100, 100);
		var earthMaterial = new THREE.MeshBasicMaterial( { map: earth } );
		theEarth = new THREE.Mesh( earthGeometry, earthMaterial );
		scene.add( theEarth );

		theEarth.position.z = -100;
		theEarth.position.x = 150;
		theEarth.position.y = 12;

		//////////////////////////////////////moon/////////////////////////////////////////

		var moon = new THREE.TextureLoader().load( "/assets/images/moon.jpg" );

		//0.1
		var moonGeometry = new THREE.SphereGeometry(27, 100, 100);
		var moonMaterial = new THREE.MeshBasicMaterial( { map: moon } );
		theMoon = new THREE.Mesh( moonGeometry, moonMaterial );
		theVessle.add( theMoon );

		theMoon.position.z = 0;
		theMoon.position.x = -160;
		theMoon.position.y = 0;
	}
	
	window.addEventListener( 'resize', onWindowResize, false );
	function onWindowResize(){

	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();

	    renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function render(){
		renderer.render(scene, camera);
	}

	function animate(){
		requestAnimationFrame(animate);
		controls.update();
		render();
		theEarth.rotation.y += 0.001;
		theMoon.rotation.y += 0.0000333;
		theVessle.rotation.y += 0.0000333;
	}


