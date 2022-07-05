
let c = new THREE.Color(0x00ffff);
let gradientMaterial = new THREE.ShaderMaterial({
    name: "gradientMaterial",
    uniforms: {
        targetColor: { value: new THREE.Vector3(c.r, c.g, c.b) },
        height: { value: 0.5 },
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
        `uniform vec3 targetColor;
         uniform float height;
         varying vec3 modelPos;

         void main() {
            if(modelPos.x < 1.85 || modelPos.x > 3.4998 || modelPos.z < 0.02 || modelPos.z > 0.59){
                gl_FragColor = vec4(1.0,1.0,1.0,0.8);
            }
            else{
                gl_FragColor = vec4(targetColor.xyz,(1.0 - modelPos.z/height)*(1.0 - modelPos.z/height));
            }
        }`
});

export default gradientMaterial