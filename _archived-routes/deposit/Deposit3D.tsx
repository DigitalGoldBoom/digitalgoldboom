"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, N8AO, SMAA, HueSaturation, BrightnessContrast } from "@react-three/postprocessing";
import * as THREE from "three";
import type { Group } from "three";
import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * Deposit3D — the deposit as a live 3D model, cleaned up in-scene:
 *  - emissive glow killed (gold stays matte, in the quartz — QP rule),
 *  - studio IBL + neutral daylight key so the granite reads grey, not brown,
 *  - N8AO ambient occlusion for real crevice depth,
 *  - a light richer grade (HueSaturation + contrast) toward the video look,
 *  - ACES tone-mapping; camera looks slightly DOWN (birdseye); seamless spin.
 * Mesh: graded reconstruction, /deposit/deposit-hero.glb.
 */

function Model() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF("/deposit/deposit-hero.glb");
  const still = prefersReducedMotion();

  useLayoutEffect(() => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const mat = m.material as THREE.MeshStandardMaterial;
      if (!mat) return;
      mat.emissive = new THREE.Color(0x000000);
      mat.emissiveIntensity = 0;
      mat.envMapIntensity = 1.35;
      if (mat.normalScale) mat.normalScale.set(1.6, 1.6);
      mat.needsUpdate = true;
      m.castShadow = true;
      m.receiveShadow = true;
    });
  }, [scene]);

  useFrame((_, dt) => {
    if (ref.current && !still) ref.current.rotation.y += dt * 0.18;
  });

  return (
    <group ref={ref}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/deposit/deposit-hero.glb");

export default function Deposit3D() {
  const camZ =
    typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches ? 2.55 : 3.6;
  return (
    <Canvas
      className="dep-canvas"
      camera={{ position: [0, 0.55, camZ], fov: 40 }}
      gl={{ alpha: true, antialias: false, preserveDrawingBuffer: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
      onCreated={({ gl, camera }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.14;
        camera.lookAt(0, 0, 0);
      }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 4]} intensity={1.55} color={"#fffaf3"} />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color={"#dce6f5"} />

      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#0a0a0a"]} />
        <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[8, 8, 1]} color="#ffffff" />
        <Lightformer intensity={1.1} position={[5, 1, 2]} scale={[4, 6, 1]} color="#fff1de" />
        <Lightformer intensity={0.8} position={[-6, 2, -2]} scale={[5, 5, 1]} color="#e8eef7" />
        <Lightformer intensity={0.6} position={[0, -4, 1]} scale={[8, 4, 1]} color="#cfc7ba" />
      </Environment>

      <Suspense fallback={null}>
        <Model />
      </Suspense>

      <EffectComposer enableNormalPass multisampling={0}>
        <N8AO aoRadius={0.5} intensity={2.2} distanceFalloff={0.6} quality="performance" />
        <HueSaturation saturation={0.14} />
        <BrightnessContrast brightness={0.05} contrast={0.1} />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}
