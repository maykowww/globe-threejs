varying vec2 vuv;
varying vec3 vertexNormal;

void main(void) {
    vuv = uv;
    vertexNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}