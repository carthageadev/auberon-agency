'use client';
import HeroContent from "./ui/HeroContent";
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('./3D/Scene3D'), {
    ssr: false
});

export default function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <Scene3D />
            </div>

            {/* subtle blue only at bottom so hero stays black and fades */}
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom,_rgba(30,58,138,0.14),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 z-[1] bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] pointer-events-none" />

            {/* Vignette for text readability */}
            <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.45)_80%,rgba(0,0,0,0.75)_100%)]" />

            <div className="container relative z-10 flex h-full w-full flex-col justify-center px-6 pt-6">
                <HeroContent />
            </div>

            {/* soft fade so no harsh line — black → slight navy */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-48 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </section>
    );
}
