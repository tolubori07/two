import './style.css'

import * as THREE from 'three';

import{OrbitControls} from'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);
camera.position.setX(-3)
renderer.render(scene, camera)

//drawing shape
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshLambertMaterial({color:0xff345c});

const torus = new THREE.Mesh(geometry,material)
scene.add(torus)




//light
const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(20,20,20)
const ambientlight = new THREE.AmbientLight(0xffffff)
scene.add(pointlight,ambientlight)

//helpers
/*const lighthelper =  new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper( 200, 50 );
scene.add(lighthelper,gridHelper)*/

const controls = new OrbitControls(camera,renderer.domElement)

//add star
function addstar(){
	let geometry = new THREE.SphereGeometry(2,24,24)
	let material = new THREE.MeshStandardMaterial({color:'white'})
	let star = new THREE.Mesh(geometry, material);

	const[x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1000));

	star.position.set(x,y,z)
	scene.add(star)
}
Array(200).fill().forEach(addstar)

//space background
const texture = new THREE.TextureLoader().load('space.jpg')
scene.background = texture

//earth
const earthtexture = new THREE.TextureLoader().load('earth.jpg');
const normal = new THREE.TextureLoader().load('normal.jpg')

const earth = new THREE.Mesh(
	new THREE.SphereGeometry(5, 35, 32), 
	new THREE.MeshStandardMaterial({
		map: earthtexture,
		normalMap:normal
	}))
scene.add(earth)

earth.position.z=30;
earth.position.setX(-10)


//scroll animation
 function movecamera (){
const t = document.body.getBoundingClientRect().top
earth.rotation.x += 0.05
earth.rotation.y +=0.001
earth.rotation.z +=0.001

camera.position.y = t * -0.002
camera.position.x = t * -0.03
//camera.position.z = t * -0.05

}
document.body.onscroll = movecamera



function animate() {
	requestAnimationFrame(animate)

	torus.rotation.x += 0.01
	torus.rotation.y += 0.003
	torus.rotation.z += 0.01

	earth.rotation.y += 0.01
	earth.rotation.y += 0.003
	


    controls.update();
	
	renderer.render(scene,camera)
}
animate()

//anime js for the progress bar
var cssbar = document.querySelector('.csschange')
var jsbar = document.querySelector('.jschange')

var htmlbar = document.querySelector('.htmlchange');

  window.onresize = function() {
    document.body.height = window.innerHeight;
}
window.onresize(); // called to initially set the height.

anime({
  targets: htmlbar,
  innerHTML: [0, 90+"%"],
  easing: 'linear',
  round: 10 // Will round the animated value to 1 decimal
});
anime({
	targets: cssbar,
	innerHTML: [0, 70+"%"],
	easing: 'linear',
	round: 1 // Will round the animated value to 1 decimal
  });
  anime({
	targets: jsbar,
	innerHTML: [0, 60+"%"],
	easing: 'linear',
	round: 10 // Will round the animated value to 1 decimal
  });