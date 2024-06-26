import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

//drawing shape
const normal = new THREE.TextureLoader().load("normal.jpg");
const moontexture = new THREE.TextureLoader().load("moon.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 35, 32),
  new THREE.MeshStandardMaterial({
    map: moontexture,
    normalMap: normal,
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

//light
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(20, 20, 20);
const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointlight, ambientlight);

//helpers
/*const lighthelper =  new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper( 200, 50 );
scene.add(lighthelper,gridHelper)*/

//const controls = new OrbitControls(camera,renderer.domElement)

//add star
function addstar() {
  let geometry = new THREE.SphereGeometry(2, 24, 24);
  let material = new THREE.MeshStandardMaterial({ color: "white" });
  let star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addstar);

//space background
// const texture = new THREE.TextureLoader().load('space1.jpg')
// scene.background = texture

//earth
const earthtexture = new THREE.TextureLoader().load("earth.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 35, 32),
  new THREE.MeshStandardMaterial({
    map: earthtexture,
    normalMap: normal,
  })
);
scene.add(earth);

earth.position.z = -15;
earth.position.setX(0);

//scroll animation
function movecamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.01;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  earth.rotation.x += 0.01;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.0003
  camera.rotation.y = t * -0.00005;
}
document.body.onscroll = movecamera;

let date;
let moonorbitRadius = 30;

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.03;
  //moon.rotation.z += 0.01;

  earth.rotation.y += 0.01;
  earth.rotation.y += 0.003;

  date = Date.now() * 0.00125;
  moon.position.set(
    Math.cos(date) * moonorbitRadius,
    0,
    Math.sin(date) * moonorbitRadius
  );

  renderer.render(scene, camera);
}
animate();


const dynamicText = document.querySelector("h1 span");
const words = ["Innovation", "Potential", "Knowledge", "Self-Improvement"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");
    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}
typeEffect();


const getQuotes=()=>{
const quotes=[
    {
   quote: "Love many things, for therein lies the true strength, and whosoever loves much performs much, and can accomplish much, and what is done in love is done well.",
 author:     "Vincent Van Gogh"
    },
   {
  quote: "For all sad words of tongue and pen, The saddest are these, 'It might have been'.",
author:      "John Greenleaf Whittier"
    },
      {
      quote: "Kindness is a mark of faith and whoever is not kind has no faith",
      author:"Prophet Muhammad(PBUH)"
    },
    {
      quote:"Great things are not done by impulse, but by a series of small things brought together",
      author:"Vincent Van Gogh"
    },
      {
      quote:"Creativity is seeing what others see and thinking what no one else ever thought.",
      author:"Albert Einstein"
    },
    {
      quote:"Simplicity, carried to the extreme, becomes elegance.",
      author:"Jon Franklin"
      },
    {
      quote:"Computers are incredibly fast, accurate, and stupid. Human beings are incredibly slow, inaccurate, and brilliant. Together they are powerful beyond imagination.",
     author: "Albert Einstein, physicist"
    },
    {
      quote:"Most of the good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.", 
      author:"Linus Torvalds"
    },
    {
      quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
       author:"Martin Fowler"
    }
    ]
  const randIndex = Math.floor(Math.random()*quotes.length-1)
  const randQuote = quotes[randIndex]
  const quoteContainer = document.querySelector('.quote').append(randQuote.quote)
  const authorContainer = document.querySelector('.author').append(randQuote.author)
}
window.onload=(e)=>getQuotes()
