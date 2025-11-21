'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Floating orb component
const FloatingOrb = ({ position, color, speed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7 * speed) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 * speed) * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.8, 10]} />
        <MeshDistortMaterial 
          color={color} 
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Travel-themed 3D objects
const TravelObject = ({ type, position, rotation = [0, 0, 0] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = rotation[2];
    }
  });

  switch (type) {
    case 'plane':
      return (
        <mesh ref={meshRef} position={position}>
          <boxGeometry args={[1.5, 0.2, 2]} />
          <meshStandardMaterial color="#4F46E5" metalness={0.7} roughness={0.2} />
        </mesh>
      );
    case 'globe':
      return (
        <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#3B82F6" 
            metalness={0.3} 
            roughness={0.1}
            emissive="#1D4ED8"
            emissiveIntensity={0.1}
          />
        </mesh>
      );
    case 'mountain':
      return (
        <mesh ref={meshRef} position={position}>
          <coneGeometry args={[0.7, 1.2, 6]} />
          <meshStandardMaterial color="#8B5CF6" metalness={0.5} roughness={0.3} />
        </mesh>
      );
    default:
      return (
        <mesh ref={meshRef} position={position}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#EC4899" metalness={0.8} roughness={0.1} />
        </mesh>
      );
  }
};

// Animated particles
const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#60A5FA" transparent opacity={0.7} />
    </points>
  );
};

// Main scene component
const Scene3D = () => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8B5CF6" />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Floating orbs */}
      <FloatingOrb position={[-3, 0, -2]} color="#60A5FA" speed={0.8} />
      <FloatingOrb position={[4, -1, 0]} color="#3B82F6" speed={1.2} />
      <FloatingOrb position={[0, 2, 3]} color="#8B5CF6" speed={0.6} />
      
      {/* Travel-themed objects */}
      <TravelObject type="plane" position={[2, 1.5, -3]} rotation={[0, Math.PI / 4, 0]} />
      <TravelObject type="globe" position={[-2, -1.5, 2]} />
      <TravelObject type="mountain" position={[0, -2, -4]} />
      <TravelObject type="landmark" position={[3, -1, 1]} />
      
      {/* Animated particles */}
      <Particles />
      
      {/* Central text */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.2}
          color="#FBBF24"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          EXPLORE
        </Text>
      </Float>
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  );
};

export default Scene3D;