'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function Footer() {
    const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
    const spanItemsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const handleMouseEnter = (item: HTMLElement) => {
            const textInitial = item.querySelector('.initial');
            const textHover = item.querySelector('.hover');
            gsap.to(textInitial, {
                yPercent: -100,
                perspective: 1000,
                rotationX: 90,
                duration: 1,
                ease: 'power4.out',
            });
            gsap.to(textHover, {
                yPercent: 0,
                perspective: 1000,
                rotationX: 0,
                duration: 1,
                ease: 'power4.out',
            });
        };

        const handleMouseLeave = (item: HTMLElement) => {
            const textInitial = item.querySelector('.initial');
            const textHover = item.querySelector('.hover');
            gsap.to(textInitial, {
                yPercent: 0,
                perspective: 1000,
                rotationX: 0,
                duration: 1,
                ease: 'power4.out',
            });
            gsap.to(textHover, {
                yPercent: 100,
                perspective: 1000,
                rotationX: -90,
                duration: 1,
                ease: 'power4.out',
            });
        };

        const addEventListeners = (item: HTMLElement | null) => {
            if (!item) return;
            const textHover = item.querySelector('.hover');
            gsap.set(textHover, { yPercent: 100, perspective: 1000, rotationX: -90 });

            const enterHandler = () => handleMouseEnter(item);
            const leaveHandler = () => handleMouseLeave(item);

            item.addEventListener('mouseenter', enterHandler);
            item.addEventListener('mouseleave', leaveHandler);

            // Store handlers to remove them later
            (item as any).__enterHandler = enterHandler;
            (item as any).__leaveHandler = leaveHandler;
        };

        const removeEventListeners = (item: HTMLElement | null) => {
            if (!item) return;
            item.removeEventListener('mouseenter', (item as any).__enterHandler);
            item.removeEventListener('mouseleave', (item as any).__leaveHandler);
        };

        listItemsRef.current.forEach(addEventListeners);
        spanItemsRef.current.forEach(addEventListeners);

        return () => {
            listItemsRef.current.forEach(removeEventListeners);
            spanItemsRef.current.forEach(removeEventListeners);
        };
    }, []);

    return (
        <footer className="flex relative flex-col container py-12 min-h-screen justify-evenly overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[30vh] w-full"
                style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
                }}
            />
            <div className="relative z-10 flex flex-col flex-1 justify-evenly">
            <div className='flex flex-col'>
                <ul className="flex flex-col gap-5 uppercase w-24">
                    {['About', 'Services', 'Works', 'Contact'].map((text, index) => (
                        <li
                            key={index}
                            ref={(el) => { listItemsRef.current[index] = el; }}
                            className="relative overflow-hidden h-5 cursor-pointer"
                        >
                            <span className="block initial absolute top-0 left-0 w-full h-full">{text}</span>
                            <span className="block hover absolute top-0 left-0 w-full h-full">{text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='relative overflow-hidden group/line py-12 mx-auto w-fit cursor-pointer'>
                <h1 className='w-full text-[12vw] uppercase leading-none'>Let&apos;s Talk</h1>
                <span className='block w-full bg-white h-3 -translate-x-full group-hover/line:translate-x-0 duration-500 opacity-0 group-hover/line:opacity-100' />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-10 justify-between'>
                <div className='flex gap-10 uppercase'>
                    <div className=' relative overflow-hidden group/line cursor-pointer'>
                        <a href="mailto:contact@auberon.agency" className='block'>
                            <h1 className='leading-none pb-2'>mail</h1>
                            <span className='block bg-white h-[2px] -translate-x-full group-hover/line:translate-x-0 group-hover/line:opacity-100 opacity-0 duration-500' />
                        </a>
                    </div>
                    <div className=' relative overflow-hidden group/line cursor-pointer'>
                        <a href="https://github.com/AhmedBenAbdallahDev/auberon" target="_blank" rel="noopener noreferrer" className='block'>
                            <h1 className='leading-none pb-2'>github</h1>
                            <span className='block bg-white h-[2px] -translate-x-full group-hover/line:translate-x-0 group-hover/line:opacity-100 opacity-0 duration-500' />
                        </a>
                    </div>
                    <div className=' relative overflow-hidden group/line cursor-pointer'>
                        <a href="https://www.behance.net/auberon" target="_blank" rel="noopener noreferrer" className='block'>
                            <h1 className='leading-none pb-2'>behance</h1>
                            <span className='block bg-white h-[2px] -translate-x-full group-hover/line:translate-x-0 group-hover/line:opacity-100 opacity-0 duration-500' />
                        </a>
                    </div>
                    <div className=' relative overflow-hidden group/line cursor-pointer'>
                        <a href="https://dribbble.com/auberon" target="_blank" rel="noopener noreferrer" className='block'>
                            <h1 className='leading-none pb-2'>dribble</h1>
                            <span className='block bg-white h-[2px] -translate-x-full group-hover/line:translate-x-0 group-hover/line:opacity-100 opacity-0 duration-500' />
                        </a>
                    </div>
                    <div className=' relative overflow-hidden group/line cursor-pointer'>
                        <a href="https://www.linkedin.com/company/auberon-agency" target="_blank" rel="noopener noreferrer" className='block'>
                            <h1 className='leading-none pb-2'>linkedin</h1>
                            <span className='block bg-white h-[2px] -translate-x-full group-hover/line:translate-x-0 group-hover/line:opacity-100 opacity-0 duration-500' />
                        </a>
                    </div>
                </div>
                <div className='flex gap-10 uppercase'>
                    <span>2024 © AUBERON Agency</span>
                </div>
            </div>
            </div>
        </footer>
    );
}

export default Footer;
