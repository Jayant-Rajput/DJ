import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";

function Model() {
  const gltf = useLoader(GLTFLoader, "../public/earth/earth.gltf");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.004; // Rotates around Y-axis
    }
  });

  return <primitive ref={modelRef} object={gltf.scene} scale={1.5} />;
}

function Earth() {
  return (
    <a href="https://maps.app.goo.gl/wa2cvWaU5fUMzX8T6">
    <Canvas>
      <ambientLight intensity={2} />
      <OrbitControls enableZoom={false} />
      <spotLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
    </a>
  );    
}

export default Earth;
