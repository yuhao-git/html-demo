import getCirclePlane from "./circle.js"
import getText from "./text.js"
import ring from './ring.js'
import point from './line.js'

export default async function getGroup() {
    const group = new THREE.Group();
    let text = await getText();

    group.add(text);
    let c1 = getCirclePlane();
    let c2 = getCirclePlane({x:0,y:0,z:-0.2});
    c2.scale.set(1.1,1.1,1.1)
    group.add(c1);
    // group.add(c2);
    group.add(ring);
    group.add(point);
    // group.scale.setScalar(2);
    group.rotateX(-Math.PI / 2.5)
    return group;
}



