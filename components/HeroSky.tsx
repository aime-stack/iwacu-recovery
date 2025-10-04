"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Text } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function CameraRig() {
  const { camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);
  const target = useMemo(() => ({ x: -1.5, y: 0 }), []); // Changed to negative to look left

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      camera.position.set(-0.5, 0.5, 10); // Negative x for left side
    } else {
      camera.position.set(-1.5, 0.5, 10); // Negative x for left side
    }
  }, [camera, isMobile]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      const movementFactor = isMobile ? 0.15 : 0.25;
      target.x = (isMobile ? -0.5 : -1.5) + nx * movementFactor; // Negative for left
      target.y = -ny * 0.15;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [target, isMobile]);

  useFrame((_, dt) => {
    camera.position.x += (target.x - camera.position.x) * Math.min(1, dt * 1.5);
    camera.position.y += (target.y - camera.position.y) * Math.min(1, dt * 1.5);
    camera.lookAt(-3, 0, 0); // Look towards left side where balloons are now
  });

  return null;
}

interface BalloonType {
  offsetPos: [number, number, number];
  color: string;
  label: string;
  size: number;
}

function Balloon({
  balloon,
  i,
  hovered,
  setHovered,
  clicked,
  setClicked,
}: {
  balloon: BalloonType;
  i: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  clicked: number | null;
  setClicked: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const balloonRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!balloonRef.current) return;
    const t = state.clock.getElapsedTime();
    
    const individualFloat = Math.sin(t * 0.5 + i * 0.7) * 0.15;
    balloonRef.current.position.y = balloon.offsetPos[1] + individualFloat;
    
    balloonRef.current.rotation.y = Math.sin(t * 0.4 + i) * 0.1;

    const targetScale = clicked === i ? 1.3 : hovered === i ? 1.15 : 1;
    balloonRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
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
  }, [balloon]);

  const stringGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(stringPoints),
    [stringPoints]
  );

  return (
    <group>
      <primitive
        object={
          new THREE.Line(
            stringGeometry,
            new THREE.LineBasicMaterial({ 
              color: "#8B7355", 
              transparent: true, 
              opacity: 0.8
            })
          )
        }
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
            emissive={balloon.color} 
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        <mesh position={[0, -balloon.size * 0.9, 0]} scale={[0.15, 0.25, 0.15]}>
          <sphereGeometry args={[balloon.size * 0.3, 8, 8]} />
          <meshStandardMaterial color={balloon.color} />
        </mesh>
        
        <Text
          position={[0, 0, balloon.size + 0.1]}
          fontSize={0.12}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor={balloon.color}
        >
          {balloon.label}
        </Text>
      </group>
    </group>
  );
}

function BalloonBundle() {
  const bundleRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useFrame((state) => {
    if (!bundleRef.current) return;
    const t = state.clock.getElapsedTime();
    
    bundleRef.current.position.y = -1 + Math.sin(t * 0.3) * 0.05;
    bundleRef.current.position.x = Math.cos(t * 0.2) * 0.08;
    bundleRef.current.rotation.z = Math.sin(t * 0.25) * 0.03;
  });

  const balloons = useMemo<BalloonType[]>(
    () => {
      const sizeFactor = isMobile ? 0.8 : 1;
      const spreadFactor = isMobile ? 0.6 : 1;
      
      return [
        { 
          offsetPos: [-0.4 * spreadFactor, 0.9, 0.3], 
          color: "#FF6B9D", 
          label: "", 
          size: 1.1 * sizeFactor 
        },
        { 
          offsetPos: [-0.15 * spreadFactor, 0.7, 0.5], 
          color: "#4ECDC4", 
          label: "", 
          size: 1.0 * sizeFactor 
        },
        { 
          offsetPos: [0.15 * spreadFactor, 0.8, 0.5], 
          color: "#FFD93D", 
          label: "", 
          size: 1.05 * sizeFactor 
        },
        { 
          offsetPos: [0.4 * spreadFactor, 0.6, 0.3], 
          color: "#B19CD9", 
          label: "", 
          size: 1.0 * sizeFactor 
        },
      ];
    },
    [isMobile]
  );

  const bundleScale = isMobile ? 1.2 : 1.6;
  const bundlePositionX = isMobile ? 0 : 1.5;
  const bundlePositionZ = isMobile ? -8 : -8;

  return (
    <group 
      ref={bundleRef} 
      position={[bundlePositionX, -1, bundlePositionZ]} 
      scale={[bundleScale, bundleScale, bundleScale]}
    >
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      
      {balloons.map((b, i) => (
        <Balloon
          key={i}
          balloon={b}
          i={i}
          hovered={hovered}
          setHovered={setHovered}
          clicked={clicked}
          setClicked={setClicked}
        />
      ))}
    </group>
  );
}

function RealisticSky() {
  const skyGradient = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    
    gradient.addColorStop(0, "#5B8DBE");
    gradient.addColorStop(0.3, "#6FA3D1");
    gradient.addColorStop(0.6, "#84B5DB");
    gradient.addColorStop(1, "#A8CCE5");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 512);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh position={[0, 0, -20]}>
      <sphereGeometry args={[60, 32, 32]} />
      <meshBasicMaterial map={skyGradient} side={THREE.BackSide} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#5B8DBE"]} />
      <fog attach="fog" args={["#84B5DB", 20, 70]} />
      <PerspectiveCamera makeDefault position={[0, 0.5, 8]} />
      
      <ambientLight intensity={0.6} color="#B8D4E8" />
      <directionalLight position={[8, 15, 10]} intensity={0.8} color="#FFFFFF" />
      <hemisphereLight args={["#7FA8C9", "#5B8DBE", 0.5]} />
      
      <RealisticSky />
      <BalloonBundle />
      <CameraRig />
    </>
  );
}

export default function HeroSky() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute top-0 left-0 h-[100svh] w-full bg-gradient-to-b from-blue-600 via-blue-400 to-blue-300" style={{ position: 'fixed' }} />
    );
  }

  return (
    <div className="absolute top-0 left-0 h-[100svh] w-full" style={{ position: 'fixed' }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 55, near: 0.1, far: 200 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}