import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ShaderBackground } from "./components/ui/light-blue-plasma-shader-w-grain-interactive";

/* --------------------------------- content -------------------------------- */

const WORK = [
  { title: "Lumen", note: "Brand identity", year: "2025" },
  { title: "Maison Serre", note: "Identity, packaging", year: "2025" },
  { title: "Northbeam", note: "Website", year: "2024" },
  { title: "Atlas Estates", note: "Identity, website", year: "2024" },
];

/* --------------------------------- helpers -------------------------------- */

function Fade({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------- parts --------------------------------- */

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#F2F1ED]/85 backdrop-blur-md">
      <div className="wrap flex items-center justify-between h-16">
        <a href="#top" className="text-[13px] tracking-[0.18em] uppercase">
          Auberon
        </a>
        <nav className="flex items-center gap-7 text-[13px] text-[#74736C]">
          <a href="#identity" className="ul hover:text-[#16160F] transition-colors">Identity</a>
          <a href="#work" className="ul hover:text-[#16160F] transition-colors">Work</a>
          <a href="#contact" className="ul hover:text-[#16160F] transition-colors">Contact</a>
        </nav>
      </div>
      <div className="rule" />
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="wrap relative pt-40 pb-24 md:pt-52 md:pb-32">
      {/* thin diagonal plasma stripe, low-left → high-right, behind the type */}
      <div
        aria-hidden
        className="rift-sway pointer-events-none absolute left-[-10vw] top-[62%] z-0 h-[90px] w-[120vw] opacity-80 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:h-[120px]"
      >
        <ShaderBackground className="h-full w-full" />
      </div>
      <div className="relative z-10">
      <Fade>
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#74736C]">
          Design studio — since 2017
        </p>
      </Fade>
      <Fade delay={0.08}>
        <h1 className="mt-8 text-[2.6rem] md:text-[4.2rem] leading-[1.06] tracking-[-0.02em] font-light max-w-3xl">
          We design <span className="font-serif italic">great designs.</span>
        </h1>
      </Fade>
      <Fade delay={0.16}>
        <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#74736C]">
          Brand identity and websites for people who care about the details.
          Small studio, few projects, close attention.
        </p>
      </Fade>
      <Fade delay={0.24}>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 text-[15px] ul"
        >
          Please contact us
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
        </a>
      </Fade>
      </div>
    </section>
  );
}

function Identity() {
  return (
    <section id="identity" className="wrap py-20 md:py-28">
      <div className="rule mb-14" />
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <Fade className="md:col-span-4">
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#74736C]">
            01 — Brand identity
          </p>
          <h2 className="mt-6 text-[1.9rem] md:text-[2.4rem] leading-[1.12] tracking-[-0.02em] font-light">
            Marks, systems and
            <span className="font-serif italic"> packaging.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[#74736C] max-w-sm">
            We build identities that hold up everywhere they land — from a
            business card to a shelf. Considered type, restrained colour, and
            artwork that earns a second look.
          </p>
          <p className="mt-8 text-[12px] tracking-[0.2em] uppercase text-[#A6A49B]">
            Hover the panel
          </p>
        </Fade>

        <Fade delay={0.1} className="md:col-span-8">
          <div className="brandContainer relative overflow-hidden border border-[#DEDCD5] bg-[#EAE8E2] h-[420px] md:h-[520px]">
            <div className="p-8 md:p-10">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#74736C]">
                Case — Lumen
              </p>
              <p className="mt-4 text-[1.4rem] md:text-[1.7rem] font-light leading-snug max-w-xs">
                Two flavours, one system.
              </p>
            </div>

            <div className="product">
              <div
                className="soda"
                style={{ "--url": "url(/sodaimage/bg.png)" } as React.CSSProperties}
              />
              <div
                className="soda"
                style={{ "--url": "url(/sodaimage/bg2.png)" } as React.CSSProperties}
              />
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="wrap py-20 md:py-28">
      <div className="rule mb-14" />
      <Fade>
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#74736C]">
          02 — Selected work
        </p>
      </Fade>
      <ul className="mt-10">
        {WORK.map((w, i) => (
          <Fade key={w.title} delay={i * 0.05}>
            <li>
              <a
                href="#contact"
                className="group flex items-baseline justify-between gap-6 py-6 border-b border-[#DEDCD5]"
              >
                <span className="text-[1.35rem] md:text-[1.7rem] font-light tracking-[-0.01em] group-hover:translate-x-1.5 transition-transform duration-500">
                  {w.title}
                </span>
                <span className="hidden sm:block flex-1 text-[13px] text-[#74736C]">
                  {w.note}
                </span>
                <span className="text-[13px] text-[#A6A49B] tabular-nums">{w.year}</span>
              </a>
            </li>
          </Fade>
        ))}
      </ul>
    </section>
  );
}

function Studio() {
  return (
    <section className="wrap py-20 md:py-28">
      <div className="rule mb-14" />
      <div className="grid md:grid-cols-12 gap-10">
        <Fade className="md:col-span-4">
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#74736C]">
            03 — Studio
          </p>
        </Fade>
        <Fade delay={0.08} className="md:col-span-8">
          <p className="text-[1.15rem] md:text-[1.4rem] font-light leading-[1.6] max-w-2xl">
            Four people. One project at a time. We work slowly on purpose,
            because good work rarely arrives in a hurry.
          </p>
        </Fade>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="wrap py-20 md:py-32">
      <div className="rule mb-14" />
      <Fade>
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#74736C]">
          04 — Contact
        </p>
      </Fade>
      <Fade delay={0.08}>
        <a
          href="mailto:hello@auberon.studio"
          className="mt-8 inline-block text-[1.8rem] md:text-[3rem] font-light tracking-[-0.02em] ul"
        >
          hello@auberon.studio
        </a>
      </Fade>
      <Fade delay={0.16}>
        <p className="mt-8 text-[15px] text-[#74736C] max-w-sm leading-relaxed">
          Tell us a little about the project. We reply to everything.
        </p>
      </Fade>
    </section>
  );
}

function Footer() {
  return (
    <footer className="wrap pb-12">
      <div className="rule mb-6" />
      <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#A6A49B]">
        <span>Auberon — Paris</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

/* ----------------------------------- app ---------------------------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-[#F2F1ED] text-[#16160F]">
      <Nav />
      <main>
        <Hero />
        <Identity />
        <Work />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
