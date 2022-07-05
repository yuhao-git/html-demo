import circle from "./circle.js"
import getText from "./text.js"
import ring from './ring.js'
import point from './line.js'

export default async function getGroup() {
    const group = new THREE.Group();
    let text = await getText();

    group.add(text);
    group.add(circle);
    group.add(ring);
    group.add(point);
    // group.scale.setScalar(2);
    group.rotateX(-Math.PI / 2.2)
    return group;
}



