import circle from "./circle.js"
import getText from "./text.js"
import ring from './ring.js'

export default async function getGroup() {
    const group = new THREE.Group();
    let text = await getText();

    group.add(text);
    group.add(circle);
    // group.add(ring);

    group.rotateX(-Math.PI / 2.6)

    return group;
}