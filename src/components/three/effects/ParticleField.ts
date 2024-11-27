import * as THREE from 'three';

export class ParticleField {
  private particles: THREE.Points;
  private material: THREE.PointsMaterial;
  private initialPositions: Float32Array;
  private velocities: Float32Array;

  constructor(count: number, radius: number, color: THREE.Color) {
    const geometry = new THREE.BufferGeometry();
    this.initialPositions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      this.initialPositions[i * 3] = x;
      this.initialPositions[i * 3 + 1] = y;
      this.initialPositions[i * 3 + 2] = z;

      this.velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      this.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(this.initialPositions, 3));

    this.material = new THREE.PointsMaterial({
      color: color,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, this.material);
  }

  update() {
    const positions = this.particles.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += this.velocities[i];
      positions[i + 1] += this.velocities[i + 1];
      positions[i + 2] += this.velocities[i + 2];

      const distance = Math.sqrt(
        positions[i] * positions[i] +
        positions[i + 1] * positions[i + 1] +
        positions[i + 2] * positions[i + 2]
      );

      if (distance > 6) {
        positions[i] = this.initialPositions[i];
        positions[i + 1] = this.initialPositions[i + 1];
        positions[i + 2] = this.initialPositions[i + 2];
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
  }

  getPoints() {
    return this.particles;
  }

  dispose() {
    this.material.dispose();
    this.particles.geometry.dispose();
  }
}