"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Bg3D() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    cam.position.z = 7;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch (e) {
      return;
    }

    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    el.appendChild(renderer.domElement);

    // Group for the main cyber flame artifact
    const artifactGroup = new THREE.Group();
    artifactGroup.position.set(3.2, -0.6, -1);
    scene.add(artifactGroup);

    // 1. Inner Core: Pulsing Cyber Flame Crystal (Fire Amber)
    const coreGeo = new THREE.IcosahedronGeometry(0.75, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    artifactGroup.add(coreMesh);

    // 2. Inner Glow Core
    const innerGlowGeo = new THREE.OctahedronGeometry(0.45, 0);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: false,
      transparent: true,
      opacity: 0.45,
    });
    const innerGlowMesh = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    artifactGroup.add(innerGlowMesh);

    // 3. Outer Diamond Shield (Emerald Gladiator Cage)
    const outerGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    artifactGroup.add(outerMesh);

    // 4. Concentric Orbital Rings (GATE Milestone Orbits)
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.015, 12, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    artifactGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.4, 0.015, 12, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    artifactGroup.add(ring2);

    // Orbiting Satellite Checkpoints
    const nodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const node1Mat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
    const node1 = new THREE.Mesh(nodeGeo, node1Mat);
    artifactGroup.add(node1);

    const node2Mat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const node2 = new THREE.Mesh(nodeGeo, node2Mat);
    artifactGroup.add(node2);

    // 5. Rising Fire Embers / Ambient Stardust (300 particles drifting upwards)
    const emberCount = 320;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 18;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      emberSpeeds[i] = 0.008 + Math.random() * 0.014;
    }

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // Parallax mouse interaction
    let targetX = 0, targetY = 0;
    const onMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Responsive position adjust
    const updateLayout = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      renderer.setSize(w, h);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();

      // Shift artifact to center on mobile, right side on desktop
      if (w < 860) {
        artifactGroup.position.set(0, 1.2, -3.5);
        artifactGroup.scale.set(0.75, 0.75, 0.75);
      } else {
        artifactGroup.position.set(3.4, -0.4, -1);
        artifactGroup.scale.set(1, 1, 1);
      }
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);

    let animId;
    let clock = 0;

    const tick = () => {
      clock += 0.016;

      // Rotate flame elements at variable speeds
      coreMesh.rotation.y += 0.01;
      coreMesh.rotation.x += 0.008;

      innerGlowMesh.rotation.y -= 0.015;
      innerGlowMesh.rotation.z += 0.01;

      outerMesh.rotation.y -= 0.005;
      outerMesh.rotation.x += 0.004;

      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.005;

      // Pulse breathing animation (flame heartbeat)
      const pulse = 1 + Math.sin(clock * 2.5) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);
      innerGlowMesh.scale.set(pulse * 1.05, pulse * 1.05, pulse * 1.05);

      // Orbiting satellite math
      const a1 = clock * 1.2;
      node1.position.set(Math.cos(a1) * 1.9, Math.sin(a1) * 1.9 * 0.5, Math.sin(a1) * 0.9);

      const a2 = -clock * 0.9;
      node2.position.set(Math.cos(a2) * 2.4 * 0.8, Math.sin(a2) * 2.4, Math.cos(a2) * 0.8);

      // Float embers upward like a roast fire
      const posArr = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        posArr[i * 3 + 1] += emberSpeeds[i];
        posArr[i * 3] += Math.sin(clock + i) * 0.002;
        if (posArr[i * 3 + 1] > 7) {
          posArr[i * 3 + 1] = -7;
          posArr[i * 3] = (Math.random() - 0.5) * 18;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Smooth camera parallax
      cam.position.x += (targetX - cam.position.x) * 0.04;
      cam.position.y += (-targetY - cam.position.y) * 0.04;
      cam.lookAt(0, 0, 0);

      renderer.render(scene, cam);
      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", updateLayout);
      try {
        renderer.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        innerGlowGeo.dispose();
        innerGlowMat.dispose();
        outerGeo.dispose();
        outerMat.dispose();
        ring1Geo.dispose();
        ring1Mat.dispose();
        ring2Geo.dispose();
        ring2Mat.dispose();
        nodeGeo.dispose();
        node1Mat.dispose();
        node2Mat.dispose();
        emberGeo.dispose();
        emberMat.dispose();
        if (el && renderer.domElement && el.contains(renderer.domElement)) {
          el.removeChild(renderer.domElement);
        }
      } catch (e) {
        console.error("3D cleanup error:", e);
      }
    };
  }, []);

  return <div ref={ref} className="bg3d" aria-hidden="true" />;
}
