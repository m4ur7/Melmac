

// Importar estilos y bibliotecas necesarias
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Configurar la escena
const scene = new THREE.Scene();

// Configurar la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Configurar el renderizador y asociarlo al elemento canvas
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Ajustar la resolución del renderizador
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Posicionar la cámara en el espacio
camera.position.setZ(30);
camera.position.setX(-3);

// Renderizar la escena con la cámara inicial
renderer.render(scene, camera);

// Crear un toro en la escena
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Cambiar la textura del toroide
const torusTexture = new THREE.TextureLoader().load('torus.jpg');
torus.material.map = torusTexture;

// Configurar luces en la escena
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Función para agregar estrellas al azar en la escena
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// Agregar 200 estrellas a la escena
Array(200).fill().forEach(addStar);

// Configurar el fondo de la escena con una textura espacial
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Configurar un avatar en la escena
const eclipseTexture = new THREE.TextureLoader().load('eclipse.jpg');
const eclipse = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: eclipseTexture }));
scene.add(eclipse);

// Configurar la luna en la escena con texturas y posición específica
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

eclipse.position.z = -5;
eclipse.position.x = 2;

// Animación al hacer scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  eclipse.rotation.y += 0.01;
  eclipse.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

// Asociar la función de animación al evento de scroll
document.body.onscroll = moveCamera;

// Llamar a la función para posicionar la cámara inicialmente
moveCamera();

// Bucle de animación principal
function animate() {
  requestAnimationFrame(animate);

  // Rotación del toro y la luna
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // Actualizar controles de órbita (comentado)
  // controls.update();

  // Renderizar la escena con la cámara actualizada
  renderer.render(scene, camera);
}

// Iniciar el bucle de animación
animate();
