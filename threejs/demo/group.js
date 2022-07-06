import getCirclePlane from "./circle.js"
import getText from "./text.js"
import getRing from './ring.js'
import flyline from './line.js'
import getLineCircleDash from "./lineCircleDash.js"
import getLineCircle from "./lineCircle.js"
import point from "./point.js"
import cube from "./cube.js"

export default async function getGroup() {
    const group = new THREE.Group();
    let text = await getText({ z: 0.36 });
    let plane = getCirclePlane({ x: 0, y: 0, z: -0.15 });
    let lineCircleDash = getLineCircleDash({ r: 4.4, z: 0.12 });
    let lineCircle1 = getLineCircle({ r: 4.4, z: 0, linewidth: 1.2, opacity: 0.8 });
    let lineCircle2 = getLineCircle({ r: 3.4, z: 0.08, color: "#28b9d8", });
    let ring = getRing({ z: 75.15, r: 3.2, height: 0.56 });

    group.add(text);
    group.add(plane);
    group.add(ring);
    // group.add(cube);
    // group.add(flyline);

    group.add(lineCircleDash);
    group.add(lineCircle1);
    group.add(lineCircle2);
    // group.scale.setScalar(2);
    group.rotateX(-Math.PI / 2.2)
    return { group, text, ring, flyline, plane, lineCircleDash, point };
}



