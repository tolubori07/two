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

const knot = new THREE.Mesh(geometry,material)
scene.add(knot)




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

//moon
const moontexture = new THREE.TextureLoader().load('earth.jpg');
const normal = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
	new THREE.SphereGeometry(5, 35, 32), 
	new THREE.MeshStandardMaterial({
		map: moontexture,
		normalMap:normal
	}))
scene.add(moon)

moon.position.z=30;
moon.position.setX(-10)


//scroll animation
 function movecamera (){
const t = document.body.getBoundingClientRect().top
moon.rotation.x += 0.05
moon.rotation.y +=0.001
moon.rotation.z +=0.001

camera.position.y = t * -0.002
camera.position.x = t * -0.03
//camera.position.z = t * -0.05

}
document.body.onscroll = movecamera



function animate() {
	requestAnimationFrame(animate)

	knot.rotation.x += 0.01
	knot.rotation.y += 0.003
	knot.rotation.z += 0.01

	moon.rotation.y += 0.01
	moon.rotation.y += 0.003
	


    controls.update();
	
	renderer.render(scene,camera)
}
animate()

//anime js for the progress bar
var cssbar = document.querySelector('.cssnum')
var jsbar = document.querySelector('.jsnum')

var htmlbar = document.querySelector('.htmlnum');

var myhtmlObject = {
  proficiency: '0%'
}
var mycssObject = {
	proficiency: '0%'
  }
  var myjsObject = {
	proficiency: '0%'
  }

anime({
  targets: myhtmlObject,
  proficiency: '90%',
  duration: 5000,
  easing: 'easeInOutSine',
  round: 1,
  update: function() {
    htmlbar.innerHTML = JSON.stringify(myhtmlObject);
  }
});

anime({
	targets: mycssObject,
	proficiency: '70%',
	duration: 5000,
	easing: 'easeInOutSine',
	round: 1,
	update: function() {
	  cssbar.innerHTML = JSON.stringify(mycssObject);
	}
  });

  anime({
	targets: myjsObject,
	proficiency: '60%',
	duration: 5000,
	easing: 'easeInOutSine',
	round: 1,
	update: function() {
	  jsbar.innerHTML = JSON.stringify(myjsObject);
	}
  });
  window.onresize = function() {
    document.body.height = window.innerHeight;
}
window.onresize(); // called to initially set the height.