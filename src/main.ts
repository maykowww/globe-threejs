import * as T from "three";
import globeVertexShader from "./shaders/globe/vertex.glsl";
import globeFragmentShader from "./shaders/globe/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphere/fragment.glsl";

(async () => {
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new T.WebGLRenderer({
        antialias: true,
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);

    const sphere = new T.Mesh(
        new T.SphereGeometry(5, 50, 50),
        new T.ShaderMaterial({
            vertexShader: globeVertexShader,
            fragmentShader: globeFragmentShader,
            uniforms: {
                globeTexture: {
                    value: new T.TextureLoader().load("moon.jpg"),
                },
            },
        })
    );

    camera.position.z = 10;

    scene.add(sphere);

    const atmosphere = new T.Mesh(
        new T.SphereGeometry(5, 50, 50),
        new T.ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: T.AdditiveBlending,
            side: T.BackSide,
        })
    );

    atmosphere.scale.set(1.1, 1.1, 1.1);

    scene.add(atmosphere);

    camera.position.z = 15;

    const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();
})();
