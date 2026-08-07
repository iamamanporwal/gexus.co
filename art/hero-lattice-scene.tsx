'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Generates the organic, topology-optimised lattice seen in the hero: a run of
 * elliptical rings swept along a gently curved spine, tied together by
 * longitudinal spars and capped with mounting bosses.
 */
function useLatticeGeometry() {
  return useMemo(() => {
    const spine = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.9, -0.8, 0.1),
      new THREE.Vector3(-1.9, -0.05, -0.24),
      new THREE.Vector3(0.2, 0.3, 0.18),
      new THREE.Vector3(2.3, 0.24, -0.14),
      new THREE.Vector3(4.1, -0.2, 0.05),
    ])

    // Elliptical cross-section of the part at position `t` along the spine.
    const frame = (t: number) => {
      const center = spine.getPointAt(t)
      const tangent = spine.getTangentAt(t).normalize()
      const up = new THREE.Vector3(0, 1, 0)
      const side = new THREE.Vector3().crossVectors(tangent, up).normalize()
      const normal = new THREE.Vector3().crossVectors(side, tangent).normalize()
      const swell = Math.sin(Math.PI * t) ** 0.7
      return { center, side, normal, swell, ra: 0.5 + swell * 0.9, rb: 0.22 + swell * 0.44 }
    }

    const at = (t: number, angle: number, inset = 1) => {
      const f = frame(t)
      return f.center
        .clone()
        .addScaledVector(f.side, Math.cos(angle) * f.ra * inset)
        .addScaledVector(f.normal, Math.sin(angle) * f.rb * inset)
    }

    /**
     * Longitudinal strands. Each winds around the section at its own rate, so
     * strands cross one another and leave irregular openings — the signature of
     * a topology-optimised part, rather than the regular coil a fixed rate
     * would produce.
     */
    const spars: THREE.BufferGeometry[] = []
    const STRANDS = 13
    for (let k = 0; k < STRANDS; k++) {
      const phase = (k / STRANDS) * Math.PI * 2
      // Alternating winding directions and rates are what create the weave.
      const rate = (k % 2 === 0 ? 1 : -1) * (0.55 + (k % 5) * 0.5)
      const wobble = 0.09 + (k % 3) * 0.05

      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 56; i++) {
        const t = i / 56
        const angle = phase + t * Math.PI * rate + Math.sin(t * Math.PI * 2 + k) * wobble
        pts.push(at(t, angle, 0.96 + Math.sin(t * Math.PI * 3 + k) * 0.05))
      }

      spars.push(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(pts),
          120,
          0.075 + (k % 3) * 0.016,
          9,
          false,
        ),
      )
    }

    // A handful of ribs tie the strands together without closing the surface.
    const rings: THREE.BufferGeometry[] = []
    for (const t of [0.12, 0.33, 0.55, 0.76, 0.94]) {
      const pts: THREE.Vector3[] = []
      const SEG = 30
      for (let s = 0; s < SEG; s++) {
        const a = (s / SEG) * Math.PI * 2
        pts.push(at(t, a, 1 + Math.sin(a * 3 + t * 9) * 0.09))
      }
      const f = frame(t)
      rings.push(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5),
          110,
          0.062 + f.swell * 0.03,
          9,
          true,
        ),
      )
    }

    return { rings, spars }
  }, [])
}

function Bracket() {
  const group = useRef<THREE.Group>(null)
  const { rings, spars } = useLatticeGeometry()
  const reduced = usePrefersReducedMotion()
  const pointer = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const metal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#cfd0d6'),
        metalness: 1,
        roughness: 0.3,
        clearcoat: 0.7,
        clearcoatRoughness: 0.22,
        envMapIntensity: 1.15,
      }),
    [],
  )

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime

    // Very slow float + drift; pointer contributes no more than ~2°.
    const targetX = reduced ? 0 : (state.pointer.y * Math.PI) / 90
    const targetY = reduced ? 0 : (state.pointer.x * Math.PI) / 90

    pointer.current.x += (targetX - pointer.current.x) * Math.min(1, delta * 1.6)
    pointer.current.y += (targetY - pointer.current.y) * Math.min(1, delta * 1.6)

    const idle = reduced ? 0 : 1
    group.current.rotation.x = -0.18 + pointer.current.x + Math.sin(t * 0.24) * 0.035 * idle
    group.current.rotation.y = -0.42 + pointer.current.y + Math.sin(t * 0.19) * 0.05 * idle
    group.current.rotation.z = 0.12 + Math.cos(t * 0.21) * 0.02 * idle
    group.current.position.y = Math.sin(t * 0.36) * 0.12 * idle
  })

  // The part runs ~8.3 world units end to end; keep it inside the frustum so
  // the tips never clip against the canvas edge.
  const scale = Math.min(1, viewport.width / 10.4)

  return (
    <group ref={group} scale={scale} rotation={[-0.18, -0.42, 0.12]}>
      {rings.map((g, i) => (
        <mesh key={`r${i}`} geometry={g} material={metal} castShadow receiveShadow />
      ))}
      {spars.map((g, i) => (
        <mesh key={`s${i}`} geometry={g} material={metal} castShadow receiveShadow />
      ))}
      {/* Mounting bosses at either end of the part. */}
      {[
        [-3.95, -0.8, 0.1],
        [4.15, -0.2, 0.05],
      ].map((p, i) => (
        <mesh
          key={`boss${i}`}
          position={p as [number, number, number]}
          rotation={[0, 0, Math.PI / 2]}
          material={metal}
        >
          <torusGeometry args={[0.42, 0.15, 20, 40]} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Studio lighting built from in-scene Lightformers so the metal reads
 * correctly without fetching an external HDRI.
 */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      {/* A mid-grey surround is what lets the chrome read as chrome — against a
          fully white environment every face reflects white and the part flattens. */}
      <color attach="background" args={['#8f9098']} />
      <Lightformer intensity={4} position={[0, 5, -3]} scale={[14, 3.5, 1]} />
      <Lightformer intensity={2.2} position={[-7, 1.5, 3]} scale={[5, 9, 1]} rotation-y={Math.PI / 2} />
      <Lightformer intensity={1.4} color="#e8eaf0" position={[7, 0, 2]} scale={[4, 9, 1]} rotation-y={-Math.PI / 2} />
      <Lightformer intensity={5} form="ring" position={[3, 4.5, 4]} scale={2.4} />
      <Lightformer intensity={2.6} position={[0, 6.5, 2]} scale={[10, 1.4, 1]} rotation-x={Math.PI / 2} />
      <Lightformer intensity={0.7} color="#5a5b63" position={[0, -6, 0]} scale={[14, 6, 1]} rotation-x={-Math.PI / 2} />
    </Environment>
  )
}

export default function HeroBracketScene() {
  const reduced = usePrefersReducedMotion()

  return (
    <Canvas
      dpr={[1, 3]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.4, 9.5], fov: 34 }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={0.8} />
      <Studio />
      <Bracket />
    </Canvas>
  )
}
