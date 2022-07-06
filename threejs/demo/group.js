import getCirclePlane from "./circle.js"
import getText from "./text.js"
import getRing from './ring.js'
import flyline from './line.js'
import getLineCircleDash from "./lineCircleDash.js"
import getLineCircle from "./lineCircle.js"
import point from "./point.js"
import cube from "./cube.js"
import shad from "./glow.js"
import getPointinitLight from './pointLight.js'

export default async function getGroup() {
    const group = new THREE.Group();
    let text = await getText({ z: 0.4 });
    let plane = getCirclePlane({ x: 0, y: 0, z: -0.15 });
    let lineCircleDash = getLineCircleDash({ r: 4.4, z: 0.12 });
    let lineCircle1 = getLineCircle({ r: 4.4, z: 0, linewidth: 1.2, opacity: 0.8 });
    let lineCircle2 = getLineCircle({ r: 3.4, z: 0.08, color: "#28b9d8", });
    let lineCircle3 = getLineCircle({ r: 4.9, z: -0.15, color: "#28efff", opacity: 0.9, linewidth: 1 });
    let lineCircle4 = getLineCircle({ r: 5.15, z: -0.3, color: "#28eeff", opacity: 1, linewidth: 2 });
    let ring = getRing({ z: 75.15, r: 3.2, height: 0.56 });
    let glow = shad();
    let pointLight = getPointinitLight()
    group.add(text);
    group.add(plane);
    group.add(ring);
    
    group.add(glow);
    // group.add(flyline);
    group.add(point);

    group.add(lineCircleDash);
    group.add(lineCircle1);
    group.add(lineCircle2);
    group.add(lineCircle3);
    group.add(lineCircle4);
    // group.scale.setScalar(2);
    group.rotateX(-Math.PI / 2.2)
    return { group, text, ring, flyline, plane, lineCircleDash, point };
}



