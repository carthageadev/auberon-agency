'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function HeroContent() {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(
                ".hero-line",
                { opacity: 0, y: 80 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.14 }
            )
                .fromTo(
                    ".hero-sub",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(
                    ".hero-cta",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.55"
                );
        }, root);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={root} className="w-full text-left">
            <h1 className="max-w-3xl text-balance text-[11.5vw] font-bold leading-[0.9] tracking-[-0.03em] text-white sm:text-[10vw] lg:text-[6.5rem]">
                <span className="hero-line block">Bold ideas,</span>
                <span className="hero-line block pb-1 text-white">
                    brilliantly executed.
                </span>
            </h1>

            <p className="hero-sub mt-6 max-w-md text-balance text-sm leading-relaxed text-[#C1C2D3] sm:text-base">
                Auberon is a creative agency designing brands, websites and
                products people remember.
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
                    <MdOutlineArrowOutward className="text-xl transition-all duration-500 group-hover/link:rotate-45 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
            </div>
        </div>
    )
}
