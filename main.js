import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xff2121 , wireframe:false})
const torus =  new THREE.Mesh(geometry,material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-10,10,5)

const lightHelper = new THREE.PointLightHelper(pointLight)
const controls = new OrbitControls(camera , renderer.domElement)
scene.add(pointLight,lightHelper)

function addStar(){
  const stargeometry = new THREE.SphereGeometry(0.25, 24,24)
  const starmaterial = new THREE.MeshBasicMaterial({color:0xffffff})
  const star = new THREE.Mesh(stargeometry,starmaterial);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const bgtexture = new THREE.TextureLoader().load('bg.jpg')
scene.background = bgtexture;

const myimage = new THREE.TextureLoader().load('pp.png')
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: myimage})
)
scene.add(cube)

function animate(){
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01



  renderer.render(scene,camera);
}

animate()