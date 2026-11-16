import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.querySelector("#landscape");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#fcfce7");
const camera = new THREE.PerspectiveCamera(55, 2, 0.1, 1000);


//Renderer draws scene onto canvas  
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

//Camera position
camera.position.set(30, 55, 90);

//Attach dragging controls to the canvas.
const controls = new OrbitControls(camera, renderer.domElement);

//rotation point
controls.target.set(0, 5, 0);

//Keep the target and viewing distance fixed.
controls.enablePan = false;
controls.enableZoom = false;

controls.update();

//Redraw whenever dragging changes the camera.
controls.addEventListener("change", function () {
    renderer.render(scene, camera);
});

const gridWidth = 200;
const gridDepth = 200;
const columns = 500;
const rows = 200;
let hills = [];

//Calculation of a mountains elevation contribution, gaussian for bell curve shape
function hillHeight(x, z, centreX, centreZ, height, width) {
    //Calculating how far the centre of a mountain is to a specific point on the grid, determining how much elevation is contributed by a mountain.
    const dx = x - centreX;
    const dz = z - centreZ;
    const distanceSquared = dx * dx + dz * dz;
    return height * Math.exp(-distanceSquared / (2 * width * width));
}

//turn a word's letters into numerical values to make up the properties of a mountain, like location
function wordToHill(word) {
    //storing a numerical value from a word
    let sum = 0;
    let weightedSum = 0;
    //Creation of a sum from the characters in a word. There are two sums. The first just calculates the letters at face value, if that makes sense. Then the second one, weightedSum, takes into account the position of each letter in the word, as to not have duplicate gaussians for anagrams.
    for (let i = 0; i < word.length; i++) {
        const code = word.charCodeAt(i);
        sum += code;
        weightedSum += code * (i + 1);
    }

    //Ensuring that the slopes can fit within grid
    const xRange = 60
    const zRange = 60   
    //construction of a hill, ensuring that the numbers aren't too lange
    return {
        //center location on x axis
        x: (weightedSum % (xRange + 1)) - xRange / 2,
        //center location on z axis 
        z: ((sum * 7 + weightedSum * 3) % (zRange + 1)) - zRange / 2,
        //height of the hill
        height: 2 + (sum % 40) / 10,
        //width of the hill
        width: 2 + (weightedSum % 30) / 10
    };
}

//Total height based on the position of a point, for every mountain. Helps produce a continuous rise and fall for overlapping mountains
function terrainHeight(x, z) {
    //Points begin at zero, aka flat terrain    
    let height = 0;

    //pass through different hills and how much they alter a points height, and add them all for the height.
    for (const hill of hills) {
        height += hillHeight(x, z, hill.x, hill.z, hill.height, hill.width);
    }
    return height;
}

//Choosing colours based on point elevation
function elevationColour(height) {
    if (height < 1) {
        //Blue for lowest points
        return new THREE.Color("#879ba8"); 
    } else if (height < 2.5) {
        //Green for low slopes
        return new THREE.Color("#8fa681"); 
    } else if (height < 3.75) {
        //Yellow for higher slopes
        return new THREE.Color("#d2b568"); 
    } else {
        //Red for highest points
        return new THREE.Color("#bd776e"); 
    }
}

//Assigning colors to vertices 
const material = new THREE.LineBasicMaterial({ vertexColors: true });
//Consecutive pairs of points are interpreted as line segments.
const grid = new THREE.LineSegments(new THREE.BufferGeometry(), material);
scene.add(grid);

//Construction of the lines and points that make up the grid
export function buildTerrain(words) {
    hills = [];

    //Adding the converted hills into the empty array
   for (const word of words) {
    hills.push(wordToHill(word));
}
    //Array of points
    const points = [];
    //Array of colours
    const colours = [];

    //Going through the rows in order to generate the points to make up the X axis lines
    for (let row = 0; row <= rows; row++) {
        //Z position of the row
        const z = -gridDepth / 2 + (row / rows) * gridDepth;
        for (let column = 0; column < columns; column++) {
            //Determing where the line segments start and end
            const x1 = -gridWidth / 2 + (column / columns) * gridWidth;
            const x2 = -gridWidth / 2 + ((column + 1) / columns) * gridWidth;
            //Creating two points to make up a line segment, terrainHeight() function is used for Y for elevation. Pushed into points array.
            points.push(x1, terrainHeight(x1, z), z);
            points.push(x2, terrainHeight(x2, z), z);
        }
    }

    //Perpendicular lines, same process as before, use the same heights so there is intersection.
    for (let column = 0; column <= columns; column++) {
        const x = -gridWidth / 2 + (column / columns) * gridWidth;
        for (let row = 0; row < rows; row++) {
            const z1 = -gridDepth / 2 + (row / rows) * gridDepth;
            const z2 = -gridDepth / 2 + ((row + 1) / rows) * gridDepth;
            points.push(x, terrainHeight(x, z1), z1);
            points.push(x, terrainHeight(x, z2), z2);
        }
    }

    //assigning colours to points by going through points array and passing the elevation through the elevationColour function for its appropriate colour
    //As there are 3 coordinates, xyz, i increases by 3 to move from one point to the next
    for (let i = 0; i < points.length; i += 3) {
        //Based on Y coordinates since that determines colour
        const colour = elevationColour(points[i + 1]);
        colours.push(colour.r, colour.g, colour.b);
    }

    //Creation of updated geometry/landscape
    const geometry = new THREE.BufferGeometry();
    //Assigns the colour to the geometry
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colours, 3));

    //Disposal of old "layout" so that it does not accumulate in the memory.
    grid.geometry.dispose();
    //Assigning  the points to the existing grid
    grid.geometry = geometry;
    renderGrid();
}

//Renderig the grid 
function renderGrid() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;

    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
}

//Show a flat grid until script.js retrieves the saved words.
buildTerrain([]);
window.addEventListener("resize", renderGrid);
