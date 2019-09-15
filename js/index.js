//================== canvas
    var container = document.getElementById('paint');
    var renderer = new THREE.WebGLRenderer({antialiase:true});
    container.appendChild(renderer.domElement);
    renderer.setSize(container.getBoundingClientRect().width, container.getBoundingClientRect().height);
    //renderer.setClearColor(0x151515, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;



    //================= scene and camera
    var scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0xcce0ff );
    //scene.fog = new THREE.Fog( 0xcce0ff, 500, 800 );
    var camera = new THREE.PerspectiveCamera(45, container.getBoundingClientRect().width / container.getBoundingClientRect().height, 3, 10000);
    camera.lookAt(new THREE.Vector3(0, 10, 0));
    camera.position.set( 50, 50, 75 );



    //================= resize
    // window.addEventListener("resize", function() {
    //   let width = container.getBoundingClientRect().width;
    //   let height = container.getBoundingClientRect().height;
    //   renderer.setSize(width, height);
    //   camera.aspect = width / height;
    //   camera.updateProjectionMatrix();
    // });


    //================= grid helper for viewing
    // var grid = new THREE.GridHelper(150, 50);
    // grid.material.color = new THREE.Color('gray');
    // scene.add(grid);



    //=============== control with mouse
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.maxPolarAngle = Math.PI / 2.1;




    //================add ambient light
    scene.add( new THREE.AmbientLight(0x666666));

    //=============== add 3 Lights, for basic 3 lights view
    var light = new THREE.DirectionalLight(0xdfebff, 0.3);//key light
    light.position.set(100, 170, 120);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    var d = 300;
    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.camera.far = 500;
    scene.add(light);

    //==========fill light
    var light = new THREE.DirectionalLight(0xdfebff, 0.2);
    light.position.set(-100, 160, 80);
    scene.add(light);
    //==========add back light
    var light = new THREE.SpotLight(0xdfebff, 0.6);
    light.position.set(80, 60, -150);
    scene.add(light);



    //==================================add texture
    var texture = new THREE.Texture();
    var imgLoader = new THREE.ImageLoader();
    imgLoader.load('obj/mario/occipital.png',function(img)
    {
      texture.image = img;
      texture.needsUpdate = true;
    });



    //================ button to change clothes for object
    var image_c = 2; 
    let buttonCg = document.querySelector('.change_clo');
    buttonCg.addEventListener('click', function() {
      if(image_c==2)
      {
        imgLoader.load('obj/mario/2.png',function(img)
        {
          texture.image = img;
          texture.needsUpdate = true;
          image_c = image_c+1;
        });
      }
      else if(image_c==3)
      {
        imgLoader.load('obj/mario/3.png',function(img)
        {
          texture.image = img;
          texture.needsUpdate = true;
          image_c = 1;
        });
      }
      else
      {
        imgLoader.load('obj/mario/1.png',function(img)
        {
          texture.image = img;
          texture.needsUpdate = true;
          image_c = image_c+1;
        });
      }

    });




    //==================================================== Add obj
    var loader = new THREE.OBJLoader();
    loader.load( 'obj/mario/brain.obj', function ( obj ) {

      obj.traverse(function(child)
      {

          if (child instanceof THREE.Mesh)
          {
            child.material = new THREE.MeshLambertMaterial( { color: 0xffffff, map:texture } );
            child.castShadow = true;
            child.receiveShadow = true;
            //child.material.map = texture;
            //child.material.transparent = true;
          }
      }); 
      obj.scale.set(12, 12, 12);
      obj.position.set(0, 0, 0);
      //obj.rotateX(-Math.PI*0.5);
      //obj.castShadow = true;
      //obj.receiveShadow = true;
      scene.add(obj);



    //=========================== buttons for moving obj
    var x,y,z;
    x = obj.position.x;
    y = obj.position.y;
    z = obj.position.z;
    let buttonX1 = document.querySelector('.X_up');
    buttonX1.addEventListener('click', function() {
      x = x + 1;
      obj.position.x = x;
    });
    let buttonX2 = document.querySelector('.X_down');
    buttonX2.addEventListener('click', function() {
      x = x - 1;
      obj.position.x = x;
    });

    let buttonY1 = document.querySelector('.Y_up');
    buttonY1.addEventListener('click', function() {
      //obj.rotateZ(-Math.PI);
      y = y + 1;
      obj.position.y = y;
    });
    let buttonY2 = document.querySelector('.Y_down');
    buttonY2.addEventListener('click', function() {
      y = y - 1;
      obj.position.y = y;
    });

    let buttonZ1 = document.querySelector('.Z_up');
    buttonZ1.addEventListener('click', function() {
      //obj.rotateZ(-Math.PI);
      z = z + 1;
      obj.position.z = z;
    });
    let buttonZ2 = document.querySelector('.Z_down');
    buttonZ2.addEventListener('click', function() {
      z = z - 1;
      obj.position.z = z;
    });


    //================= buttons for Scaling obj up and down
    var i = 12;
    let button2 = document.querySelector('.two');
    button2.addEventListener('click', function() {
      i = i+1;
      obj.scale.set(i, i, i);
    });

    let button2_2 = document.querySelector('.two_l');
    button2_2.addEventListener('click', function() {
      i = i-1;
      if(i==0){
        i=1;
        alert("You can't scale down any more!"); 
      }
      else
        obj.scale.set(i, i, i);
    });


    //======================== buttons for Rotating obj
   let buttonXR1 = document.querySelector('.X_Rup');
    buttonXR1.addEventListener('click', function() {
      obj.rotateX(0.05 * Math.PI);
    });
   let buttonXR2 = document.querySelector('.X_Rdown');
    buttonXR2.addEventListener('click', function() {
      obj.rotateX(-0.05 * Math.PI);
    });

   let buttonYR1 = document.querySelector('.Y_Rup');
    buttonYR1.addEventListener('click', function() {
      obj.rotateY(0.05 * Math.PI);
    });
   let buttonYR2 = document.querySelector('.Y_Rdown');
    buttonYR2.addEventListener('click', function() {
      obj.rotateY(-0.05 * Math.PI);
    });

   let buttonZR1 = document.querySelector('.Z_Rup');
    buttonZR1.addEventListener('click', function() {
      obj.rotateZ(0.05 * Math.PI);
    });
   let buttonZR2 = document.querySelector('.Z_Rdown');
    buttonZR2.addEventListener('click', function() {
      obj.rotateZ(-0.05 * Math.PI);
    });



    //================ Move the object with keyboard "asdw"
    document.addEventListener("keydown",keydown);
    function keydown(event){
      var moveSpeed = 3;
      if(event.keyCode==68){
          obj.position.x+=moveSpeed;
      }
      else if(event.keyCode==65){
          obj.position.x-=moveSpeed;
      }
      else if(event.keyCode==83){
          obj.position.z+=moveSpeed;
      }
      else if(event.keyCode==87){
          obj.position.z-=moveSpeed;
      }
    }



  });




    //==============add ground
    // var Tloader = new THREE.TextureLoader();
    // var groundTexture = Tloader.load( 'obj/grasslight-big.jpg' );
    // groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    // groundTexture.repeat.set( 16, 16 );
    // groundTexture.anisotropy = 16;

    // var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

    // var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), groundMaterial );
    // mesh.position.y = 0;
    // mesh.rotation.x = - Math.PI / 2;
    // mesh.receiveShadow = true;
    // scene.add( mesh );




    //=============== Circle path for the camera
    var segmentCount = 10;
    var radius = 60;
    var xyzArray = new Array(segmentCount)
      .fill(null)
      .map(
        (d, i) =>
        new THREE.Vector3(
          /*x*/
          Math.cos(i / segmentCount * Math.PI * 2) * radius,
          /*y*/
          25,
          /*z*/
          Math.sin(i / segmentCount * Math.PI * 2) * radius
        )
      );

    var curve = new THREE.CatmullRomCurve3(xyzArray);
    curve.closed = true;
    var g2 = new THREE.Geometry();
    g2.vertices = curve.getPoints(50);
    var m2 = new THREE.LineBasicMaterial({
      color: new THREE.Color("skyblue")
    });
    var curveObject = new THREE.Line(g2, m2);
    //scene.add(curveObject);





    //===================================================== animate

    spline = curve;
    camPosIndex = 0;
    clock = new THREE.Clock();

    function animate() {

      TWEEN.update();

      camPosIndex++;
      if (camPosIndex > 1000) {
        camPosIndex = 0;
      }


      let camPos = spline.getPoint(camPosIndex / 1000); //move camera x,y,z
      let camRot = spline.getTangent(camPosIndex / 1000); //rotates camera x,y,z


      //move camera on path
      if (document.getElementById("myCheck").checked == true) 
      {
        camera.position.set(camPos.x, camPos.y, camPos.z );
        camera.lookAt(new THREE.Vector3(0, 7, 0));
      } 
      else 
      {
        camera.position.set(camera.position.x, camera.position.y, camera.position.z);
        camera.lookAt(new THREE.Vector3(0, 7, 0));
      }


    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    }

    animate();
