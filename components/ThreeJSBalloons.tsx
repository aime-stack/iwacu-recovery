"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import Hands3D from "./Hands3D";

interface BalloonData {
  position: [number, number, number];
  color: string;
  label: string;
  scale: number;
}

function Balloon({ balloon, index }: { balloon: BalloonData; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const highlightRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = balloon.position[1] + Math.sin(time * 0.5 + index) * 0.1;
      meshRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.1;
      
      // Hover effect
      const targetScale = hovered ? balloon.scale * 1.1 : balloon.scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    
    if (highlightRef.current) {
      const time = state.clock.getElapsedTime();
      highlightRef.current.rotation.y = Math.sin(time * 0.2 + index) * 0.1;
    }
  });

  return (
    <group>
      {/* Main balloon body */}
      <mesh
        ref={meshRef}
        position={balloon.position}
        scale={balloon.scale}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={balloon.color}
          roughness={0.2}
          metalness={0.05}
          emissive={balloon.color}
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Balloon highlight */}
      <mesh
        ref={highlightRef}
        position={[balloon.position[0] + 0.3, balloon.position[1] + 0.2, balloon.position[2] + 0.3]}
        scale={balloon.scale * 0.4}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.4}
          roughness={0.1}
        />
      </mesh>
      
      {/* Balloon seam lines */}
      <group position={balloon.position} scale={balloon.scale}>
        {/* Vertical seam */}
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.002, 0.002, 2, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.3} />
        </mesh>
        {/* Horizontal seam */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.002, 0.002, 2, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.3} />
        </mesh>
        {/* Diagonal seams */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.001, 0.001, 2.8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.001, 0.001, 2.8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.2} />
        </mesh>
      </group>
      
      {/* Balloon knot with more detail */}
      <mesh position={[balloon.position[0], balloon.position[1] - 0.9, balloon.position[2]]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial 
          color={balloon.color} 
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Knot highlight */}
      <mesh position={[balloon.position[0] + 0.05, balloon.position[1] - 0.85, balloon.position[2] + 0.05]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial 
          color="white" 
          transparent 
          opacity={0.6}
        />
      </mesh>
      
      {/* Text label with better styling */}
      <Text
        position={[balloon.position[0], balloon.position[1], balloon.position[2] + 1.1]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor={balloon.color}
        font="/fonts/inter-bold.woff"
      >
        {balloon.label}
      </Text>
    </group>
  );
}

function BalloonStrings({ balloons }: { balloons: BalloonData[] }) {
  const stringPoints = balloons.map(balloon => {
    const start = new THREE.Vector3(balloon.position[0], balloon.position[1] - 0.9, balloon.position[2]);
    const end = new THREE.Vector3(3.5, -2.5, 0); // Converge at hands (moved right)
    const midPoint1 = new THREE.Vector3(
      balloon.position[0] * 0.7 + 1,
      balloon.position[1] - 0.9 - 0.8,
      balloon.position[2] * 0.7
    );
    const midPoint2 = new THREE.Vector3(
      balloon.position[0] * 0.3 + 2,
      -1.8,
      balloon.position[2] * 0.3
    );
    const curve = new THREE.CatmullRomCurve3([start, midPoint1, midPoint2, end]);
    return curve.getPoints(50);
  });

  return (
    <>
      {stringPoints.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#8B7355"
          lineWidth={3}
          transparent
          opacity={0.9}
        />
      ))}
    </>
  );
}

function Clouds() {
  const cloudRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    cloudRefs.current.forEach((cloud, index) => {
      if (cloud) {
        const time = state.clock.getElapsedTime();
        cloud.position.x = Math.sin(time * 0.1 + index) * 0.5;
        cloud.position.y = Math.sin(time * 0.05 + index) * 0.2;
      }
    });
  });

  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) cloudRefs.current[i] = el;
          }}
          position={[
            (Math.random() - 0.5) * 20,
            8 + Math.random() * 4,
            -10 + Math.random() * 5
          ]}
          scale={[2 + Math.random() * 2, 1 + Math.random(), 1 + Math.random()]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#E0E0E0"
            transparent
            opacity={0.6}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = time * 0.1;
    }
  });

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
      <bufferAttribute
      attach="attributes-position"
      args={[positions, 3]} // positions Float32Array + itemSize
    />
      </bufferGeometry>
      <pointsMaterial
        color="white"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const balloons: BalloonData[] = [
    { position: [1, 2.5, 0], color: "#FF6B9D", label: "Hope", scale: 1.0 },
    { position: [2.2, 2, 0.5], color: "#4ECDC4", label: "Healing", scale: 0.9 },
    { position: [3.5, 2.8, 0], color: "#FFD93D", label: "Growth", scale: 1.1 },
    { position: [4.8, 2.2, 0.3], color: "#A8E6CF", label: "Support", scale: 0.9 },
    { position: [6, 2, 0], color: "#B19CD9", label: "Recovery", scale: 0.9 },
  ];

  return (
    <>
      <color attach="background" args={["#87CEEB"]} />
      <fog attach="fog" args={["#87CEEB", 20, 50]} />
      
      <ambientLight intensity={0.4} color="#B8D4E8" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-5, 5, 3]} intensity={0.3} color="#FFFFFF" />
      <hemisphereLight args={["#87CEEB", "#5B8DBE", 0.6]} />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#FFFFFF" />
      
      <Clouds />
      <Particles />
      
      {balloons.map((balloon, index) => (
        <Balloon key={index} balloon={balloon} index={index} />
      ))}
      
      <BalloonStrings balloons={balloons} />
      
      <Hands3D />
    </>
  );
}

export default function ThreeJSBalloons() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100" />
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [2, 1, 10], fov: 65 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
