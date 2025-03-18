"use client";

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model';
import { Loader } from "@/components/ui/loader";

export function ThreeScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModelVisible, setIsModelVisible] = useState(false);

  return (
    <div className="w-[300px] h-[300px] relative">
      {isLoading && !isModelVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <Loader className="w-12 h-12 mb-4" />
          </div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model 
            onLoad={() => {
              setIsLoading(false);
              setIsModelVisible(true);
            }} 
          />
        </Suspense>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3/4}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
} 