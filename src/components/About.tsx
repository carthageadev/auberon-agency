'use client'
import { useRef, useEffect, useState } from 'react';
import { motion } from "framer-motion";

const STATEMENT = [
    <>A creative agency crafting</>,
    <>digital experiences that</>,
    <>leave a lasting mark.</>,
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          setIsVisible(false);
          setHasAnimated(false);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className='relative flex min-h-[85vh] w-full flex-col items-center justify-center bg-black px-6 py-24 z-10 overflow-hidden'>
      {/* very subtle wash — mostly black, hint of navy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)] pointer-events-none" />
      {/* subtle animated glow — toned down */}
      <motion.div
        aria-hidden
        className="absolute -top-20 right-[10%] h-[520px] w-[520px] rounded-full bg-blue-600/[0.04] blur-[90px] pointer-events-none"
        animate={{ y: [0, -12, 0], x: [0, 8, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div ref={ref} className='relative w-full max-w-4xl'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-10 text-xs font-medium uppercase tracking-[0.35em] text-white/35'
        >
          About
        </motion.p>

        <h2 className='text-3xl font-semibold leading-[1.25] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
          {STATEMENT.map((line, i) => (
            <span key={i} className='block overflow-hidden py-1.5 -my-1.5'>
              <motion.span
                className='block text-white pb-2'
                initial={{ y: '110%' }}
                animate={isVisible ? { y: 0 } : { y: '110%' }}
                transition={{ duration: 0.8, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className='mt-10 max-w-xl text-sm leading-relaxed text-white/50 md:text-base'
        >
          Design, technology and strategy under one roof. We partner with
          ambitious teams to turn bold ideas into brands people remember.
        </motion.p>
      </div>
    </div>
  );
};

export default About;
