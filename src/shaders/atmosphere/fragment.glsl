varying vec3 vertexNormal;

void main(void) {
    float intensity = pow(0.8 - dot(vertexNormal, vec3(0., 0., 1.)), 2.);

    gl_FragColor = vec4(1., 1., 1., 1.) * intensity;
}