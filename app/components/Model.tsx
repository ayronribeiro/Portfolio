"use client";

import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

interface ModelProps {
  onLoad?: () => void;
}

export function Model({ onLoad }: ModelProps) {
  const model = useGLTF('/3D/Shaded/base_basic_shaded.glb');

  useEffect(() => {
    if (model && onLoad) {
      onLoad();
    }
  }, [model, onLoad]);

  return <primitive object={model.scene} scale={1.0} position={[0, -0.9, 0]} />;
}

// Preload the model
useGLTF.preload('/3D/Shaded/base_basic_shaded.glb'); 