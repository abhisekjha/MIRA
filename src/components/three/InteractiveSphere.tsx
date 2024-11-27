import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NodeHighlight } from './effects/NodeHighlight';
import { ParticleField } from './effects/ParticleField';
import { playSound } from '../../utils/sound';

gsap.registerPlugin(ScrollTrigger);

interface InteractiveSphereProps {
  onNodeClick?: (nodeId: string) => void;
}

export function InteractiveSphere({ onNodeClick }: InteractiveSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const composerRef = useRef<EffectComposer>();
  const controlsRef = useRef<OrbitControls>();
  const sphereRef = useRef<THREE.Group>();
  const particleFieldRef = useRef<ParticleField>();
  const nodeHighlightsRef = useRef<NodeHighlight[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.5;
    controlsRef.current = controls;

    // Create sphere group
    const sphereGroup = new THREE.Group();
    sphereRef.current = sphereGroup;
    scene.add(sphereGroup);

    // Add particle field
    const particleField = new ParticleField(
      2000,
      6,
      new THREE.Color(0xAE67FA)
    );
    particleFieldRef.current = particleField;
    sphereGroup.add(particleField.getPoints());

    // Create interactive nodes
    const nodeCount = 12;
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = 5 * Math.cos(theta) * Math.sin(phi);
      const y = 5 * Math.sin(theta) * Math.sin(phi);
      const z = 5 * Math.cos(phi);

      const highlight = new NodeHighlight(
        new THREE.Vector3(x, y, z),
        new THREE.Color(0x59CBE8)
      );
      nodeHighlightsRef.current.push(highlight);
      sphereGroup.add(highlight.getMesh());
    }

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (sphereRef.current) {
        sphereRef.current.rotation.y += 0.001;
      }

      if (particleFieldRef.current) {
        particleFieldRef.current.update();
      }

      nodeHighlightsRef.current.forEach(highlight => {
        highlight.update(time);
      });

      controls.update();
      composer.render();
    };
    animate();

    // Scroll animation
    gsap.to(camera.position, {
      z: 10,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      
      nodeHighlightsRef.current.forEach(highlight => {
        highlight.dispose();
      });
      
      if (particleFieldRef.current) {
        particleFieldRef.current.dispose();
      }
      
      scene.clear();
    };
  }, [onNodeClick]);

  // Handle resize
  const handleResize = () => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current || !composerRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
    composerRef.current.setSize(width, height);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[600px] cursor-grab active:cursor-grabbing"
      onMouseDown={() => playSound('click')}
      onMouseEnter={() => playSound('hover')}
    />
  );
}