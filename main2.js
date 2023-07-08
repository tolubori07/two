import './style2.css'

import * as THREE from 'three';

import{OrbitControls} from'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#big')
});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);
camera.position.setX(-3)
renderer.render(scene, camera)

const normal = new THREE.TextureLoader().load('normal.jpg')
//drawing shape
const earthtexture = new THREE.TextureLoader().load('earth.jpg');
const earth = new THREE.Mesh(
	new THREE.SphereGeometry(10, 35, 32), 
	new THREE.MeshStandardMaterial({
		map: earthtexture,
		normalMap:normal
	}))
scene.add(earth)




//light
const pointlight = new THREE.PointLight(0xffffff,0.1)
pointlight.position.set(20,0,20)
const ambientlight = new THREE.AmbientLight(0xffffff)
scene.add(pointlight,ambientlight)

/*helpers
const lighthelper =  new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper( 2000, 500 );
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
const moontexture = new THREE.TextureLoader().load('moon.jpg');

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

let date;
let moonorbitRadius = 30;

function animate() {
	requestAnimationFrame(animate)
	earth.rotation.y += 0.003

	moon.rotation.y += 0.01

    date = Date.now() * 0.00125;
moon.position.set(
  Math.cos(date) * moonorbitRadius,
  0,
  Math.sin(date) * moonorbitRadius
);

    controls.update();
	renderer.render(scene,camera)
}
animate()
