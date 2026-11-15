import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const container = document.querySelector("#landscape");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#fcfce7");
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

//Renderer draws scene onto canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const gridWidth = 30;
const gridDepth = 20;
const columns = 30;
const rows = 20;
const points = [];

//Horizontal lines in grid
for (let row = 0; row <= rows; row++) {
    const z = -gridDepth / 2 + (row / rows) * gridDepth;
    points.push(-gridWidth / 2, 0, z, gridWidth / 2, 0, z);
}

//Perpendicular lines
for (let column = 0; column <= columns; column++) {
    const x = -gridWidth / 2 + (column / columns) * gridWidth;
    points.push(x, 0, -gridDepth / 2, x, 0, gridDepth / 2);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
const material = new THREE.LineBasicMaterial({ color: "#879ba8" });
const grid = new THREE.LineSegments(geometry, material);
scene.add(grid);

//Render grid 
function renderGrid() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;

    //Dynamic movement so grid remains visible
    const distanceScale = Math.max(1, 1 / camera.aspect);
    camera.position.set(22 * distanceScale, 24 * distanceScale, 30 * distanceScale);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
}

renderGrid();
window.addEventListener("resize", renderGrid);
