"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, AccumulativeShadows, RandomizedLight, Sky, ContactShadows } from "@react-three/drei";
import Scene from "../components/Scene";

export default function Page() {
  return (
    <main className="canvas-wrap">
      <Canvas shadows camera={{ position: [6, 4, 10], fov: 55 }}>
        <color attach="background" args={["#f9f7f3"]} />
        <fog attach="fog" args={["#f9f7f3", 25, 60]} />
        <hemisphereLight intensity={0.5} groundColor="#ffe9b0" color="#fff5cc" />
        <directionalLight
          position={[10, 15, 5]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Sky distance={450000} sunPosition={[20, 15, 10]} inclination={0.47} azimuth={0.25} mieCoefficient={0.005} mieDirectionalG={0.9} rayleigh={2.8} turbidity={4} />
        <Scene />
        <AccumulativeShadows temporal frames={80} color="#ffd39a" colorBlend={0.4} alphaTest={0.8} opacity={0.7} scale={20} position={[0, 0.01, 0]}>
          <RandomizedLight amount={8} radius={6} ambient={0.2} intensity={0.8} position={[10, 10, -5]} bias={0.001} />
        </AccumulativeShadows>
        <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={20} blur={2.5} far={15} />
        <OrbitControls minDistance={6} maxDistance={22} maxPolarAngle={Math.PI * 0.49} />
      </Canvas>
      <div className="overlay">
        <strong>Indian Village Morning</strong>
        Small boy playing near trees ? Bright sunlight ? Colorful flowers ? Soft look
      </div>
    </main>
  );
}
