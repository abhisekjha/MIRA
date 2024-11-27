import * as THREE from 'three';
import { gsap } from 'gsap';

export class NodeHighlight {
  private mesh: THREE.Mesh;
  private material: THREE.ShaderMaterial;
  private timeline: gsap.core.Timeline;

  constructor(position: THREE.Vector3, color: THREE.Color) {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: color },
        intensity: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float intensity;
        varying vec3 vNormal;
        
        void main() {
          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          float edge = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          vec3 finalColor = mix(color, vec3(1.0), edge * pulse);
          gl_FragColor = vec4(finalColor, intensity * (edge + 0.2));
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.copy(position);

    this.timeline = gsap.timeline({ repeat: -1 });
    this.timeline.to(this.material.uniforms.intensity, {
      value: 1,
      duration: 1,
      ease: "power2.inOut"
    }).to(this.material.uniforms.intensity, {
      value: 0.3,
      duration: 1,
      ease: "power2.inOut"
    });
  }

  update(time: number) {
    this.material.uniforms.time.value = time;
  }

  getMesh() {
    return this.mesh;
  }

  dispose() {
    this.timeline.kill();
    this.material.dispose();
    this.mesh.geometry.dispose();
  }
}