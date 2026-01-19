import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center gap-2.5 my-12">
        <div className="w-10 h-0.5 bg-pink-dark rounded-sm"></div>
        <h2 className="font-fredoka text-bluey-dark text-3xl font-bold flex items-center gap-2">
            {children}
        </h2>
        <div className="w-10 h-0.5 bg-pink-dark rounded-sm"></div>
    </div>
);

const Polaroid = ({ text, rotate = 0, delay = 0 }: { text: string, rotate?: number, delay?: number }) => (
    <motion.div
        initial={{ scale: 0.8, rotate: 0, opacity: 0 }}
        whileInView={{ scale: 1, rotate: rotate, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
        transition={{ type: "spring", delay }}
        className="bg-white p-4 pb-10 shadow-lg w-[280px] relative rounded md:mx-0 mx-auto"
        style={{ transform: `rotate(${rotate}deg)` }} // Fallback / initial
    >
        {/* Clip decoration */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-pink-light rounded-full border-4 border-white shadow-sm flex items-center justify-center z-20">
            <div className="w-3 h-3 bg-pink-dark rounded-full"></div>
        </div>

        <div className="w-full h-[200px] bg-gray-100 border border-gray-200 relative">
            <img
                src={`https://placehold.co/300x300/eee/999?text=${encodeURIComponent(text)}`}
                alt={text}
                className="w-full h-full object-cover"
            />
            {/* Overlay border */}
            <div className={`absolute top-0 left-0 w-full h-full border-2 border-dashed rounded pointer-events-none ${rotate < 0 ? 'border-yellow-200' : 'border-pink-200'}`}></div>
        </div>
    </motion.div>
);

const Gallery = () => {
    return (
        <section className="mb-20">
            <SectionTitle>Fotos familiares</SectionTitle>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-10">
                <Polaroid text="Julieta 1" rotate={-3} delay={0.1} />
                <Polaroid text="Julieta 2" rotate={2} delay={0.2} />
            </div>
        </section>
    );
};

export default Gallery;
