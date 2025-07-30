import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ModelViewer() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    // Set background color to #0f0f0f
    // scene.background = new THREE.Color("#0f0f0f");
    scene.background = new THREE.Color("#000");


    // Camera
    const camera = new THREE.PerspectiveCamera(
      20,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5); // Center the camera on the model

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth interaction
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.target.set(0, 0, 0); // Ensure controls are centered on the origin
    controls.enableZoom = false; // Disable zooming (scroll wheel)
    controls.enablePan = false;  // Optional: disable panning
    controls.update();

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      "/globe-mobile.glb", // make sure this is in the public folder
      (gltf) => {
        // Center the model at the origin
        const model = gltf.scene;
        // Compute bounding box to center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); // Move model so its center is at (0,0,0)
        scene.add(model);
        animate(); // Start animation after model is loaded
      },
      undefined,
      (error) => {
        console.error("An error happened loading the model:", error);
      }
    );

    // Resize handler
    const handleResize = () => {
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Required for damping and auto-rotate
      renderer.render(scene, camera);
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
      controls.dispose(); // Clean up controls
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#0f0f0f" }}
    />
  );
}
