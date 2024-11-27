import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ChatSphereProps {
  isHovered: boolean;
  isActive: boolean;
}

export function ChatSphere({ isHovered, isActive }: ChatSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const sphereRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(64, 64);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create sphere
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        intensity: { value: 0 },
        color1: { value: new THREE.Color(0x59CBE8) },
        color2: { value: new THREE.Color(0xAE67FA) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float intensity;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          float edge = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          vec3 color = mix(color1, color2, edge * pulse);
          float alpha = intensity * (edge + 0.2);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      if (sphereRef.current) {
        sphereRef.current.rotation.y += 0.01;
        (sphereRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Handle hover and active states
  useEffect(() => {
    if (!sphereRef.current) return;

    const material = sphereRef.current.material as THREE.ShaderMaterial;
    gsap.to(material.uniforms.intensity, {
      value: isHovered || isActive ? 1 : 0.3,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isHovered, isActive]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 flex items-center justify-center"
      style={{ width: 64, height: 64 }}
    />
  );
}