/**
     * 生成并返回柱状渐变光环
     * @param {*} radius 半径
     * @param {*} height 高度
     * @param {*} color 颜色
     * @returns 
     */
import { Face3, Geometry } from '../jsm/deprecated/Geometry.js';
export default function getAureole(radius, height, color) {
    let geo, mat;
    let segment = 64;
    //geo
    {
        let bottomPos = [];
        let topPos = [];
        let angleOffset = Math.PI * 2 / segment;
        for (var i = 0; i < segment; i++) {
            let x = Math.cos(angleOffset * i) * radius;
            let z = Math.sin(angleOffset * i) * radius;
            bottomPos.push(new THREE.Vector3(x, 0, z));
            topPos.push(new THREE.Vector3(x, height, z));
        }
        bottomPos = bottomPos.concat(topPos);

        let face = []
        for (var i = 0; i < segment; i++) {
            if (i != segment - 1) {
                face.push(new Face3(i + segment + 1, i, i + segment));
                face.push(new Face3(i, i + segment + 1, i + 1));
            }
            else {
                face.push(new Face3(segment, i, i + segment));
                face.push(new Face3(i, segment, 0));
            }
        }

        geo = new Geometry();
        geo.vertices = bottomPos;
        geo.faces = face;
    }
    //mat
    {
        let c = new THREE.Color(color);
        mat = new THREE.ShaderMaterial({
            uniforms: {
                targetColor: { value: new THREE.Vector3(c.r, c.g, c.b) },
                height: { value: height },
            },
            side: THREE.DoubleSide,
            transparent: true,
            //depthTest:false,
            depthWrite: false,
            vertexShader: [
                "varying vec3 modelPos;",
                "void main() {",
                "   modelPos = position;",
                "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                "}"
            ].join("\n"),
            fragmentShader: [
                "uniform vec3 targetColor;",
                "uniform float height;",
                "varying vec3 modelPos;",
                "void main() {",
                "   gl_FragColor = vec4(targetColor.xyz,(1.0 - modelPos.y/height)*(1.0 - modelPos.y/height));",
                "}"
            ].join("\n")
        });
    }

    let mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = 9999
    return mesh;
}