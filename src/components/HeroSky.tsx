"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState, memo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface BalloonType {
  offsetPos: [number, number, number];
  color: string;
  label: string;
  size: number;
}

interface BalloonProps {
  balloon: BalloonType;
  i: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  clicked: number | null;
  setClicked: React.Dispatch<React.SetStateAction<number | null>>;
}

// ============================================================================
// CAMERA RIG
// ============================================================================

const CameraRig = memo(() => {
  const { camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);
  
  const targetRef = useRef({ x: -1.5, y: 0 });
  const basePositionRef = useRef({ x: -1.5, mobile: -0.5 });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const baseX = isMobile ? basePositionRef.current.mobile : basePositionRef.current.x;
    camera.position.set(baseX, 0.5, 10);
    targetRef.current.x = baseX;
  }, [camera, isMobile]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      const movementFactor = isMobile ? 0.15 : 0.25;
      const baseX = isMobile ? basePositionRef.current.mobile : basePositionRef.current.x;
      targetRef.current.x = baseX + nx * movementFactor;
      targetRef.current.y = -ny * 0.15;
    };
    
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isMobile]);

  useFrame((_, dt) => {
    const clampedDt = Math.min(dt, 0.1);
    const lerpFactor = Math.min(1, clampedDt * 1.5);
    
    camera.position.x += (targetRef.current.x - camera.position.x) * lerpFactor;
    camera.position.y += (targetRef.current.y - camera.position.y) * lerpFactor;
    camera.lookAt(-3, 0, 0);
  });

  return null;
});

CameraRig.displayName = "CameraRig";

// ============================================================================
// BALLOON COMPONENT
// ============================================================================

const Balloon = memo(({ balloon, i, hovered, setHovered, clicked, setClicked }: BalloonProps) => {
  const balloonRef = useRef<THREE.Group>(null!);
  
  const targetScaleVec = useMemo(() => new THREE.Vector3(), []);

  const timeOffsets = useMemo(() => ({
    float: i * 0.7,
    rotation: i,
  }), [i]);

  useFrame((state) => {
    if (!balloonRef.current) return;
    const t = state.clock.getElapsedTime();
    
    balloonRef.current.position.y = balloon.offsetPos[1] + Math.sin(t * 0.5 + timeOffsets.float) * 0.15;
    balloonRef.current.rotation.y = Math.sin(t * 0.4 + timeOffsets.rotation) * 0.1;

    const targetScale = clicked === i ? 1.3 : hovered === i ? 1.15 : 1;
    targetScaleVec.set(targetScale, targetScale, targetScale);
    balloonRef.current.scale.lerp(targetScaleVec, 0.1);
  });

  const stringPoints = useMemo(() => {
    const start = new THREE.Vector3(
      balloon.offsetPos[0],
      balloon.offsetPos[1] - balloon.size * 0.9,
      balloon.offsetPos[2]
    );
    const end = new THREE.Vector3(0, -2.5, 0);
    const mid1 = new THREE.Vector3(
      balloon.offsetPos[0] * 0.7,
      balloon.offsetPos[1] - balloon.size * 0.9 - 0.6,
      balloon.offsetPos[2] * 0.7
    );
    const mid2 = new THREE.Vector3(
      balloon.offsetPos[0] * 0.3,
      -1.5,
      balloon.offsetPos[2] * 0.3
    );
    return new THREE.CatmullRomCurve3([start, mid1, mid2, end]).getPoints(40);
  }, [balloon.offsetPos, balloon.size]);

  const handlePointerEnter = useCallback(() => setHovered(i), [i, setHovered]);
  const handlePointerLeave = useCallback(() => setHovered(null), [setHovered]);
  const handleClick = useCallback(() => {
    setClicked(i);
    setTimeout(() => setClicked(null), 800);
  }, [i, setClicked]);

  const stringGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(stringPoints);
    return geometry;
  }, [stringPoints]);

  const stringLine = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color: "#8B7355", transparent: true, opacity: 0.8 });
    return new THREE.Line(stringGeometry, material);
  }, [stringGeometry]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stringGeometry.dispose();
      stringLine.material.dispose();
    };
  }, [stringGeometry, stringLine]);

  return (
    <group>
      {/* Balloon string */}
      <primitive object={stringLine} />

      {/* Balloon group */}
      <group
        ref={balloonRef}
        position={balloon.offsetPos}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        {/* Main balloon sphere */}
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

        {/* Balloon knot */}
        <mesh position={[0, -balloon.size * 0.9, 0]} scale={[0.15, 0.25, 0.15]}>
          <sphereGeometry args={[balloon.size * 0.3, 8, 8]} />
          <meshStandardMaterial color={balloon.color} />
        </mesh>

        {/* Label */}
        <Text
          position={[0, 0, balloon.size + 0.1]}
          fontSize={0.12}
          color="#FFF"
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
});

Balloon.displayName = "Balloon";

// ============================================================================
// BALLOON BUNDLE
// ============================================================================

const BalloonBundle = memo(() => {
  const bundleRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useFrame((state) => {
    if (!bundleRef.current) return;
    const t = state.clock.getElapsedTime();
    bundleRef.current.position.y = -1 + Math.sin(t * 0.3) * 0.05;
    bundleRef.current.position.x = Math.cos(t * 0.2) * 0.08;
    bundleRef.current.rotation.z = Math.sin(t * 0.25) * 0.03;
  });

  const balloons = useMemo<BalloonType[]>(() => {
    const sizeF = isMobile ? 0.8 : 1;
    const spreadF = isMobile ? 0.6 : 1;
    return [
      { offsetPos: [-0.4 * spreadF, 0.9, 0.3], color: "#FF6B9D", label: "", size: 1.1 * sizeF },
      { offsetPos: [-0.15 * spreadF, 0.7, 0.5], color: "#4ECDC4", label: "", size: 1.0 * sizeF },
      { offsetPos: [0.15 * spreadF, 0.8, 0.5], color: "#FFD93D", label: "", size: 1.05 * sizeF },
      { offsetPos: [0.4 * spreadF, 0.6, 0.3], color: "#B19CD9", label: "", size: 1.0 * sizeF },
    ];
  }, [isMobile]);

  const bundleTransform = useMemo(() => ({
    scale: isMobile ? 1.2 : 1.6,
    posX: isMobile ? 0 : 1.5,
    posZ: -8,
  }), [isMobile]);

  return (
    <group 
      ref={bundleRef} 
      position={[bundleTransform.posX, -1, bundleTransform.posZ]} 
      scale={[bundleTransform.scale, bundleTransform.scale, bundleTransform.scale]}
    >
      {/* Anchor point */}
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Balloons */}
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
});

BalloonBundle.displayName = "BalloonBundle";

// ============================================================================
// REALISTIC SKY
// ============================================================================

const RealisticSky = memo(() => {
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
});

RealisticSky.displayName = "RealisticSky";

// ============================================================================
// SCENE
// ============================================================================

const Scene = memo(() => {
  return (
    <>
      <color attach="background" args={["#5B8DBE"]} />
      <fog attach="fog" args={["#84B5DB", 20, 70]} />
      <PerspectiveCamera makeDefault position={[0, 0.5, 8]} />
      <ambientLight intensity={0.6} color="#B8D4E8" />
      <directionalLight position={[8, 15, 10]} intensity={0.8} color="#FFF" />
      <hemisphereLight args={["#7FA8C9", "#5B8DBE", 0.5]} />
      <RealisticSky />
      <BalloonBundle />
      <CameraRig />
    </>
  );
});

Scene.displayName = "Scene";

// ============================================================================
// HERO SKY CANVAS
// ============================================================================

function HeroSky() {
  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  );
}

export default HeroSky;