import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const container = document.querySelector("#landscape");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#fcfce7");
const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 1000);

//Renderer draws scene onto canvas  
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const gridWidth = 90;
const gridDepth = 90;
const columns = 70;
const rows = 80;
const points = [];

//Gaussian for bell curve shape, generates higher and lower points based around a central point.
function hillHeight(x, z, centreX, centreZ, height, width) {
    const dx = x - centreX;
    const dz = z - centreZ;
    const distanceSquared = dx * dx + dz * dz;
    return height * Math.exp(-distanceSquared / (2 * width * width));
}

//Fixed hills(for now) and valleys combined
function terrainHeight(x, z) {
    return hillHeight(x, z, -8, -3, 5, 3.4)
        + hillHeight(x, z, 1, 3, 3.5, 2.8)
        + hillHeight(x, z, 8, -2, 4.4, 3.2)
        + hillHeight(x, z, 0, -4, -1.7, 2.4);
}

//Horizontal line segments to follow the curve
for (let row = 0; row <= rows; row++) {
    const z = -gridDepth / 2 + (row / rows) * gridDepth;
    for (let column = 0; column < columns; column++) {
        const x1 = -gridWidth / 2 + (column / columns) * gridWidth;
        const x2 = -gridWidth / 2 + ((column + 1) / columns) * gridWidth;
        points.push(x1, terrainHeight(x1, z), z);
        points.push(x2, terrainHeight(x2, z), z);
    }
}

//Same thing for perpendicular lines so they intersect
for (let column = 0; column <= columns; column++) {
    const x = -gridWidth / 2 + (column / columns) * gridWidth;
    for (let row = 0; row < rows; row++) {
        const z1 = -gridDepth / 2 + (row / rows) * gridDepth;
        const z2 = -gridDepth / 2 + ((row + 1) / rows) * gridDepth;
        points.push(x, terrainHeight(x, z1), z1);
        points.push(x, terrainHeight(x, z2), z2);
    }
}

const geometry = new THREE.BufferGeometry();
//assigning positions of points[]
geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
//colour 
const material = new THREE.LineBasicMaterial({ color: "#879ba8" });
//Wireframe geometry 
const grid = new THREE.LineSegments(geometry, material);
scene.add(grid);


function renderGrid() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;

    //Camera position
    camera.position.set(15, 20, 55);

    //Camera direction
    camera.lookAt(0, 0, 0);

    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
}

renderGrid();
window.addEventListener("resize", renderGrid);
