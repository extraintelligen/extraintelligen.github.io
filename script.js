function caesarDecrypt(text, shift = 3) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const isUpperCase = code >= 65 && code <= 90;
            const base = isUpperCase ? 65 : 97;
            const shifted = (code - base - shift + 26) % 26;
            return String.fromCharCode(shifted + base);
        }
        return char;
    }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.querySelector('.input-box');
    const submitBtn = document.querySelector('.submit-btn');
    const resultDiv = document.getElementById('result');

    function handleDecryption() {
        const inputText = inputBox.value.trim();
        if (inputText) {
            const preprocessedText = inputText.replace(/%/g, '@');
            const decryptedText = caesarDecrypt(preprocessedText);
            resultDiv.textContent = `The decrypted email is: ${decryptedText}`;
            resultDiv.style.display = 'block';
        } else {
            resultDiv.textContent = '';
            resultDiv.style.display = 'none';
        }
    }

    submitBtn.addEventListener('click', handleDecryption);
    inputBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleDecryption();
        }
    });
});

// Three.js setup
let scene, camera, renderer, cube, directionalLight, crossedEdges;
let time = 0;

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xff9966, 20, 80);
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('three-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background to show GIF
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xff8855, 0.4);
    scene.add(ambientLight);
    
    directionalLight = new THREE.DirectionalLight(0xffcc44, 1.2);
    directionalLight.position.set(-8, 12, 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Cube (keep existing but modify material)
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        linewidth: 3,
        transparent: true,
        opacity: 0.9
    });
    cube = new THREE.LineSegments(edges, material);
    cube.position.y = 2;
    scene.add(cube);
    
    // Add crossed edges (diagonals) on each face
    const crossedGeometry = new THREE.BufferGeometry();
    const crossedVertices = [];
    
    // Front face diagonals
    crossedVertices.push(-1, -1, 1, 1, 1, 1);  // bottom-left to top-right
    crossedVertices.push(-1, 1, 1, 1, -1, 1);   // top-left to bottom-right
    
    // Back face diagonals
    crossedVertices.push(-1, -1, -1, 1, 1, -1); // bottom-left to top-right
    crossedVertices.push(-1, 1, -1, 1, -1, -1);  // top-left to bottom-right
    
    // Left face diagonals
    crossedVertices.push(-1, -1, -1, -1, 1, 1); // bottom-back to top-front
    crossedVertices.push(-1, 1, -1, -1, -1, 1);  // top-back to bottom-front
    
    // Right face diagonals
    crossedVertices.push(1, -1, -1, 1, 1, 1);   // bottom-back to top-front
    crossedVertices.push(1, 1, -1, 1, -1, 1);    // top-back to bottom-front
    
    // Top face diagonals
    crossedVertices.push(-1, 1, -1, 1, 1, 1);   // back-left to front-right
    crossedVertices.push(-1, 1, 1, 1, 1, -1);    // front-left to back-right
    
    // Bottom face diagonals
    crossedVertices.push(-1, -1, -1, 1, -1, 1); // back-left to front-right
    crossedVertices.push(-1, -1, 1, 1, -1, -1);  // front-left to back-right
    
    crossedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(crossedVertices, 3));
    
    const crossedMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        linewidth: 3,
        transparent: true,
        opacity: 0.9
    });
    
    crossedEdges = new THREE.LineSegments(crossedGeometry, crossedMaterial);
    crossedEdges.position.y = 2;
    scene.add(crossedEdges);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    time += 0.008;
    
    // Rotate cube and crossed edges together
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    crossedEdges.rotation.x += 0.005;
    crossedEdges.rotation.y += 0.005;
    
    // Animate lighting for sunset effect - transition from red to yellow
    const lightCycle = Math.sin(time * 0.3) * 0.5 + 0.5; // 0 to 1
    const red = Math.floor(255 * (0.9 + lightCycle * 0.1));
    const green = Math.floor(255 * (0.4 + lightCycle * 0.6));
    const blue = Math.floor(255 * (0.2 + lightCycle * 0.3));
    
    directionalLight.color.setRGB(red/255, green/255, blue/255);
    directionalLight.intensity = 0.8 + Math.sin(time * 0.7) * 0.3;
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js after DOM is loaded
    initThreeJS();
});
