'use client';
import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Box3, Group, MathUtils, Mesh, MeshStandardMaterial, Vector3 } from 'three';

useGLTF.preload('/medias/roman_coins.glb');

const TARGET_SIZE = 4.6;

export default function CoinsModel() {
    const { scene } = useGLTF('/medias/roman_coins.glb');
    const swayRef = useRef<Group>(null);
    const floatRef = useRef<Group>(null);
    const pointer = useRef({ x: 0, y: 0 });

    // Normalize once: center at origin + retune the baked PBR material.
    // The GLB ships roughness~0 / metalness~1 (mirror) which renders nearly
    // black under weak light, so we pin a satin-gold finish instead.
    const model = useMemo(() => {
        const clone = scene.clone();
        clone.traverse((obj) => {
            const mesh = obj as Mesh;
            if (!mesh.isMesh) return;
            const mat = mesh.material as MeshStandardMaterial;
            if (!mat || !mat.isMeshStandardMaterial) return;
            mat.roughnessMap = null;
            mat.metalnessMap = null;
            mat.metalness = 1;
            mat.roughness = 0.32;
            mat.envMapIntensity = 2.8;
            mat.needsUpdate = true;
        });
        const box = new Box3().setFromObject(clone);
        const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());
        const scale = TARGET_SIZE / Math.max(size.x, size.y, size.z, 0.0001);
        clone.scale.setScalar(scale);
        clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        return clone;
    }, [scene]);

    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        if (swayRef.current) {
            // Gentle idle sway + soft parallax toward the cursor
            const targetY = Math.sin(t * 0.18) * 0.14 - pointer.current.x * 0.12;
            const targetX = Math.sin(t * 0.12 + 1.5) * 0.05 + pointer.current.y * 0.06;
            swayRef.current.rotation.y = MathUtils.lerp(swayRef.current.rotation.y, targetY, 0.03);
            swayRef.current.rotation.x = MathUtils.lerp(swayRef.current.rotation.x, targetX, 0.03);
        }
        if (floatRef.current) {
            floatRef.current.position.y = Math.sin(t * 0.55) * 0.06;
        }
    });

    return (
        <group position={[0, -1.35, 0]} rotation={[0.28, 0, 0]}>
            <group ref={swayRef}>
                <group ref={floatRef}>
                    <primitive object={model} />
                </group>
            </group>
        </group>
    );
}
