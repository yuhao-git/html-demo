import {THREE} from './modules.js'
// 从下往透明渐变材质
function getGradientMaterial(option) {
    let params = {
        color: "#249ecf",
        height: 0.7,
        width: 3.5,
        ...option
    }
    let c = new THREE.Color(params.color);
    let gradientMaterial = new THREE.ShaderMaterial({
        uniforms: {
            targetColor: { value: new THREE.Vector3(c.r, c.g, c.b) },
            height: { value: params.height },
            width: { value: params.width },
        },
        side: THREE.DoubleSide,
        transparent: true,
        //depthTest:false,
        depthWrite: false,
        vertexShader: `
        varying vec3 modelPos;
        void main() {
            modelPos = position;
        	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
        fragmentShader:
            `
            uniform vec3 targetColor;
            uniform float height;
            uniform float width;
            varying vec3 modelPos;
            void main() {
                if(modelPos.x < 1.71 || modelPos.x > (width - 0.0005) || modelPos.z < 0.02 || modelPos.z > (height - 0.18)){
                    gl_FragColor = vec4(0.298,0.564,0.682, 0.8);
                }
                else{
                    gl_FragColor = vec4(targetColor.xyz,(1.0 - modelPos.z/height)*(1.0 - modelPos.z/height));
                }
            }`
    });
    return gradientMaterial
}
export default getGradientMaterial