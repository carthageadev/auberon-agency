'use client';
import HeroContent from "./ui/HeroContent";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black">
            {/* grid texture */}
            <div className="absolute inset-0 z-[1] bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] pointer-events-none" />
            {/* melt top edge into body navy */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[30vh] w-full"
                style={{
                    background: "linear-gradient(180deg, rgba(11,13,33,1) 0%, rgba(11,13,33,0) 100%)"
                }}
            />

            <div className="container relative z-10 flex w-full flex-1 flex-col justify-center px-6 py-28">
                <HeroContent />
            </div>

            {/* melt bottom edge into About */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[16vh] w-full"
                style={{
                    background: "linear-gradient(0deg, rgba(11,13,33,1) 0%, rgba(11,13,33,0) 100%)"
                }}
            />
        </section>
    );
}
