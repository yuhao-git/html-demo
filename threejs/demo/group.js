import getCirclePlane from "./part/circle.js"
import getText from "./part/text.js"
import getRing from './part/ring.js'
import flyline from './part/line.js'
import getLineCircleDash from "./part/lineCircleDash.js"
import getLineCircle from "./part/lineCircle.js"
import point from "./part/point.js"
import shad from "./part/glow.js"
import getLightRain from './part/lightRain.js'


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
    let lightRainTop1 = getLightRain({ angle: 4,   z: 1.4, r: 1.4, })
    let lightRainTop2 = getLightRain({ angle: 12,  z: 1.3, r: 1.5 })
    let lightRainTop3 = getLightRain({ angle: -30, z: 1.3, r: 1.5 })
    let lightRainTop4 = getLightRain({ angle: -5,  z: 1.3 })

    let lightRainBottom1 = getLightRain({ angle: 20, z: -1, r: 1.2 })


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
    group.add(lightRainTop1);
    group.add(lightRainTop2);
    group.add(lightRainTop3);
    group.add(lightRainTop4);

    group.add(lightRainBottom1);

    // group.scale.setScalar(2);
    group.rotateX(-Math.PI / 2.2)
    return { group, text, ring, flyline, plane, lineCircleDash, point, lineCircle1, lineCircle2, lineCircle3, lineCircle4, lightRainTop1, lightRainTop2, lightRainTop3, lightRainTop4 };
}



