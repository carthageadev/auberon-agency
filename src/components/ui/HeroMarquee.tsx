const ITEMS = [
    "Branding",
    "Web Design",
    "Development",
    "3D & Motion",
    "Strategy",
    "E-Commerce",
];

export default function HeroMarquee() {
    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 bg-gradient-to-t from-black/90 via-black/50 to-transparent py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee-track flex w-max will-change-transform">
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        aria-hidden={copy === 1}
                        className="flex shrink-0 items-center"
                    >
                        {ITEMS.map((item, i) => (
                            <span
                                key={`${copy}-${i}`}
                                className="flex items-center whitespace-nowrap text-sm font-semibold uppercase tracking-[0.35em] md:text-base"
                            >
                                <span
                                    className={
                                        i % 2 === 0 ? "text-white/45" : "marquee-outline"
                                    }
                                >
                                    {item}
                                </span>
                                <span aria-hidden className="mx-8 text-white/20">
                                    ✦
                                </span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
