import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0015);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
);
camera.position.set(0, 20, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById("container").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enabled = false;
controls.target.set(0, 0, 0);
controls.enablePan = false;
controls.minDistance = 15;
controls.maxDistance = 300;
controls.zoomSpeed = 0.3;
controls.rotateSpeed = 0.3;
controls.update();

function createGlowMaterial(color, size = 128, opacity = 0.55) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    return new THREE.Sprite(material);
}

const centralGlow = createGlowMaterial("rgba(255,255,255,0.8)", 156, 0.25);
centralGlow.scale.set(8, 8, 1);
scene.add(centralGlow);

for (let i = 0; i < 15; i++) {
    const hue = Math.random() * 360;
    const color = `hsla(${hue}, 80%, 50%, 0.6)`;
    const nebula = createGlowMaterial(color, 256);
    nebula.scale.set(10 * 10, 10 * 10, 1);
    nebula.position.set(
        (Math.random() - 0.5) * 175,
        (Math.random() - 0.5) * 175,
        (Math.random() - 0.5) * 175
    );
    scene.add(nebula);
}

const galaxyParameters = {
    count: 100000,
    arms: 6,
    radius: 100,
    spin: 0.5,
    randomness: 0.2,
    randomnessPower: 20,
    insideColor: new THREE.Color(0xd63ed6),
    outsideColor: new THREE.Color(0x48b8b8),
};

const heartImages = [

];

const loader = new THREE.TextureLoader();
const numGroups = heartImages.length;
const pointsPerGroup = Math.floor(galaxyParameters.count / numGroups);

const positions = new Float32Array(galaxyParameters.count * 3);
const colors = new Float32Array(galaxyParameters.count * 3);

let pointIdx = 0;
for (let i = 0; i < galaxyParameters.count; i++) {
    const radius =
        Math.pow(Math.random(), galaxyParameters.randomnessPower) *
        galaxyParameters.radius;
    const branchAngle =
        ((i % galaxyParameters.arms) / galaxyParameters.arms) * Math.PI * 2;
    const spinAngle = radius * galaxyParameters.spin;
    const randomX = (Math.random() - 0.5) * galaxyParameters.randomness * radius;
    const randomY =
        (Math.random() - 0.5) * galaxyParameters.randomness * radius * 0.5;
    const randomZ = (Math.random() - 0.5) * galaxyParameters.randomness * radius;
    const totalAngle = branchAngle + spinAngle;

    if (radius < 30 && Math.random() < 0.7) continue;

    const i3 = pointIdx * 3;
    positions[i3] = Math.cos(totalAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(totalAngle) * radius + randomZ;

    const mixedColor = new THREE.Color(0xff66ff);
    mixedColor.lerp(new THREE.Color(0x66ffff), radius / galaxyParameters.radius);
    mixedColor.multiplyScalar(0.7 + 0.3 * Math.random());

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    pointIdx++;
}

const galaxyGeometry = new THREE.BufferGeometry();
galaxyGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions.slice(0, pointIdx * 3), 3)
);
galaxyGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors.slice(0, pointIdx * 3), 3)
);

const galaxyMaterial = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
});

const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

function createNeonTexture(img, size) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const imgAspect = img.width / img.height;
    const canvasAspect = 1;
    let drawWidth, drawHeight, dx, dy;
    if (imgAspect > canvasAspect) {
        drawWidth = size;
        drawHeight = size / imgAspect;
        dx = 0;
        dy = (size - drawHeight) / 2;
    } else {
        drawHeight = size;
        drawWidth = size * imgAspect;
        dx = (size - drawWidth) / 2;
        dy = 0;
    }
    ctx.save();
    ctx.clearRect(0, 0, size, size);
    ctx.shadowBlur = size * 0.18;
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    ctx.restore();
    ctx.globalAlpha = 10.0;
    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    return new THREE.CanvasTexture(canvas);
}

for (let group = 0; group < numGroups; group++) {
    const groupPositions = new Float32Array(pointsPerGroup * 3);
    const groupColorsNear = new Float32Array(pointsPerGroup * 3);
    const groupColorsFar = new Float32Array(pointsPerGroup * 3);
    let validPointCount = 0;
    for (let i = 0; i < pointsPerGroup; i++) {
        const idx = validPointCount * 3;
        const globalIdx = group * pointsPerGroup + i;
        const radius =
            Math.pow(Math.random(), galaxyParameters.randomnessPower) *
            galaxyParameters.radius;
        if (radius < 30) continue;
        const branchAngle =
            ((globalIdx % galaxyParameters.arms) / galaxyParameters.arms) *
            Math.PI *
            2;
        const spinAngle = radius * galaxyParameters.spin;
        const randomX =
            (Math.random() - 0.5) * galaxyParameters.randomness * radius;
        const randomY =
            (Math.random() - 0.5) * galaxyParameters.randomness * radius * 0.5;
        const randomZ =
            (Math.random() - 0.5) * galaxyParameters.randomness * radius;
        const totalAngle = branchAngle + spinAngle;
        groupPositions[idx] = Math.cos(totalAngle) * radius + randomX;
        groupPositions[idx + 1] = randomY;
        groupPositions[idx + 2] = Math.sin(totalAngle) * radius + randomZ;
        const colorNear = new THREE.Color(0xffffff);
        groupColorsNear[idx] = colorNear.r;
        groupColorsNear[idx + 1] = colorNear.g;
        groupColorsNear[idx + 2] = colorNear.b;
        const colorFar = galaxyParameters.insideColor.clone();
        colorFar.lerp(
            galaxyParameters.outsideColor,
            radius / galaxyParameters.radius
        );
        colorFar.multiplyScalar(0.7 + 0.3 * Math.random());
        groupColorsFar[idx] = colorFar.r;
        groupColorsFar[idx + 1] = colorFar.g;
        groupColorsFar[idx + 2] = colorFar.b;
        validPointCount++;
    }
    if (validPointCount === 0) continue;
    const groupGeometryNear = new THREE.BufferGeometry();
    groupGeometryNear.setAttribute(
        "position",
        new THREE.BufferAttribute(groupPositions.slice(0, validPointCount * 3), 3)
    );
    groupGeometryNear.setAttribute(
        "color",
        new THREE.BufferAttribute(groupColorsNear.slice(0, validPointCount * 3), 3)
    );
    const groupGeometryFar = new THREE.BufferGeometry();
    groupGeometryFar.setAttribute(
        "position",
        new THREE.BufferAttribute(groupPositions.slice(0, validPointCount * 3), 3)
    );
    groupGeometryFar.setAttribute(
        "color",
        new THREE.BufferAttribute(groupColorsFar.slice(0, validPointCount * 3), 3)
    );
    const posAttr = groupGeometryFar.getAttribute("position");
    let cx = 0,
        cy = 0,
        cz = 0;
    for (let i = 0; i < posAttr.count; i++) {
        cx += posAttr.getX(i);
        cy += posAttr.getY(i);
        cz += posAttr.getZ(i);
    }
    cx /= posAttr.count;
    cy /= posAttr.count;
    cz /= posAttr.count;
    groupGeometryNear.translate(-cx, -cy, -cz);
    groupGeometryFar.translate(-cx, -cy, -cz);
    const img = new window.Image();
    img.src = heartImages[group];
    img.onload = () => {
        const groupTexture = createNeonTexture(img, 256);
        const groupMaterialNear = new THREE.PointsMaterial({
            size: 1,
            map: groupTexture,
            transparent: false,
            alphaTest: 0.2,
            depthWrite: true,
            depthTest: true,
            blending: THREE.NormalBlending,
            vertexColors: true,
        });
        const groupMaterialFar = new THREE.PointsMaterial({
            size: 1,
            map: groupTexture,
            transparent: true,
            alphaTest: 0.2,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        });
        const groupPoints = new THREE.Points(groupGeometryFar, groupMaterialFar);
        groupPoints.position.set(cx, cy, cz);
        groupPoints.userData.materialNear = groupMaterialNear;
        groupPoints.userData.geometryNear = groupGeometryNear;
        groupPoints.userData.materialFar = groupMaterialFar;
        groupPoints.userData.geometryFar = groupGeometryFar;
        scene.add(groupPoints);
    };
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const starCount = 10000;
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 900;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 900;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 900;
}
starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3)
);
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
});
const starField = new THREE.Points(starGeometry, starMaterial);
starField.name = "starfield";
starField.renderOrder = 999;
scene.add(starField);

let shootingStars = [];

function createShootingStar() {
    const trailLength = 100;
    const headGeometry = new THREE.SphereGeometry(2, 32, 32);
    const headMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    const headGlowGeometry = new THREE.SphereGeometry(3, 32, 32);
    const headGlowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
        },
        vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      varying vec3 vNormal;
      uniform float time;
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(1.0, 1.0, 1.0, intensity * (0.8 + sin(time * 5.0) * 0.2));
      }
    `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
    });
    const headGlow = new THREE.Mesh(headGlowGeometry, headGlowMaterial);
    head.add(headGlow);
    const curve = createRandomCurve();
    const trailPoints = [];
    for (let i = 0; i < trailLength; i++) {
        const t = i / (trailLength - 1);
        trailPoints.push(curve.getPoint(t));
    }
    const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
    const trailMaterial = new THREE.LineBasicMaterial({
        color: 0x99eaff,
        transparent: true,
        opacity: 0.7,
        linewidth: 2,
    });
    const trail = new THREE.Line(trailGeometry, trailMaterial);
    const group = new THREE.Group();
    group.add(head);
    group.add(trail);
    group.userData = {
        curve: curve,
        progress: 0,
        speed: 0.001 + Math.random() * 0.001,
        life: 0,
        maxLife: 300,
        head: head,
        trail: trail,
        trailLength: trailLength,
        trailPoints: trailPoints,
    };
    scene.add(group);
    shootingStars.push(group);
}

function createRandomCurve() {
    const points = [];
    const startPoint = new THREE.Vector3(
        -200 + Math.random() * 100,
        -100 + Math.random() * 200,
        -100 + Math.random() * 200
    );
    const endPoint = new THREE.Vector3(
        600 + Math.random() * 200,
        startPoint.y + (-100 + Math.random() * 200),
        startPoint.z + (-100 + Math.random() * 200)
    );
    const control1 = new THREE.Vector3(
        startPoint.x + 200 + Math.random() * 100,
        startPoint.y + (-50 + Math.random() * 100),
        startPoint.z + (-50 + Math.random() * 100)
    );
    const control2 = new THREE.Vector3(
        endPoint.x - 200 + Math.random() * 100,
        endPoint.y + (-50 + Math.random() * 100),
        endPoint.z + (-50 + Math.random() * 100)
    );
    points.push(startPoint);
    points.push(control1);
    points.push(control2);
    points.push(endPoint);
    return new THREE.CubicBezierCurve3(startPoint, control1, control2, endPoint);
}

function createPlanetTexture(size = 512) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const bigGrad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        size / 8,
        size / 2,
        size / 2,
        size / 2
    );
    bigGrad.addColorStop(0, "#f8bbd0");
    bigGrad.addColorStop(0.12, "#f48fb1");
    bigGrad.addColorStop(0.22, "#f06292");
    bigGrad.addColorStop(0.35, "#ffffff");
    bigGrad.addColorStop(0.5, "#e1aaff");
    bigGrad.addColorStop(0.62, "#a259f7");
    bigGrad.addColorStop(0.75, "#b2ff59");
    bigGrad.addColorStop(1, "#3fd8c7");
    ctx.fillStyle = bigGrad;
    ctx.fillRect(0, 0, size, size);
    const pastelColors = [
        "#f8bbd0",
        "#f8bbd0",
        "#f48fb1",
        "#f48fb1",
        "#f06292",
        "#f06292",
        "#ffffff",
        "#e1aaff",
        "#a259f7",
        "#b2ff59",
    ];
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const radius = 30 + Math.random() * 120;
        const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color + "cc");
        gradient.addColorStop(1, color + "00");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
    }
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * size, Math.random() * size);
        ctx.bezierCurveTo(
            Math.random() * size,
            Math.random() * size,
            Math.random() * size,
            Math.random() * size,
            Math.random() * size,
            Math.random() * size
        );
        ctx.strokeStyle = `rgba(180, 120, 200, ${0.12 + Math.random() * 0.18})`;
        ctx.lineWidth = 8 + Math.random() * 18;
        ctx.stroke();
    }
    if (ctx.filter !== undefined) {
        ctx.filter = "blur(2px)";
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = "none";
    }
    return new THREE.CanvasTexture(canvas);
}

const stormShader = {
    uniforms: {
        time: { value: 0 },
        baseTexture: { value: null },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float time;
    uniform sampler2D baseTexture;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float angle = length(uv - vec2(0.5)) * 3.0;
      float twist = sin(angle * 3.0 + time) * 0.1;
      uv.x += twist * sin(time * 0.5);
      uv.y += twist * cos(time * 0.5);
      vec4 texColor = texture2D(baseTexture, uv);
      float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time) * 0.1;
      texColor.rgb += noise * vec3(0.8, 0.4, 0.2);
      gl_FragColor = texColor;
    }
  `,
};

const planetRadius = 10;
const planetGeometry = new THREE.SphereGeometry(planetRadius, 48, 48);
const planetTexture = createPlanetTexture();
const planetMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        baseTexture: { value: planetTexture },
    },
    vertexShader: stormShader.vertexShader,
    fragmentShader: stormShader.fragmentShader,
});

const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.set(0, 0, 0);
scene.add(planet);

const ringTexts = ['Love You', 'Love You Forever', 'Only You'];

const fontLoader = new FontLoader();
fontLoader.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    (font) => {
        createTextRings(font);
    }
);

function createTextRings(font) {
    const numRings = ringTexts.length;
    const ringRadiusBase = planetRadius * 1.1;
    const ringGap = 5;
    window.textRings = [];

    for (let r = 0; r < numRings; r++) {
        const text = ringTexts[r % ringTexts.length];
        const ringRadius = ringRadiusBase + r * ringGap;
        const group = new THREE.Group();
        const charWidth = 0.7;
        const textSpacing = 2.0;
        let singleTextAngle = 0;
        const charAngles = [];
        for (let i = 0; i < text.length; i++) {
            const angle = charWidth / ringRadius;
            charAngles.push(angle);
            singleTextAngle += angle;
        }
        singleTextAngle += textSpacing / ringRadius;
        const numRepeats = Math.ceil((Math.PI * 2) / singleTextAngle);
        for (let repeat = 0; repeat < numRepeats; repeat++) {
            const startAngle = repeat * singleTextAngle;
            let currentAngle = startAngle;
            for (let i = text.length - 1; i >= 0; i--) {
                const char = text[i];
                const geometry = new TextGeometry(char, {
                    font: font,
                    size: 1,
                    height: 0.2,
                    curveSegments: 8,
                });
                geometry.computeBoundingBox();
                const angle = currentAngle + charAngles[i] / 2;
                let x = Math.cos(angle) * ringRadius;
                let z = Math.sin(angle) * ringRadius;
                if (r > 1) {
                    x = Math.sin(angle) * ringRadius;
                    z = Math.cos(angle) * ringRadius;
                }
                const mesh = new THREE.Mesh(
                    geometry,
                    new THREE.MeshBasicMaterial({ color: 0xffffff })
                );
                mesh.position.set(x, 0, z);
                mesh.userData = {
                    initialAngle: angle,
                    ringRadius: ringRadius,
                    ringIndex: r,
                };
                group.add(mesh);
                currentAngle += charAngles[i];
            }
        }
        group.userData = {
            ringRadius,
            angleOffset: 0.15 * Math.PI * 0.5,
            speed: 0.005 + 0.003,
            tiltSpeed: 0,
            rollSpeed: 0,
            pitchSpeed: 0,
            tiltAmplitude: Math.PI / 3,
            rollAmplitude: Math.PI / 6,
            pitchAmplitude: Math.PI / 8,
            tiltPhase: Math.PI * 2,
            rollPhase: Math.PI * 2,
            pitchPhase: Math.PI * 2,
            isTextRing: true,
        };
        const tiltAngle = (r / numRings) * (Math.PI / 1);
        group.rotation.x = tiltAngle;
        scene.add(group);
        window.textRings.push(group);
    }
}

function updateTextRingsRotation() {
    if (!window.textRings || !camera) return;
    window.textRings.forEach((ring, ringIndex) => {
        ring.children.forEach((charMesh) => {
            if (charMesh.userData.initialAngle !== undefined) {
                const currentAngle =
                    charMesh.userData.initialAngle + ring.userData.angleOffset;
                const x = Math.cos(currentAngle) * charMesh.userData.ringRadius;
                const z = Math.sin(currentAngle) * charMesh.userData.ringRadius;
                charMesh.position.set(x, 0, z);
                const worldPos = new THREE.Vector3();
                charMesh.getWorldPosition(worldPos);
                const cameraDirection = new THREE.Vector3();
                cameraDirection.subVectors(camera.position, worldPos).normalize();
                const angleToCamera = Math.atan2(cameraDirection.x, cameraDirection.z);
                charMesh.rotation.y = angleToCamera;
            }
        });
    });
}

function animatePlanetSystem() {
    if (window.textRings) {
        const time = Date.now() * 0.001;
        window.textRings.forEach((group, idx) => {
            const userData = group.userData;
            userData.angleOffset += userData.speed;
            const tiltAngle =
                Math.sin(time * userData.tiltSpeed + userData.tiltPhase) *
                userData.tiltAmplitude;
            const rollAngle =
                Math.cos(time * userData.rollSpeed + userData.rollPhase) *
                userData.rollAmplitude;
            const pitchAngle =
                Math.sin(time * userData.pitchSpeed + userData.pitchPhase) *
                userData.pitchAmplitude;
            group.rotation.x =
                (idx / window.textRings.length) * (Math.PI / 1) + tiltAngle;
            group.rotation.z = rollAngle;
            group.rotation.y = pitchAngle;
            const yOffset =
                Math.sin(time * (userData.tiltSpeed * 0.7) + userData.tiltPhase) * 0.3;
            group.position.y = yOffset;
        });
        updateTextRingsRotation();
    }
}

let fadeOpacity = 0.1;
let fadeInProgress = false;

function animate() {
    requestAnimationFrame(animate);
    const time = performance.now() * 0.001;
    controls.update();
    planet.material.uniforms.time.value = time * 0.5;
    if (fadeInProgress && fadeOpacity < 1.0) {
        fadeOpacity += 0.025;
        if (fadeOpacity > 1.0) fadeOpacity = 1.0;
    }
    if (!introStarted) {
        fadeOpacity = 0.1;
        scene.traverse((obj) => {
            if (obj.name === "starfield") {
                if (obj.points && obj.material.opacity !== undefined) {
                    obj.material.transparent = false;
                    obj.material.opacity = 1.0;
                }
                return;
            }
            if (
                obj.userData.isTextRing ||
                (obj.parent && obj.parent.userData && obj.parent.userData.isTextRing)
            ) {
                if (obj.material && obj.material.opacity !== undefined) {
                    obj.material.transparent = false;
                    obj.material.opacity = 1.0;
                }
                if (obj.material && obj.material.color) {
                    obj.material.color.set(0xffffff);
                }
            } else if (
                obj !== planet &&
                obj !== centralGlow &&
                obj.type !== "Scene"
            ) {
                if (obj.material && obj.material.opacity !== undefined) {
                    obj.material.transparent = true;
                    obj.material.opacity = 0.1;
                }
            }
        });
        planet.visible = true;
        centralGlow.visible = true;
    } else {
        scene.traverse((obj) => {
            if (
                !(
                    obj.userData.isTextRing ||
                    (obj.parent &&
                        obj.parent.userData &&
                        obj.parent.userData.isTextRing) ||
                    obj === planet ||
                    obj === centralGlow ||
                    obj.type === "Scene"
                )
            ) {
                if (obj.material && obj.material.opacity !== undefined) {
                    obj.material.transparent = true;
                    obj.material.opacity = fadeOpacity;
                }
            } else if (obj.material && obj.material.opacity !== undefined) {
                obj.material.opacity = 1.0;
                obj.material.transparent = false;
            }
            if (obj.material && obj.material.color) {
                obj.material.color.set(0xffffff);
            }
        });
    }
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.userData.life++;
        let opacity = 1;
        if (star.userData.life < 30) {
            opacity = star.userData.life / 30;
        } else if (star.userData.life > star.userData.maxLife - 30) {
            opacity = (star.userData.maxLife - star.userData.life) / 30;
        }
        star.userData.progress += star.userData.speed;
        if (star.userData.progress > 1) {
            scene.remove(star);
            shootingStars.splice(i, 1);
            continue;
        }
        const point = star.userData.curve.getPoint(star.userData.progress);
        star.position.copy(point);
        star.userData.head.material.opacity = opacity;
        star.userData.head.children[0].material.uniforms.time.value = time;
        const trail = star.userData.trail;
        const trailPoints = star.userData.trailPoints;
        trailPoints[0].copy(point);
        for (let j = 1; j < star.userData.trailLength; j++) {
            const t = Math.max(0, star.userData.progress - j * 0.01);
            trailPoints[j].copy(star.userData.curve.getPoint(t));
        }
        trail.geometry.setFromPoints(trailPoints);
        trail.material.opacity = opacity * 0.7;
    }
    if (shootingStars.length < 3 && Math.random() < 0.02) {
        createShootingStar();
    }
    scene.traverse((obj) => {
        if (obj.isPoints && obj.userData.materialNear && obj.userData.materialFar) {
            const posAttr = obj.geometry.getAttribute("position");
            let foundNear = false;
            for (let i = 0; i < posAttr.count; i++) {
                const px = posAttr.getX(i) + obj.position.x;
                const py = posAttr.getY(i) + obj.position.y;
                const pz = posAttr.getZ(i) + obj.position.z;
                const dist = camera.position.distanceTo(new THREE.Vector3(px, py, pz));
                if (dist < 5) {
                    foundNear = true;
                    break;
                }
            }
            if (foundNear) {
                if (obj.material !== obj.userData.materialNear) {
                    obj.material = obj.userData.materialNear;
                    obj.geometry = obj.userData.geometryNear;
                }
            } else {
                if (obj.material !== obj.userData.materialFar) {
                    obj.material = obj.userData.materialFar;
                    obj.geometry = obj.userData.geometryFar;
                }
            }
        }
    });
    planet.lookAt(camera.position);
    animatePlanetSystem();
    if (
        starField &&
        starField.material &&
        starField.material.opacity !== undefined
    ) {
        starField.material.opacity = 1.0;
        starField.material.transparent = false;
    }
    renderer.render(scene, camera);
}

createShootingStar();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.target.set(0, 0, 0);
    controls.update();
});

function startCameraAnimation() {
    const p0 = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
    };
    const p1 = { x: p0.x, y: 0, z: p0.z };
    const p2 = { x: p0.x, y: 0, z: 160 };
    const p3 = { x: -40, y: 100, z: 100 };
    const d1 = 0.2;
    const d2 = 0.55;
    const d3 = 0.4;
    let t = 0;
    function animateStep() {
        t += 0.002;
        let pos;
        if (t < d1) {
            let k = t / d1;
            pos = {
                x: p0.x + (p1.x - p0.x) * k,
                y: p0.y + (p1.y - p0.y) * k,
                z: p0.z + (p1.z - p0.z) * k,
            };
        } else if (t < d1 + d2) {
            let k = (t - d1) / d2;
            pos = {
                x: p1.x + (p2.x - p1.x) * k,
                y: p1.y + (p2.y - p1.y) * k,
                z: p1.z + (p2.z - p1.z) * k,
            };
        } else if (t < d1 + d2 + d3) {
            let k = (t - d1 - d2) / d3;
            let ease = 0.5 - 0.5 * Math.cos(Math.PI * k);
            pos = {
                x: p2.x + (p3.x - p2.x) * ease,
                y: p2.y + (p3.y - p2.y) * ease,
                z: p2.z + (p3.z - p2.z) * ease,
            };
        } else {
            camera.position.set(p3.x, p3.y, p3.z);
            camera.lookAt(0, 0, 0);
            controls.target.set(0, 0, 0);
            controls.update();
            controls.enabled = true;
            return;
        }
        camera.position.set(pos.x, pos.y, pos.z);
        camera.lookAt(0, 0, 0);
        requestAnimationFrame(animateStep);
    }
    controls.enabled = false;
    animateStep();
}

let galaxyAudio = null;

function playGalaxyAudio() {
    if (!galaxyAudio) {
        galaxyAudio = new Audio("/s/a/foryou/binhyen.mp3");
        galaxyAudio.loop = true;
        galaxyAudio.volume = 0.7;
    }
    galaxyAudio.play();
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let introStarted = false;

const originalStarCount = starGeometry.getAttribute("position").count;
if (starField && starField.geometry) {
    starField.geometry.setDrawRange(0, Math.floor(originalStarCount * 0.1));
}

function requestFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function onCanvasClick(event) {
    if (introStarted) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(planet);
    if (intersects.length > 0) {
        requestFullScreen();
        introStarted = true;
        fadeInProgress = true;
        document.body.classList.add("intro-started");
        playGalaxyAudio();
        startCameraAnimation();
        if (starField && starField.geometry) {
            starField.geometry.setDrawRange(0, originalStarCount);
        }
    }
}

renderer.domElement.addEventListener("click", onCanvasClick);

animate();

planet.name = "main-planet";
centralGlow.name = "main-glow";

function setFullScreen() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const container = document.getElementById("container");
    if (container) {
        container.style.height = `${window.innerHeight}px`;
    }
}
window.addEventListener("resize", setFullScreen);
window.addEventListener("orientationchange", () => {
    setTimeout(setFullScreen, 300);
});
setFullScreen();

const preventDefault = (e) => e.preventDefault();
document.addEventListener("touchmove", preventDefault, { passive: false });
document.addEventListener("gesturestart", preventDefault, { passive: false });
const container = document.getElementById("container");
if (container) {
    container.addEventListener("touchmove", preventDefault, { passive: false });
}
