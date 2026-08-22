'use client';
import { Component, ReactNode, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, useProgress } from '@react-three/drei';
import CoinsModel from './CoinsModel';

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() {
        return { failed: true };
    }
    render() {
        return this.state.failed ? null : this.props.children;
    }
}

function useModelReady() {
    const { active, progress, item } = useProgress();
    const [started, setStarted] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (active) setStarted(true);
        if ((started || progress > 0) && !active && progress >= 100) setReady(true);
    }, [active, progress, started, item]);

    return ready;
}

export default function Scene3D() {
    const ready = useModelReady();

    return (
        <div
            className={`h-full w-full transition-opacity duration-1000 ease-out ${
                ready ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <Canvas
                dpr={[1, 1.75]}
                camera={{ position: [0, 0.4, 5], fov: 38 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    toneMappingExposure: 1.5,
                }}
            >
                <Suspense fallback={null}>
                    <SceneBoundary>
                        <CoinsModel />
                    </SceneBoundary>
                    {/* Warm studio rig tuned for full-metal satin gold */}
                    <ambientLight intensity={0.45} />
                    <directionalLight
                        position={[4, 7, 5]}
                        intensity={3.8}
                        color="#ffdfae"
                    />
                    <directionalLight
                        position={[-6, 2, -4]}
                        intensity={1.1}
                        color="#8fb0ff"
                    />
                    <spotLight
                        position={[0, 8, 2]}
                        angle={0.6}
                        penumbra={1}
                        intensity={60}
                        distance={20}
                        color="#ffbf78"
                    />
                    {/* Local procedural environment — no CDN fetch, instant reflections */}
                    <Environment resolution={256}>
                        <Lightformer
                            intensity={8}
                            position={[0, 5, 4]}
                            scale={[12, 5, 1]}
                            color="#fff1d6"
                        />
                        <Lightformer
                            intensity={3}
                            position={[-7, 2, -2]}
                            scale={[5, 8, 1]}
                            color="#a9c4ff"
                        />
                        <Lightformer
                            intensity={5}
                            position={[7, 0, 3]}
                            scale={[5, 6, 1]}
                            color="#ffb46b"
                        />
                        <Lightformer
                            intensity={2}
                            position={[0, -4, 2]}
                            rotation-x={Math.PI / 2}
                            scale={[10, 10, 1]}
                            color="#ffd9a0"
                        />
                    </Environment>
                </Suspense>
            </Canvas>
        </div>
    );
}
