import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cone, RoundedBox, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[20, 64]} />
        <meshStandardMaterial color="#c7f0a3" roughness={0.95} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <circleGeometry args={[19, 64]} />
        <meshStandardMaterial color="#e6f7c9" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial color="#f5ffdf" roughness={1} />
      </mesh>
      {/* Path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.002, 0]} receiveShadow>
        <ringGeometry args={[0.5, 1.8, 64, 1, Math.PI * 0.1, Math.PI * 1.4]} />
        <meshStandardMaterial color="#f3d5a1" roughness={1} />
      </mesh>
    </group>
  );
}

function Tree({ position = [0, 0, 0], scale = 1, hue = 110 }) {
  const trunkColor = new THREE.Color("#8b5a2b");
  const leavesColor = new THREE.Color().setHSL(hue / 360, 0.6, 0.5);
  return (
    <group position={position} scale={scale}>
      <RoundedBox args={[0.25, 1.1, 0.25]} position={[0, 0.55, 0]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color={trunkColor} roughness={1} />
      </RoundedBox>
      <Cone args={[0.9, 1.2, 6]} position={[0, 1.6, 0]} castShadow>
        <meshStandardMaterial color={leavesColor} roughness={0.9} />
      </Cone>
      <Cone args={[0.7, 1.0, 6]} position={[0, 2.1, 0]} castShadow>
        <meshStandardMaterial color={leavesColor.offsetHSL(0, -0.05, 0.05)} roughness={0.9} />
      </Cone>
      <Cone args={[0.5, 0.8, 6]} position={[0, 2.5, 0]} castShadow>
        <meshStandardMaterial color={leavesColor.offsetHSL(0, -0.05, 0.05)} roughness={0.9} />
      </Cone>
    </group>
  );
}

function Flower({ position = [0, 0, 0], color = "#ff6fae" }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
        <meshStandardMaterial color="#3aa655" roughness={1} />
      </mesh>
      <Sphere args={[0.05, 16, 16]} position={[0, 0.11, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.7} />
      </Sphere>
    </group>
  );
}

function Hut({ position = [0, 0, 0], rotation = [0, 0.4, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[1.8, 1, 1.2]} position={[0, 0.5, 0]} radius={0.08} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#f6d7a8" roughness={0.95} />
      </RoundedBox>
      <Cone args={[1.7, 0.9, 6]} position={[0, 1.35, 0]} castShadow>
        <meshStandardMaterial color="#c96835" roughness={0.85} />
      </Cone>
      {/* Door */}
      <RoundedBox args={[0.5, 0.7, 0.05]} position={[0.3, 0.35, 0.63]} radius={0.03} smoothness={2} castShadow>
        <meshStandardMaterial color="#9b6b34" roughness={1} />
      </RoundedBox>
      {/* Window */}
      <RoundedBox args={[0.35, 0.35, 0.05]} position={[-0.55, 0.55, 0.61]} radius={0.03} smoothness={2} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </RoundedBox>
    </group>
  );
}

function Boy({ position = [0, 0, 0] }) {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const bounce = Math.sin(t * 2.4) * 0.12 + 0.18;
    const wiggle = Math.sin(t * 2.0) * 0.25;
    if (group.current) {
      group.current.position.y = bounce;
      group.current.rotation.y = Math.sin(t * 0.8) * 0.15;
    }
    // hands swing
    group.current.children[3].rotation.x = Math.sin(t * 3.2) * 0.8; // right arm
    group.current.children[4].rotation.x = -Math.sin(t * 3.2) * 0.8; // left arm
  });

  return (
    <group ref={group} position={position}>
      {/* Head */}
      <Sphere args={[0.22, 24, 24]} position={[0, 1.1, 0]} castShadow>
        <meshStandardMaterial color="#ffddb3" roughness={0.6} />
      </Sphere>
      {/* Hair cap */}
      <Sphere args={[0.23, 24, 24]} position={[0, 1.16, -0.02]} scale={[1, 0.6, 1]} castShadow>
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
      </Sphere>
      {/* Body */}
      <RoundedBox args={[0.36, 0.5, 0.22]} position={[0, 0.72, 0]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color="#4cc4ff" roughness={0.7} />
      </RoundedBox>
      {/* Right arm */}
      <RoundedBox args={[0.12, 0.35, 0.12]} position={[0.28, 0.75, 0]} radius={0.06} smoothness={2} castShadow>
        <meshStandardMaterial color="#ffddb3" roughness={0.7} />
      </RoundedBox>
      {/* Left arm */}
      <RoundedBox args={[0.12, 0.35, 0.12]} position={[-0.28, 0.75, 0]} radius={0.06} smoothness={2} castShadow>
        <meshStandardMaterial color="#ffddb3" roughness={0.7} />
      </RoundedBox>
      {/* Shorts */}
      <RoundedBox args={[0.34, 0.2, 0.22]} position={[0, 0.46, 0]} radius={0.06} smoothness={3} castShadow>
        <meshStandardMaterial color="#2a9d8f" roughness={0.8} />
      </RoundedBox>
      {/* Legs */}
      <RoundedBox args={[0.12, 0.32, 0.12]} position={[0.12, 0.22, 0]} radius={0.05} smoothness={2} castShadow>
        <meshStandardMaterial color="#ffddb3" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.12, 0.32, 0.12]} position={[-0.12, 0.22, 0]} radius={0.05} smoothness={2} castShadow>
        <meshStandardMaterial color="#ffddb3" roughness={0.7} />
      </RoundedBox>
      {/* Shoes */}
      <RoundedBox args={[0.14, 0.08, 0.2]} position={[0.12, 0.06, 0.06]} radius={0.03} smoothness={2} castShadow>
        <meshStandardMaterial color="#f94144" roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.14, 0.08, 0.2]} position={[-0.12, 0.06, 0.06]} radius={0.03} smoothness={2} castShadow>
        <meshStandardMaterial color="#f94144" roughness={0.5} />
      </RoundedBox>
    </group>
  );
}

export default function Scene() {
  const flowerPositions = useMemo(() => {
    const colors = ["#ff6fae", "#ffd166", "#7bd389", "#9e7bff", "#ffadad"];
    const positions = [];
    for (let i = 0; i < 55; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 7.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push({ pos: [x, 0, z], color: colors[Math.floor(Math.random() * colors.length)] });
    }
    return positions;
  }, []);

  const treePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2 + (Math.random() * 0.3);
      const radius = 6 + Math.random() * 6;
      positions.push([
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius,
      ]);
    }
    return positions;
  }, []);

  return (
    <group>
      <Ground />
      <Hut position={[-2.2, 0, -0.6]} />
      <Hut position={[2.8, 0, -2.2]} rotation={[0, -0.6, 0]} />
      <Boy position={[0.2, 0, 0.2]} />
      {treePositions.map((p, i) => (
        <Tree key={i} position={p} scale={0.95 + Math.random() * 0.6} hue={95 + Math.random() * 30} />
      ))}
      {flowerPositions.map((f, i) => (
        <Flower key={i} position={f.pos} color={f.color} />
      ))}
    </group>
  );
}
