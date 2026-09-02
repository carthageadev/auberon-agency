'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";

export default function HeroContent() {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(
                ".hero-label",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7 }
            )
                .fromTo(
                    ".hero-line",
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
                    "-=0.4"
                )
                .fromTo(
                    ".hero-sub",
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.55"
                )
                .fromTo(
                    ".hero-cta",
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.55"
                )
                .fromTo(
                    ".hero-card",
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.7"
                );
        }, root);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={root} className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <div>
                <p className="hero-label text-xl text-white">
                    Digital Creative Agency
                </p>

                <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    <span className="hero-line block">Transforming ideas</span>
                    <span className="hero-line block">
                        into <span className="text-[#D35A0A]">digital excellence</span>
                    </span>
                </h1>

                <p className="hero-sub mt-6 max-w-md text-sm leading-relaxed text-white-200 sm:text-base">
                    We design brands, websites and products people remember —
                    strategy, design and engineering under one roof.
                </p>

                <div className="hero-cta mt-8 flex flex-wrap items-center gap-6">
                    <button
                        type="button"
                        className="creativeBtn relative z-20 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black"
                    >
                        <span>Get Started</span>
                    </button>
                    <a
                        href="#works"
                        className="group/link inline-flex items-center gap-3 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                        See our work
                        <MdOutlineArrowOutward className="text-xl transition-all duration-500 group-hover/link:rotate-45 group-hover/link:translate-x-1" />
                    </a>
                </div>
            </div>

            <div className="hero-card relative overflow-hidden rounded-3xl border border-white/[0.1] bg-black/80">
                <div className="relative h-[320px] w-full sm:h-[380px] lg:h-[440px]">
                    <Image
                        src="/b1.jpg"
                        alt="Featured project by Auberon"
                        fill
                        className="object-cover"
                        priority
                        quality={80}
                    />
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.1] px-6 py-4">
                    <span className="text-sm text-white-100">Featured project</span>
                    <a
                        href="#works"
                        className="group/card inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                    >
                        View all
                        <MdOutlineArrowOutward className="text-lg transition-all duration-500 group-hover/card:rotate-45 group-hover/card:translate-x-1" />
                    </a>
                </div>
            </div>
        </div>
    )
}
