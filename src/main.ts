import * as T from "three";
import gsap from 'gsap';

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

    const mouse: {
        x: number;
        y: number;
    } = {
        x: 0,
        y: 0,
    };

    addEventListener("mousemove", (event) => {
        mouse.x = (event.clientX / innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / innerHeight) * 2 + 1;
    });

    const group = new T.Group();

    group.add(sphere);
    scene.add(group);

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        sphere.rotation.y += 0.003;
        gsap.to(group.rotation, {
            x: -mouse.y * 0.3,
            y: mouse.x * 0.5,
            duration: 2,
        })
    };

    animate();
})();
