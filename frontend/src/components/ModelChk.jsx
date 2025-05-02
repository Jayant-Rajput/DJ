import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";

function Model() {
  const gltf = useLoader(GLTFLoader, "../public/laptop/laptop.gltf");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.004; // Rotates around Y-axis
    }
  });

  return <primitive ref={modelRef} object={gltf.scene} scale={0.7} />;
}

function ModelChk() {
  return (
    <Canvas>
      <ambientLight intensity={4} />
      <OrbitControls enableZoom={false} />
      <spotLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}

export default ModelChk;
