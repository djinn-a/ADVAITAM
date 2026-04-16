import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Jim Corbett coordinates: 29.6426° N, 78.9286° E
const DEFAULT_LAT = 29.6426;
const DEFAULT_LON = 78.9286;

interface GlobeProps {
  lat?: number;
  lon?: number;
}

// Convert lat/lon to 3D position on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Earth Sphere Component
function Earth({ lat, lon }: GlobeProps) {
  const earthRef = useRef<THREE.Mesh>(null);
  const pinRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create earth texture-like material
  const earthMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x1a3a1a,
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  // Pin position
  const pinPosition = useMemo(() => {
    return latLonToVector3(lat || DEFAULT_LAT, lon || DEFAULT_LON, 2.05);
  }, [lat, lon]);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      {/* Earth Sphere */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial
          color={0x4488ff}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Location Pin */}
      <mesh ref={pinRef} position={pinPosition}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={0xff6600} />
      </mesh>

      {/* Glowing Pin Effect */}
      <mesh ref={glowRef} position={pinPosition}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={0xff6600}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Pin Light */}
      <pointLight
        position={pinPosition}
        color={0xff6600}
        intensity={2}
        distance={5}
      />
    </>
  );
}

// City View Alternative Component (when user wants city-level detail)
function CityView({ lat, lon }: GlobeProps) {
  const pinRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      {/* Ground plane representing Jim Corbett area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={0x2d5a3d}
          roughness={0.9}
        />
      </mesh>

      {/* Forest trees (simple cones) */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 8;
        const scale = 0.3 + Math.random() * 0.4;
        return (
          <mesh key={i} position={[x, scale / 2 - 0.5, z]}>
            <coneGeometry args={[0.2 * scale, scale, 8]} />
            <meshStandardMaterial color={0x1a4a1a} />
          </mesh>
        );
      })}

      {/* Villa Location Pin */}
      <mesh ref={pinRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={0xff6600} />
      </mesh>

      {/* Glowing Effect */}
      <mesh ref={glowRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={0xff6600}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Light */}
      <pointLight
        position={[0, 2, 0]}
        color={0xffaa00}
        intensity={1}
        distance={10}
      />

      {/* Ambient light */}
      <ambientLight intensity={0.5} />
    </>
  );
}

interface LocationGlobeProps {
  lat?: number;
  lon?: number;
  viewMode?: "globe" | "city";
  className?: string;
}

export function LocationGlobe({
  lat = DEFAULT_LAT,
  lon = DEFAULT_LON,
  viewMode = "globe",
  className = "",
}: LocationGlobeProps) {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {viewMode === "globe" ? (
          <>
            <Earth lat={lat} lon={lon} />
            <Stars
              radius={100}
              depth={50}
              count={1000}
              factor={4}
              saturation={0}
              fade
            />
          </>
        ) : (
          <CityView lat={lat} lon={lon} />
        )}
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}

export default LocationGlobe;
