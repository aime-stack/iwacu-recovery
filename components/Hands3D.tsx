"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Hands3D() {
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (leftHandRef.current) {
      leftHandRef.current.position.y = Math.sin(time * 0.5) * 0.05;
      leftHandRef.current.rotation.z = Math.sin(time * 0.3) * 0.02;
    }
    
    if (rightHandRef.current) {
      rightHandRef.current.position.y = Math.sin(time * 0.5 + 1) * 0.05;
      rightHandRef.current.rotation.z = Math.sin(time * 0.3 + 1) * 0.02;
    }
  });

  return (
    <group position={[3.5, -2.5, 0]}>
      {/* Left Hand */}
      <group ref={leftHandRef} position={[-0.8, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
      </group>

      {/* Right Hand */}
      <group ref={rightHandRef} position={[0.8, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#F4A89F" />
        </mesh>
      </group>

      {/* String convergence point */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#6B5847" />
      </mesh>
    </group>
  );
}
