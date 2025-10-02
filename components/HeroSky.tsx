"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => ({ x: 0, y: 0 }), []);

  useEffect(() => {
    camera.position.set(0, 0.5, 8);
  }, [camera]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.x = nx * 0.3;
      target.y = -ny * 0.2;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [target]);

  useFrame((_, dt) => {
    camera.position.x += (target.x - camera.position.x) * Math.min(1, dt * 1.5);
    camera.position.y += (target.y - camera.position.y) * Math.min(1, dt * 1.5);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Raindrops() {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 800;
  
  const { positions, velocities } = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    const v = new Float32Array(COUNT);
    
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = Math.random() * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 30;
      v[i] = 0.02 + Math.random() * 0.03;
    }
    return { positions: p, velocities: v };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] -= velocities[i];
      
      if (pos[i * 3 + 1] < -2) {
        pos[i * 3 + 1] = 20;
        pos[i * 3] = (Math.random() - 0.5) * 30;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#B8D4E8"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}

function Cloud({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const cloudParts = useMemo(() => {
    const parts = [];
    for (let i = 0; i < 25; i++) {
      const angle = (i / 25) * Math.PI * 2;
      const radius = 1.2 + Math.random() * 1.4;
      const height = (Math.random() - 0.5) * 0.4;
      parts.push({
        position: [
          Math.cos(angle) * radius + (Math.random() - 0.5) * 0.8,
          height + (Math.random() - 0.3) * 0.5,
          Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 0.6
        ] as [number, number, number],
        scale: [0.5 + Math.random() * 0.7, 0.4 + Math.random() * 0.6, 0.5 + Math.random() * 0.7] as [number, number, number]
      });
    }
    return parts;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.x = position[0] + Math.sin(t * 0.04 + position[0]) * 0.25;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.08 + position[1]) * 0.15;
  });

  return (
    <group ref={groupRef} position={position}>
      {cloudParts.map((part, i) => (
        <mesh key={i} position={part.position} scale={part.scale}>
          <sphereGeometry args={[0.8, 12, 12]} />
          <meshStandardMaterial 
            color="#E8F0F5" 
            transparent 
            opacity={0.92}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function RealisticClouds() {
  return (
    <>
      <Cloud position={[5, 4, -12]} />
      <Cloud position={[7, 11, -14]} />
      <Cloud position={[-4, 4.5, -10]} />
      <Cloud position={[9, 3.5, -13]} />
      <Cloud position={[1, 4, -15]} />
      <Cloud position={[-8, 3, -9]} />
      <Cloud position={[-6, 9, -16]} />
      <Cloud position={[3, 8, -11]} />
    </>
  );
}

function BalloonBundle() {
  const bundleRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);

  useFrame((state) => {
    if (!bundleRef.current) return;
    const t = state.clock.getElapsedTime();
    
    bundleRef.current.position.y = -0.5 + Math.sin(t * 0.3) * 0.05;
    bundleRef.current.position.x = Math.cos(t * 0.2) * 0.08;
    bundleRef.current.rotation.z = Math.sin(t * 0.25) * 0.03;
    
    const cam = state.camera as THREE.PerspectiveCamera;
    const groupZ = bundleRef.current.position.z;
    const distance = Math.abs(cam.position.z - groupZ);
    const viewportHeight = 2 * Math.tan((cam.fov * Math.PI) / 360) * distance;

    const nominalHeight = 4.0;
    const desiredHeight = viewportHeight * 0.65;
    const s = Math.min(6, Math.max(0.2, desiredHeight / nominalHeight));
    bundleRef.current.scale.setScalar(s);
  });

  const balloons = useMemo(() => [
    { 
      offsetPos: [-1.2, 0.3, 0] as [number, number, number],
      color: "#FF6B9D", 
      label: "Hope",
      size: 0.5
    },
    { 
      offsetPos: [-0.6, 0, 0.3] as [number, number, number],
      color: "#4ECDC4", 
      label: "Healing",
      size: 0.48
    },
    { 
      offsetPos: [0, 0.5, 0] as [number, number, number],
      color: "#FFD93D", 
      label: "Growth",
      size: 0.55
    },
    { 
      offsetPos: [0.6, 0.1, 0.2] as [number, number, number],
      color: "#A8E6CF", 
      label: "Support",
      size: 0.5
    },
    { 
      offsetPos: [1.2, 0.4, -0.1] as [number, number, number],
      color: "#B19CD9", 
      label: "Recovery",
      size: 0.52
    },
  ], []);

  return (
    <group ref={bundleRef} position={[0, -0.2, -12]} scale={[0.25, 0.25, 0.25]}>
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {balloons.map((balloon, i) => {
        const balloonRef = useRef<THREE.Group>(null!);
        
        useFrame((state) => {
          if (!balloonRef.current) return;
          const t = state.clock.getElapsedTime();
          
          const individualFloat = Math.sin(t * 0.5 + i * 0.7) * 0.15;
          balloonRef.current.position.y = balloon.offsetPos[1] + individualFloat;
          
          balloonRef.current.rotation.y = Math.sin(t * 0.4 + i) * 0.1;
          
          const targetScale = clicked === i ? 1.3 : hovered === i ? 1.2 : 1;
          balloonRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        });

        const stringPoints = useMemo(() => {
          const start = new THREE.Vector3(
            balloon.offsetPos[0],
            balloon.offsetPos[1] - balloon.size * 0.9,
            balloon.offsetPos[2]
          );
          const end = new THREE.Vector3(0, -2.5, 0);
          
          const midPoint1 = new THREE.Vector3(
            balloon.offsetPos[0] * 0.7,
            balloon.offsetPos[1] - balloon.size * 0.9 - 0.6,
            balloon.offsetPos[2] * 0.7
          );
          const midPoint2 = new THREE.Vector3(
            balloon.offsetPos[0] * 0.3,
            -1.5,
            balloon.offsetPos[2] * 0.3
          );
          
          const curve = new THREE.CatmullRomCurve3([start, midPoint1, midPoint2, end]);
          return curve.getPoints(40);
        }, [balloon.offsetPos, balloon.size]);

        const stringGeometry = useMemo(() => {
          return new THREE.BufferGeometry().setFromPoints(stringPoints);
        }, [stringPoints]);

        return (
          <group key={i}>
            <primitive 
              object={new THREE.Line(
                stringGeometry, 
                new THREE.LineBasicMaterial({ 
                  color: "#8B7355", 
                  transparent: true, 
                  opacity: 0.8,
                  linewidth: 2
                })
              )} 
            />
            
            <group 
              ref={balloonRef}
              position={balloon.offsetPos}
              onPointerEnter={() => setHovered(i)}
              onPointerLeave={() => setHovered(null)}
              onClick={() => {
                setClicked(i);
                setTimeout(() => setClicked(null), 800);
              }}
            >
              <mesh scale={[balloon.size, balloon.size * 1.2, balloon.size]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial 
                  color={balloon.color}
                  roughness={0.3}
                  metalness={0.2}
                  emissive={balloon.color}
                  emissiveIntensity={0.2}
                />
              </mesh>

              <mesh position={[0, -balloon.size * 0.9, 0]} scale={[0.15, 0.25, 0.15]}>
                <sphereGeometry args={[balloon.size * 0.3, 8, 8]} />
                <meshStandardMaterial color={balloon.color} roughness={0.4} />
              </mesh>

              <Text
                position={[0, 0, balloon.size + 0.1]}
                fontSize={0.12}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.012}
                outlineColor={balloon.color}
                maxWidth={1.2}
              >
                {balloon.label}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
}

function RealisticSky() {
  const skyRef = useRef<THREE.Mesh>(null!);

  const skyGradient = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#5B8DBE');
    gradient.addColorStop(0.3, '#6FA3D1');
    gradient.addColorStop(0.6, '#84B5DB');
    gradient.addColorStop(1, '#A8CCE5');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 512);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <mesh ref={skyRef} position={[0, 0, -20]}>
      <sphereGeometry args={[60, 32, 32]} />
      <meshBasicMaterial map={skyGradient} side={THREE.BackSide} />
    </mesh>
  );
}

function WebGLContextGuard() {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.getContext().canvas as HTMLCanvasElement;
    const onLost = (e: Event) => e.preventDefault();
    const onRestored = () => gl.resetState();
    canvas.addEventListener("webglcontextlost", onLost, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);
    return () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [gl]);
  return null;
}

export default function HeroSky() {
  return (
    <div className="absolute top-0 left-0 h-[100svh] w-full overflow-hidden z-0 bg-transparent">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        camera={{ fov: 55, near: 0.1, far: 200 }}
        shadows={false}
      >
        <color attach="background" args={["#5B8DBE"]} />
        <fog attach="fog" args={["#84B5DB", 20, 70]} />
        
        <PerspectiveCamera makeDefault position={[0, 0.5, 8]} />
        <ambientLight intensity={0.6} color="#B8D4E8" />
        <directionalLight position={[8, 15, 10]} intensity={0.8} color="#E8F0F5" />
        <directionalLight position={[-5, 8, -5]} intensity={0.3} color="#D0E4F0" />
        <hemisphereLight skyColor="#7FA8C9" groundColor="#5B8DBE" intensity={0.5} />

        <RealisticSky />
        <RealisticClouds />
        <Raindrops />
        <BalloonBundle />

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom 
            intensity={0.3} 
            luminanceThreshold={0.7} 
            luminanceSmoothing={0.9} 
            mipmapBlur 
          />
        </EffectComposer>

        <CameraRig />
        <WebGLContextGuard />
      </Canvas>
    </div>
  );
}