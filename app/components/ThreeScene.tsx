"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(280, 280); // Reduced size further
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.5;
    controlsRef.current = controls;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load 3D Model
    const loader = new GLTFLoader();

    loader.load(
      '/3D/Shaded/base_basic_shaded.glb',
      (gltf: GLTF) => {
        const model = gltf.scene;
        model.scale.set(1.0, 1.0, 1.0);
        model.position.y = -0.9; // Moved lower to reduce bottom space
        scene.add(model);
        modelRef.current = model;

        camera.position.set(0, 0.1, 3.2); // Adjusted camera height
        camera.position.set(0, 0.2, 3.2); // Moved camera closer
        camera.lookAt(0, 0, 0);
      },
      (progress: { loaded: number; total: number }) => {
        console.log('Loading model...', (progress.loaded / progress.total * 100) + '%');
      },
      (error: unknown) => {
        console.error('Error loading model:', error);
      }
    );

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const container = mountRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-64 h-64 md:w-72 md:h-72 transition-all duration-300"
      style={{ cursor: 'grab', touchAction: 'none' }}
    />
  );
} 